import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomBottomNavbar from '@/components/BottomNavbar';
import Siri from '@/components/Siri';

const colorRecommendations = {
  "Sunday": {
    "Good colour": ["white", "red", "yellow"],
    "Balance colour": ["green"],
    "Bad colour": ["pink", "white", "black", "blue", "brown", "mix colour"]
  },
  "Monday": {
    "Good colour": ["red", "orange", "green"],
    "Balance colour": ["black", "blue", "pink", "yellow", "red"],
    "Bad colour": ["brown", "mix colour"]
  },
  "Tuesday": {
    "Good colour": ["red", "orange", "white"],
    "Balance colour": ["pink", "black", "blue"],
    "Bad colour": ["green", "brown"]
  },
  "Wednesday": {
    "Good colour": ["red", "orange", "pink", "white"],
    "Balance colour": ["red", "yellow", "black", "blue"],
    "Bad colour": ["white"]
  },
  "Thursday": {
    "Good colour": ["red", "orange", "white"],
    "Balance colour": ["black", "blue", "brown"],
    "Bad colour": ["green", "pink", "white"]
  },
  "Friday": {
    "Good colour": ["green", "black", "blue", "brown", "mix colour"],
    "Balance colour": ["yellow"],
    "Bad colour": ["red", "orange", "white"]
  },
  "Saturday": {
    "Good colour": ["green", "pink", "white", "brown"],
    "Balance colour": ["yellow"],
    "Bad colour": ["red", "orange", "white", "red"]
  },
};

const Color = () => {
  const [colorInput, setColorInput] = useState('');
  const [result, setResult] = useState('');
  const navigation = useNavigation(); // For navigation

  const handleInputChange = (text) => {
    setColorInput(text.toLowerCase());
  };

  const checkColor = () => {
    const today = new Date();
    const dayOfWeek = today.toLocaleString('en-US', { weekday: 'long' });
    const colors = colorInput.split(/[ ,]+/).map(color => color.toLowerCase().trim());

    const dayColors = colorRecommendations[dayOfWeek];
    let goodCount = 0;
    let balanceCount = 0;
    let badCount = 0;

    colors.forEach(color => {
      if (dayColors["Good colour"].includes(color)) {
        goodCount++;
      } else if (dayColors["Balance colour"].includes(color)) {
        balanceCount++;
      } else if (dayColors["Bad colour"].includes(color)) {
        badCount++;
      }
    });

    if (goodCount > 0 && badCount === 0 && balanceCount === 0) {
      setResult('Good');
    } else if (badCount > 0 && goodCount === 0 && balanceCount === 0) {
      setResult('Bad');
    } else if (badCount === 0 && goodCount === 0 && balanceCount === 0) {
        setResult('Balance');
    } else if (balanceCount > 0 && goodCount === 0 && badCount === 0) {
      setResult('Balance');
    } else if (goodCount > 0 && badCount > 0 && balanceCount === 0) {
      setResult('Good');
    } else if (goodCount > 0 && (balanceCount > 0 || badCount > 0)) {
      setResult('Balance');
    } else {
      setResult('No match found');
    }

    // Delay navigation by 3 seconds (3000 ms)
    setTimeout(() => {
      navigation.navigate('todayprediction');
    }, 3000);
  };

  return (
    <>
    <Siri />
    <View style={styles.container}>
      <Text style={styles.title}>What color are you wearing today?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter color"
          value={colorInput}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={checkColor} style={styles.button}>
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.result}>Today: {result}</Text>
    </View>
    <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default Color;
