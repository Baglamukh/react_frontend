import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tarotCardsData from '../assets/Data/tarotcard.json';
import CustomBottomNavbar from '@/components/BottomNavbar';
import Siri from '@/components/Siri';

const Todaytaro = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigation = useNavigation(); // Initialize useNavigation

  useEffect(() => {
    // Select three random cards from the tarotCardsData
    const randomCardIndices = [];
    while (randomCardIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * tarotCardsData.length);
      if (!randomCardIndices.includes(randomIndex)) {
        randomCardIndices.push(randomIndex);
      }
    }
    const selectedCards = randomCardIndices.map(index => tarotCardsData[index]);
    setCards(selectedCards);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setTimeout(() => {
      navigation.navigate('today'); // Navigate to "/today" after selecting a card
    }, 6000);
  };

  // Find the image based on the card's image property
  const getImagePath = (imageName) => {
    const baseUrl = `../assets/Tarot/${imageName}`;
    return `${baseUrl}`;
};

  return (
    <>
    <Siri />
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardClick(card)}
            style={styles.card}
          >
            <Text style={styles.cardImage}>🎴</Text>
          </TouchableOpacity>
        ))}
        
        {/* Display the selected card's name and description */}
        {selectedCard && (
          <View style={styles.selectedCard}>
            <Text style={styles.selectedCardTitle}>How will feel Today:</Text>
            <Text style={styles.selectedCardDescription}>{selectedCard.description}</Text>
          </View>
        )}
      </ScrollView>
    </View>
    <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    flexGrow: 1,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    width: '30%', // Adjust width as needed
    marginBottom: 16,
  },
  cardImage: {
    fontSize: 90,
    height: 120, // Set a fixed height for the cards
  },
  selectedCard: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  selectedCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedCardDescription: {
    color: 'white',
  },
});

export default Todaytaro;
