import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Modal } from 'react-native';
import tarotCardsData from '@/assets/Data/tarotcard.json'; // Your JSON file with card data
import RNFS from 'react-native-fs';
import Siri from '@/components/Siri';
import CustomBottomNavbar from '@/components/BottomNavbar';
import { BorderlessButton } from 'react-native-gesture-handler';

const Tarot = () => {
  const [cards, setCards] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Initialize cards with data from JSON
    setCards(tarotCardsData);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const randomCardIndices = [];
    while (randomCardIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * tarotCardsData.length);
      if (!randomCardIndices.includes(randomIndex)) {
        randomCardIndices.push(randomIndex);
      }
    }
    const selectedCards = randomCardIndices.map(index => tarotCardsData[index]);
    setCards(selectedCards);
    setIsFormSubmitted(true);
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card); 
  };

  const getImagePath = (imageName) => {
    const baseUrl = `../assets/Tarot/${imageName}`;
    return `${baseUrl}`;
};

return (
  <>
  <Siri />
    <View style={styles.container}>
      {isFormSubmitted && (
          <View style={styles.headerButton}>
          <TouchableOpacity onPress={toggleFormVisibility} style={styles.formToggleButton}>
            <Text style={styles.formToggleButtonText}>
              {isFormVisible ? 'Hide Form' : 'Show Form'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isFormVisible && (
          <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter your question"
            style={styles.input}
            onSubmitEditing={handleFormSubmit}
            />
          <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isFormVisible && isFormSubmitted && (
          <ScrollView contentContainerStyle={styles.cardGrid}>
          {cards.map((card, index) => (
              <TouchableOpacity key={index} onPress={() => handleCardClick(card)} style={styles.cardContainer}>
              <Text style={styles.cardImage}>🎴</Text>
              <Text style={styles.cardName}>{card.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {selectedCard && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedCard}
          onRequestClose={() => setSelectedCard(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCard.name}</Text>
              <Text style={styles.modalText}><Text style={styles.modalText12}>Description:-</Text> {selectedCard.description}</Text>
              <Text style={styles.modalText}><Text style={styles.modalText12}>Positive Event:-</Text> {selectedCard.positiveEvent}</Text>
              <Text style={styles.modalText}><Text style={styles.modalText12}>Negative Event:-</Text> {selectedCard.negativeEvent}</Text>
              <TouchableOpacity onPress={() => setSelectedCard(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
    <CustomBottomNavbar />
    </>
  );
};

export default Tarot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  formToggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  modalText12: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  formToggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardContainer: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  cardImage: {
    fontSize: 90,
    fontWeight: 'bold',
    resizeMode: 'cover',
  },
  cardName: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
