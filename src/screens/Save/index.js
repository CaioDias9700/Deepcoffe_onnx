import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';

import MinhaImagem from '../../../assets/class.png';

export const Save = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');
  const [data, setData] = useState('');

  const route = useRoute();
  const { classificacao , p_imagem } = route.params; 
  console.log(classificacao)
  console.log(p_imagem)

  const formatarData = (inputData) => {
    if (inputData.length <= 10) {
      const formattedDate = inputData.replace(/\D/g, '').substring(0, 8);

      if (formattedDate.length >= 6) {
        const formattedDateString = `${formattedDate.substring(0, 2)}/${formattedDate.substring(2, 4)}/${formattedDate.substring(4)}`;
        setData(formattedDateString);
      } else {
        setData(formattedDate);
      }
    }
  };

  const salvarDados = async () => {
    // Verifica se algum campo obrigatório está vazio
    if (!titulo || !descricao || !autor || !data || !classificacao) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos antes de salvar.');
      return;
    }

    const objetoASalvar = {
      titulo,
      descricao,
      autor,
      data,
      classe: classificacao, // Usa a classificação recebida
      imagem: p_imagem,
    };

    try {
      const response = await AsyncStorage.getItem("chave_de_identificacao");
      const previousData = response ? JSON.parse(response):[];

      const data = [...previousData, objetoASalvar]
      const jsonString = JSON.stringify(data);

      const chave = 'chave_de_identificacao';

      await AsyncStorage.setItem(chave, jsonString);
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: p_imagem }} style={styles.image} />
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Autor"
        value={autor}
        onChangeText={(text) => setAutor(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Data (dd/mm/aaaa)"
        value={data}
        onChangeText={(text) => formatarData(text)}
        style={styles.input}
      />
      <Text>{classificacao.class}</Text>
      <Text>
      {classificacao.resultados.map((item, index) => (
        <Text key={index} style={styles.textoClass}>
         {item.classe}: {(item.probabilidade * 100).toFixed(2)}%{'\n'}
        </Text>
      ))}
    </Text>
      <TouchableOpacity style={styles.button_save} onPress={salvarDados}>
        <Text>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
  button_save: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "green",
    width: "50%",
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 3
  },
  textoClass: {
    fontSize: 15,
  },
});

export default Save;
