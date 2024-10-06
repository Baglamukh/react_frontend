import CustomBottomNavbar from '@/components/BottomNavbar';
import React from 'react';
import { Link } from '@react-navigation/native'; // Assuming you're using React Navigation
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Ankdasa = ({ tableData, inputValue }) => {
    if (!tableData || tableData.length === 0) return null;

    const getMaxRows = (data) => {
        return Math.max(...data.map(partData => partData.length));
    };

    const reduceToSingleDigit = (num) => {
        while (num > 9) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    };

    const maxRows = getMaxRows(tableData);
    const navigation = useNavigation(); // For navigation

    return (
        <>
            <View style={{ flexDirection: 'row',  backgroundColor: 'white', padding: 16, borderRadius: 8, elevation: 2 }}>
            <Text style={{ padding: 8, marginLeft:4, fontWeight: 'bold', }}>Lu Shu Grid</Text>
            <Link to="/numberdetails" style={{ padding: 8, marginLeft:14, fontWeight: 'bold', }} onPress={() => navigation.navigate('numberdetails')}><Text>Number Details</Text></Link>
            <Link to="/ankdasa" style={{ padding: 8, marginLeft:14, fontWeight: 'bold' }} onPress={() => navigation.navigate('ankdasa')}><Text>Ank Dasa</Text></Link>

          </View>
            <ScrollView style={styles.container}>
                <View style={styles.table}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Y</Text>
                        {inputValue.split(' ').map((_, index) => (
                            <View key={index}>
                                <Text style={styles.headerText}>{`C${index + 1}                 `}</Text>
                                <Text style={styles.headerText2}>{`V${index + 1}`}</Text>
                            </View>
                        ))}
                        <Text style={styles.headerText}>PT</Text>
                    </View>
                    {Array.from({ length: maxRows }).map((_, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            <Text style={styles.cell}>{rowIndex + 1}</Text>
                            {tableData.map((partData, partIndex) => (
                                <React.Fragment key={partIndex}>
                                    <Text style={styles.cell}>{partData[rowIndex]?.character.toUpperCase() || ''}</Text>
                                    <Text style={styles.cell}>{partData[rowIndex]?.value || ''}</Text>
                                </React.Fragment>
                            ))}
                            <Text style={styles.cell}>
                                {reduceToSingleDigit(tableData.reduce((sum, partData) => sum + (partData[rowIndex]?.value || 0), 0))}
                            </Text>
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
        flex: 1,
        padding: 16,
        backgroundColor: '#F3F4F6',
      
    },
    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 120,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f9fafb',
        padding: 8,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6b7280',
    },
    headerText2: {
        flex: 1,
        fontWeight: 'bold',
        marginLeft: 45,
        color: '#6b7280',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 8,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#4b5563',
    },
});

export default Ankdasa;
