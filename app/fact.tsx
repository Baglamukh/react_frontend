import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Siri from '../components/Siri';
import { Audio } from 'expo-av'; // For handling audio in React Native
import Div from '@/components/div';
import CustomBottomNavbar from '@/components/BottomNavbar';

// Import images dynamically
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

// Import audio files directly using require
const audios = [
    require('../assets/1.mp3'),
    require('../assets/2.mp3'),
    require('../assets/3.mp3'),
    require('../assets/4.mp3'),
    require('../assets/5.mp3'),
    require('../assets/6.mp3'),
    require('../assets/7.mp3'),
];

const Fact = () => {
  const [imageUrl, setImageUrl] = useState(images[0]); // Default image
  const [heading, setHeading] = useState('Stay Positive!'); // Default text
  const [startY, setStartY] = useState(null);
  const audioRef = useRef(null); // Reference to the audio
  const [isSwiped, setIsSwiped] = useState(false); // Flag to check if swiped
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0); // Index for the currently playing audio

  const apikey = '5PNulO7NmC7Ps6UCu9ZI1w==jGNZ390ijOpreAwg';
  const url = 'https://api.api-ninjas.com/v1/facts';

  // Fetch new content on mount
  useEffect(() => {
    fetchNewContent();
    playAudio(); // Start playing audio when the component mounts
  }, []);

  // Update the playAudio function to handle audio objects directly
  const playAudio = async () => {
    try {
      // If there is already an audio playing, stop it
      if (audioRef.current) {
        await audioRef.current.stopAsync(); // Stop the current audio
        await audioRef.current.unloadAsync(); // Unload the sound
      }

      // Load the new audio file
      const { sound } = await Audio.Sound.createAsync(audios[currentAudioIndex]);
      audioRef.current = sound; // Set reference to the current audio
      await sound.playAsync(); // Play new audio
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Call playAudio with the selected audio directly
  const fetchNewContent = async () => {
    // Fetch a new random image and fact
    const randomImageNumber = Math.floor(Math.random() * images.length);
    const newImageUrl = images[randomImageNumber];
    setImageUrl(newImageUrl);

    const randomFact = await fetchRandomFact();
    setHeading(randomFact);

    // Reset swipe flag after fetching new content
    setIsSwiped(false);
  };

  // Fetch random fact from the API and translate it
  const fetchRandomFact = async () => {
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: { 'x-api-key': apikey },
      });
      let data = await response.json();
      let factText = data[0].fact;

      let translatedFact = await translateText(factText, 'hi');
      return translatedFact;
    } catch (error) {
      console.error('Error fetching or translating fact:', error);
      return 'Stay Positive!';
    }
  };

  // Translate the fetched fact to Hindi using Google Translate API
  const translateText = async (text, targetLang) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURI(text)}`
      );
      const result = await response.json();
      return result[0][0][0];
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  // Handle swipe gesture to fetch new content and play new audio
  const handleSwipe = (event) => {
    const { locationY } = event.nativeEvent;
    if (startY - locationY > 50) { // Detect swipe up
      setIsSwiped(true); // Set swipe flag
      setCurrentAudioIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % audios.length; // Move to the next audio
        playAudio(newIndex); // Play the next audio
        return newIndex;
      });
      fetchNewContent(); // Fetch new content if swipe up detected
    }
  };

  return (
    <>
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <Siri />
        <Div />
        <View
          style={styles.container}
          onTouchStart={(e) => setStartY(e.nativeEvent.locationY)}
          onTouchEnd={handleSwipe}
        >
          {imageUrl && (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={imageUrl}
                resizeMode="cover"
              />
              <Text style={styles.heading}>{heading}</Text>
            </View>
          )}
        </View>
      </View>
      <CustomBottomNavbar />
    </>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative', // Ensures the heading text is positioned relative to the image
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heading: {
    position: 'absolute', // Allows the text to overlay the image
    top: '50%',
    left: '10%',
    transform: [{ translateX: -50 }, { translateY: -50 }], // Centers the text over the image
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // White text color for better contrast
    textAlign: 'center',
    paddingHorizontal: 20, // Some padding to avoid text touching the edges
  },
});

export default Fact;
