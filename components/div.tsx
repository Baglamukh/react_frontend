import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { emoji: '😄', label: 'Joke', route: 'joke' },
  { emoji: '🤫', label: 'Meme', route: 'meme' },
  { emoji: '🤔', label: 'Fact', route: 'fact' },
  { emoji: '💪', label: 'Motivation', route: 'quotes' },
  { emoji: '🕉️', label: 'Om', route: 'mantra' },
  { emoji: '🙏', label: 'Bhajan', route: 'bhajan' },
  { emoji: '📚', label: 'Story', route: 'story' },
];

export default function Div() {
  const navigation = useNavigation();

  return (
    <>
    <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(category.route)}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{category.emoji}</Text>
          </View>
          <Text style={styles.label}>{category.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70, // Adjust as needed
    marginHorizontal: 0,
  },
  emojiContainer: {
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 30, // Adjust size as needed
  },
  label: {
    marginTop: -2,
    fontSize: 10, // Adjust size as needed
    color: '#666', // Adjust text color
  },
});

