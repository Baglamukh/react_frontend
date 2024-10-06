import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native'; // Ensure you have react-navigation installed

const Kaudi = () => {
  const [name, setName] = useState('');
  const [frontValue, setFrontValue] = useState(null);
  const [backValue, setBackValue] = useState(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const predictions = {
    1: { description: "No" },
    2: { description: "Yes" },
    3: { description: "Yes" },
    4: { description: "No" },
  };

  const kaudiImages = {
    1: { front: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFvWML5xdFPbnT47yqYuC3GrjvX6hLLE4Z4UaRv_XW1E8cqsFpUSwcYf9MyVRIlsX0SLMv1SZK38IbClBNNPHxHCYUw_X3V48-fab6lDk0-eBlYsuQDdydflrA3tiHbWHzpfmL7X0euYtfx-_r7SV_fgZVkIFPFJhWjUWoUT42Xou6eJ89udLarui3bV9x/s320/front.png", back: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCSdWtC3os2GvIHBRInjQdTtPlNymPpRFz8uFhqRnnip92y-rtP-Wahrf8mXfm-0TkOKVVD5ZBGgW2I-P9GsUt1HNg-n61Zpzs7GlZE3fvWB6F2UBtOA2k1OGUcTFbRCS9AvFUrsFEC3ubrVOcvyNOc7QS6L9JkaT9OracEA2LdsH4Tq5Qx9xAk7s8Fyib/s1600/back.png" },
    2: { front: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFvWML5xdFPbnT47yqYuC3GrjvX6hLLE4Z4UaRv_XW1E8cqsFpUSwcYf9MyVRIlsX0SLMv1SZK38IbClBNNPHxHCYUw_X3V48-fab6lDk0-eBlYsuQDdydflrA3tiHbWHzpfmL7X0euYtfx-_r7SV_fgZVkIFPFJhWjUWoUT42Xou6eJ89udLarui3bV9x/s320/front.png", back: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCSdWtC3os2GvIHBRInjQdTtPlNymPpRFz8uFhqRnnip92y-rtP-Wahrf8mXfm-0TkOKVVD5ZBGgW2I-P9GsUt1HNg-n61Zpzs7GlZE3fvWB6F2UBtOA2k1OGUcTFbRCS9AvFUrsFEC3ubrVOcvyNOc7QS6L9JkaT9OracEA2LdsH4Tq5Qx9xAk7s8Fyib/s1600/back.png" },
    3: { front: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFvWML5xdFPbnT47yqYuC3GrjvX6hLLE4Z4UaRv_XW1E8cqsFpUSwcYf9MyVRIlsX0SLMv1SZK38IbClBNNPHxHCYUw_X3V48-fab6lDk0-eBlYsuQDdydflrA3tiHbWHzpfmL7X0euYtfx-_r7SV_fgZVkIFPFJhWjUWoUT42Xou6eJ89udLarui3bV9x/s320/front.png", back: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCSdWtC3os2GvIHBRInjQdTtPlNymPpRFz8uFhqRnnip92y-rtP-Wahrf8mXfm-0TkOKVVD5ZBGgW2I-P9GsUt1HNg-n61Zpzs7GlZE3fvWB6F2UBtOA2k1OGUcTFbRCS9AvFUrsFEC3ubrVOcvyNOc7QS6L9JkaT9OracEA2LdsH4Tq5Qx9xAk7s8Fyib/s1600/back.png" },
    4: { front: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFvWML5xdFPbnT47yqYuC3GrjvX6hLLE4Z4UaRv_XW1E8cqsFpUSwcYf9MyVRIlsX0SLMv1SZK38IbClBNNPHxHCYUw_X3V48-fab6lDk0-eBlYsuQDdydflrA3tiHbWHzpfmL7X0euYtfx-_r7SV_fgZVkIFPFJhWjUWoUT42Xou6eJ89udLarui3bV9x/s320/front.png", back: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCSdWtC3os2GvIHBRInjQdTtPlNymPpRFz8uFhqRnnip92y-rtP-Wahrf8mXfm-0TkOKVVD5ZBGgW2I-P9GsUt1HNg-n61Zpzs7GlZE3fvWB6F2UBtOA2k1OGUcTFbRCS9AvFUrsFEC3ubrVOcvyNOc7QS6L9JkaT9OracEA2LdsH4Tq5Qx9xAk7s8Fyib/s1600/back.png" },
  };

  const startPrediction = () => {
    if (!name) {
      Alert.alert('Error', 'Please fill in all fields and select at least one main question and one sub-question.');
      return;
    }

    let frontValue = Math.floor(Math.random() * 4) + 1; // Adjusted to include 1 to 4
    let backValue = 4 - frontValue;

    setFrontValue(frontValue);
    setBackValue(backValue);

    const prediction = predictions[frontValue];
    const result = prediction.description;
    Alert.alert('Prediction', result);
  };

  const handleTouchMove = (e) => {
    const deltaX = e.nativeEvent.pageX - 100; // Adjust as needed
    const deltaY = e.nativeEvent.pageY - 100; // Adjust as needed
    setRotationX(rotationX + deltaY * 0.1);
    setRotationY(rotationY + deltaX * 0.1);
  };

  const renderImages = (value, count) => {
    const images = [];
    for (let i = 0; i < count; i++) {
      const imageSource = value === 'front' ? kaudiImages[frontValue]?.front : kaudiImages[backValue]?.back;
      if (imageSource) {
        images.push(
          <Image key={`${value}-${i}`} source={{ uri: imageSource }} style={styles.image} />
        );
      }
    }
    return images;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.buttonname}>
          <Text style={styles.buttonTextname}>Prasnawali</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('kaudi')} style={styles.buttonname}>
          <Text style={styles.buttonTextname}>Kaudi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Question:</Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Button 
          title="Start"
          onPress={startPrediction}
          color="black"
        />
      </View>

      <TouchableWithoutFeedback onPress={handleTouchMove}>
        <View style={styles.cubeContainer}>
          <View style={[styles.cube, {
            transform: [
              { rotateX: `${rotationX}deg` },
              { rotateY: `${rotationY}deg` },
            ],
          }]}>
            <View style={styles.imageContainer}>
              {renderImages('front', frontValue)}
              {renderImages('back', backValue)}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>Front Kaudi Value: {frontValue}</Text>
        <Text style={styles.valueText}>Back Kaudi Value: {backValue}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  buttonTextname: {
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  buttonname: {
    backgroundColor: '#f0f0f0',
    width: '40%', // Adjusted to 20%
    padding: 10,
    borderRadius: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  link: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cubeContainer: {
    height: 300,
    width: 320,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    perspective: 1000,  // Apply perspective for a 3D look
  },
  cube: {
    height: '100%',
    width: '100%',
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    transformStyle: 'preserve-3d',  // To preserve the 3D effect
  },

  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,  // Adjusted size for better visibility
    height: 100,  // Adjusted size
    margin: 5,  // Space between images
    resizeMode: 'contain',
    borderRadius: 10,  // Rounded corners for a 3D effect
    borderWidth: 1,
    borderColor: '#ddd',  // Slight border to distinguish it
    // Shadow for iOS
    shadowColor: "red",
    shadowOffset: {
      width: 100,
      height: 100,  // Create an elevated shadow
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    // Elevation for Android
    elevation: 17,
  },
  valueContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Kaudi;
