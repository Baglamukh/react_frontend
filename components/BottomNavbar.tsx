import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function CustomBottomNavbar() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation(); // To handle navigation
  const [activeTab, setActiveTab] = useState('index'); // State to track the active tab

  // Custom function to navigate and set the active tab
  const navigateTo = (screen) => {
    setActiveTab(screen); // Update the active tab state
    navigation.navigate(screen); // Navigate to the selected screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigateTo('index')}>
        <FontAwesome
          name="home"
          size={24}
          color={activeTab === 'index' ? Colors[colorScheme ?? 'light'].tint : '#555'} // Active color
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'index' ? Colors[colorScheme ?? 'light'].tint : '#555' },
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigateTo('message')}>
        <FontAwesome
          name="comments"
          size={24}
          color={activeTab === 'message' ? Colors[colorScheme ?? 'light'].tint : '#555'} // Active color
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'message' ? Colors[colorScheme ?? 'light'].tint : '#555' },
          ]}>
          Message
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigateTo('sankalp')}>
        <Text
          style={[
            styles.sankalpText,
            { color: activeTab === 'sankalp' ? Colors[colorScheme ?? 'light'].tint : '#555' },
          ]}>
          ॐ
        </Text>
        <Text
          style={[
            styles.SankalpText,
            { color: activeTab === 'sankalp' ? Colors[colorScheme ?? 'light'].tint : '#555' },
          ]}>
          Sankalp
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigateTo('about')}>
        <FontAwesome
          name="info-circle"
          size={24}
          color={activeTab === 'about' ? Colors[colorScheme ?? 'light'].tint : '#555'} // Active color
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'about' ? Colors[colorScheme ?? 'light'].tint : '#555' },
          ]}>
          About
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color of the bottom navbar
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Border at the top of the navbar
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#555', // Default text color for the nav buttons
    marginTop: 5,
  },
  SankalpText: {
    fontSize: 12,
    color: '#555', // Default text color for the nav buttons
    marginTop: 1,
  },
  sankalpText: {
    fontSize: 22, // Larger size for the Om symbol
    fontWeight: 'bold',
  },
});
