import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import aboutData from '@/assets/Data/About.json';
import CustomBottomNavbar from '@/components/BottomNavbar';

export default function About() {
  const [data, setData] = useState([]); // State to hold the data
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data from API or local JSON file
    setData(aboutData);
  }, []);

  const handleClick = (id) => {
    navigation.navigate('person', { id });
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 10 ? words.slice(0, 5).join(' ') + '...' : description;
  };

  return (
    <>
      <ScrollView style={styles.container}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleClick(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{truncateDescription(item.description)}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  grid: {


    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
    marginTop: 4,
  },
});

