import CustomBottomNavbar from '@/components/BottomNavbar';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Numbirth = ({
  month,
  inputValue,
  setInputValue,
  age,
  setAge,
  setMonth,
  inputNumber,
  handleInputChange,
  dateOfBirth,
  setDateOfBirth,
  anotherDate,
  setAnotherDate,
  handleGenerate,
}) => {
    const navigation = useNavigation(); // For navigation
  const handleDateOfBirthChange = (date) => setDateOfBirth(date);
  const handleAnotherDateChange = (date) => setAnotherDate(date);

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customer Details</Text>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            placeholder="Enter your name"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date of Birth Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={dateOfBirth}
            onChangeText={handleDateOfBirthChange}
            placeholder="YYYY-MM-DD"
          />
          <TouchableOpacity style={styles.button} onPress={() => setDateOfBirth(new Date().toISOString().split('T')[0])}>
            <Text style={styles.buttonText}>Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Another Date Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Another Date</Text>
        <TextInput
          style={styles.input}
          value={anotherDate}
          onChangeText={handleAnotherDateChange}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* Month Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Month</Text>
        <TextInput
          style={styles.input}
          value={month}
          onChangeText={(text) => setMonth(text)}
          placeholder="Enter month"
        />
      </View>

      {/* Age Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Enter age"
          keyboardType="numeric"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleGenerate}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 90,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
});

export default Numbirth;
