import React, { useState } from "react";
import { AppRegistry } from 'react-native';
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text } from 'react-native';

import Routes from "./src/routes/index";

import {
  useFonts,
  SourceSansPro_400Regular,
  SourceSansPro_700Bold,
  SourceSansPro_600SemiBold,
  SourceSansPro_900Black,
} from "@expo-google-fonts/source-sans-pro";

import { theme } from "./src/styles";

export default function App() {
  let [fontsLoaded] = useFonts({
    SourceSansPro_400Regular,
    SourceSansPro_700Bold,
    SourceSansPro_600SemiBold,
    SourceSansPro_900Black,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
}

// Registre o componente principal do seu aplicativo
AppRegistry.registerComponent("DeepCoffe", () => App);
