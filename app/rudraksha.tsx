import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import * as Speech from 'expo-speech'; // Importing expo-speech
import CustomBottomNavbar from '@/components/BottomNavbar';

// Sample JSON data
const data = {
    "एक मुखी रुद्राक्ष": {
        "title": "एक मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "एक मुखी रुद्राक्ष को भगवान शिव का साकार रूप माना जाता है। इसे खोजना अत्यंत दुर्लभ और कठिन है। यह सूर्य से जुड़ा हुआ है और विभिन्न स्वास्थ्य समस्याओं जैसे हड्डियों के रोग, हृदय की समस्याएं, पेट की समस्याएं, और नेत्र रोगों को दूर करने में सहायक होता है। इसे पहनने से मुक्ति या मोक्ष प्राप्ति में भी मदद मिलती है और शांति, समृद्धि, और आध्यात्मिक विकास को बढ़ावा मिलता है।"
    },
    "दो मुखी रुद्राक्ष": {
        "title": "दो मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "दो मुखी रुद्राक्ष शिव और शक्ति के एक साथ आने का प्रतीक है। यह जीवन की विपरीत शक्तियों को संतुलित करने, संघर्ष को सुलझाने, और रिश्तों में सद्भाव बढ़ाने में मदद करता है। विवाह योग्य लोगों के लिए, यह रुद्राक्ष विवाह में देरी की समस्या को हल करने में सहायक होता है।"
    },
    "तीन मुखी रुद्राक्ष": {
        "title": "तीन मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "तीन मुखी रुद्राक्ष पवित्र त्रिमूर्ति यानी ब्रह्मा, विष्णु, और महेश का प्रतीक है। यह सृजन, संरक्षण, और विनाश के जीवन चक्र को दर्शाता है। इसे पहनने से साहस और आत्मविश्वास बढ़ता है। यह अग्नि देवता से भी जुड़ा होता है, जिससे स्वास्थ्य में सुधार और जीवन में समृद्धि आती है।"
    },
    "चार मुखी रुद्राक्ष": {
        "title": "चार मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "चार मुखी रुद्राक्ष चार वेदों, चार दिशाओं, और भगवान ब्रह्मा से जुड़ा हुआ है। यह छात्रों को शिक्षा में बेहतर प्रदर्शन करने में मदद करता है और फोकस और स्थिरता को बढ़ाता है।"
    },
    "पांच मुखी रुद्राक्ष": {
        "title": "पांच मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "पांच मुखी रुद्राक्ष, जिसे कालाग्नि रुद्राक्ष भी कहा जाता है, जीवन के पांच तत्वों यानी वायु, जल, भूमि, आकाश, और अग्नि से जुड़ा है। यह भौतिक स्व को आध्यात्मिक स्व के साथ संरेखित करता है।"
    },
    "छह मुखी रुद्राक्ष": {
        "title": "छह मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "छह मुखी रुद्राक्ष भगवान कार्तिकेय से संबंधित है। यह इच्छाशक्ति, साहस, और दृढ़ संकल्प को बढ़ाता है। इसे पहनने से समृद्धि आती है और देवी लक्ष्मी की कृपा प्राप्त होती है।"
    },
    "सात मुखी रुद्राक्ष": {
        "title": "सात मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "सात मुखी रुद्राक्ष मानव शरीर के सात चक्रों से संबंधित है। यह आध्यात्मिक ज्ञान, अंतर्ज्ञान, और सुरक्षा प्रदान करता है। इसे पहनने से शनि के दुष्प्रभाव को कम किया जा सकता है।"
    },
    "आठ मुखी रुद्राक्ष": {
        "title": "आठ मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "आठ मुखी रुद्राक्ष भगवान गणेश का प्रतीक है, जो जीवन की बाधाओं को दूर करने में सहायक होता है। यह केतु के नकारात्मक प्रभावों को खत्म करने में मदद करता है।"
    },
    "नौ मुखी रुद्राक्ष ": {
        "title": "नौ मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "नौ मुखी रुद्राक्ष मां दुर्गा के 9 रूपों से जुड़ा है। यह नकारात्मक ऊर्जाओं से सुरक्षा प्रदान करता है और आत्म-शक्ति, दृढ़ संकल्प, और फोकस को बढ़ाता है। यह नौ ग्रहों को संतुलित करने में सक्षम होता है।"
    },
    "दस मुखी रुद्राक्ष ": {
        "title": "दस मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "दस मुखी रुद्राक्ष भगवान कृष्ण का प्रतिनिधित्व करता है और नेतृत्व गुण, अधिकार, और करिश्मा को बढ़ाता है। यह भावनात्मक संतुलन, अनिद्रा, चिंता, और अवसाद जैसी समस्याओं में मदद करता है।"
    },
    "ग्यारह मुखी रुद्राक्ष ": {
        "title": "ग्यारह मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "ग्यारह मुखी रुद्राक्ष भगवान हनुमान से संबंधित है। यह साहस, शक्ति, और जीवन की चुनौतियों का सामना करने में मदद करता है। यह क्रोध प्रबंधन, निर्णय लेने, और आध्यात्मिक विकास में सहायक होता है।"
    },
    "बारह मुखी रुद्राक्ष ": {
        "title": "बारह मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "बारह मुखी रुद्राक्ष भगवान सूर्य से संबंधित है और उग्र ऊर्जाओं के हानिकारक प्रभावों से सुरक्षा प्रदान करता है। यह गर्मी और आग से जुड़ी बीमारियों और भय से बचाता है।"
    },
    " तेरह मुखी रुद्राक्ष": {
        "title": "तेरह मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "तेरह मुखी रुद्राक्ष को कामदेव, भगवान इंद्र, और देवी महालक्ष्मी का आशीर्वाद प्राप्त है। यह इच्छाओं को पूरा करता है, प्यार को आकर्षित करता है, और अभिव्यक्ति और करिश्मा को बढ़ाता है।"
    },
    "चौदह मुखी रुद्राक्ष ": {
        "title": "चौदह मुखी रुद्राक्ष",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "चौदह मुखी रुद्राक्ष चौदह विद्याओं या कौशलों से जुड़ा है। इसे पहनने से शारीरिक और मानसिक लाभ होते हैं और यह शनि ग्रह के अशुभ प्रभावों को दूर करने में सहायक होता है।"
    },
    "रुद्राक्ष पहनने के फायदे ": {
        "title": "रुद्राक्ष पहनने के फायदे",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "रुद्राक्ष पहनने के कई लाभ होते हैं। ये पवित्र मोती आपके जीवन को सकारात्मक तरीके से बदलने की शक्ति रखते हैं। प्रत्येक मुखी रुद्राक्ष का अपना विशिष्ट प्रभाव होता है, लेकिन सामान्य तौर पर, रुद्राक्ष पहनने से निम्नलिखित लाभ होते हैं: सकारात्मक परिणाम: रुद्राक्ष आपके प्रयासों के सकारात्मक परिणाम को बढ़ाता है। नकारात्मक ऊर्जा से सुरक्षा: यह आपको नकारात्मक ऊर्जाओं से बचाता है। शारीरिक और भावनात्मक संतुलन: यह आपकी शारीरिक बीमारियों को ठीक करने के साथ-साथ आपकी भावनाओं को भी संतुलित कर सकता है। कर्म चक्र संतुलन: रुद्राक्ष पहनने से आपका कर्म चक्र संतुलित हो सकता है और आप शनि और राहु जैसे ग्रहों के दुष्प्रभाव से बच सकते हैं। दुर्घटनाओं से बचाव: यह आपको दुर्घटनाओं और दुर्भाग्यपूर्ण घटनाओं से बचाता है। साहस और शक्ति: रुद्राक्ष पहनने से आपको साहस, शक्ति, इच्छाशक्ति, दृढ़ संकल्प और जीवन शक्ति मिलती है। चक्र संतुलन: रुद्राक्ष मानव शरीर में चक्रों को संतुलित करता है और व्यक्ति को बड़ी शक्तियों के साथ संरेखित करता है। समृद्धि और सफलता: आप रुद्राक्ष की माला पहनकर प्रचुरता, सफलता और समृद्धि को आकर्षित कर सकते हैं। आध्यात्मिक जागृति: आध्यात्मिक जागृति और आंतरिक स्व से जुड़ना तब बहुत आसान हो जाता है जब आप एक सक्रिय रुद्राक्ष पहनते हैं जो आपके लिए सबसे उपयुक्त है।"
    },
    "रुद्राक्ष धारण करने की प्रक्रिया ": {
        "title": "रुद्राक्ष धारण करने की प्रक्रिया",
        "image" : "https://miro.medium.com/v2/resize:fit:580/1*Lthvq42RPSBLZKe41r7tZA.jpeg",
        "story": "रुद्राक्ष पहनते समय यह ध्यान रखना महत्वपूर्ण है कि अधिकतम लाभ प्राप्त करने के लिए सही रुद्राक्ष का चयन करना आवश्यक है। आपके लिए कौन सा मुखी रुद्राक्ष उपयुक्त रहेगा, यह जानने के लिए सिर्फ राशियों पर निर्भर नहीं रहना चाहिए। रुद्राक्ष पहनने का कोई नकारात्मक प्रभाव नहीं होता, लेकिन किसी भी रुद्राक्ष की माला खरीदने या पहनने से पहले किसी ज्योतिषी या विशेषज्ञ से परामर्श करना उचित होता है। रुद्राक्ष कैलकुलेटर का उपयोग करके यह पहचानना संभव है कि कौन सा रुद्राक्ष आपके लिए सबसे उपयुक्त होगा। एक बार जब आप यह जान लें कि आपको कौन सा रुद्राक्ष पहनना चाहिए, तो सुनिश्चित करें कि आप इसे विश्वसनीय विक्रेता से खरीदें जहां आपको प्रमाणपत्र मिलेगा जो मनके के 100% प्राकृतिक और प्रामाणिक होने का वादा करता है। रुद्राक्ष धारण करने के लिए एक निश्चित दिन निर्धारित होता है, जो मुखी रुद्राक्ष के ग्रह से संबंधित होता है। यदि यह प्रक्रिया आपको भ्रमित करती है, तो आप सोमवार की सुबह को रुद्राक्ष पहनने का सबसे अच्छा समय मान सकते हैं। रुद्राक्ष पहनने के दौरान इसे शुद्ध और ऊर्जावान बनाना आवश्यक होता है। ऐसा करने के लिए, मनके को पवित्र जल में डुबोएं या उसमें दूध या शहद मिलाएं। पवित्र रुद्राक्ष की सकारात्मक ऊर्जा को जागृत करने के लिए मंत्रों का जाप करें। आपका इरादा और श्रद्धा सबसे महत्वपूर्ण होते हैं, जो रुद्राक्ष के प्रभाव को बढ़ाते हैं। रुद्राक्ष आपके जीवन को बदल सकता है और आपकी सभी समस्याओं से छुटकारा दिला सकता है। हमारे कैलकुलेटर के माध्यम से यह जानें कि आपको कौन सा मुखी रुद्राक्ष पहनना चाहिए और इसे अपने जीवन का अभिन्न अंग बनाएं। "
    }
};

const Rudraksha = () => {
    const [selectedItem, setSelectedItem] = useState(Object.keys(data)[0]);

    // Handle dropdown change
    const handleChange = (itemValue) => {
        setSelectedItem(itemValue);
    };

    // Get selected data
    const selectedData = data[selectedItem];

    // Function to handle speech
    const speakText = () => {
        Speech.speak(selectedData.story, {
            language: 'hi', // Set language to Hindi
            pitch: 1,
            rate: 1,
        });
    };

    return (
        <>
        <View style={styles.container}>
            <Picker
                selectedValue={selectedItem}
                onValueChange={handleChange}
                style={styles.picker}
            >
                {Object.keys(data).map((key) => (
                    <Picker.Item key={key} label={key} value={key} />
                ))}
            </Picker>


                <Image source={{ uri: selectedData.image }} style={styles.image} />
                <Text style={styles.subtitle}>{selectedData.title}</Text>
                <TouchableOpacity onPress={speakText}>
                <Text style={styles.storyText}>{selectedData.story}</Text>
                </TouchableOpacity>
                </View>
            <CustomBottomNavbar />
            </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
    },
    contentContainer: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        flexGrow: 1,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    storyText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Rudraksha;
