import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export const ClickableCard = ({ title, date, author, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
        <Image source={{ uri: imageSource }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', 
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    elevation: 2,
    backgroundColor: '#1b2838',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1, 
    marginRight: 8, 
  },
  image: {
    width: 100, 
    height: 100, 
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    fontSize: 14,
    color: '#DEDEDE',
  },
  author: {
    fontSize: 14,
    color: '#DEDEDE',
  },
});
