import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, Animated } from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const Voicechat = () => {
    const [recording, setRecording] = useState();
    const [subtitle, setSubtitle] = useState('');
    const [circleScale] = useState(new Animated.Value(1));
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const startAnimation = () => {
            circleScale.setValue(1);
            Animated.timing(circleScale, {
                toValue: 1.2,
                duration: 800,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(circleScale, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }).start(startAnimation);
            });
        };

        startAnimation();
    }, [circleScale]);

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            const { status } = await Audio.getPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Microphone access is required to record audio.');
                return;
            }

            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            // Start speech synthesis
            startSpeech();
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = async () => {
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording saved at', uri);
            setSubtitle('Recording saved.');
            await sendMessage(); // Send the recorded input to the chatbot
        }
    };

    const sendMessage = async () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: "user", timestamp: new Date().toLocaleTimeString() };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            const response = await fetch('http://127.0.0.1:5000/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const botMessage = { text: data.response, sender: "bot", timestamp: new Date().toLocaleTimeString() };
            setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);

            setInput(""); // Clear input
            setSubtitle(data.response); // Show response in subtitle
            handleSpeech(data.response); // Speak the bot response
        }
    };

    const handleSpeech = (text) => {
        Speech.speak(text, {
            onDone: () => setSubtitle(''),
            onStopped: () => setSubtitle(''),
        });
        setSubtitle(text);
    };

    const startSpeech = () => {
        const speechText = 'Hello! Please tell me what you want.'; // Example prompt
        handleSpeech(speechText);
    };

    const stopSpeech = () => {
        Speech.stop();
    };

    return (
        <>
            <View style={styles.container}>
                <Animated.View style={[styles.circle, { transform: [{ scale: circleScale }] }]}>
                    <Image
                        source={{ uri: 'https://st2.depositphotos.com/2024219/47854/i/450/depositphotos_478548142-stock-photo-young-caucasian-woman-isolated-yellow.jpg' }}
                        style={styles.image}
                    />
                </Animated.View>
                {subtitle ? (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                ) : null}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={startRecording} style={styles.button}>
                    <Text style={styles.buttonText}>🔊</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('chat')} style={styles.cutbutton}>
                    <Text style={styles.buttoncutText}>📞</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={stopRecording} style={styles.button}>
                    <Text style={styles.buttonText}>🛑</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1f2937',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    subtitle: {
        color: '#ffffff',
        marginTop: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 0,
        width: '100%',
        paddingVertical: 25,
        justifyContent: 'space-around',
    },
    button: {
        padding: 10,
        width: 60,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 50,
    },
    cutbutton: {
        padding: 10,
        width: 60,
        height: 60,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 50,
    },
    buttonText: {
        color: '#ffffff',
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttoncutText: {
        color: 'black',
        justifyContent: 'center',
        transform: [{ rotate: '135deg' }],
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Voicechat;
