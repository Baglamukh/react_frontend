import CustomBottomNavbar from '@/components/BottomNavbar';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const predictionMap = {
    N_kitchen : ' \nKitchen in the North is inauspicious and can disturb finances\n',
    SW_kitchen : '\n Unstable family health and relationships\n',
    W_kitchen : ' \nCan lead to financial growth but affects family harmony\n',
    E_kitchen : ' \nModerately good, enhances social connections\n',
    S_kitchen : ' \nBrings good health and vitality to family members\n',
    NW_kitchen : ' \nCauses health issues for women\n',
    NE_kitchen : ' \nHighly inauspicious, affects overall prosperity\n',
    SE_kitchen : ' \nIdeal direction for the kitchen, enhances wealth\n',
    
    N_homeentrance : ' \nBrings wealth and prosperity\n',
    SW_homeentrance : ' \nCauses instability and health issues for the head of the family\n',
    W_homeentrance : ' \nGood for networking and gaining fame\n',
    E_homeentrance : ' \nPromotes new opportunities and growth\n',
    S_homeentrance : ' \nCan lead to struggle, but stabilizes over time\n',
    NW_homeentrance : ' \nEncourages travel and movement, good for business\n',
    NE_homeentrance : ' \nAuspicious, brings harmony and spiritual growth\n',
    SE_homeentrance : ' \nCauses conflicts and legal troubles\n',
    
    N_bedroom : ' \nCauses mental stress and restlessness\n',
    SW_bedroom : ' \nIdeal for the master bedroom, brings stability\n',
    W_bedroom : ' \nGood for relaxation and sound sleep\n',
    E_bedroom : ' \nEnhances positivity and energy\n',
    S_bedroom : ' \nHelps in maintaining discipline\n',
    NW_bedroom : ' \nCauses instability in relationships\n',
    NE_bedroom : ' \nDisturbs mental peace and health\n',
    SE_bedroom : ' \nCan cause irritability and health issues\n',
    
    N_toilet :' \nFinancial losses\n',
    SW_toilet :' \nHealth problems and family disputes\n',
    W_toilet :' \nModerately acceptable but affects mental peace\n',
    E_toilet :' \nAffects social reputation\n',
    S_toilet :' \nHealth issues, especially digestive problems\n',
    NW_toilet :' \nCan cause arguments and misunderstandings\n',
    NE_toilet :' \nExtremely inauspicious, disturbs overall harmony\n',
    SE_toilet :' \nCan lead to family disputes\n',
    
    N_temple : ' \nEnhances financial blessings\n',
    SW_temple  : ' \nHighly inauspicious, spiritual instability\n',
    W_temple  : ' \nModerately auspicious, helps in spiritual growth\n',
    E_temple  : ' \nMost auspicious direction for the temple\n',
    S_temple  : ' \nAffects spiritual growth, causes delays\n',
    NW_temple  : ' \nLeads to spiritual confusion\n',
    NE_temple  : ' \nHighly auspicious for the temple, brings harmony\n',
    SE_temple  : ' \nCauses unnecessary expenditure\n',
    
    N_guestroom  : ' \nBrings helpful guests and good networking\n',
    SW_guestroom  : ' \nIncreases dominance of guests over the family\n',
    W_guestroom  : ' \nGood for receiving guests who bring opportunities\n',
    E_guestroom  : ' \nBrings friendly and well-wishing guests\n',
    S_guestroom  : ' \nCan lead to conflict with guests\n',
    NW_guestroom  : ' \nIdeal for frequent guests, good interactions\n',
    NE_guestroom  : ' \nBrings spiritual guests or peaceful company\n',
    SE_guestroom  : ' \nCan cause tension with guests\n',
    
    N_servantroom  : ' \nBrings loyal and helpful servants\n',
    SW_servantroom  : ' \nCan cause dominance by servants\n',
    W_servantroom  : ' \nModerate, ensures responsible behavior\n',
    E_servantroom  : ' \nGood for harmonious relationships with servants\n',
    S_servantroom  : ' \nCauses conflicts with servants\n',
    NW_servantroom  : ' \nIdeal for maintaining distance yet good relations\n',
    NE_servantroom  : ' \nInauspicious, affects harmony\n',
    SE_servantroom  : ' \nLeads to misunderstandings with servants\n',
    
    N_barroom  : ' \nAffects wealth, not recommended\n',
    SW_barroom  : ' \nCan cause overindulgence and health issues\n',
    W_barroom  : ' \nModerately good, leads to social success\n',
    E_barroom  : ' \nNot ideal, can create family disputes\n',
    S_barroom  : ' \nCan lead to addiction and health issues\n',
    NW_barroom  : ' \nGood for socializing\n',
    NE_barroom  : ' \nHighly inauspicious, affects family peace\n',
    SE_barroom  : ' \nCauses impulsive behavior and disputes\n',
    
    N_staircase  : ' \nCan cause financial challenges\n',
    SW_staircase  : ' \nStable but slow progress in life\n',
    W_staircase  : ' \nEncourages growth but affects relationships\n',
    E_staircase  : ' \nBrings steady progress and opportunities\n',
    S_staircase  : ' \nCauses struggle in personal and professional life\n',
    NW_staircase  : ' \nBrings frequent changes and instability\n',
    NE_staircase  : ' \nHighly inauspicious, disturbs harmony\n',
    SE_staircase  : ' \nCauses arguments and emotional instability\n',
    
    N_drawingroom  : ' \nPromotes wealth and friendly relationships\n',
    SW_drawingroom  : ' \nBrings dominance and arguments\n',
    W_drawingroom  : ' \nIdeal for building social connections\n',
    E_drawingroom  : ' \nEncourages peaceful conversations and positivity\n',
    S_drawingroom  : ' \nCan lead to conflict or emotional stress\n',
    NW_drawingroom  : ' \nGood for hosting guests and travel-related activities\n',
    NE_drawingroom  : ' \nBest for peaceful and harmonious gatherings\n',
    SE_drawingroom  : ' \nCan lead to disputes and misunderstandings\n',
    
    N_childrenroom  : ' \nCan cause distractions in studies\n',
    SW_childrenroom  : ' \nCauses emotional instability and nightmares\n',
    W_childrenroom  : ' \nPromotes creativity and growth\n',
    E_childrenroom  : ' \nIdeal for academic focus and positivity\n',
    S_childrenroom  : ' \nGood for discipline and health\n',
    NW_childrenroom  : ' \nCan lead to restless behavior in children\n',
    NE_childrenroom  : ' \nHighly auspicious for spiritual growth\n',
    SE_childrenroom  : ' \nCauses emotional distress and irritability\n',
    
    N_storeroom  : ' \nLeads to blocked financial growth\n',
    SW_storeroom  : ' \nGood for storing valuables, ensures stability\n',
    W_storeroom  : ' \nCauses moderate accumulation of resources\n',
    E_storeroom  : ' \nAffects opportunities, not ideal for storing\n',
    S_storeroom  : ' \nEnsures steady growth in stored wealth\n',
    NW_storeroom  : ' \nCan lead to mismanagement of resources\n',
    NE_storeroom  : ' \nHighly inauspicious for storage, affects harmony\n',
    SE_storeroom  : ' \nCauses instability in finances\n',
    };

const Vastuprediction = () => {
    const { floorsData } = useSelector((state) => state.map);
    const [currentPredictionIndex, setCurrentPredictionIndex] = useState(0);
    const [predictionList, setPredictionList] = useState([]);

    const checkForPredictions = (direction, type) => {
        const predictionKey = `${direction}_${type}`;
        const prediction = predictionMap[predictionKey];
        console.log(`Key: ${predictionKey}, Prediction: ${prediction}`);
        return prediction || '';
    };

    useEffect(() => {
        const predictions = floorsData.flatMap(floor => (
            floor.rooms.map(room => checkForPredictions(room.direction, room.type))
        ));
        setPredictionList(predictions);
    }, [floorsData]);

    console.log(predictionList)

   

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Room Predictions</Text>
                <ScrollView contentContainerStyle={styles.predictionContainer} showsVerticalScrollIndicator={false}>
                    {predictionList.length > 0 ? (
                        <Text style={styles.predictionText}>{predictionList}</Text> // Display the current prediction
                    ) : (
                        <Text style={styles.predictionText}>No predictions available.</Text>
                    )}
                </ScrollView>
            </View>
            <CustomBottomNavbar />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingBottom: 90,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    predictionContainer: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    predictionText: {
        fontSize: 18,
    },
});

export default Vastuprediction;
