import CustomBottomNavbar from '@/components/BottomNavbar';
import Siri from '@/components/Siri';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const Custom = () => {
  const [predictionType, setPredictionType] = useState('');
  const [name, setName] = useState('');
  const [sutra, setSutra] = useState('');

  // Google Apps Script URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyhxomxMDmt6kwaoc1bXrfr_dnB0RJaVAOZ-uwcupzfQF1NBlSpwMtkhfq7WAfcwuzD7g/exec';

  // Form submission handler
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('Prediction-Type', predictionType);
    formData.append('Name', name);
    formData.append('Sutra', sutra);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        Alert.alert('Success', 'Your submission was successful. Thank you!');
        // Optionally reset state or navigation
      } else {
        Alert.alert('Error', 'Submission failed, please try again.');
      }
    } catch (error) {
      console.error('Error!', error.message);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      <Siri />

        <View style={styles.formContainer}>
          {/* Prediction Type Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prediction Type</Text>
            <TextInput
              style={styles.input}
              placeholder="Select prediction type"
              onFocus={() => {
                // Logic to show a modal or picker for selection
              }}
              value={predictionType}
              onChangeText={setPredictionType}
              required
            />
          </View>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              required
            />
          </View>

          {/* Prediction Textarea */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prediction</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Prediction"
              value={sutra}
              onChangeText={setSutra}
              required
            />
          </View>

          {/* Submit Button */}
          <Button title="Next" onPress={handleSubmit} color="black" />
        </View>
    </ScrollView>
      <CustomBottomNavbar />
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  predictionText: {
    backgroundColor: '#E5E5E5',
    padding: 8,
    borderRadius: 8,
  },
  customText: {
    backgroundColor: '#E5E5E5',
    padding: 8,
    borderRadius: 8,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    minHeight: 80,
  },
});

export default Custom;
