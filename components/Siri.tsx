import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import { Video } from 'expo-av'; // Use expo-av for video
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

export default function Siri() {
  const animations = useRef(Array(5).fill().map(() => new Animated.Value(1))).current;

  useEffect(() => {
    const pulseAnimation = () => {
      const animationsArray = animations.map((animation) => {
        return Animated.sequence([
          Animated.timing(animation, {
            toValue: 1.5,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.loop(Animated.parallel(animationsArray)).start();
    };

    pulseAnimation();
  }, [animations]);

  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#9333EA']} // Set your gradient colors here
        style={styles.gradient}
      >
        <Video
          style={styles.video}
          shouldPlay
          isMuted
          isLooping
        />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Siri</Text>
          <Text style={styles.subText}>Siri Is Coming Soon Next Year</Text>
        </View>
        <View style={styles.waveform}>
          <View style={styles.boxContainer}>
            {animations.map((animation, index) => (
              <Animated.View key={index} style={[styles.box, { transform: [{ scale: animation }] }]} />
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden', // Ensures the gradient background does not exceed rounded corners
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    padding: 10,
  },
  video: {
    width: 100,
    height: 100,
    display: 'none', // Hide video unless needed
  },
  textContainer: {
    flexDirection: 'column', // Stack text vertically
    marginRight: 'auto', // Align text to the left
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, // Space between heading and subtext
  },
  subText: {
    color: 'white',
    fontSize: 14,
  },
  waveform: {
    marginLeft: 'auto',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 5,
    marginLeft: 3,
    height: 22,
    backgroundColor: 'white', // Set color for waveform boxes
    borderRadius: 3, // Rounded corners
  },
});
