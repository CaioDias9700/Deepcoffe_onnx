// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
  botaoCapturar: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  botaoCapturarInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  botaoCapturarRedondo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  visualizarFotoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#E0E2E5'
  },
  fotoCapturada: {
    width: "80%",
    height: "80%",
  },
  botaoContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  botaoConfirmar: {
    backgroundColor: "green",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginRight: 10
    
  },
  botaoRetake: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  botaoTexto: {
    color: "white",
    fontWeight: "bold",
  },
  uploadButton:{
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  uploadButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50, // Para torná-lo circular, use metade do valor da largura e altura
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30, // Ajuste a posição vertical conforme necessário
    right: 30, // Ajuste a posição horizontal conforme necessário
  },

  uploadButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  visualizar_grupo_botoes:{
    flexDirection: "row",
  }
});

export default styles;
