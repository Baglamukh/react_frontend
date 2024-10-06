import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Link } from '@react-navigation/native'; // Assuming you're using React Navigation
import CustomBottomNavbar from '@/components/BottomNavbar';
import { useNavigation } from '@react-navigation/native';

const Numerology = ({
  luShuGrid = [],
  PaschimluShuGrid = [],
  tluShuGrid = [],
  paschimPythagoreanGrid = [],
  chinesePythagoreanGrid = [],
  paschimChaldeanGrid = [],
  chineseChaldeanGrid = [],
}) => {
  const grids = [
    { name: "Lu Shu Grid", data: luShuGrid },
    { name: "Paschim Lu Shu Grid", data: PaschimluShuGrid },
    { name: "TLu Shu Grid", data: tluShuGrid },
    { name: "Paschim Pythagorean Grid", data: paschimPythagoreanGrid },
    { name: "Chinese Pythagorean Grid", data: chinesePythagoreanGrid },
    { name: "Paschim Chaldean Grid", data: paschimChaldeanGrid },
    { name: "Chinese Chaldean Grid", data: chineseChaldeanGrid },
  ];
  const navigation = useNavigation(); // For navigation
  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6', paddingBottom: 60, }}>
         <View style={{ flexDirection: 'row',  backgroundColor: 'white', padding: 16, borderRadius: 8, elevation: 2 }}>
            <Text style={{ padding: 8, marginLeft:4, fontWeight: 'bold', }}>Lu Shu Grid</Text>
            <Link to="/numberdetails" style={{ padding: 8, marginLeft:14, fontWeight: 'bold', }} onPress={() => navigation.navigate('numberdetails')}><Text>Number Details</Text></Link>
            <Link to="/ankdasa" style={{ padding: 8, marginLeft:14, fontWeight: 'bold' }} onPress={() => navigation.navigate('ankdasa')}><Text>Ank Dasa</Text></Link>

          </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          {/* Header Section */}

          {/* Grid Section */}
          <View style={{ marginTop: 16 }}>
            {grids.map((grid, gridIndex) => (
              <View key={gridIndex} style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 16, elevation: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{grid.name}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {grid.data.map((cell, index) => (
                    <View key={index} style={{ backgroundColor: '#E5E7EB', borderRadius: 8, padding: 16, flexBasis: '30%', margin: 4 }}>
                      <Text style={{ textAlign: 'center' }}>{cell}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* Kaal Purush Section */}
            <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, elevation: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Kaal Purush</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <View key={number} style={{ backgroundColor: '#E5E7EB', borderRadius: 8, padding: 16, flexBasis: '30%', margin: 4 }}>
                    <Text style={{ textAlign: 'center' }}>{number}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomBottomNavbar />
    </View>
  );
};

export default Numerology;
