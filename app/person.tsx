import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech'; // For text-to-speech
import aboutData from '@/assets/Data/About.json'; // Local JSON file
import Navbar from '@/components/HelloWave';
import CustomBottomNavbar from '@/components/BottomNavbar';

export default function Person () {
  const route = useRoute();
  const { id } = route.params; // Get the person ID from the route params
  const [person, setPerson] = useState(null); // State to hold the person details

  useEffect(() => {
    // Find the person by ID from the local data
    const personData = aboutData.find(item => item.id === parseInt(id));
    setPerson(personData);
  }, [id]);

  const handleClick = async () => {
    if (!person || !person.name || !person.description) return;

    // Translate name and description to Hindi
    const hindiName = await translateText(person.name, 'en', 'hi');
    const hindiDescription = await translateText(person.description, 'en', 'hi');

    // Construct messages to speak
    let messageEnglish = `${person.name}. ${person.description}`;
    let messageHindi = `${hindiName}. ${hindiDescription}`;

    // Speak in Hindi first
    Speech.speak(messageHindi, { language: 'hi', pitch: 0.8, rate: 0.8 });

    // After a short delay, speak in English
    setTimeout(() => {
      Speech.speak(messageEnglish, { language: 'en', pitch: 0.8, rate: 0.8 });
    }, 3000); // Adjust delay as needed
  };

  const translateText = async (text, sourceLang, targetLang) => {
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(text)}`);
      const result = await response.json();

      if (result && result[0] && result[0][0] && result[0][0][0]) {
        return result[0][0][0];
      } else {
        console.error('Translation error:', result);
        return text;
      }
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  if (!person) {
    return <Text>Person not found</Text>;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: person.image }} style={styles.image}  />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.description}>{person.description}</Text>
        </View>
      </ScrollView>
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 10,
    backgroundColor: 'white',
    paddingBottom: 70,
  },
  imageContainer: {
    paddingTop: -100,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

