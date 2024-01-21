import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import styles from "./styles";
import LoadingScreen from './LoadingScreen'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from "@expo/vector-icons";
import { CropView } from 'react-native-image-crop-tools';


export const NewCamera = () => {
  const [temPermissao, setTemPermissao] = useState(null);
  const [tipo, setTipo] = useState(Camera.Constants.Type.back);
  const [refCamera, setRefCamera] = useState(null);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [exibindoTelaCarregamento, setExibindoTelaCarregamento] = useState(false);
  const [fotoCarregada, setFotoCarregada] = useState(null);

  const navigation = useNavigation(); // Adicione esta linha para obter o objeto de navegação

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setTemPermissao(status === "granted");

      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryStatus.status !== "granted") {
        console.log("Permissão para acessar a galeria não concedida");
      }
    })();
  }, []);

  const tirarFoto = async () => {
    if (refCamera) {
      const foto = await refCamera.takePictureAsync();
      setFotoCapturada(foto.uri);
    }
  };

  const confirmarFoto = async () => {
    if (fotoCapturada || fotoCarregada) {
      setExibindoTelaCarregamento(true); // Ativa a tela de carregamento
      enviarImagemParaAPI(fotoCapturada || fotoCarregada);
    }
  };

  const removerFoto = () => {
    setFotoCapturada(null);
    setFotoCarregada(null);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      console.log(result)

      if (!result.cancelled) {
        setFotoCarregada(result.uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  const enviarImagemParaAPI = async (imagemUri) => {
    try {
      const response = await fetch("localhost:5000/classificar", {
        method: "POST",
        body: JSON.stringify({ "imagem_base64": await getBase64(imagemUri) }), // Envie os dados em base64 como JSON
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Resposta da API:", data);
        navigation.navigate('Perfil', { classificacao: data });
      }

      // Desativa a tela de carregamento após receber a resposta da API
      setExibindoTelaCarregamento(false);
    } catch (error) {
      console.error("Erro ao enviar imagem para a API:", error);
      // Certifique-se de desativar a tela de carregamento em caso de erro também
      setExibindoTelaCarregamento(false);
    }
  };

  const getBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      {exibindoTelaCarregamento ? (
        <LoadingScreen />
      ) : fotoCapturada || fotoCarregada ? (
        <View style={styles.visualizarFotoContainer}>
          <Image style={styles.fotoCapturada} source={{ uri: fotoCapturada || fotoCarregada }} resizeMode="contain" />
          <View style={styles.visualizar_grupo_botoes}>
            <TouchableOpacity style={styles.botaoConfirmar} onPress={confirmarFoto}>
              <Entypo name="check" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoRetake} onPress={removerFoto}>
            <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera
          style={styles.camera}
          type={tipo}
          ref={(ref) => setRefCamera(ref)}
        />
      )}

      {!fotoCapturada && !fotoCarregada && (
        <View style={styles.botaoCapturarContainer}>
          <TouchableOpacity style={styles.botaoCapturar} onPress={tirarFoto}>
            <View style={styles.botaoCapturarInner}>
              <View style={styles.botaoCapturarRedondo}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Entypo name="folder-images" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};