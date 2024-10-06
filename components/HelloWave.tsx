import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // You can use Feather, Ionicons, or any other icon library

export default function Navbar () {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm(''); // Clear search term when closing the search bar
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const countries = [
    { name: 'India', link: 'https://example.com/india' },
    { name: 'United States', link: 'https://example.com/usa' },
    { name: 'Canada', link: 'https://example.com/canada' },
    { name: 'Australia', link: 'https://example.com/australia' },
    { name: 'United Kingdom', link: 'https://example.com/uk' },
    // Add more countries as needed
  ];

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.header}>
      <View style={styles.flexRow}>
        {isSearchOpen ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              autoFocus
            />
            <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
              <Icon name="x" size={24} color="white" />
            </TouchableOpacity>
            {searchTerm && (
              <View style={styles.searchResults}>
                {filteredCountries.length > 0 ? (
                  <FlatList
                    data={filteredCountries}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                      <Text style={styles.resultItem}>{item.name}</Text>
                    )}
                  />
                ) : (
                  <Text style={styles.resultItem}>No results found</Text>
                )}
              </View>
            )}
          </View>
        ) : (
          <>
            <View style={styles.brandContainer}>
              <Icon name="star" size={24} color="white" />
              <Text style={styles.brandText}>BTTS</Text>
            </View>

            <View style={styles.brandContainer}>
            <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleNav} style={styles.iconButton}>
              <Icon name="menu" size={24} color="white" />
            </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Navigation Modal */}
      <Modal visible={isNavOpen} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleNav} style={styles.closeButton}>
            <Icon name="x" size={24} color="white" />
          </TouchableOpacity>
          <FlatList
            data={countries}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Text style={styles.navItem}>{item.name}</Text>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#151718', // Use your desired color here
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  flexRow: {
    marginTop :30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  iconButton: {
    marginLeft: 8,
    padding: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  searchResults: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#151718',
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  navItem: {
    paddingVertical: 16,
    color: 'white',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
});

