import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NadiData({ result }) {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('index');
    const [planetData, setPlanetData] = useState([]); // Initial state for planetData
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');

    const [planetage, setPlanetage] = useState([
        { name: 'Surya', activationAge: [22, 55], phal: 'पिता, स्वास्थ्य, शक्ति, राजा, राजसी सहयोग, उच्च पद, प्रभुत्व, गर्मी, ग्रीष्म, औषधि, पर्वत, जंगल, दायी आख, राज्य अधिकारी।' },
        { name: 'Chandra', activationAge: [23, 24, 56, 57], phal: 'माता, दिमाग, मन, मूल, भावनाए, सुन्दरता, भद्रता, जलीय उत्पाद, जलीय - जन्तु तथा जल से सम्बन्धित कार्य, तरल पदार्थ, दूध, इत्र।' },
        { name: 'Mangal', activationAge: [28, 29, 30, 31, 32, 33, 61, 62, 63, 64, 65, 66], phal: 'साहस, शारीरिक शक्ति, सहोदर अनुज, जोखिम भरा साहसिक कार्य, पुलिस, सेना, प्रशासक, शल्य - चिकित्सा, अनन्यगमन, प्रसिद्धि, इंजीनियर, भूमि, अग्नि की खदानें, हथियारों के सौदागर।' },
        { name: 'Budh', activationAge: [34, 35, 67, 68], phal: 'सीखने की सभी शाखाएं, व्यापार, मित्रख् वाणी, हेमन्त, ऋतु, मामा व मामी, सीखने के साधन, बिजली के उपकरण।' },
        { name: 'Guru', activationAge: [16, 17, 18, 19, 20, 21, 50, 51, 52, 53, 54], phal: 'ज्ञान, प्रसन्नता, पढाई' },
        { name: 'Shukra', activationAge: [25, 26, 27, 58, 59, 60], phal: 'पत्नी, युवा, सुन्दरता, वाहन, यौन-सुख, धन-सम्पदा, फूल, खुशबू, इत्र।' },
        { name: 'Shani', activationAge: [1, 2, 3, 4, 5, 6, 36, 37, 38, 39, 40, 41, 69, 70, 71, 72, 73, 74], phal: 'दीर्घायु, दुख, कंजूस, वृद्ध, मृत्यु, गरीबी,सन्यास, दूरवर्ती स्थान, मिथ्यावादिता, विदेशी, पाप' },
        { name: 'Rahu', activationAge: [7, 8, 9, 10, 11, 12, 42, 43, 44, 45, 46, 75, 76, 77, 78, 79], phal: 'अचानक घटनाए, कठोर भाषा, मिथ्यावादिता, पाप, विदेेश यात्रा तथा निवास, सर्प, जुआ, जहर, तकनीकी शिक्षा, शरद ऋतु, जंगलो में घूमना।' },
        { name: 'Ketu', activationAge: [13, 14, 15, 47, 48, 49, 80, 81, 82] , phal: 'मोक्ष, मन्त्र-तन्त्र का ज्ञान, दर्शन-शास्त्र, गुप्त विद्याएं, तीर्थ-यात्रा, शल्य-क्रिया, कारावास, जादू-टोना, औषधि, आध्यात्मिक, पूर्वज, भूख।'},
    ]);

    const [houseage, setHouseage] = useState([
        { name: 'Lagna', activationAge: [1, 24, 35, 46, 56, 68, 79, 90], phal: 'इस भाव को लग्न कहा जाता है और यह स्वभाव और शरीर से जुड़ा होता है.' },
        { name: 'Second', activationAge: [2, 13, 36, 47, 58, 69, 80, 91], phal: 'यह धन, परिवार, वाणी, और नेत्रों से जुड़ा होता है.' },
        { name: 'Third', activationAge: [3, 14, 25, 48, 59, 70, 81, 92], phal: 'यह पराक्रम, साहस, और भाई-बहन से जुड़ा होता है.' },
        { name: 'Forth', activationAge: [4, 15, 26, 37, 60, 71, 82, 93], phal: 'यह सुख, वाहन, भूमि, माता, और घर से जुड़ा होता है.' },
        { name: 'Fifth', activationAge: [5, 16, 27, 38, 49, 72, 83, 94], phal: 'यह संतान, बुद्धि, और विद्या से जुड़ा होता है.' },
        { name: 'Sixth', activationAge: [6, 17, 28, 39, 50, 61, 84, 95], phal: 'यह रोग, शत्रु, और ऋण से जुड़ा होता है.' },
        { name: 'Seven', activationAge: [7, 18, 29, 40, 51, 62, 73, 96], phal: 'यह विवाह, जीवनसाथी, और पार्टनर से जुड़ा होता है.' },
        { name: 'Eight', activationAge: [8, 19, 30, 41, 52, 63, 74, 85], phal: 'यह आयु, खतरा, और दुर्घटना से जुड़ा होता है.' },
        { name: 'Ninth', activationAge: [9, 20, 31, 42, 52, 64, 75, 86], phal: 'यह भाग्य, पिता, गुरु, और धर्म से जुड़ा होता है.' },
        { name: 'Tenth', activationAge: [10, 21, 32, 43, 53, 65, 76, 87], phal: 'यह कर्म, व्यवसाय, पद, और ख्याति से जुड़ा होता है. '},
        { name: 'Eleventh', activationAge: [11, 22, 33, 44, 54, 66, 77, 88], phal: 'यह लाभ, अभिलाषा पूर्ति, और आयु से जुड़ा होता है.' },
        { name: 'Twelfth', activationAge: [12, 23, 34, 45, 55, 67, 78, 89], phal: 'यह खर्चा, नुकसान, और मोक्ष से जुड़ा होता है. ' },
    ]);

    // Filter based on activation age
    const filteredPlanets = planetage.filter(planet =>
        age === '' || planet.activationAge.includes(parseInt(age))
    );

    const filteredHouses = houseage.filter(house =>
        age === '' || house.activationAge.includes(parseInt(age))
    );

    const filterNakshatras = (nakshatra) => {
        // Check if nakshatra is defined, otherwise return false
        if (nakshatra === undefined || nakshatra === null) {
            return false; // Return false if nakshatra is undefined or null
        }

        // Convert nakshatra to string and check if it includes the search term
        return nakshatra.toString().toLowerCase().includes(age.toString().toLowerCase());
    };

    const handlePrediction = () => {
        navigateTo('Prediction');
    };

    const navigateTo = (screen) => {
        setActiveTab(screen);
        navigation.navigate(screen);
    };


    useEffect(() => {
        if (result && Array.isArray(result.naks)) { // Ensure result.naks is an array
            setPlanetData(result.naks); // Set planet data from result
        } else {
            console.warn('Result or result.naks is undefined:', result);
        }
    }, [result]); // Dependency array ensures this runs when `result` changes

    useEffect(() => {
        if (result && result.date_of_birth) {
            setDob(result.date_of_birth); // Set DOB from result

            // Extract year from date_of_birth
            const birthYear = new Date(result.date_of_birth).getFullYear();
            const currentYear = new Date().getFullYear();
            const calculatedAge = currentYear - birthYear; // Calculate age

            setAge(calculatedAge.toString()); // Set age to the search input
        } else {
            console.warn('Result or result.date_of_birth is undefined:', result);
        }
    }, [result]); // Dependency array ensures this runs when `result` changes

    const firstNakshatra = planetData[0];
    const seNakshatra = planetData[1];
    const thNakshatra = planetData[2];
    const foNakshatra = planetData[3];
    const fiNakshatra = planetData[4];
    const siNakshatra = planetData[5];
    const sevNakshatra = planetData[6];
    const eiNakshatra = planetData[7];
    const niNakshatra = planetData[8];
    const tenNakshatra = planetData[9];


    return (
        <>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerItem}>Nadi</Text>
          <Text style={styles.headerItem}>Item 2</Text>
          <Text style={styles.headerItem}>Item 3</Text>
          <Text style={styles.headerItem}>Item 4</Text>
          <Text style={styles.headerItem}>Item 5</Text>
          <Text style={styles.headerItem}>Item 6</Text>
          <Text style={styles.headerItem}>Item 7</Text>
          {/* Add more items as needed */}
        </View>
      </ScrollView>
        <ScrollView contentContainerStyle={styles.container}>
        <TextInput 
        style={styles.input} 
        placeholder="Enter Age" 
        keyboardType="numeric" 
        value={age} 
        onChangeText={setAge} 
      />

      {/* Planets Table */}
      <View style={styles.tablecontainer}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>Planet</Text>
          <Text style={styles.headerCell}>Activation Age</Text>
        </View>
        <FlatList
          data={filteredPlanets}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.activationAge.join(', ')}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No matching planets found.</Text>} // Display when no planets match
        />
      </View>

      {/* Houses Table */}
      <View style={styles.tablecontainer}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>House</Text>
          <Text style={styles.headerCell}>Activation Age</Text>
        </View>
        <FlatList
          data={filteredHouses}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.activationAge.join(', ')}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No matching houses found.</Text>} // Display when no houses match
        />
      </View>
      <View style={styles.tablecontainer}>
      <View style={styles.row}>
        <Text style={styles.headerCell}>Planet</Text>
        <Text style={styles.headerCell}>N. A. A</Text>
      </View>
      
      {filterNakshatras(eiNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Lagna</Text>
        <Text style={styles.cell}>{eiNakshatra}</Text>
      </View>
       )}
       {filterNakshatras(firstNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Surya</Text>
        <Text style={styles.cell}>{firstNakshatra}</Text>
      </View>
      )}
      {filterNakshatras(seNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Chandra</Text>
        <Text style={styles.cell}>{seNakshatra}</Text>
      </View>
      )}
       {filterNakshatras(thNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Mangal</Text>
        <Text style={styles.cell}>{thNakshatra}</Text>
      </View>
       )}
      {filterNakshatras(foNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Budh</Text>
        <Text style={styles.cell}>{foNakshatra}</Text>
      </View>
      )}
      {filterNakshatras(fiNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Guru</Text>
        <Text style={styles.cell}>{fiNakshatra}</Text>
      </View>
      )}
      {filterNakshatras(siNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Shukra</Text>
        <Text style={styles.cell}>{siNakshatra}</Text>
      </View>
      )}
      {filterNakshatras(sevNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Shani</Text>
        <Text style={styles.cell}>{sevNakshatra}</Text>
      </View>
       )}
      {filterNakshatras(niNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Rahu</Text>
        <Text style={styles.cell}>{niNakshatra}</Text>
      </View>
      )}
      {filterNakshatras(niNakshatra) && (
      <View style={styles.row}>
        <Text style={styles.cell}>Ketu</Text>
        <Text style={styles.cell}>{tenNakshatra}</Text>
      </View>
  )}
    </View>
            </ScrollView>
    </>
    )
}
const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: 'white'
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
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
    table: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      padding: 8,
    },
    tableHeaderText: {
      flex: 1,
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'row',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    tableCell: {
      flex: 1,
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
