import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const TelaDeCarregamento = () => {
  const lottieRef = useRef(null);

  useEffect(() => {
    // Iniciar a animação quando o componente for montado
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        style={styles.lottie}
        source={require('./Animation - 1699386365283.json')} // Substitua pelo caminho do seu arquivo JSON
        loop={true}
      />
      <Text style={styles.texto}>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 400,
    height: 400,
  },
  texto: {
    fontSize: 20,
    marginTop: 5,
  },
});

export default TelaDeCarregamento;
