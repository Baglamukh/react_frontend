import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const carouselItems = [
  { id: '1', title: 'जिससे आप प्यार करते है उससे क्या\nहोगी आपकी शादी ', icon: '💑' },
  { id: '2', title: 'खुद का मकान बनेगा या नही', icon: '🏠' },
  { id: '3', title: 'कब मिलेगी सफलता', icon: '📅' },
];

const astrologers = [
    {
      id: '1',
      name: 'Vaidhurya Sharma',
      image: 'https://www.shutterstock.com/image-vector/cute-looking-south-indian-pandit-260nw-1290454330.jpg', // Replace with actual image URL
      expertise: '\nExpert in Vedic Astrology, Palmistry, Vastu, Numerology and etc',
      phoneno : '+918302933196'
    },
    {
      id: '2',
      name: 'Ashish Vyas',
      image: 'https://www.shutterstock.com/image-vector/cute-looking-south-indian-pandit-260nw-1290454330.jpg', // Replace with actual image URL
      expertise: '\nSpecializes in Vedic Astrology',
      phoneno : '+918058560370'
    },
  ];

export default function Message() {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);
  const currentIndex = useRef(0); // To keep track of the current index

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <View style={styles.image}>
      <Text style={styles.icon}>{item.icon}<View><Text style={styles.title}>{item.title}</Text></View></Text>
      
      </View>
    </View>
  );

  // Function to handle automatic sliding
  const autoSlide = () => {
    currentIndex.current = (currentIndex.current + 1) % carouselItems.length; // Update current index
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }
  };

  useEffect(() => {
    // Start the auto sliding effect
    intervalRef.current = setInterval(autoSlide, 3000); // Change slide every 3 seconds

    return () => {
      // Cleanup on component unmount
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleCall = (phoneNumber) => {
    // Check if the phone number is valid
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const renderAstrologerItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.expertise}>{item.expertise}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleCall(item.phoneno)}>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openWhatsApp(item.phoneno)}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );

  const openWhatsApp = (phoneNumber) => {
    const message = 'hello world';  // Replace with your message
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Open the WhatsApp URL
    Linking.openURL(url).catch(err => console.error("Error opening WhatsApp", err));
  };

  return (
    <>
    <View style={styles.smallcontainer}>
      <View style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#9333EA']} // Set your gradient colors here
        style={styles.gradient}
      >
        <FlatList
          ref={flatListRef}
          data={carouselItems}
          renderItem={renderCarouselItem}
          horizontal={true} // Set to true for horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide the scroll indicator
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.carousel} // Additional styles for the carousel
          snapToInterval={310} // Match the width of the items for snapping effect (+ margin)
          decelerationRate="fast" // For smooth scrolling
          snapToAlignment="start" // Align to the start of the item
          onScrollToIndexFailed={() => {}} // Handle potential errors from scrolling
          onViewableItemsChanged={({ viewableItems }) => {
            const index = viewableItems[0]?.index || 0;
            currentIndex.current = index; // Keep track of the current index
          }}
        />
        </LinearGradient>
      </View>
      <FlatList
        data={astrologers}
        renderItem={renderAstrologerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
    <View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  smallcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden', // Ensures the gradient background does not exceed rounded corners
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  carousel: {
    paddingHorizontal: 10, // Horizontal padding for the carousel
  },
  carouselItem: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10, // Space between items
  },
  icon : {
    fontSize: 50, 
  },
  image: {
    width: 300,
    height: 80,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  expertise: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8, // Adds spacing between name and expertise
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space out buttons
    width: '100%', // Ensure buttons take full width of container
  },
  button: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5, // Space between buttons
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
