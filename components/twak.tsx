import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const WhatsAppButton = () => {
  const openWhatsApp = (phoneNumber) => {
    const message = 'hello world';  // Replace with your message
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Open the WhatsApp URL
    Linking.openURL(url).catch(err => console.error("Error opening WhatsApp", err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.whatsAppButton} onPress={openWhatsApp}>
        {/* Button content (can add icon or text if needed) */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Center the button vertically
    alignItems: 'center',       // Center the button horizontally
  },
  whatsAppButton: {
    width: 60,
    height: 60,
    borderRadius: 30,           // Circular button
    backgroundColor: '#25D366', // WhatsApp green color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,               // Shadow for Android
    shadowColor: '#000',        // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default WhatsAppButton;
