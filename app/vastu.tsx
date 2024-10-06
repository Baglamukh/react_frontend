import React, { useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import useIncDec from '../hooks/useIncDec';
import { settingFloor } from '../assets/floorReducer';
import { setWidth, setLength, setFloor, setFloorsData as mapSetFloorsData } from '../assets/mapReducer';
import CustomBottomNavbar from '@/components/BottomNavbar';
import Siri from '@/components/Siri';


const initRoom = {
    roomType: "bedroom",
    floorId: 1,
    items: [],
    cords: { x: 0, y: 0 },
  }
  
  const initFloorObj = {
    id: 1,
    rooms: [],
    name: ""
  }

const Vastu = () => {
  const navigation = useNavigation();
  const map = useSelector((state) => state.map)
  // console.log(map)
  const [widthVal, widthInc, widthDec, widthSet] = useIncDec(map.width);
  const [lengthVal, lengthInc, lengthDec, lengthSet] = useIncDec(map.length);
  const [floorNoVal, floorNoInc, floorNoDec, floorNoSet] = useIncDec(map.floor);

  const dispatch = useDispatch();

    useEffect(() => {
        if (floorNoVal == 0 || map.floor == 0) return;

        let data =   [...map.floorsData].slice(0, map.floor)

        console.log(data ,  floorNoVal, map.floor)
        for (let i = data.length  ; i < floorNoVal; i++) {
            let obj = {
                id: i + 1,
                rooms: [],
                name: ""
            }
            // data.push(obj);
            data[i] = obj
        }
        console.log("hiiii")
        dispatch(mapSetFloorsData([...data]))

    }, [map.floor])


    useEffect(() => {
        dispatch(setWidth(widthVal))
    }, [widthVal])
    useEffect(() => {
        dispatch(setLength(lengthVal))
    }, [lengthVal])
    useEffect(() => {
        dispatch(setFloor(floorNoVal))
    }, [floorNoVal])


    const handleFloor = (value) => {
        dispatch(settingFloor(value))
    navigation.navigate('viewfloor');
  };

  return (
    <>
    <Siri />
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Width Input */}
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={widthDec} disabled={widthVal <= 0}><Text style={styles.addButtonin}>-</Text></TouchableOpacity>
            <Text style={styles.label}>Width : </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(widthVal)}
              onChangeText={(val) => widthSet(Number(val))}
            />
            <TouchableOpacity onPress={widthInc}><Text style={styles.addButtonin}>+</Text></TouchableOpacity>
          </View>

          {/* Length Input */}
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={lengthDec} disabled={lengthVal <= 0}><Text style={styles.addButtonin}>-</Text></TouchableOpacity>
            <Text style={styles.label}>Length:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(lengthVal)}
              onChangeText={(val) => lengthSet(Number(val))}
            />
            <TouchableOpacity onPress={lengthInc}><Text style={styles.addButtonin}>+</Text></TouchableOpacity>
          </View>

          {/* Floor Input */}
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={floorNoDec} disabled={floorNoVal <= 0}><Text style={styles.addButtonin}>-</Text></TouchableOpacity>
            <Text style={styles.label}>Floor  : </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(floorNoVal)}
              onChangeText={(val) => floorNoSet(Number(val))}
            />
            <TouchableOpacity onPress={floorNoInc}><Text style={styles.addButtonin}>+</Text></TouchableOpacity>
          </View>

          <Text style={styles.header}>Floor Details</Text>

          {map.floorsData.length > 0 && map.floorsData.map((el, ind) => (
            <View key={ind} style={styles.floorRow}>
              <Text style={styles.floorText}>Floor-{el.id}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleFloor(el)}>
                  <Text style={styles.viewButton}>👁️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Add Room")}>
                  <Text style={styles.addButton}>➕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 36,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 4,
    width: '55%',
    textAlign: 'center',
    borderColor: '#ccc',
    borderRadius: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  floorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 10,
  },
  floorText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  viewButton: {
    fontSize: 24,
    paddingRight: 20,
    color: 'skyblue',
    marginHorizontal: 8,
  },
  addButton: {
    color: 'white',
    fontSize: 16,
    padding: 4,
    borderRadius: 4,
  },
  addButtonin: {
    backgroundColor: '#f0f0f0',
    width: 30,
    color: 'black',
    paddingHorizontal:10,
    padding: 8,
    marginLeft: 10,
    borderRadius: 4,
  },
});

export default Vastu;
