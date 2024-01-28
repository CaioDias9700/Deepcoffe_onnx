import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { InferenceSession, Tensor } from "onnxjs";

export const CameraScreen = () => {
  const [temPermissao, setTemPermissao] = useState(null);
  const [refCamera, setRefCamera] = useState(null);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [session, setSession] = useState(null);
  const [classePredita, setClassePredita] = useState(null);
  const [imagemDimensoes, setImagemDimensoes] = useState({ width: 128, height: 128 });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setTemPermissao(status === "granted");

      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryStatus.status !== "granted") {
        console.log("Permissão para acessar a galeria não concedida");
      }

      // Carregar o modelo ONNX
      const onnxSession = new InferenceSession();
      await onnxSession.loadModel("model.onnx");
      setSession(onnxSession);
    })();
  }, []);

  const tirarFoto = async () => {
    if (refCamera) {
      const foto = await refCamera.takePictureAsync();
      setFotoCapturada(foto.uri);

      // Obter dimensões da imagem
      Image.getSize(foto.uri, (width, height) => {
        setImagemDimensoes({ width, height });
      });
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled) {
        setFotoCapturada(result.uri);

        // Obter dimensões da imagem
        Image.getSize(result.uri, (width, height) => {
          setImagemDimensoes({ width, height });
        });
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  const preprocessImage = async (imagemUri) => {
    console.log(imagemUri)
      const response = await fetch(imagemUri);
      const blob = await response.blob();

      // Obter dimensões da imagem
      const { width, height } = imagemDimensoes;
      // Substitua o shape e dtype conforme necessário para o seu modelo ONNX
/*       const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          const buffer = new Uint8Array(reader.result);
          console.log(buffer.buffer)
          resolve(buffer.buffer);
        };
        reader.readAsArrayBuffer(blob);
      }); */
      console.log(blob)
      const image = await Image.load(await blob.arrayBuffer());
      const resizedImage = image.resize({ width: 128, height: 128 });

      const imgBuffer = resizedImage.toBuffer();
      console.log(imgBuffer.byteLength)

      // Verificar se o tamanho do buffer é um múltiplo do tamanho do elemento
      const tamanhoDoElemento = Float32Array.BYTES_PER_ELEMENT;
      const tamanhoDoBuffer = arrayBuffer.byteLength;
      console.log(arrayBuffer.byteLength)

      if (tamanhoDoBuffer % tamanhoDoElemento !== 0) {
        // Se não for um múltiplo, ajustar o tamanho do buffer
        const novoTamanhoDoBuffer = Math.floor(tamanhoDoBuffer / tamanhoDoElemento) * tamanhoDoElemento;
        const novoBuffer = arrayBuffer.slice(0, novoTamanhoDoBuffer);
        return new Tensor(new Float32Array(novoBuffer), "float32", [1, 3, 128, 128]);
      } else {
        // Se já for um múltiplo, criar o tensor normalmente
        return new Tensor(new Float32Array(arrayBuffer), "float32", [1, 3, 128, 128]);
      }
  };

  const executarInferencia = async () => {
    try {
      // Pré-processar a imagem e converter para um tensor ONNX
      const imageTensor = await preprocessImage(fotoCapturada);

      // Executar a inferência ONNX
      const input = new Map();
      input.set("input", imageTensor);
      const outputMap = await session.run(input);

      // Obter os resultados
      const resultadoTensor = outputMap.values().next().value;
      const resultadoArray = resultadoTensor.data;

      // Exemplo: Identificar a classe com maior probabilidade (argmax)
      const novaClassePredita = resultadoArray.indexOf(Math.max(...resultadoArray));

      // Exemplo: Exibir a classe predita
      console.log("Classe predita:", novaClassePredita);

      // Atualizar o estado para refletir a nova classe predita
      setClassePredita(novaClassePredita);

    } catch (error) {
      console.error("Erro ao realizar inferência ONNX:", error);
    }
  };

  return (
    <View style={styles.container}>
      {fotoCapturada && (
        <>
          <Image style={styles.fotoCapturada} source={{ uri: fotoCapturada }} resizeMode="contain" />
          {classePredita !== null && (
            <Text style={styles.textoResultado}>
              Classe predita: {classePredita}
            </Text>
          )}
        </>
      )}
      {!fotoCapturada && temPermissao && (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => setRefCamera(ref)} />
      )}
      <TouchableOpacity style={styles.botao} onPress={fotoCapturada ? executarInferencia : tirarFoto}>
        <Text style={styles.textoBotao}>{fotoCapturada ? "Classificar" : "Tirar Foto"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={pickImage}>
        <Text style={styles.textoBotao}>Selecionar da Galeria</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    width: 128,
    height: 128,
    marginBottom: 20,
  },
  fotoCapturada: {
    width: 128,
    height: 128,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  textoResultado: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
