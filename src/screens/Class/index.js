import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Container } from "../../componets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Class = () => {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = async () => {
    try {
      // Oculta o modal de confirmação
      setShowConfirmation(false);

      // Obtém os dados armazenados no AsyncStorage
      const storedData = await AsyncStorage.getItem("chave_de_identificacao");
      const parsedData = storedData ? JSON.parse(storedData) : [];

      // Filtra os dados, removendo o item atual
      const updatedData = parsedData.filter(item => item.id !== data.id);

      // Atualiza os dados no AsyncStorage
      await AsyncStorage.setItem("chave_de_identificacao", JSON.stringify(updatedData));

      // Navega de volta para a tela anterior
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  const handleShowConfirmation = () => {
    // Exibe o modal de confirmação
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    // Oculta o modal de confirmação
    setShowConfirmation(false);
  };

  return (
    <Container style={styles.container}>
      <ScrollView style={styles.card} contentContainerStyle={{ alignItems: 'center' }}>
        <Image source={{ uri: data.imagem}} style={styles.image} />
        <Text style={[styles.label, styles.title]}>Título:</Text>
        <Text style={styles.text}>{data.titulo}</Text>
        <Text style={[styles.label, styles.title]}>Descrição:</Text>
        <Text style={styles.text}>
          {isExpanded ? data.descricao : `${data.descricao.slice(0, 100)}...`}
        </Text>
        {data.descricao.length > 100 && (
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={{ color: '#AB170C' }}>
              {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.label, styles.title]}>Autor:</Text>
        <Text style={styles.text}>{data.autor}</Text>
        <Text style={[styles.label, styles.title]}>Data:</Text>
        <Text style={styles.text}>{data.data}</Text>
        <Text style={[styles.label, styles.title]}>Classe:</Text>
        <Text style={[styles.text, { marginBottom: '0%' }]}>
          {data.classe.resultados.map((item, index) => (
            <Text key={index} style={styles.textoClass}>
              {item.classe}: {(item.probabilidade * 100).toFixed(2)}%{'\n'}
            </Text>
          ))}
        </Text>

        {/* Botão de exclusão com confirmação */}
        <TouchableOpacity onPress={handleShowConfirmation} style={styles.deleteButton}>
          <Text style={{ color: 'white' }}>Deletar</Text>
        </TouchableOpacity>

        {/* Modal de confirmação */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showConfirmation}
          onRequestClose={handleCloseConfirmation}
>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja realmente deletar este item?</Text>
          <View style={styles.buttonContainer}>
          <Button title="Cancelar" style={styles.buttonCancel} onPress={handleCloseConfirmation} />
          <Button title="Deletar" onPress={handleDelete} color="red" />
          </View>
        </View>
      </View>
</Modal>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    alignContent: 'center',
    backgroundColor:'#E0E2E5'
  },
  card: {
    backgroundColor: '#1b2838',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: '#E7E7E8'
  },
  text: {
    fontSize: 16,
    color: '#BEBEBE'
  },
  textoClass: {
    color: '#BEBEBE'
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});
