import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system'; // For file handling
import { Audio } from 'expo-av'; // For handling audio in React Native
import Siri from '@/components/Siri';
import Div from '@/components/div';
import CustomBottomNavbar from '@/components/BottomNavbar';
import { ScrollView } from 'react-native-gesture-handler';

const audios = [
  require('../assets/rington.mp3'),
  require('../assets/1.mp3'),
  require('../assets/2.mp3'),
  require('../assets/3.mp3'),
  require('../assets/4.mp3'),
  require('../assets/5.mp3'),
  require('../assets/6.mp3'),
  require('../assets/7.mp3'),
];

const MemeGenerator = () => {
  const [heading, setHeading] = useState('Stay Positive!');
  const [imageUrl, setImageUrl] = useState('');
  const [audioIndex, setAudioIndex] = useState(0); // To track the current audio
  const [startY, setStartY] = useState(null);
  const audioRef = useRef(null); // To store the audio instance

  useEffect(() => {
    fetchNewContent(); // Fetch the first meme and play audio
    return () => {
      // Unload the audio when the component unmounts
      if (audioRef.current) {
        audioRef.current.unloadAsync();
      }
    };
  }, []);

  const fetchNewContent = async () => {
    const joke = await fetchRandomMeme();
    setHeading(joke);
    playNextAudio();
  };

  const playNextAudio = async () => {
    try {
      // Stop and unload the current audio
      if (audioRef.current) {
        await audioRef.current.stopAsync();
        await audioRef.current.unloadAsync();
      }

      // Get the next audio index and play it
      const nextAudio = audios[audioIndex % audios.length];
      const { sound } = await Audio.Sound.createAsync(nextAudio);
      audioRef.current = sound;
      await sound.playAsync(); // Play audio

      // Set the sound to loop indefinitely
      await sound.setIsLoopingAsync(true);
      
      // Update the index for the next swipe
      setAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleTouchStart = (event) => {
    setStartY(event.nativeEvent.pageY); // Store the Y position at the start of the touch
  };

  const handleTouchEnd = (event) => {
    const endY = event.nativeEvent.pageY;
    if (startY - endY > 50) {
      // If the swipe is upwards, fetch new content and switch audio
      fetchNewContent();
    }
  };

  const fetchRandomMeme = async () => {
    try {
      const response = await fetch('https://meme-api.com/gimme');
      const memeData = await response.json();
      const memeUrl = memeData.url;
      setImageUrl(memeUrl);
      return memeData.title; // Return meme title as heading
    } catch (error) {
      console.error('Error fetching meme:', error);
      return 'Stay Positive!';
    }
  };

  return (
    <>
    <View style={{backgroundColor:'white', height: '100%'}}>
    <Siri />
    <Div />
        <ScrollView>
      <View style={styles.container} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="contain" />
        <Text style={styles.heading}>{heading}</Text>
      </View>
        </ScrollView>
    </View>
    <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 90,
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MemeGenerator;
