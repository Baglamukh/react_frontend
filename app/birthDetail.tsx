// FormComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const GREGORIAN_EPOCH = 1721425.5;

function leap_gregorian(year) {
  return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
}

function m2j(date_time) {
  const m = date_time.getMonth() + 1;
  const d = date_time.getDate();
  const y = date_time.getFullYear();
  const sec = date_time.getSeconds();
  const min = date_time.getMinutes();
  const hour = date_time.getHours();

  return (GREGORIAN_EPOCH - 1) +
    (365 * (y - 1)) +
    Math.floor((y - 1) / 4) +
    (-Math.floor((y - 1) / 100)) +
    Math.floor((y - 1) / 400) +
    Math.floor((((367 * m) - 362) / 12) +
      ((m <= 2) ? 0 : (leap_gregorian(y) ? -1 : -2)) +
      d) +
    (Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0);
}

const FormComponent = ({ setResult, setPredictionHtml }) => {
  const navigation = useNavigation(); // To handle navigation
  const [activeTab, setActiveTab] = useState('index'); // State to track the active tab
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    time_of_birth: '',
    place_of_birth: '',
    latitude: '',
    longitude: '',
    timezone_offset: 0,
    timezone_offset2: 0,
  });

  useEffect(() => {
    if (formData.date_of_birth) {
      const date = new Date(formData.date_of_birth);
      setFormData((prevFormData) => ({
        ...prevFormData,
        timezone_offset: date.getTimezoneOffset() / 60,
        timezone_offset2: date.getTimezoneOffset(),
      }));
    }
  }, [formData.date_of_birth]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const [year, month, day] = formData.date_of_birth.split('-').map(Number);
    const [hours, minutes] = formData.time_of_birth.split(':').map(Number);
    const seconds = 0;

    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    const julianDate = m2j(date) + formData.timezone_offset2 / 1440.0;

    const dataToSend = { ...formData, julian_date: julianDate };

    try {
      const response = await axios.post('http://192.168.245.237:5000/api/calculate_sun_moon', dataToSend);
      const data = response.data;
      setResult(data);
      setPredictionHtml(data.prediction);
    } catch (error) {
      console.error('Error fetching astrology data:', error);
      Alert.alert('Error', 'Failed to fetch astrology data.');
    }
    navigateTo('Results')
  };

  const navigateTo = (screen) => {
    setActiveTab(screen); // Update the active tab state
    navigation.navigate(screen); // Navigate to the selected screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={formData.date_of_birth}
        onChangeText={(text) => handleChange('date_of_birth', text)}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Time of Birth</Text>
      <TextInput
        style={styles.input}
        value={formData.time_of_birth}
        onChangeText={(text) => handleChange('time_of_birth', text)}
        placeholder="HH:MM"
      />

      <Text style={styles.label}>Place of Birth</Text>
      <TextInput
        style={styles.input}
        value={formData.place_of_birth}
        onChangeText={(text) => handleChange('place_of_birth', text)}
        placeholder="Enter place of birth"
      />

      <Text style={styles.label}>Latitude</Text>
      <TextInput
        style={styles.input}
        value={formData.latitude}
        onChangeText={(text) => handleChange('latitude', text)}
        placeholder="Enter latitude"
      />

      <Text style={styles.label}>Longitude</Text>
      <TextInput
        style={styles.input}
        value={formData.longitude}
        onChangeText={(text) => handleChange('longitude', text)}
        placeholder="Enter longitude"
      />

      <Button
        title="Calculate Sun and Moon Data"
        onPress={handleSubmit}
        color="#4F46E5" // Customize your button color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
});

export default FormComponent;
