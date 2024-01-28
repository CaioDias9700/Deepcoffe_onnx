import React, { Component } from 'react';
import { ScrollView, View, Text, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import tratamentos from "../../Provisorio/tratamentos.json";

export class Treatment extends Component {
  render() {
    const { nomeDaDoenca = "Nome da Doença 1" } = this.props;
    const doenca = tratamentos.find(item => item.nomeDoenca === nomeDaDoenca);

    if (!doenca) {
      return (
        <View style={[styles.container]}>
          <Text style={styles.centerText}>Doença não encontrada.</Text>
        </View>
      );
    }
    const imagemBase64 = doenca.imagemReferencia;
    const imagemUri = `data:image/png;base64,${imagemBase64}`;
    return (
        <ScrollView style={[styles.ScrollView]}>
          <Text style={[styles.centerText, styles.headerText]}>{doenca.nomeDoenca}</Text>
          <Text style={styles.centerText}>{doenca.descricao}</Text>
          <FlatList
            style={[styles.flatListContainer,{flex:1}]}
            data={doenca.tratamentos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.tableRow,{ backgroundColor: 'white' }]}>
                <Text style={styles.tableCell}>{item.nomeTratamento}</Text>
                <Text style={styles.tableCell}>{item.descricaoTratamento}</Text>
                <Text style={styles.tableCell}>{item.descricaoTratamento}</Text>
              </View>
            )}
          />
          <Text style={[styles.centerText, styles.treatmentText]}>Tratamentos:</Text>
          <Image source={{ uri: imagemUri }} style={styles.image} />
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  ScrollView:{
    backgroundColor: "#E0E2E5",
  },
  centerText: {
    textAlign: 'center',
  },
  TextInfo:{
    alignItems: "center",
    width: "90%"
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  treatmentText: {
    marginTop: 20,
    marginBottom: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableRow: {
    borderWidth:1,
    borderRadius:0, 
    flexDirection: 'row',
    borderColor: '#E0E2E5',
    paddingVertical: 21,
    
  },
  tableCell: {
    borderWidth:0,
    flex: 1,
    textAlign: 'center',
  },
  flatListContainer: {
    marginTop: 10,
    marginLeft:10,
    marginRight: 10
  },
  image:{
    width: 400, 
    height: 200, 
    alignSelf: 'center',
    marginTop: "2%",
    marginBottom: 25
  }
});
