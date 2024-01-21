import React, { Component } from 'react';
import { ScrollView, View, Text, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import tratamentos from "../../Provisorio/tratamentos.json";

export class Treatment extends Component {
  render() {
    const { nomeDaDoenca = "Nome da Doença 1" } = this.props;
    const doenca = tratamentos.find(item => item.nomeDoenca === nomeDaDoenca);

    if (!doenca) {
      return (
        <View style={styles.container}>
          <Text style={styles.centerText}>Doença não encontrada.</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.centerText, styles.headerText]}>{doenca.nomeDoenca}</Text>
        <Text style={styles.centerText}>{doenca.descricao}</Text>
        <Text style={[styles.centerText, styles.treatmentText]}>Tratamentos:</Text>
        <SafeAreaView style={{flex: 1}}>
        <FlatList
          style={styles.flatListContainer}
          data={doenca.tratamentos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nomeTratamento}</Text>
              <Text style={styles.tableCell}>{item.descricaoTratamento}</Text>
              <Text style={styles.tableCell}>{item.descricaoTratamento}</Text>
            </View>
          )}
        />
        </SafeAreaView>
        <Image source={{ uri: doenca.imagemReferencia }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  treatmentText: {
    marginTop: 10,
    marginBottom: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 21,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  flatListContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5, // Optional: If you want rounded corners
    marginTop: 10,  // Optional: Adjust the spacing
  },
});
