import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Siri from '../components/Siri';
import Div from '@/components/div';
import CustomBottomNavbar from '@/components/BottomNavbar';

const audios = [
    require('../assets/1.mp3'),
    require('../assets/2.mp3'),
    require('../assets/3.mp3'),
    require('../assets/4.mp3'),
    require('../assets/5.mp3'),
    require('../assets/6.mp3'),
    require('../assets/7.mp3'),
];

const Joke = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [heading, setHeading] = useState('Stay Positive!');
    const [startY, setStartY] = useState(null);
    const audioRef = useRef(null);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    
    useEffect(() => {
        fetchNewContent();
    }, []);

    const fetchNewContent = async () => {
        const joke = await fetchRandomJoke();
        setHeading(joke);
        const randomImageUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s`;
        setImageUrl(randomImageUrl);
        playAudio();
    };

    const playAudio = async () => {
        try {
            if (audioRef.current) {
                await audioRef.current.stopAsync();
                await audioRef.current.unloadAsync();
            }

            const { sound } = await Audio.Sound.createAsync(audios[currentAudioIndex]);
            audioRef.current = sound;
            await sound.playAsync();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const fetchRandomJoke = async () => {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
            const jokeData = await response.json();
            return `${jokeData.setup} - ${jokeData.punchline}`;
        } catch (error) {
            console.error('Error fetching random joke:', error);
            return 'Stay Positive!';
        }
    };

    const handleTouchStart = (event) => {
        setStartY(event.nativeEvent.pageY);
    };

    const handleTouchEnd = async (event) => {
        const endY = event.nativeEvent.pageY;
        if (startY - endY > 50) { // Swipe down gesture
            await fetchNewContent(); // Fetch new content
            setCurrentAudioIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % audios.length; // Move to the next audio
                playAudio(newIndex); // Play the next audio
                return newIndex;
            });
        }
    };

    return (
        <>
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <Siri />
                <Div />
                <TouchableOpacity
                    style={styles.container}
                    onPressIn={handleTouchStart}
                    onPressOut={handleTouchEnd}
                >
                    {imageUrl && (
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: imageUrl }}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    heading: {
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default Joke;
