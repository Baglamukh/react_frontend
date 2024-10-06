import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Siri from '@/components/Siri';
import CustomBottomNavbar from '@/components/BottomNavbar';

const Todayprediction = () => {
  const navigation = useNavigation();
  const [selectedResult, setSelectedResult] = useState('');

  const buttonNames = ["om", "13", "10", "7", "11", "6", "1", "12", "5", "8", "15", "2", "14", "3", "4", "9"];
  const buttonResults = [
    'Nothing', 
    'It will pass with worries', 
    'It will be beneficial', 
    'The time will pass with worries', 
    'This day will pass with happiness', 
    'This day will pass through worries', 
    'You will benefit by meeting a saint', 
    'The day will pass with worries', 
    'This day will pass happily', 
    'This is worrisome', 
    'This day will pass with happiness and gain', 
    'Many ideas will come to your mind, the day will as well', 
    'This day will pass with pleasure', 
    'This day will pass with worries', 
    'The company of saints will be beneficial', 
    'Time will pass with happiness'
  ];

  const displayResult = (result) => {
    setSelectedResult(result);
    setTimeout(() => {
      navigation.navigate('todaytaro'); // Adjust the destination screen name as needed
    }, 3000);
  };

  return (
    <>
    <Siri />
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.note}>नोट:- आंख बंद करके अपने इष्ट देव को याद करके किसी एक पर क्लिक करें।</Text>
        <View style={styles.grid}>
          {buttonNames.map((name, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => displayResult(buttonResults[index])}
            >
              <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.result}>How will pass Today: {selectedResult}</Text>
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
  content: {
    padding: 16,
    alignItems: 'center',
  },
  note: {
    marginBottom: 16,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Todayprediction;
