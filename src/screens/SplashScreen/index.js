import { StatusBar } from "expo-status-bar";
import { Text, Logo, Container } from "../../componets";
export const SplashScreen = () => {
  return (
    <Container aling="center" justify="center">
      <Logo></Logo>
      <Text>DeepCoffe</Text>
      <StatusBar style="auto" />
    </Container>
  );
};
