import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import moonimage from '../assets/full_moon.png'; // Default image

// Object mapping Tithis to their corresponding moon images
const tithiImages = {
  'Pratipada': require('../assets/full_moon.png'),
  'Dwitiya': require('../assets/full_moon.png'),
  'Tritiya': require('../assets/full_moon.png'),
  // Add mappings for all Tithis
  'Amavasya': require('../assets/full_moon.png'),
  'Purnima': require('../assets/full_moon.png'),
  // ... add other Tithis
};

const Panchang = () => {
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('New Delhi, India');
  const [latitude, setLatitude] = useState('28.6139');
  const [longitude, setLongitude] = useState('77.2090');
  const [astroData, setAstroData] = useState(null);
  const [showLocationInputs, setShowLocationInputs] = useState(false);
  const navigation = useNavigation(); // For navigation

  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().split(' ')[0].slice(0, 5); // Format: HH:MM

    setDob(currentDate);
    setTime(currentTime);

    const handleSubmit = async () => {
      const response = await fetch('http://192.168.1.2:5000/api/calculate_sun_moon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'User', // Example name
          date_of_birth: currentDate,
          time_of_birth: currentTime,
          place_of_birth: place,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          timezone_offset: new Date().getTimezoneOffset(),
          julian_date: now.getTime() / 86400000 + 2440587.5,
        }),
      });

      const data = await response.json();
      setAstroData(data);
    };

    handleSubmit();
  }, []);

  // Get the moon image based on the Tithi
  const getMoonImage = (tithi) => {
    return tithi && tithiImages[tithi] ? tithiImages[tithi] : moonimage;
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.navButton}>{'<'}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
            placeholder="Date of Birth"
          />
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Time of Birth"
          />
          <TouchableOpacity onPress={() => setShowLocationInputs(!showLocationInputs)}>
            <Text style={styles.icon}>📍</Text>
          </TouchableOpacity>
        </View>

        {showLocationInputs && (
          <View style={styles.locationInputContainer}>
            <TextInput
              style={styles.input}
              value={place}
              onChangeText={setPlace}
              placeholder="Place"
            />
            <TextInput
              style={styles.input}
              value={latitude}
              onChangeText={setLatitude}
              placeholder="Latitude"
            />
            <TextInput
              style={styles.input}
              value={longitude}
              onChangeText={setLongitude}
              placeholder="Longitude"
            />
          </View>
        )}

        {astroData && (
          <View style={styles.astroDataContainer}>
            <View style={styles.astroDataHeader}>
              <Image source={getMoonImage(astroData.tithi)} style={styles.moonImage} />
              <View>
                <Text style={styles.placeText}>{place}</Text>
                <Text style={styles.tithiText}>{astroData.tithi || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.astroDataTable}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Tithi</Text>
                <Text style={styles.tableCell}>{astroData.tithi || 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Raasi</Text>
                <Text style={styles.tableCell}>{astroData.raasi || 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Nakshatra</Text>
                <Text style={styles.tableCell}>{astroData.nakshatra || 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Yoga</Text>
                <Text style={styles.tableCell}>{astroData.yog || 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Karana</Text>
                <Text style={styles.tableCell}>{astroData.karan || 'N/A'}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  navButton: {
    fontSize: 24,
    width: 30,
    textAlign: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  icon: {
    fontSize: 24,
  },
  locationInputContainer: {
    marginTop: 16,
  },
  astroDataContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  astroDataHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moonImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  placeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tithiText: {
    fontSize: 14,
    color: '#555',
  },
  astroDataTable: {
    marginTop: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
  },
});

export default Panchang;
