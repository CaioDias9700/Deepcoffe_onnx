import React, { useEffect, useState } from "react";
import { Container } from "../../componets";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClickableCard } from "../../componets/molecules/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const handleCardClick = (item) => {
    navigation.navigate("Class", { data: item });
  };

  const fetchData = async () => {
    const response = await AsyncStorage.getItem("chave_de_identificacao");
    const storedData = response ? JSON.parse(response) : [];
    setData(storedData);
  };

  const handleClearData = async () => {
    try {
      // Limpa os dados armazenados no AsyncStorage
      await AsyncStorage.removeItem("chave_de_identificacao");
      // Atualiza o estado para refletir a remoção dos dados
      setData([]);
    } catch (error) {
      console.error("Erro ao limpar os dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ClickableCard
            title={item.titulo}
            onPress={() => handleCardClick(item)}
            date={item.data}
            author={item.autor}
            imageSource={item.imagem}
          />
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E2E5",
  },
});
