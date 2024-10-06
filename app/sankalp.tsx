import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MhahPanchang } from 'mhah-panchang';
import Siri from '@/components/Siri';
import CustomBottomNavbar from '@/components/BottomNavbar';
import Div from '@/components/div';

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

const MantraComponent = () => {
  const [astroData, setAstroData] = useState(null);
  const [calData, setCalData] = useState(null);
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('New Delhi, India');

  const weekdaysHindi = [
    'रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'
  ];

  const MASA_NAMES = [
    "चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ़", "श्रावण", 
    "भाद्रपद", "आश्वयज", "कार्तिक", "मार्गशीर्ष", "पौष","माघ", "फाल्गुन"
  ];

  useEffect(() => {
    const panchang = new MhahPanchang();
    const currentDate = new Date();
    const astroObj = panchang.calculate(currentDate);
    const calObj = panchang.calendar(currentDate, 27.13, 77.29);
    setAstroData(astroObj);
    setCalData(calObj);
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().split(' ')[0].slice(0, 5); // Format: HH:MM
    const [year, month, day] = currentDate.split('-').map(Number);
    const [hours, minutes] = currentTime.split(':').map(Number);
    const seconds = 0; // Assuming seconds are always 0 since time input doesn't provide seconds
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    const timezone_offset2 = date.getTimezoneOffset();
    const latitude = '28.6139';
    const longitude = '77.2090';

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
          timezone_offset: date.getTimezoneOffset(),
          julian_date: m2j(date) + timezone_offset2 / 1440.0
        }),
      });

      const data = await response.json();
      setAstroData(data);
    };

    handleSubmit();
  }, []);

  return (
    <>
    <View style={{backgroundColor: 'white', height: '100%'}}>
    <Siri />
    <Div />
      <ScrollView contentContainerStyle={styles.container}>
        {astroData && calData && (
          <>
            <Text style={styles.title}>ॐ विष्णवे नमः</Text>
            <Text style={styles.mantra}>
              ॐ विष्णवे नमः, ॐ विष्णवे नमः, ॐ विष्णवे नमः ।
            </Text>
            <Text style={styles.description}>
              ॐ अद्य ब्रह्मणोऽह्नि द्वितीय परार्धे श्री श्वेत बाराहकल्पे
              वैवस्वतमन्वन्तरेऽष्टाविंश तितमे कलियुगे कलि प्रथम चरणे
              बौद्धावतारे भूर्लोके जम्बूद्वीपे भरतखण्डे भारतवर्षे 
              <Text style={styles.highlight}> [ स्थान ] </Text> अमुक संवत्सरे <Text style={styles.highlight}>{MASA_NAMES[calData.Masa?.ino + 0] || 'N/A'}</Text> मासे <Text style={styles.highlight}>{astroData.paksha || 'N/A'}</Text> पक्षे&nbsp;
              <Text style={styles.highlight}>{astroData.tithi || 'N/A'}</Text> तिथौ <Text style={styles.highlight}>{weekdaysHindi[new Date().getDay()] || 'N/A'}</Text> वासरे......
            </Text>
            <Text style={styles.description}>
              <Text style={styles.highlight}> [ गौत्र ] </Text> गोत्रोत्पन्नोहम् 
              <Text style={styles.highlight}> [ नाम ] </Text> नामनोहम् सपरिवारस्य
              एवं नाना गोत्राणि शिव भक्तानामस्य शिवप्रसन्नता एवं वेदोक्त फल
              प्राप्त्यर्थम् पूजन पूर्वक 
              <Text style={styles.highlight}> [ पूजा नाम ] </Text>
              अहं करिष्ये
            </Text>
          </>
        )}
      </ScrollView>
      </View>
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  mantra: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  highlight: {
    color: '#00bcd4', // Cyan color
    fontWeight: 'bold',
  },
});

export default MantraComponent;
