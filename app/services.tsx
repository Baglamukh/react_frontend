import React, { useState } from 'react';
import Div from "@/components/div";
import Siri from "@/components/Siri";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from "@/components/BottomNavbar";

export default function Services() {
  const navigation = useNavigation();
  const [toolbarContent, setToolbarContent] = useState('');

  const categories = [
    { name: 'Panditji', route: 'Panditji', icon: '🔥' },
    { name: 'Travelling', route: 'Travelling', icon: '✈️' },
    { name: 'Vastu', route: 'vastuservices', icon: '🏠' },
    { name: 'python', route: 'payn', icon: '🏠' },
  ];

  const handleClick = (name) => {
    setToolbarContent(name);
    let message = '';

    if (name === 'Panditji') {
      message = 'Panditji function is coming soon!';
    } else if (name === 'Travelling') {
      message = 'Travelling function is coming soon!';
    }

    // For speech synthesis (this won't work in React Native; consider using a library)
    Alert.alert("Speech", message); // Replace this with a proper speech synthesis in React Native
  };

  return (
    <>
      <View style={styles.container}>
        <Siri />
        <Div />
        <View style={styles.smallcontainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.grid}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => {
                    handleClick(category.name);
                    navigation.navigate(category.route);
                  }}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.icon}>{category.icon}</Text>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <BottomNavbar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 70,
  },
  smallcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
