import CustomBottomNavbar from '@/components/BottomNavbar';
import Div from '@/components/div';
import Siri from '@/components/Siri';
import { Audio } from 'expo-av'; // For handling audio in React Native
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';

// Import images dynamically
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const audios = [
    require('../assets/1.mp3'),
    require('../assets/2.mp3'),
    require('../assets/3.mp3'),
    require('../assets/4.mp3'),
    require('../assets/5.mp3'),
    require('../assets/6.mp3'),
    require('../assets/7.mp3'),
    // Add more audio files if needed
];

const Quotes = () => {
    const [imageUrl, setImageUrl] = useState(images[0]);
    const [heading, setHeading] = useState('Stay Positive!');
    const [sound, setSound] = useState(); // State to hold sound instance
    const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing

    useEffect(() => {
        fetchNewContent();
        return () => {
            // Cleanup sound instance on component unmount
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const fetchNewContent = async () => {
        const randomImageNumber = Math.floor(Math.random() * images.length);
        const newImageUrl = images[randomImageNumber];
        setImageUrl(newImageUrl);

        const randomFact = await fetchRandomFact();
        setHeading(randomFact);

        if (!isPlaying) {
            const newAudioUrl = getRandomAudioUrl();
            await playAudio(newAudioUrl);
        }
    };

    const playAudio = async (url) => {
        try {
            const { sound } = await Audio.Sound.createAsync(url);
            setSound(sound);
            setIsPlaying(true);
            await sound.playAsync();

            // Set up an event listener for when the audio finishes
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    setIsPlaying(false);
                    fetchNewContent(); // Fetch new content when the audio finishes
                }
            });
        } catch (error) {
            console.error('Error playing audio:', error);
            Alert.alert('Error', 'Failed to play audio');
        }
    };

    const getRandomAudioUrl = () => {
        const randomAudioNumber = Math.floor(Math.random() * audios.length);
        return audios[randomAudioNumber];
    };

    const fetchRandomFact = async () => {
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const factData = await response.json();
            return factData.slip.advice; // Advice ko return karo
        } catch (error) {
            console.error('Error fetching random fact:', error.message);
            return 'Stay Positive!';
        }
    };

    const handleSwipe = async () => {
        if (sound) {
            await sound.unloadAsync(); // Stop the current audio
            setIsPlaying(false); // Reset playing state
        }
        fetchNewContent(); // Fetch new content on swipe
    };

    return (
        <>
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <Siri />
                <Div />
                <TouchableOpacity
                    style={styles.container}
                    onPress={handleSwipe} // Trigger new content on swipe
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
                </TouchableOpacity>
            </View>
            <CustomBottomNavbar />
        </>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
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

export default Quotes;
