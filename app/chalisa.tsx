import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import * as Speech from 'expo-speech'; // Importing expo-speech
import CustomBottomNavbar from '@/components/BottomNavbar';

// Sample JSON data
const data = {
    " दुर्गा चालीसा": {
        "title": " दुर्गा चालीसा",
        "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWZoUxrL1_D0Aw6draDSU6JUa9sQZOPeCzA&s",
        "story": "सर्व मंगल मांगल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यंबके गौरि, नारायणि नमोऽस्तु ते ।। नमो नमो दुर्गे सुख करनी। नमो नमो दुर्गे दुःख हरनी ।।  निरंकार है ज्योति तुम्हारी । तिहुँ लोक फैली उजियारी।। शशि ललाट मुख महाविशाला। नेत्र लाल भृकुटि विकराला ।।  रूप मातु को अधिक सुहावे। दरश करत जन अति सुख पावे ।।  तुम संसार शक्ति लै कीना। पालन हेतु अन्न धन दीना ।।  अन्नपूर्णा हुई जग पाला। तुम ही आदि सुन्दरी बाला ।।  प्रलयकाल सब नाशन हारी। तुम गौरी शिवशंकर प्यारी ।।  शिव योगी तुम्हरे गुण गावें। ब्रह्मा विष्णु तुम्हें नित ध्यावें ।।  रूप सरस्वती को तुम धारा। दे सुबुद्धि ऋषि मुनिन उबारा ।।  धरयो रूप नरसिंह को अम्बा। परगट भई फाड़कर खम्बा ।।  रक्षा करि प्रह्लाद बचायो । हिरण्याक्ष को स्वर्ग पठायो ।।  लक्ष्मी रूप धरो जग माहीं। श्री नारायण अंग समाहीं ।।  क्षीरसिन्धु में करत विलासा। दयासिन्धु दीजै मन आसा ।।  हिंगलाज में तुम्हीं भवानी। महिमा अमित न जात बखानी ।।  मातंगी धूमावति माता। भुवनेश्वरी बगला सुख दाता ।।  श्री भैरव तारा जग तारिणी। छिन्न भाल भव दुःख निवारिणी ।। केहरि वाहन सोह भवानी। लांगुर वीर चलत अगवानी ।। कर में खप्पर खड्ग विराजै । जाको देख काल डर भाजै ।।  सोहै अस्त्र और त्रिशूला। जाते उठत शत्रु हिय शूला ।।  नगरकोट में तुम्हीं विराजत । तिहुँलोक में डंका बाजत ।। शुम्भ निशुम्भ दानव तुम मारे। रक्तबीज शंखन संहारे ।।  महिषासुर नृप अति अभिमानी। जेहि अघ भार मही अकुलानी ।।  रूप कराल कालिका धारा। सेन सहित तुम तिहि संहारा ।।  परी गाढ़ सन्तन पर जब जब । भई सहाय मातु तुम तब तब ।। अमरपुरी अरु बासव लोका। तब महिमा सब रहें अशोका ।।  ज्वाला में है ज्योति तुम्हारी । तुम्हें सदा पूजें नरनारी ।।  प्रेम भक्ति से जो यश गावें। दुःख दारिद्र निकट नहिं आवें ।।  ध्यावे तुम्हें जो नर मन लाई। जन्ममरण ताकौ छुटि जाई ।।  जोगी सुर मुनि कहत पुकारी। योग न हो बिन शक्ति तुम्हारी ।।  शंकर आचारज तप कीनो। काम अरु क्रोध जीति सब लीनो ।।  निशिदिन ध्यान धरो शंकर को। काहु काल नहिं सुमिरो तुमको।।  शक्ति रूप का मरम न पायो। शक्ति गई तब मन पछितायो ।।  शरणागत हुई कीर्ति बखानी। जय जय जय जगदम्ब भवानी ।।  भई प्रसन्न आदि जगदम्बा। दई शक्ति नहिं कीन विलम्बा ।।  मोको मातु कष्ट अति घेरो। तुम बिन कौन हरै दुःख मेरो ।।  आशा तृष्णा निपट सतावें। मोह मदादिक सब बिनशावें ।।  शत्रु नाश कीजै महारानी। सुमिरौं इकचित तुम्हें भवानी।।  करो कृपा हे मातु दयाला। ऋद्धिसिद्धि दै करहु निहाला ।।  जब लगि जिऊँ दया फल पाऊँ । तुम्हरो यश मैं सदा सुनाऊँ ।।  श्री दुर्गा चालीसा जो कोई गावै। सब सुख भोग परमपद पार्वै।। देवीदास शरण निज जानी। करहु कृपा जगदंब भवानी ॐ सर्वबाधा विनिर्मुक्तो, धन धान्य सुतान्वितः । मनुष्यो मत्प्रसादेन, भविष्यति न संशयः ।।"
    },
    "हनुमान चालीसा": {
        "title": "हनुमान चालीसा",
        "image" : "https://w0.peakpx.com/wallpaper/133/862/HD-wallpaper-lord-hanuman-lord-hanuman-ji-bajrangbali-ji-hanuman-ji-meditation-hanuman-ji-thumbnail.jpg",
        "story": "श्रीगुरु चरन सरोज रज निज मन मुकुरु सुधारि । बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ।। बुद्धिहीन तनु जानिकै सुमिरौं पवनकुमार । बल बुद्धि विद्या देहु मोहिं हरहु कलेस बिकार ।। जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर ।। राम दूत अतुलित बल धामा। अंजनिपुत्र पवनसुत नामा ।। महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी। कंचन बरन बिराज सुबेसा। कानन कुण्डल कुंचित केसा ।। हाथ बज्र औ ध्वजा बिराजै। काँधे मूंज जनेऊ साजै ।। संकर सुवन केसरीनंदन। तेज प्रताप महा जग बंदन।। विद्यावान गुनी अति चातुर। राम काज करिबे को आतुर ।। प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया ।। सूक्ष्म रूप धरि सियहिं दिखावा। विकट रूप धरि लंक जरावा ।। भीम रूप धरि असुर सँहारे। रामचंद्र के काज सँवारे ।। लाय संजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये ।। रघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई ।। सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं ।। सनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा ।। जम कुबेर दिगपाल जहाँ ते। कबि कोबिद कहि सके कहाँ ते ।। तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा।। तुम्हरो मंत्र बिभीषन माना । लंकेश्वर भए सब जग जाना।। युग सहस्त्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू ।। प्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं ।। दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते।। राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे।। सब सुख लहै तुम्हारी सरना। तुम रक्षक काहू को डरना ।। आपन तेज सम्हारो आपै । तीनों लोक हाँक तें काँपै ।। भूत पिसाच निकट नहिं आवै। महाबीर जब नाम सुनावै ।। नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा। संकट ते हनुमान छुड़ावै। मन क्रम बचन ध्यान जो लावै ।। सब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा ।। और मनोरथ जो कोई लावै । सोई अमित जीवन फल पावै ।। चारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा ।। साधु संत के तुम रखवारे। असुर निकंदन राम दुलारे ।। अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता ।। राम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा ।। तुम्हरे भजन राम को भावै। जनम जनम के दुख बिसरावै ।। अंत काल रघुबर पुर जाई। जहां जन्म हरिभक्त कहाई ।। और देवता चित्त न धरई। हनुमत सेई सर्ब सुख करई ।। संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा ।। जय जय जय हनुमान गोंसांई। कृपा करहु गुरु देव की नांई ।। जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई ।। जो यह पढ़े हनुमान चालीसा। होय सिद्धि साखी गौरीसा ।। तुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा ।। दोहा पवनतनय संकट हरन मंगल मूरति रूप। राम लखन सीता सहित हृदय बसहु सुर भूप ।।"
    },
    " शिव चालीसा": {
        "title": "शिव चालीसा",
        "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTaNFf3nLadngaLPf5PhJ6TcfC4syzWwcBw&s",
        "story": "श्री गणेश गिरिजा सुवन, मंगल मूल सुजान  कहत अयोध्यादास तुम, देहु अभय वरदान । जय गिरिजा पति दीन दयाला। सदा करत सन्तन प्रतिपाला ।। भाल चन्द्रमा सोहत नीके। कानन कुण्डल नागफनी के ।। अंग गौर शिर गंग बहाये। मुण्डमाल तन छार लगाये ।। वस्त्र खाल बाघम्बर सोहे। छवि को देख नाग मुनि मोहे ।। मैना मातु की ह्वै दुलारी। बाम अंग सोहत छवि न्यारी।। कर त्रिशूल सोहत छवि भारी। करत सदा शत्रुन क्षयकारी ।  नन्दि गणेश सोहै तहँ कैसे। सागर मध्य कमल हैं जैसे ।। कार्तिक श्याम और गणराऊ। या छवि को कहि जात न काऊ ।। देवन जबहीं जाय पुकारा। तब ही दुख प्रभु आप निवारा ।। किया उपद्रव तारक भारी। देवन सब मिलि तुमहिं जुहारी ।। तुरत षडानन आप पठायउ । लवनिमेष महँ मारि गिरायउ ।  आप जलंधर असुर संहारा। सुयश तुम्हार विदित संसारा ।। त्रिपुरासुर सन युद्ध मचाई। सबहिं कृपा कर लीन बचाई।। किया तपहिं भागीरथ भारी । पुरब प्रतिज्ञा तासु पुरारी ।  दानिन महं तुम सम कोउ नाहीं। सेवक स्तुति करत सदाहीं  वेद नाम महिमा तव गाई। अकथ अनादि भेद नहिं पाई।। प्रगट उदधि मंथन में ज्वाला। जरे सुरासुर भये विहाला ।  कीन्ह दया तहँ करी सहाई। नीलकण्ठ तब नाम कहाई ।। पूजन रामचंद्र जब कीन्हा। जीत के लंक विभीषण दीन्हा ।  सहस कमल में हो रहे धारी। कीन्ह परीक्षा तबहिं पुरारी  एक कमल प्रभु राखेउ जोई। कमल नयन पूजन चहं सोई।। कठिन भक्ति देखी प्रभु शंकर। भये प्रसन्न दिए इच्छित वर।। जय जय जय अनंत अविनाशी। करत कृपा सब के घटवासी ।। दुष्ट सकल नित मोहि सतावै। भ्रमत रहे मोहि चैन न आवै।। त्राहि त्राहि मैं नाथ पुकारो। यहि अवसर मोहि आन उबारो ।। लै त्रिशूल शत्रुन को मारो। संकट से मोहि आन उबारो ।। मातु पिता भ्राता सब कोई। संकट में पूछत नहिं कोई ।  स्वामी एक है आस तुम्हारी। आय हरहु अब संकट भारी।  धन निर्धन को देत सदाहीं। जो कोई जांचे वो फल पाहीं। अस्तुति केहि विधि करौं तुम्हारी। क्षमहु नाथ अब चूक हमारी। शंकर हो संकट के नाशन। मंगल कारण विघ्न विनाशन।। योगी यति मुनि ध्यान लगावैं। नारद शारद शीश नवावैं ।  नमो नमो जय नमो शिवाय। सुर ब्रह्मादिक पार न पाय।  जो यह पाठ करे मन लाई। ता पर होत है शम्भु सहाई ।। निया जो कोई हो अधिकारी। पाठ करे सो पावन हारी।। पुत्र हीन कर इच्छा कोई। निश्चय शिव प्रसाद तेहि होई ।  पण्डित त्रयोदशी को लावे। ध्यान पूर्वक होम करावे ।  त्रयोदशी व्रत करे हमेशा। तन नहीं ताके रहे कलेशा ।। धूप दीप नैवेद्य चढ़ावें । शंकर सम्मुख पाठ सुनावे ।। जन्म जन्म के पाप नसावे । अन्तवास शिवपुर में पावे ।  कहे अयोध्या आस तुम्हारी। जानि सकल दुःख हरहु हमारी । ।। दोहा । नित्त नेम कर प्रातः ही, पाठ करौं चालीस  तुम मेरी मनोकामना, पूर्ण करो जगदीश ।।"
    },
    "  शनि चालीसा": {
        "title": "शनि चालीसा",
        "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgjQN6mkadUb3CDNFd49oj6fDOZUoakAVvgQ&s",
        "story": "जयति जयति शनिदेव दयाला । करत सदा भक्तन प्रतिपाला ।। चारि भुजा, तनु श्याम विराजै । माथे रतन मुकुट छवि छाजै ।। परम विशाल मनोहर भाला । टेढ़ी दृष्टि भृकुटि विकराला ।। कुण्डल श्रवण चमाचम चमके । हिये माल मुक्तन मणि दमके । कर में गदा त्रिशूल कुठारा । पल बिच करें आरिहिं संहारा ।। पिंगल, कृष्णों, छाया, नन्दन । यम, कोणस्थ, रौद्र, दुख भंजन ।। सौरी, मन्द, शनि, दश नामो । भानु पुत्र पूजहिं सब कामा ।। जा पर प्रभु प्रसन्न है जाहीं । रंकहुं राव करैंक्षण माहीं ।। पर्वतहू तृण होई निहारत । तृण हू को पर्वत करि डारत ।। राज मिलत बन रामहिं दीन्हो । कैकेइहुं की मति हरि लीन्हों ।। बनहूं में मृग कपट दिखाई । मातु जानकी गई चतुराई ।। लखनहिं शक्ति विकल करि डारा । मचिगा दल में हाहाकारा ।। रावण की गति-मति बौराई । रामचन्द्र सों बैर बढ़ाई ।। दियो कीट करि कंचन लंका । बजि बजरंग बीर की डंका ।। नृप विक्रम पर तुहि पगु धारा । चित्र मयूर निगलि गै हारा ।। हार नौलाखा लाग्यो चोरी । हाथ पैर डरवायो तोरी ।। भारी दशा निकृष्ट दिखायो । तेलिहिं घर कोल्हू चलवायो ।। विनय राग दीपक महं कीन्हों। तब प्रसन्न प्रभु है सुख दीन्हों ।। हरिश्चन्द्र नृप नारि बिकानी । आपहुं भरे डोम घर पानी ।। तैसे नल परदशा सिरानी । भूजी-मीन कूद गई पानी ।। श्री शंकरहि गहयो जब जाई । पार्वती को सती कराई ।। तनिक विलोकत ही करि रीसा । नभ उड़ि गयो गौरिसुत सीसा ।। पाण्डव पर भै दशा तुम्हारी । बची द्रौपदी होति उघारी ।। कौरव के भी गति मति मारयो । युद्ध महाभारत करि डारयो ।। रवि कहं मुख महं धरि तत्काला । लेकर कूदि परयो पाताला ।। शेष देव-लखि विनती लाई । रवि को मुख ते दियो छुड़ई ।। वाहन प्रभु के सात सुजाना । जग दिग्ज गर्दभ मृग स्वाना ।। जम्बुक सिंह आदि नखधारी । सो फल जज्योतिष कहत पुकारी ।। गज वाहन लक्ष्मी गृह आवैं। हय ते सुख सम्पत्ति उपजावैं ।। गर्दभ हानि करै बहु काजा । गर्दभ सिद्ध कर राज समाजा ।। जम्बुक बुद्धि नष्ट कर डारै । मृग दे कष्ट प्रण संहारै ।। जब आवहिं प्रभु स्वान सवारी । चोरी आदि होय डर भारी ।। तैसहि चारि चरण यह नामा । स्वर्ण लौह चांजी अरु तामा ।। लौह चरण पर जब प्रभु आवैं । धन जन सम्पत्ति नष्ट करावै ।। समता ताम्र रजत शुभकारी । स्वर्ण सर्व सुख मंगल कारी ।। जो यह शनि चरित्र नित गावै । कबहुंन दशा निकृष्ट सतावै ।। अदभुत नाथ दिखावैं लीला। करें शत्रु के नशि बलि ढीला ।। जो पण्डित सुयोग्य बुलवाई । विधिवत शनि ग्रह शांति कराई ।। पीपल जल शनि दिवस चढ़ावत । दीप दान दै बहु सुख पावत ।। कहत रामसुन्दर प्रभु दासा । शनि सुमिरत सुख होत प्रकाशा ।। पाठ शनिश्चर देव को, की हों विमल तैयार। करत पाठ चालीस दिन, हो भवसागर पार।"
    }
};

const Chalisa = () => {
    const [selectedItem, setSelectedItem] = useState(Object.keys(data)[0]);

    // Handle dropdown change
    const handleChange = (itemValue) => {
        setSelectedItem(itemValue);
    };

    // Get selected data
    const selectedData = data[selectedItem];

    const storyLines = selectedData.story.split('।।').map(line => line.trim());

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
        <ScrollView style={styles.scrollView}>
                <Image source={{ uri: selectedData.image }} style={styles.image} />
                <Text style={styles.subtitle}>{selectedData.title}</Text>
                <TouchableOpacity onPress={speakText} >
                {storyLines.map((line, index) => (
                <Text key={index} style={styles.storyText}>{line}</Text>
                ))}
                </TouchableOpacity>
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
        backgroundColor: 'white',
        paddingBottom: 60,
    },
    scrollView: {
        flex: 1,
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

export default Chalisa;
