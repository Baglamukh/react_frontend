import CustomBottomNavbar from '@/components/BottomNavbar';
import React from 'react';
import { Link } from '@react-navigation/native'; // Assuming you're using React Navigation
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const NumbersDetails = ({
  mulank,
  bhagyank,
  chunotiNumbers,
  kalashNumbers,
  janamBalKaalNumbers,
  personalYear,
  personalMonth,
  animal,
  tbhagyank,
  tmulank,
  pythagorean,
  chaldean,
  heartDesire,
  personality,
  namank,
  habitNumber,
  firstCharacter,
  firstVowel,
  summedNumber,
  value,
}) => {
    const navigation = useNavigation(); // For navigation
  return (
    <>
      <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row',  backgroundColor: 'white', padding: 16, borderRadius: 8, elevation: 2 }}>
            <Text style={{ padding: 8, marginLeft:4, fontWeight: 'bold', }}>Lu Shu Grid</Text>
            <Link to="/numberdetails" style={{ padding: 8, marginLeft:14, fontWeight: 'bold', }} onPress={() => navigation.navigate('numberdetails')}><Text>Number Details</Text></Link>
            <Link to="/ankdasa" style={{ padding: 8, marginLeft:14, fontWeight: 'bold' }} onPress={() => navigation.navigate('ankdasa')}><Text>Ank Dasa</Text></Link>

          </View>
        <View style={styles.gridContainer}>
          {[
            { title: 'Mulank', value: mulank, description: 'Discover the essence of your being.' },
            { title: 'Bhagyank', value: bhagyank, description: 'Uncover the essence of your personality.' },
            { title: 'Chunoti Numbers', value: chunotiNumbers, description: 'Understand the influence of your birth number.' },
            { title: 'Kalash Numbers', value: kalashNumbers, description: 'Explore the significance of your root number.' },
            { title: 'Janam Bal Kaal Numbers', value: janamBalKaalNumbers, description: 'Explore the significance of your root number.' },
            { title: 'Personal-Month', value: personalMonth, description: 'Explore the significance of your root number.' },
            { title: 'Personal-Year', value: personalYear, description: 'Explore the significance of your root number.' },
            { title: 'Child Gender', value: value, description: 'Explore the significance of your root number.' },
            { title: 'Transit B', value: tbhagyank, description: 'Explore the significance of your root number.' },
            { title: 'Transit M', value: tmulank, description: 'Explore the significance of your root number.' },
            { title: 'Phone No.', value: summedNumber, description: 'Explore the significance of your root number.' },
            { title: 'Pythagorean', value: pythagorean, description: 'Explore the significance of your root number.' },
            { title: 'Chaldean', value: chaldean, description: 'Explore the significance of your root number.' },
            { title: 'Heart Desire', value: heartDesire, description: 'Explore the significance of your root number.' },
            { title: 'Habit Number', value: habitNumber, description: 'Explore the significance of your root number.' },
            { title: 'Personality', value: personality, description: 'Explore the significance of your root number.' },
            { title: 'Namank', value: namank, description: 'Explore the significance of your root number.' },
            { title: 'First Character', value: firstCharacter, description: 'Explore the significance of your root number.' },
            { title: 'First Vowel', value: firstVowel, description: 'Explore the significance of your root number.' },
            { title: 'Animal', value: animal, description: 'Explore the significance of your root number.' },
          ].map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              {Array.isArray(item.value) ? (
                item.value.map((num, numIndex) => (
                  <Text style={styles.cardValue} key={numIndex}>{`${numIndex + 1}: ${num}`}</Text>
                ))
              ) : (
                <Text style={styles.cardValue}>{item.value}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingBottom: 200,
  },
  gridContainer: {
    padding: 16,
    width: '100%',
    flexDirection: 'row', // Ensure cards are arranged in a row
    flexWrap: 'wrap', // Allow wrapping to the next line
    paddingBottom: 90
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%', // Set card width to 100%
    padding: 16,
    marginVertical: 8, // Use vertical margin for better spacing
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#666', // Color for better readability
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333', // Color for better contrast
  },
});

export default NumbersDetails;
