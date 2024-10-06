// PredictionComponent.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PredictionComponent = ({ predictionHtml }) => {
  // Convert the prediction HTML to plain text or extract specific parts if necessary
  const predictionText = predictionHtml; // Adjust this as needed to extract text

  return (
    predictionText && (
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.predictionText}>{predictionText}</Text>
        </ScrollView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  predictionText: {
    fontSize: 16,
  },
});

export default PredictionComponent;
