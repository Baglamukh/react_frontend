import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import BottomNavbar from "../components/BottomNavbar";

const VastuServices = () => {
  const handleContactPress = () => {
    Alert.alert("Contact", "You can reach us at: 8302933196");
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>घर या जमीन की जांच निःशुल्क करवाएं</Text>
        <Text style={styles.paragraph}>
          अगर आप अपने घर का नक्शा बनवाना चाहते हैं, वास्तु के अनुसार अपने घर की
          जांच करवाना चाहते हैं, या अपनी जमीन की चेकिंग कराना चाहते हैं, तो
          हमसे इस नंबर पर संपर्क करें। आप हमारी सेवा का लाभ उठाते हुए हमारे काफल
          ऐप पर फॉर्म भर सकते हैं और यह सभी सेवाएं निःशुल्क प्राप्त कर सकते हैं।
          हमारी टीम द्वारा जो विशेषज्ञ आपके घर या जमीन की जांच करने आएंगे,
          उनकी जानकारी आपको आपके मोबाइल नंबर पर भेज दी जाएगी।
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleContactPress}>
            <Text style={styles.buttonText}>अधिक जानकारी के लिए संपर्क करें</Text>
            <Text style={styles.contactNumber}>8302933196</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4A5568',
  },
  paragraph: {
    fontSize: 18,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4299E1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  contactNumber: {
    marginTop: 4,
    color: 'white',
  },
});

export default VastuServices;
