import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setFloorsData, settingFloorData } from '../assets/mapReducer';
import { settingFloor } from '../assets/floorReducer';
import useIncDec from '../hooks/useIncDec';
import { Picker } from '@react-native-picker/picker';
import Draggable from 'react-native-draggable';

const roomTypes = [
  { label: "Bedroom", value: "bedroom" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Home Entrance", value: "homeentrance" },
  { label: "Toilet", value: "toilet" },
  { label: "Temple", value: "temple" },
  { label: "Guest Room", value: "guestroom" },
  { label: "Servant Room", value: "servantroom" },
  { label: "Staircase", value: "staircase" },
  { label: "Drawing Room", value: "drawingroom" },
  { label: "Children Room", value: "childrenroom" },
  { label: "Store Room", value: "storeroom" },
];

const ViewFloor = () => {
  const navigation = useNavigation();
  const [isAddRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [widthR, widthRInc, widthRDec, widthRSet] = useIncDec(1);
  const [lengthRVal, lengthRInc, lengthRDec, lengthRSet] = useIncDec(1);
  const [typeR, setTypeR] = useState("None");
  const floorCurr = useSelector((state) => state.floorCurr);
  const { width, length, floorsData } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [parentLayout, setParentLayout] = useState(null);
  const parentViewRef = useRef(null);

  const calculateDirectionAndDegree = (x, y, bigWidth, bigHeight) => {
    const centerX = bigWidth / 3;
    const centerY = bigHeight / 3;
    const angleRad = Math.atan2(y - centerY, x - centerX);
    let angleDeg = (angleRad * 180) / Math.PI;
    if (angleDeg < 0) angleDeg += 360;

    let newDirection = '';
    let newDegree = `${angleDeg.toFixed(2)}°`;

    if (angleDeg < 22.5) newDirection = 'N';
    else if (angleDeg < 67.5) newDirection = 'NE';
    else if (angleDeg < 90) newDirection = 'E';
    else if (angleDeg < 112.5) newDirection = 'SE';
    else if (angleDeg < 157.5) newDirection = 'S';
    else if (angleDeg < 202.5) newDirection = 'SW';
    else if (angleDeg < 247.5) newDirection = 'W';
    else if (angleDeg < 292.5) newDirection = 'NW';
    else newDirection = 'N';

    return { direction: newDirection, degree: newDegree };
  };

  useEffect(() => {
    if (parentViewRef.current) {
      parentViewRef.current.measure((x, y, width, height) => {
        setParentLayout({ x, y, width, height });
      });
    }
  }, [parentViewRef]);
  

  const handleAddRoom = async () => {
    if (widthR <= 0 || lengthRVal <= 0) {
      alert("Room dimensions must be positive!");
      return;
    }

    // Ensure the room fits within the floor when added
    const roomWidth = Number(widthR) * 10;
    const roomLength = Number(lengthRVal) * 10;

    const constrainedLeft = Math.min(Math.max(0, 0), width * 10 - roomWidth);
    const constrainedTop = Math.min(Math.max(0, 0), length * 10 - roomLength);
    

    const room = {
      id: floorCurr.data.rooms.length > 0 ? Math.max(...floorCurr.data.rooms.map(r => r.id)) + 1 : 1,
      width: Number(widthR),
      length: Number(lengthRVal),
      top: constrainedTop,
      left: constrainedLeft,
      type: typeR,
      direction: "N",
      degree: "0°",
    };

    const updatedFloorsData = floorsData.map((floor) => {
      if (floor.id === floorCurr.data.id) {
        return { ...floor, rooms: [...floor.rooms, room] };
      }
      return floor;
    });

    dispatch(setFloorsData(updatedFloorsData));
    dispatch(settingFloor(updatedFloorsData.find(floor => floor.id === floorCurr.data.id)));
    setAddRoomModalOpen(false);
  };

  const updateRoomPosition = (roomId, x, y) => {
    const room = floorCurr.data.rooms.find(r => r.id === roomId);
    const roomWidth = room.width * 10;
    const roomLength = room.length * 10;

    // Calculate direction and degree as before
    const { direction, degree } = calculateDirectionAndDegree(x, y, width * 10, length * 10);

    // Ensure new position doesn't exceed floor boundaries
    const constrainedLeft = Math.min(Math.max(0, 0), width * 10 - roomWidth);
    const constrainedTop = Math.min(Math.max(0, 0), length * 10 - roomLength);    

    const updatedFloorsData = floorsData.map((floor) => {
      if (floor.id === floorCurr.data.id) {
        return {
          ...floor,
          rooms: floor.rooms.map(room =>
            room.id === roomId ? { ...room, left: constrainedLeft, top: constrainedTop, direction, degree } : room
          ),
        };
      }
      return floor;
    });

    dispatch(setFloorsData(updatedFloorsData));
    dispatch(settingFloor(updatedFloorsData.find(floor => floor.id === floorCurr.data.id)));
  };


  return (
    <View style={{width: 320, height: 200}}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 20, marginLeft: 20, }}>
        <Text style={{ fontSize: 20 }}>Floor - {floorCurr.data.id}</Text>
        <Button title="Add" onPress={() => setAddRoomModalOpen(true)} />
        <Button title="Prediction" onPress={() => navigation.navigate('vastuprediction')} />
        </View>
        {width && length ? (
          <View ref={parentViewRef} style={{ width: width * 10, height: length * 10, borderWidth: 2, borderColor: 'black', position: 'relative', maxHeight: 500, maxWidth: 325 }}   onLayout={() => {
          parentViewRef.current.measure((x, y, width, height ) => {
            setParentLayout({ x, y, width, height });
          });
        }}>
            {floorCurr.data.rooms.length === 0 ? <Text>Floor is empty</Text> : (
              floorCurr.data.rooms.map((el, ind) => (
                <Draggable
                  key={el.id}
                  x={el.left}
                  y={el.top}
                  onDragRelease={(e, gestureState, bounds) => {
                    const { moveX, moveY } = gestureState;
                  
                    if (parentLayout) {
                      const maxX = parentLayout.width - 100; // Adjust this value based on room size or draggable size
                      const maxY = parentLayout.height - 100;
                  
                      let newX = moveX - parentLayout.x;
                      let newY = moveY - parentLayout.y;
                  
                      // Adjust drag boundaries
                      if (newX < 0) newX = 0;
                      if (newY < 0) newY = 0;
                      if (newX > maxX) newX = maxX;
                      if (newY > maxY) newY = maxY;
                  
                      setDragPosition({ x: newX, y: newY });
                      updateRoomPosition(el.id, newX, newY); // Make sure this method is correctly updating the state
                    }
                  }}
                  
                >
                  <View
                    style={{
                      width: el.width * 10,
                      height: el.length * 10,
                      borderWidth: 2,
                      borderColor: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                    }}
                  >
                    <Text>{ind + 1}</Text>
                  </View>
                </Draggable>
              ))
            )}
          </View>
        ) : null}
      <Modal visible={isAddRoomModalOpen} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, width: 300, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Add Room</Text>
            <Text>Length:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, marginTop: 5 }}
              keyboardType="numeric"
              value={lengthRVal.toString()}
              onChangeText={lengthRSet}
            />
            <Text>Width:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, marginTop: 5 }}
              keyboardType="numeric"
              value={widthR.toString()}
              onChangeText={widthRSet}
            />
            <Text>Type:</Text>
            <Picker selectedValue={typeR} onValueChange={setTypeR}>
              {roomTypes.map((type) => (
                <Picker.Item key={type.value} label={type.label} value={type.value} />
              ))}
            </Picker>
            <Button title="Add" onPress={handleAddRoom} />
            <Button title="Cancel" onPress={() => setAddRoomModalOpen(false)} />
          </View>
        </View>
      </Modal>
      </View>
  );
};

export default ViewFloor;

