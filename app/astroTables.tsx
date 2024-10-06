import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function AstroTables({ result }) {
  const [activeTab, setActiveTab] = useState('index');
  const navigation = useNavigation();

  const handlePrediction = () => {
    navigateTo('Prediction');
  };

  const handleNadi = () => {
    navigateTo('nadiData');
  };

  const handleTables = () => {
    navigateTo('astroTables');
  };

  const navigateTo = (screen) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  return (
    <>
    <View style={styles.header}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={styles.headerItem} onPress={handleNadi} >Nadi</Text>
      <Text style={styles.headerItem} onPress={handleTables}>Tables</Text>
      <Text style={styles.headerItem}>Item 3</Text>
      <Text style={styles.headerItem}>Item 4</Text>
      <Text style={styles.headerItem}>Item 5</Text>
      <Text style={styles.headerItem}>Item 6</Text>
      <Text style={styles.headerItem}>Item 7</Text>
      {/* Add more items as needed */}
  </ScrollView>
    </View>
  <ScrollView contentContainerStyle={styles.container}>
    {result && (
         <View style={styles.tablecontainer}>
         <View style={styles.row}>
           <Text style={styles.cell}>Name</Text>
           <Text style={styles.cell}>{result.name}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>DOB</Text>
           <Text style={styles.cell}>{result.date_of_birth}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>TOB</Text>
           <Text style={styles.cell}>{result.time_of_birth}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>POB</Text>
           <Text style={styles.cell}>{result.place_of_birth}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>LAT</Text>
           <Text style={styles.cell}>{result.latitude}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>LONG</Text>
           <Text style={styles.cell}>{result.longitude}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>MC</Text>
           <Text style={styles.cell}>{result.mc}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>NODE</Text>
           <Text style={styles.cell}>{result.node}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>AYAN</Text>
           <Text style={styles.cell}>{result.ayanamsa}</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.cell}>TZ</Text>
           <Text style={styles.cell}>+5:30</Text>
         </View>
       </View>
    )}
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: 'white'
    },
    header: {
      flexDirection: 'row', // Align items horizontally
      paddingVertical: 10,
      backgroundColor: 'white', // Background color for the header
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    headerItem: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    tablecontainer: {
      paddingVertical: 16,
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: '#f1f1f1',
    },
    cell: {
      flex: 1,
      fontSize: 14,
    },
  });
  