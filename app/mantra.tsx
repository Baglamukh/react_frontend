import CustomBottomNavbar from '@/components/BottomNavbar';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const galleryData = {
  "Surya": {
    "image": "https://images.playground.com/0138010c4fc941c5bf7dc9dc9842ed0f.jpeg",
    "Tantrik_Mantra": "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    "Laghu_Mantra": "ॐ घृणि सूर्याय नमः"
  },
  "Chandra": {
    "image": "https://i.pinimg.com/600x315/c8/eb/99/c8eb9942867b5c531d7189ce030e5a89.jpg",
    "Tantrik_Mantra": "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः",
    "Laghu_Mantra": "ॐ सों सोमाय नमः"
  },
  "Mangal": {
    "image": "https://images.herzindagi.info/image/2023/Jan/mars-planet.jpg",
    "Tantrik_Mantra": "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    "Laghu_Mantra": "ॐ अं अंगारकाय नमः"
  },
  "Budh": {
    "image": "https://i.pinimg.com/736x/f9/5b/26/f95b2621af8c467071ce6e14a3ba1409.jpg",
    "Tantrik_Mantra": "ऊँ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
    "Laghu_Mantra": "ॐ बुं बुधाय नमः"
  },
  "Guru": {
    "image": "https://www.shutterstock.com/image-illustration/jupiter-guru-planet-good-luck-600nw-1302069208.jpg",
    "Tantrik_Mantra": "ऊँ ग्रां ग्रीं ग्रौं सः गुरुवै नमः",
    "Laghu_Mantra": "ॐ बृं बृहस्पतये नमः"
  },
  "Shukra": {
    "image": "https://i.pinimg.com/236x/f7/20/eb/f720eb35d006e89119d3f911e1e8a118.jpg",
    "Tantrik_Mantra": "ऊँ द्रां द्रीं द्रौं सः शुक्राय नमः",
    "Laghu_Mantra": "ॐ शुं शुक्राय नमः"
  },
  "Shani": {
    "image": "https://thumbs.dreamstime.com/b/statue-shani-dev-generative-ai-art-created-ai-technology-image-statue-shani-dev-generative-ai-268100301.jpg",
    "Tantrik_Mantra": "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
    "Laghu_Mantra": "ॐ शं शनैश्चराय नमः",
    "Vedic_Mantra": "शं नो देवीरभिष्टय आपो भवन्तु पीतये। शं योरभि स्रवन्तु नः।",
    "Pauranik_Mantra": "नीलांजन समाभासं रविपुत्रं यमाग्रजम्। छायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्।।"
  },
  "Rahu": {
    "image": "https://blog.sagarworld.com/wp-content/uploads/2022/05/rahu.jpg",
    "Tantrik_Mantra": "ऊँ भ्रां भ्रीं भ्रौं सः राहुवे नमः",
    "Laghu_Mantra": "ॐ रां राहुवे नमः"
  },
  "Ketu": {
    "image": "https://www.shutterstock.com/image-illustration/rahu-one-nine-major-astronomical-260nw-1302078964.jpg",
    "Tantrik_Mantra": "ऊँ स्रां सीं सौं सः केतवे नमः",
    "Laghu_Mantra": "ॐ कें केतवे नमः"
  },
  "Ganesha": {
    "image": "https://img.freepik.com/premium-photo/illustration-lord-ganesha-ganesh-chaturthi-generative-ai_756405-1505.jpg",
    "Beej_Mantra": "ॐ गं गणपतये नमः",
    "Mantra": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा।।",
    "Gayatri_Mantra": "ऊँ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्ती प्रचोदयात्।"
  },
  "Gayatri": {
    "image": "https://img.freepik.com/premium-photo/devi-gayatri-image_669954-18609.jpg",
    "Mantra": "ॐ भूर्भवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्।।"
  },
  "Saraswati": {
    "image": "https://img.freepik.com/premium-photo/goddess-saraswati-happy-vasant-panchami-puja-sitting-lotus-musical-instrument-ai-generated_848094-5179.jpg",
     "Bheej_Mantra": "ॐ ऐं महासरस्वत्यै नमः।।",
      "BagDevi_Mantra": "ॐ ऐं ह्रीं श्रीं वाग्देव्यै सरस्वत्यै नमः।।",
      "Swaraswati_Mantra": "ॐ अर्ह मुख कमल वासिनी पापात्म क्षयम्‌कारी वद वद वाग्वादिनी सरस्वती ऐं ह्रीं नमः स्वाहा।।",
    "Puranokta_Mantra": "या देवी सर्वभूतेषु विद्यारुपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः।।",
    "Pariksha_Bhaya_Nivaran_Mantra": "ॐ ऐं ह्रीं श्रीं वीणा पुस्तक धारिणीम् मम् भय निवारय निवारय अभयं देहि देहि स्वाहा।",
    "Smriti_Niyantran_Mantra": "ॐ ऐं स्मृत्यै नमः।"
  },
  "Mahalakshmi": {
    "image": "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/9951c929-c0bc-43e2-849b-dde619348ce7/9c6bc550-b098-4c74-a80c-6feefe7677ce.png",
    "Beej_Mantra": "ॐ श्रीं महालक्ष्म्यै नमः।।",
    "Lalita_Tripur_Sundari_Beej_Mantra": "ॐ श्री श्री ललिता महात्रिपुरसुन्दर्ये श्री महालक्ष्म्यै नमः।।",
    "Maha_Mantra": "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः।।",
    "Gayatri_Mantra": "ॐ महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि तन्नो लक्ष्मीः प्रचोदयात्।।",
    "Puranokta_Mantra": "या देवी सर्व भूतेषु लक्ष्मीरुपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः।।"
  },
  "Devi": {
    "image": "https://w0.peakpx.com/wallpaper/259/246/HD-wallpaper-navratri-maa-durga-animated-art-hindu-goddess-bhakti-devotional-thumbnail.jpg",
    "Sarvavidh_Kasht_Nivaran_Mantra": "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे।",

    "Sulakshana_Patni_Prapti_Mantra": "पत्नीं मनोरमां देहि मनोवृत्तानुसारिणीम्। तारिणीं दुर्गसंसारसागरस्य कुलोद्भवाम्।।",
    "Var_Prapti_Mantra": "कात्यायनि महामाये महायोगिन्यधीश्वरि! नन्दगोपसुतं देवं पतिं मे कुरु ते नमः।।",
    "Vashikaran_Mantra": "महामाया हरेश्चैषा तया सम्मोह्यते जगत्। ज्ञानिनामपि चेतांसि देवी भगवती हि सा।।",
    "Aakarshan_Mantra": "ॐ क्लीं ज्ञानिनामपि चेतांसि देवी भगवती हि सा। बलादाकृष्य मोहाय महामाया प्रयच्छति।।",
    "Putra_Prapti_Santana_Gopal_Mantra": "ॐ देवकी सुतगोविंद वासुदेवजगत्पते। देहि मे तनयं कृष्ण त्वामहं शरणं गतः।",
    "Kalyan_Mantra": "सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके। शरण्ये त्र्यंम्बके गौरि नारायणि नमोऽस्तु ते।।",
    "Shakti_Prapti_Mantra": "सृष्टिस्थिति विनाशानां शक्तिभूते सनातनि। गुणाश्रये गुणमये नारायणि नमोऽस्तु ते।।",
    "Bhaya_Nivaran_Mantra": "सर्वस्वरूपे सर्वेशे सर्वशक्ति समन्विते। भयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते।।",
    "Suraksha_Prapti_Mantra": "शूलेन पाहि नो देवि पाहि खड्गेन चाम्बिके। घण्टास्वनेन नः पाहि चापज्यानिःस्वनेन च।।",
    "Swasthya_Aur_Bhagya_Mantra": "देहि सौभाग्यमारोग्यं देहि मे परमं सुखम्। रूपं देहि जयं देहि यशो देहि द्विषो जहि।।",
    "Badha_Mukti_Mantra": "सर्वबाधाविनिर्मुक्तो धनधान्यसुतान्वितः। मनुष्यो मत्प्रसादेन् भविष्यति न संशयः।।"
  },
  "Hanumat": {
    "image": "https://i.pinimg.com/originals/56/e4/22/56e4221e592a9bcfa4daf200e47bb62e.jpg",
    "Siddha_Sarva_Badha_Nivaran_Mantra": "ॐ हं हनुमते नमः।"
  },
  "Shiva": {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTst-FzslN-ENWJZDTJ3_hAD8mcU-dbxNShBw&s",
    "Gayatri_Mantra": "ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि तन्नो रुद्रः प्रचोदयात्।",
    "Maha_Mantra": "ॐ नमः शिवाय।",
    "Rog_Nash_Maha_Mrityunjaya_Mantra": "ॐ त्र्यंम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्, उर्वारुकमिव बंधनान्मृत्योर्मुक्षीय माऽमृतात्।।",
    "Vishesh_Prabhavshali_Shadpranavyukt_Maha_Mrityunjaya_Mantra": "ॐ हौं जूं सः ॐ भूर्भुवः स्वः ॐ त्र्यंम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्, उर्वारुकमिव बंधनान्मृत्योर्मुक्षीय माऽमृतात्। ॐ स्वः भुवः भूः ॐ सः जूं हौं ॐ।"
  },
  "Durga": {
    "image": "https://img.freepik.com/premium-photo/hindu-goddess-durga-beautiful-image-generated-by-ai_674037-721.jpg",
    "Gayatri_Mantra": "ॐ कात्यायन्यै च विद्महे कन्याकुमारी धीमहि तन्नो दुर्गा प्रचोदयात्।"
  },
  "Kalika": {
    "image": "https://qph.cf2.quoracdn.net/main-qimg-626d5fe252a6e30c7537bda74ad9354b",
    "Mantra": "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे।।"
  }
};

const Mantra = () => {
  const [selectedDeity, setSelectedDeity] = useState(null);

  const handleDeityClick = (deity) => {
    setSelectedDeity(deity);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.deityList}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Object.keys(galleryData).map((deity) => (
              <TouchableOpacity
                key={deity}
                style={styles.deityItem}
                onPress={() => handleDeityClick(deity)}
              >
                <Image
                  source={{ uri: galleryData[deity].image }}
                  style={styles.deityImage}
                />
                <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{deity}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView>
          {selectedDeity && (
            <View style={styles.deityDetails}>
              <Text style={styles.deityTitle}>{selectedDeity}</Text>
              <Image
                source={{ uri: galleryData[selectedDeity].image }}
                style={styles.deityDetailImage}
              />
              {galleryData[selectedDeity].Tantrik_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Tantrik Mantra: </Text>
                  {galleryData[selectedDeity].Tantrik_Mantra}
                </Text>
              )}
              {galleryData[selectedDeity].Laghu_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Laghu Mantra: </Text>
                  {galleryData[selectedDeity].Laghu_Mantra}
                </Text>
              )}
              {galleryData[selectedDeity].Beej_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Beej Mantra:</Text>
                  {galleryData[selectedDeity].Beej_Mantra}
                </Text>
              )}
              {galleryData[selectedDeity].Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Mantra:</Text> 
                  {galleryData[selectedDeity].Mantra}
                  </Text>
              )}
              {galleryData[selectedDeity].Gayatri_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Gayatri Mantra:</Text> 
                  {galleryData[selectedDeity].Gayatri_Mantra}
                  </Text>
              )}
              {galleryData[selectedDeity].Maha_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Maha Mantra:</Text> {galleryData[selectedDeity].Maha_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Rog_Nash_Maha_Mrityunjaya_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Rog Nash Maha Mrityunjaya Mantra:</Text> {galleryData[selectedDeity].Rog_Nash_Maha_Mrityunjaya_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Vishesh_Prabhavshali_Shadpranavyukt_Maha_Mrityunjaya_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Vishesh Prabhavshali Shadpranavyukt Maha Mrityunjaya Mantra:</Text> {galleryData[selectedDeity].Vishesh_Prabhavshali_Shadpranavyukt_Maha_Mrityunjaya_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Siddha_Sarva_Badha_Nivaran_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Siddha Sarva Badha Nivaran Mantra:</Text> {galleryData[selectedDeity].Siddha_Sarva_Badha_Nivaran_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Sulakshana_Patni_Prapti_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Sulakshana Patni Prapti Mantra:</Text> {galleryData[selectedDeity].Sulakshana_Patni_Prapti_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Var_Prapti_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Var Prapti Mantra:</Text> {galleryData[selectedDeity].Var_Prapti_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Vashikaran_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Vashikaran Mantra:</Text> {galleryData[selectedDeity].Vashikaran_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Aakarshan_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Aakarshan Mantra:</Text> {galleryData[selectedDeity].Aakarshan_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Putra_Prapti_Santana_Gopal_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Putra Prapti Santana Gopal Mantra:</Text> {galleryData[selectedDeity].Putra_Prapti_Santana_Gopal_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Kalyan_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Kalyan Mantra:</Text> {galleryData[selectedDeity].Kalyan_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Shakti_Prapti_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Shakti Prapti Mantra:</Text> {galleryData[selectedDeity].Shakti_Prapti_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Bhaya_Nivaran_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Bhaya Nivaran Mantra:</Text> {galleryData[selectedDeity].Bhaya_Nivaran_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Suraksha_Prapti_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Suraksha Prapti Mantra:</Text> {galleryData[selectedDeity].Suraksha_Prapti_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Swasthya_Aur_Bhagya_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Swasthya Aur Bhagya Mantra:</Text> {galleryData[selectedDeity].Swasthya_Aur_Bhagya_Mantra}</Text>
              )}
              {galleryData[selectedDeity].Badha_Mukti_Mantra && (
                <Text style={styles.mantraText}>
                  <Text style={styles.boldText}>Badha Mukti Mantra:</Text> {galleryData[selectedDeity].Badha_Mukti_Mantra}</Text>
              )}
            </View>
          )}
        </ScrollView>

      </View>
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fff',
    height: -200,
  },
  galleryContainer: {
    flex: 1,
    height: -200,
  },
  deityList: {
    flexDirection: 'row',
    height: -200,
  },
  deityItem: {
    width: 125,
    height: 140,
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 15,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  deityImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  deityDetails: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 70,
  },
  deityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deityDetailImage: {
    width: 300,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  mantraText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Mantra;
