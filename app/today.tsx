import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import { MhahPanchang } from 'mhah-panchang';
import { useNavigation } from '@react-navigation/native';
import CustomBottomNavbar from '@/components/BottomNavbar';
import Siri from '@/components/Siri';

const Today = () => {
  const [selectedRashi, setSelectedRashi] = useState('');
  const [rashiResult, setRashiResult] = useState('');
  const [prediction, setPrediction] = useState('');
  const navigation = useNavigation();

  const rashiPredictions = {
    "Aries": {
        "mitra": "Aap apne hisab se chalenge",
        "shatru": "Aap kisi jo dekh kr chalenge"
      },
      "Taurus": {
        "mitra": "Aap aaj mehnat bhut krenge",
        "shatru": "Aaj aap bilkul mehnat nhi krenge or kaam chori krenge"
      },
      "Gemini": {
        "mitra": "Aap akele nhi rhenge logo me mil jiul kr rahenge",
        "shatru": "Aap akele rahenge"
      },
      "Cancer": {
        "mitra": "Aaj aap bhut bhabhuk honge or ho skta h app chalaki kare",
        "shatru": "Aaj aap bhut bhabhuk nhi honge or ho skta h app chalaki kare"
      },
      "Leo": {
        "mitra": "Aaj aap swatanta vichar me rahenge or ho skta h aap akela mehsus kre",
        "shatru": "Aaj aap swatanta vichar me nhi rahenge or ho skta h aap acha mehsus kre"
      },
      "Virgo": {
        "mitra": "Aaj aap khushal rahenge or masti krenge",
        "shatru": "Aaj aap royenge apni galti se"
      },
      "Libra": {
        "mitra": "Aaj aap beach ke bechu banenge",
        "shatru": "Aaj aap beach ke bechu na bane nhi to glt ho skta h"
      },
      "Scorpio": {
        "mitra": "Aaj aap hoshiari dekhane ki koshish krenge or kamyab bhi honge",
        "shatru": "Aaj aap galti krenge or fir pachtayenge"
      },
      "Sagittarius": {
        "mitra": "Aaj aap focus me rhen ki koshish krenge",
        "shatru": "Aaj aap focus me rhen ki koshish krenge pr ho skta h ki aap ki galti ke karan aap asfal rahenge"
      },
      "Capricorn": {
        "mitra": "Aaj aap dogle banoge",
        "shatru": "Aaj aap shanti se rhenge jisse apko koi pakad na paye"
      },
      "Aquarius": {
        "mitra": "Aaj aap thanda dimag rakenge",
        "shatru": "Aaj aap thanda dimag rakhne ki koshsish krenge pr aaj koi pareshan krega"
      },
      "Pisces": {
        "mitra": "Aaj aap ya to madad krenge ya kisi ki help ki zrurat pdegi karan kuch bhi ho skta h",
        "shatru": "Aaj aap apne per pe kulhadi marenge, ya app kisi se pareshan rahenge"
      }
  };

  useEffect(() => {
    const panchang = new MhahPanchang();
    const today = new Date();
    const todayAstroObj = panchang.calculate(today);

    if (todayAstroObj && todayAstroObj.Raasi && todayAstroObj.Raasi.name_en_UK) {
      const todayraasi = todayAstroObj.Raasi.name_en_UK;
      const todayRashiIndex = todayAstroObj.Raasi.ino + 1;

      if (selectedRashi) {
        const rashis = [
          "Aries", "Taurus", "Gemini", "Cancer", "Leo",
          "Virgo", "Libra", "Scorpio", "Sagittarius",
          "Capricorn", "Aquarius", "Pisces"
        ];

        const selectedRashiIndex = rashis.indexOf(selectedRashi) + 1;
        let diff = selectedRashiIndex - todayRashiIndex + 1;
        if (diff < 0) {
          diff += 12; // Adjust for wrap-around
        }

        if (diff === 6 || diff === 8 || diff === 12) {
          setRashiResult('Shatru');
          setPrediction(rashiPredictions[todayraasi].shatru);
        } else {
          setRashiResult('Mitra');
          setPrediction(rashiPredictions[todayraasi].mitra);
        }
      }
    } else {
      console.error("Error: Moon Rashi data is not available.");
    }
  }, [selectedRashi]);

  return (
    <>
    <Siri />
    <View style={styles.container}>
      <Text style={styles.title}>Numbrology and Panchang</Text>

      <Picker
        selectedValue={selectedRashi}
        onValueChange={(itemValue) => setSelectedRashi(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select your Rashi" value="" />
        <Picker.Item label="Mesha" value="Aries" />
        <Picker.Item label="Vrishabha" value="Taurus" />
        <Picker.Item label="Mithuna" value="Gemini" />
        <Picker.Item label="Karka" value="Cancer" />
        <Picker.Item label="Simha" value="Leo" />
        <Picker.Item label="Kanya" value="Virgo" />
        <Picker.Item label="Tula" value="Libra" />
        <Picker.Item label="Vrischika" value="Scorpio" />
        <Picker.Item label="Dhanu" value="Sagittarius" />
        <Picker.Item label="Makara" value="Capricorn" />
        <Picker.Item label="Kumbha" value="Aquarius" />
        <Picker.Item label="Meena" value="Pisces" />
      </Picker>

      <Text style={styles.predictionTitle}>How will work in your mind Today :-</Text>
      <Text></Text>
      <Text>{prediction}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
    <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    marginVertical: 20,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Today;
