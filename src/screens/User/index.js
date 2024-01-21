import React, { useEffect, useState } from "react";
import { Container } from "../../componets";
import noticias from "../../Provisorio/noticias.json";
import Card from "./card";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";

export const User = () => {
  const MAX_CARACTERES = 1000;

  const mostrarAlerta = (titulo, conteudo) => {
    Alert.alert(
      titulo,
      conteudo,
      [
        {
          text: "Sair",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const renderizarConteudo = (titulo, conteudo) => {
    if (conteudo.length > MAX_CARACTERES) {
      return (
        <>
          <Text>{conteudo.substring(0, MAX_CARACTERES)}</Text>
          <BotaoPersonalizado onPress={() => mostrarAlerta(titulo, conteudo)} />
        </>
      );
    }
    return <Text>{conteudo}</Text>;
  };

  const BotaoPersonalizado = ({ onPress }) => (
    <TouchableOpacity style={styles.botaoPersonalizado} onPress={onPress}>
      <Text style={styles.textoBotao}>Ler Mais</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <FlatList
        data={noticias}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>{item.titulo}</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>Autor: {item.autor}</Text>
            <View style={styles.centeredContent}>
              {renderizarConteudo(item.titulo, item.conteudo)}
            </View>
          </Card>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  botaoPersonalizado: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 10,
    width: "50%",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredContent: {
    alignItems: 'center',
  },
});
