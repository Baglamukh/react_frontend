import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import * as Speech from 'expo-speech'; // Importing expo-speech
import CustomBottomNavbar from '@/components/BottomNavbar';

// Sample JSON data
const data = {
   " तिल:-" : {
        "image" : "",
        "title" : "तिल:-",
        "story" : "तिल के बारे में फलित करने के दो तरीके है। 1.तो हम तिल शास्त्र पढकर फलित करे। 2.कुण्डली देखकर यह जाने के तिल कहा है फिर तिल शास़़्त्र से फलित करे। सबसे पहले हम कुंडली से देखना सीखेंगे  तिल को देखने के लिए मेन तो शनि होता है परन्तु इसके अन्दर मै अपने अनुभव से राहु-केतु को लूंगा क्योकि यह भी अलग-अलग प्रकार के निशान शरीर पर प्रकट करते  है  सूत्र - भावों और राशि के अनुसार तिल किस स्थान पर है यह देखा जाता है जिस स्थान पर शनि बैठता है  और जिन पर दृष्टि डालता है और जिस राशि  मै बैठा होता है वहा तिल देता है अक्सर मेरा मानना है कि तिल हमारे कर्मो के अनुसार मिलते है उदाहरण के लिए यदि किसी के होठ पर तिल है तो वह ज्यादा बोलता है सिर पर लित होने पर ओवरथिंक करने वाला होता हे ऐसे  ही जैसे हम शनि का देखते है वैसे ही राहु-केतूू को भी देखते है परन्तु वह तिल के बदले कुछ निशान या कोई चोट दे सकते है। स्थान राशि और अंग - ।मेष - प्रथम भाव  - सिर ।वृषभ- द्वितीय भाव - चेहरा ।मिथुन - तृतीय भाव - गला ।कर्क - चतुर्थ भाव - छाती ।सिंह- पंचम भाव - पेट ।कन्या - षष्ठ भाव - कमर ।तुला - सप्तम भाव - गुप्तांग ।वृश्चिक  - अष्ठम भाव - हिप्स     ।धनु - नवम भाव - जांघ ।मकर - दशम भाव - धुटने  ।कुंभ - एकादश भाव -पिडली ।मीन - द्वादश भाव - पैर (तलवे)। नोट - अधिक जानकारी के लिए सम्पर्क सूत्र या और किसी भी गलती के समाधान के लिए नीचे दिए गए नम्बर पर सम्पर्क करे:- 8302933196"
     },
     " फेस रिडिंग -" : {
        "image" : "",
        "title" : "फेस रिडिंग -",
        "story" : "इधर फेस रिडिंग के लिए एक छोटा सा नमूना दिया गया है इस एप मै आपकों दो सूत्र दिये जा रहे है जो केवल सोच मात्र के लिए है 1 किसी भी शारीरिक संरचना को जानने के लिए आप उसका लग्न, लग्नेश देखे। इससे  आपको मध्यम,बडा और छोटा कद देख सकते है 2 फेस की  आकृति के लिए आप चन्द्रमा के नक्षत्र को देखे। नोट - अधिक जानकारी के लिए सम्पर्क सूत्र या और किसी भी गलती के समाधान के लिए नीचे दिए गए नम्बर पर सम्पर्क करे:ः- 8302933196"
     },
     " हस्त रेखा - " : {
        "image" : "",
        "title" : "हस्त रेखा - ",
        "story" : "हर ग्रह किसी न किसी और पर्वतो को इंडीकेट करता है और हर राशि उंगलियों के अन्दर स्थान प्रकट करती है इसके अनुसार हम देख सकते है कि उसका प्रौपर रेखाओं पर क्या असर होगा  जैसे कि इस विद्या के लिए एक छोटा सा नमूना इधर दिया जा रहा है जिस पर आप विचार कर थोडा समझ सकते है  सूत्र - भाव की और ग्रह के अनुसार आप देख सकते है कि वो रेखा कितनी मजबूत है उदाहरण - शनि और  अष्टम यदि शनि अच्छा है और अष्टम भाव  खराब है तो जीवन रेखा मे काफी कट लग सकते है। और यदि दोनो खराब है तो आपकी जीवन रेखा मे काफी कट या किसी प्रकार से चिहित होगी। यदि शनि और अष्टम भाव दोनो अच्छे है तो आपकी जीवन रेखा प्रौपर होगी पर नीचे से थोड़ा कट जरूर लगा होगा।  नोट - अधिक जानकारी के लिए सम्पर्क सूत्र या और किसी भी गलती के समाधान के लिए नीचे दिए गए नम्बर पर सम्पर्क करे:ः- 8302933196 "
     },
     " कौडी - " : {
        "image" : "",
        "title" : "कौडी - ",
        "story" : "इस विद्या के बारे मे कई तरीके है जिससे हम बहुत सटीक फलीत कर सकते है परन्तु हम आपको इसका एक छोटा नमूना दे सकते है जिससे आपको पता चल सके की कौडी कितना सटीक फलीत कर सकते है। नमूना/सूत्र - समान्यतः कौडी के अन्दर हम चार कौडी लेते है उन चारों कोडियों को एक लाल कपडे के उपर रखकर और अपने आराध्य देव,गुरूजन का स्मरण करके आप अपना कोई भी प्रश्न मन में रखकर पूर्व की ओर मुख कर कौडी को लाल कपडे में उछाल और देखे- 1/4़ - इसका मतलब है काम मे काफी मेहनत लगेगी या काम होने का बहुत कम है। 2/4 - इसका मतलब शंका स्पष्ट है। 3/4- काम हो जायेगा पर छोटी मोटी रूकावट आ सकती है।  4/4 - काम हो जायेगा।  0/4 - असफल होंगे। जो यह अंक परिवर्तित है यह  उल्टी  कौडी आती है वो है। और जो चार है वह सीधी कौडी है। नोट - अधिक जानकारी के लिए सम्पर्क सूत्र या और किसी भी गलती के समाधान के लिए नीचे दिए गए नम्बर पर सम्पर्क करे:ः- 8302933196 "
     },
     "प्रश्नावली - " : {
        "image" : "",
        "title" : "प्रश्नावली -",
        "story" : "सामान्यतः प्रश्नावली होती है जैसे- रामश्लाका इसमें जिस देव की या जिस ऋषि या जिस व्यक्ति की प्रश्नावली  है उसे  स्मरण करके,अराध्य देव को स्मरण करके फिर प्रश्नावली के नियम के अनुसार जिस दिशा में मुख होता है उस  दिशा में मुख करके आंख बंद कर मन में प्रश्न कर आप किसी भी चीज पर उंगली रखकर जिस पर आपने उंगली रखी है उस नम्बर,शब्द,अक्षर के  बारे मे जानकर आप अपने प्रश्नों का अर्थ  जान सकते है।"
     },
     " कुण्डली - " : {
        "image" : "",
        "title" : "कुण्डली - ",
        "story" : "कुण्डली -  इस एप मे कुंडली के कई राज के बारे में बताया गया है परन्तु इधर भी एक छोटा सा नमूना दिया जा रहा है जिससे आप इसके बारे में बहुत अच्छी तरह से जान सके की कुंडली कितना सटीक काम करती है। जिसमें से आपकों हम छोटी छोटी बातों के दो सूत्र देते है अक्सर हम सब जानना चाहते है कि उसका स्वभाव कैसा होगा,उसकी स्किल कैसी होगी और उसके अन्दर क्या खुबिया होगी और कमिया होगी इससे जान सकते है  सूत्र-  किसी भी व्यक्ति की स्किल और स्वभाव को जानने के लिए हम शनि,चन्द्र एवं लग्न के नक्षत्र को देखेंगे किसी व्यक्ति का तेज जानने के लिए हम उसका सूर्य का नक्षत्र देखेंगे। किसी के ब्रेन के बारे मे देखने के लिए हम उसका बुध देखेंगे। किसी की  खूबिया देखने के लिए हम उसके मजबूत ग्रह के नक्षत्र को देखेंगे और उसकी राशिया देखेंगे। और किसी की कमिया देखने के लिए हम उसके कमजोर ग्रह के नक्षत्र को देखेंगे और उसकी राशिया देखेंगे।  1:- कौशल: स्वयं सहायता, DIY, समाधान शक्ति: उपचार लग्न: जीवंत, सहज, सर्जक, बुद्धिमान, छोटा कद, स्पोर्टी, मजबूत, आकर्षक, करिश्माई, स्टाइलिश, भव्य, मासूम। चंद्रमा: रहस्यमय, धार्मिक, रहस्यमय, साहसी, सक्रिय, आध्यात्मिक उपचारक, निस्वार्थ देखभाल, सिद्धियाँ, शोधकर्ता। 2:- कौशल: काम में व्यस्त रहना, जिम्मेदारी शक्ति: हटाना लग्न: अच्छा स्वास्थ्य, मध्यम कद, मेहनती, साहसी, स्वाभिमानी, अग्रणी, खेल, शिकार और आतिशबाजी पसंद है। चंद्रमा: करिश्माई, आकर्षक, नेता, कर्तव्यपरायण, चतुर कार्यकर्ता, खोजी दिमाग, उपचारक, गुप्त विज्ञान पसंद है। 3:- कौशल: उत्पादन, जलती हुई ऊर्जा, आग शक्ति: जलना लग्न: श्रेष्ठ, गौरवान्वित, सम्माननीय, महत्वाकांक्षी, कुशल, धनवान, सच्चा। चंद्रमा: शानदार रूप, शांतिपूर्ण प्रेमी, प्रसिद्ध, अच्छा सलाहकार, दृढ़ इच्छाशक्ति वाला, दृढ़ निश्चयी, बुद्धिमान, कलात्मक। 4:- कौशल: विकास, श्री या सुश्री, लोकप्रिय, शक्ति: बढ़ रहा है लग्न: आकर्षक आँखें, लोकप्रिय, रोमांटिक, कलात्मक, अभिव्यंजक, यौन रूप से व्यसनी। चंद्रमा: गायक, सुंदर रूप, धनी, संतुलित दिमाग और प्रसिद्ध। 5:- कौशल: नेटवर्किंग, सोशल मीडिया शक्ति: आनंद ले रहे हैं लग्न: सत्य की खोज करने वाला, बातूनी, साहसी, यात्रा पसंद करने वाला, आकर्षक, मोहक, व्यवस्थित, अच्छा संचारक। चंद्रमा: मृदुभाषी, माँ के करीब, सौम्य, कोमल, शांतिपूर्ण, बुद्धिमान, आत्म-त्यागी। 6:-  कौशल: ताजगी, चयापचय, नवीनता शक्ति: उपलब्धि लग्न: बड़ा चेहरा, घुंघराले बाल, गुस्से से चेहरे का रंग लाल हो जाता है, कभी-कभी अनुपस्थित-मन, अच्छी याददाश्त, त्वरित और त्वरित प्रतिक्रिया, जीवन में अत्यधिक परिवर्तन। चंद्रमा: अनिर्णय, अराजक परिस्थितियाँ, जीवन में भ्रम, बुरे सपने, भय; आध्यात्मिक विकास। सकारात्मक, विदेशी भूमि. 7:- कौशल: नवीकरण, पुनर्चक्रण शक्ति: पुनरोद्धार लग्न: दानशील, सामाजिक, सफल व्यवसायी व्यक्ति। चंद्रमा: धार्मिक, आत्म-नियंत्रित, अनिर्णायक, अंतर्मुखी, दृढ़निश्चयी। 8:- कौशल: गुरु, समृद्ध शक्ति: आध्यात्मिक ऊर्जा बनाता है लग्न: पोषण करने वाला, पालन-पोषण करने वाला, देखभाल करने वाला, जानकार, मातृवत, उदार, दयालु, संयमी, आशावादी, भौतिकवाद का आनंद लेने वाला, विश्वसनीय, भरोसेमंद; नकारात्मक: सुस्त, एकाग्रचित्त, आसानी से मूर्ख बन जाना, आसानी से दूसरों पर भरोसा कर लेना। चंद्रमा: संतुलित और संयमित दिमाग, आकर्षक, परिपक्व, राजनीतिक विचार, गुणी, धनी। 9:- कौशल : उलझा हुआ, सर्पिल शक्ति: आध्यात्मिक ऊर्जा को नष्ट कर देता है लग्न: सेवा उन्मुख, चालाकीपूर्ण और भ्रामक, कामुक। चंद्रमा: ज्योतिष का ज्ञान, रहस्यमय, सहज, अस्वास्थ्यकर खान-पान। 10:- कौशल : विरासत, विशेषाधिकार शक्ति: आध्यात्मिक पुनर्जन्म लग्न: आत्म-जागरूक, शक्ति, अधिकार, धनी, भाग्यशाली, प्रभावशाली, पारिवारिक स्थिति, सम्मानजनक। चंद्रमा: दानशील, आदर चाहने वाला और दूसरों का भी सम्मान करने वाला, आधिकारिक पद, सेलिब्रिटी, रचनात्मक, डिजाइनर, दूसरों को सशक्त बनाने वाला, सच्चा नेता, आध्यात्मिक। 11 :- कौशल: जुनून, स्वतंत्र इच्छा शक्ति: प्रजनन करना लग्न: रचनात्मक, करिश्माई, संतुलित दिमाग, संगीत, नृत्य, नाटक में रुचि। स्वस्थ, अच्छा दिखने वाला. चंद्रमा: मृदुभाषी, सौंदर्य, नाटक और मनोरंजन के प्रति प्रेम। रचनात्मक, बुद्धिमान, मिलनसार। 12:- कौशल: प्रतिबद्ध, साथी शक्ति: समृद्धि लग्न: धनवान, आकर्षक, कई साथी, उदार, स्वाभिमानी, कामुक, बुद्धिमान, व्यापार में प्रतिभाशाली, हाथों से कुशल, मानवतावादी, रहस्यमय शक्तियां, सहज ज्ञान युक्त। चंद्रमा: सर्वप्रिय, सफल, स्थिर, सम्मानित, आराम और विलासिता चाहने वाला, अच्छी बुद्धि, आविष्कारशील दिमाग, खुश, मिलनसार, व्यवहारकुशल। 13:- कौशल: जागरूकता, प्रतिभाशाली शक्ति: प्राप्ति लग्न: आकर्षक, मिलनसार, मनोरंजक, आकर्षक, सम्मानित, लचीला शरीर और मानवतावादी चंद्रमा: संवेदनशील, तेज़ याददाश्त, रचनात्मक और कल्पनाशील, मिलनसार, मूडी, खुले दिल वाला। 14:- कौशल: शिल्पकार, पूर्णतावादी शक्ति: निर्माण, आध्यात्मिक शक्ति लग्न: फैशनेबल दिखता है, आभूषण, रंगीन कपड़े पहनना पसंद करता है। अभिव्यंजक, शालीन, ईमानदार, आध्यात्मिक मुक्ति की इच्छा रखता है। चंद्रमा: कलात्मक, लोकप्रिय, आकर्षक आंखें, आकर्षक व्यक्तित्व, सहज ज्ञान युक्त, भविष्यवादी। 15:- कौशल : धन, संपन्नता शक्ति: पौष्टिक लग्न: सौम्य, आकर्षक रूप, मिलनसार, अच्छे मित्र, यात्रा। चंद्रमा: प्राचीन संस्कृति, धर्म, अध्यात्म में रुचि। धनवान, विदेशी भूमि में सफलता, पालतू पशु प्रेमी। 16:- कौशल: दर्शन प्रमुख, शाब्दिक, आध्यात्मिकता शक्ति: स्थिरीकरण लग्न : बड़ा शरीर, चौड़ा कंधा, शांत मन समुद्र का प्रतिनिधित्व करता है, कद भारी और छोटा, धैर्यवान और कुछ आलसी होता है। चंद्रमा: गुणवान, सार्वजनिक सेवा की भावना, चतुर संचारक, आकर्षक रूप। 17:- कौशल : त्याग करना, आत्म विनाश शक्ति: विद्रोह लग्न: सार्वजनिक वक्ता, दार्शनिक, आकर्षक, यात्रा और धन का शौकीन। चंद्रमा: बुद्धिमान, आध्यात्मिक, शिक्षण कौशल, गुप्त ज्ञान, चतुर पर्यवेक्षक। 18:- कौशल : निगरानी, स्मार्टफोन शक्ति: उपचार लग्न : कोमल शरीर, चौड़ा माथा, प्रभावशाली आंखें, आकर्षक चेहरा, ऊंची नाक, स्मरण शक्ति, चंचल, सत्यान्वेषी, धार्मिक। चंद्रमा: अच्छा चिकित्सक, चिकित्सक, रहस्यमय, ध्यानी, दार्शनिक, वैज्ञानिक, देखभाल करने वाला, सार्वजनिक सेवा, तकनीकी रूप से सक्षम, उद्यमी। 19:- कौशल: सेलिब्रिटी, प्रभावशाली व्यक्ति शक्ति: जुड़ना लग्न: धनवान, गुणी, रूढ़िवादी, अहंकारी, महत्वाकांक्षी, अनुशासित, उदार, आदर्शवादी। चंद्रमा: संरचित, संगठित, अलग, उदार, संगीत, कविता के प्रति प्रेम लेकिन जिद्दी। 20:- कौशल: पॉडकास्ट, रेडियो पावर: कनेक्ट करना लग्न: उच्च कैरियर की इच्छा, विद्वतापूर्ण कार्य, संरचनात्मक और संगठित। चंद्रमा: रहस्यवादी, बेचैन दिमाग, चतुर, उदास और मूडी। 21:- कौशल: अति उपलब्धि हासिल करने वाला शक्ति: विजय लग्न: लोक सेवक, मेहनती, जीवन के उत्तरार्ध में प्रसिद्ध, दयालु, ईमानदार, परामर्शदाता। चंद्रमा: दीर्घायु, धैर्यवान, सामाजिक रूप से जिम्मेदार, कठोर, ईमानदार। 22:- कौशल: सर्फिंग, बाजीगरी शक्ति: स्फूर्तिदायक लग्न: कानून और राजनीति में रुचि, स्वाभिमानी, उपचारकर्ता, उच्च सम्मान, मित्रों के प्रति वफादार, विनम्र, मित्र और संतान। चंद्रमा: संतुलित भावना, आकर्षक व्यक्तित्व, दार्शनिक, दोस्ती और रिश्ते में वफादार। 23:- कौशल : विनाश, मुखबिर शक्ति: समाशोधन लग्न: मुखर, चौड़ा माथा, मजबूत हड्डी, व्यापक दृष्टि, आदर्श छात्र, उत्कट इच्छा, अन्वेषक, सच्चा, चतुर। चंद्रमा: अंतर्मुखी, शोधकर्ता, आध्यात्मिकता, जादू-टोना और रहस्यवाद में रुचि। जातक अलग-थलग और अलग-थलग महसूस करता है। भावनात्मक मुद्दों में ध्यान मदद कर सकता है। परामर्शदाता और शिक्षक भी बन सकते हैं। 24:- कौशल : पदानुक्रम, व्यामोह शक्ति: वीरता लग्न: दूसरों द्वारा पसंद किया जाने वाला और सम्मानित, सम्मानित, भावुक। चंद्रमा: माँ लड़का/लड़की, जिद्दी, चिड़चिड़ा, पाखंडी और गुप्त। 25:- कौशल : मिलन, मित्रता शक्ति: प्रचुरता लग्न : सहायक, विद्यावान, ज्ञान संचय, अकेले नहीं समूह में कार्य करना चाहिए, विजय, नेतृत्व, गुप्त, आध्यात्मिक। चंद्रमा: इच्छा प्रधान, जनसमूह के बारे में सोचने वाला, असामाजिक या पीछा करने वाला हो सकता है, अनुसंधान संबंधी कार्य। प्रारंभिक आयु मार्गदर्शन की आवश्यकता है। 26:- कौशल: धर्म, किताब से चलता है, सिद्धि शक्ति: कटाई लग्न : बुद्धिमान, युद्ध करने वाला, राजनीतिक, आक्रामक, अधीर, शीघ्र क्रोधित होने वाला। चंद्रमा: जनता के लिए आकर्षक, चंद्रमा (उज्ज्वल) रूप, मानवतावादी, तीव्र, अंतिम चरण में कमजोर। 27:- कौशल: सेल्फी, व्यक्तित्व शक्ति: परिवर्तन लग्न: आकर्षक, वफादार, बुद्धिमान, अच्छा संचारक, व्यापारिक दिमाग, निष्पक्ष, सेवा करने की क्षमता, विवाह के बाद आध्यात्मिक हो जाता है। चंद्रमा: रिश्ते में स्वतंत्र, अपना व्यवसाय, व्यापार में साझेदारी नहीं चलती, संतुलित दिमाग, सिक्के के दोनों पहलू देख सकते हैं। नोट - अधिक जानकारी के लिए सम्पर्क सूत्र या और किसी भी गलती के समाधान के लिए नीचे दिए गए नम्बर पर सम्पर्क करे:ः- 8302933196 "
     },
     " नर्मोलोजी- " : {
        "image" : "",
        "title" : "नर्मोलोजी- ",
        "story": "इस एप में नर्मोलॉजी के बारे में सूक्ष्म तरीके से जानकारी दी गई है। हम एक छोटा सा नमूना देंगे जिससे आपको नर्मोलॉजी की सटीकता का ज्ञान हो जाएगा।",
        "steps": [
          "अपने नंबर को पाइथागोरियन टेबल के अनुसार अपने नाम के अक्षरों को जोड़ें।\n\n",
          "फिर, जिसका विश्लेषण करना है, उसका पूरा नाम लेकर इस टेबल के अनुसार दिए गए अंकों को जोड़ें और सिंगल डिजिट में बदलें।\n\n",
          "इसके बाद देखें कि यह मित्र, अति मित्र, शत्रु, अति शत्रु, या सम में से क्या है। इसके अनुसार आप देख सकते हैं कि आपके लिए वह व्यक्ति, स्थान या बिजनेस नेम कितना अच्छा है।\n"
        ],
        "pythagorean_table": [
            "A: 1 ", " J: 1 ", " S: 1\n",
            " B: 2 ", " K: 2 ", " T: 2\n",
            " C: 3 ", " L: 3 ", " U: 3\n",
            " D: 4 ", " M: 4 ", " V: 4\n",
            " E: 5 ", " N: 5 ", " W: 5\n",
            " F: 6 ", " O: 6 ", " X: 6\n",
            " G: 7 ", " P: 7 ", " Y: 7\n",
            " H: 8 ", " Q: 8 ", " Z: 8\n",
            " I: 9 ", " R: 9\n "
        ],
        "compatibility_table": [
            "Number : 1\n",
            "\n ati_mitra : 5 , 6 , 3 , 7\n ",
            "mitra : 4 , 8\n ",
            "sam : 3 , 9 , 4\n ",
            "shatru : 6\n ",
            "ati_shatru : 2\n ",
            "\nNumber : 2\n",
            "\n ati_mitra : 1 , 5 , 6 , 3 , 7\n ",
            "mitra : 4 , 8\n ",
            "sam : 9 , 8\n ",
            "shatru : 6 , 3 , 4\n ",
            "ati_shatru : 3\n ",
            "\nNumber : 3\n",
            "\n ati_mitra : 1 , 2 , 7\n ",
            "mitra : 4 , 8\n ",
            "sam : 5 \n",
            "shatru : 7 \n",
            "ati_shatru : 4 \n",
            "\nNumber : 4\n",
            "\n ati_mitra : 3 , 9\n ",
            "mitra : 1 , 2 , 7\n ",
            "sam : 8\n ",
            "shatru : 8\n ",
            "ati_shatru : 5 \n",
            "\nNumber : 5\n",
            "\n ati_mitra : 3 , 9 , 4 , 1 , 2 , 7\n ",
            "mitra : 4 , 8\n ",
            "sam : 6 , 3 , 7\n ",
            "shatru : 3 \n",
            "ati_shatru : 6 \n",
            "\nNumber : 6\n",
            "\n ati_mitra : 3 , 4\n ",
            "mitra : 1 , 2 , 7 \n",
            "sam : 5 , 3 , 6\n ",
            "shatru : 7\n ",
            "ati_shatru : 7\n ",
            "\nNumber : 7\n",
            "\n ati_mitra : 2 , 5 , 6 , 3 , 4\n ",
            "mitra : 1 , 2 , 7\n ",
            "sam : 3 , 6 , 4\n ",
            "shatru : 8\n ",
            "ati_shatru : 1, 6\n",
            "\nNumber : 8\n",
            "\n ati_mitra : 2 , 4 , 7\n ",
            "mitra : 3 , 4\n ",
            "sam : 8\n ",
            "shatru : 9\n ",
            "ati_shatru : 2, 1\n ",
            "\nNumber : 9\n",
            "\n ati_mitra : 2 , 1\n ",
            "mitra : 4 , 3 , 8\n ",
            "sam : 6, 9\n ",
            "shatru : 3, 6 \n",
            "ati_shatru :  ---\n ",
        ],
        "note": "अधिक जानकारी के लिए सम्पर्क करें: 8302933196"
     }
};

const Jyotish = () => {
    const [selectedItem, setSelectedItem] = useState(Object.keys(data)[0]);

    // Handle dropdown change
    const handleChange = (itemValue) => {
        setSelectedItem(itemValue);
    };

    // Get selected data
    const selectedData = data[selectedItem];

    const storyLines = selectedData.story.split('।').map(line => line.trim());

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
                    <>
                {storyLines.map((line, index) => (
                <Text key={index} style={styles.storyText}>{line}</Text>
                ))}
                 {data[selectedItem].steps && (
                    <>
                 <Text style={styles.numbertext}>Steps:</Text><Text>{data[selectedItem].steps}</Text> 
                 </>
                 )} 
                 {data[selectedItem].pythagorean_table && (
                    <>
                    <Text style={styles.numbertext}>Pythagorean Table:</Text><Text> {data[selectedItem].pythagorean_table}</Text>
                    </>
                 )} 
                      {data[selectedItem].compatibility_table && (
                        <>
                        <Text style={styles.numbertext}>Compatibility Table:</Text><Text> {data[selectedItem].compatibility_table}</Text>
                </>
                 )} 
                 </>
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
    numbertext: {
        fontWeight: 'bold', // Text ko bold karne ke liye
        fontSize : 14,
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

export default Jyotish;
