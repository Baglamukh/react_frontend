import { NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from '../assets/store'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, TextInput, Modal, FlatList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { products } from './product';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import AstrologyDataComponent from './astroData';
import About from './about';
import NotFoundScreen from './+not-found';
import FormComponent from './birthDetail';
import PredictionComponent from './prediction';
import Person from './person';
import Custom from './custom';
import Services from './services';
import VastuServices from './vastuservices';
import Shiksha from './shiksha';
import Yantra from './yantra';
import Rudraksha from './rudraksha';
import Aarti from './aarti';
import Chalisa from './chalisa';
import Path from './path';
import Jyotish from './jyotish';
import Sadhna from './sadhna';
import Story from './story';
import Bhajan from './bhajan';
import Mantra from './mantra';
import Sapna from './sapna';
import Tarot from './tarot';
import Color from './color';
import Todayprediction from './todayprediction';
import useNumerology from '@/components/NumerologyDetail';
import Todaytaro from './todaytaro';
import Today from './today';
import Puratan from './puratan';
import Kaudi from './kaudi';
import Gun from './gun';
import Vastu from './vastu';
import ViewFloor from './viewfloor';
import Numbirth from './numbirth';
import Numerology from './numerology';
import NumbersDetails from './numberdetails';
import Ankdasa from './ankdasa';
import Numpy from './numpy';
import Joke from './joke';
import MemeGenerator from './meme';
import Fact from './fact';
import Quotes from './quotes';
import MantraComponent from './sankalp';
import Panchang from './panchang';
import Chat from './chat';
import Voicechat from './voicechat';
import Shopping from './shopping';
import ViewProduct from './viewproduct';
import Cart from './cart';
import Vastuprediction from './vastuprediction';
import Message from './message';
import Payn from './payn';
import HomeScreen from './home';
import NadiData from './nadiData';
import AstroTables from './astroTables';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator(); // Keep this declaration

export default function RootLayout() {
  const {
    month,
    age,
    setAge,
    setMonth,
    tableData,
    inputValue,
    dateOfBirth,
    setDateOfBirth,
    anotherDate,
    setAnotherDate,
    luShuGrid,
    PaschimluShuGrid,
    mulank,
    bhagyank,
    chunotiNumbers,
    kalashNumbers,
    personalYear,
    value,
    tbhagyank,
    tluShuGrid,
    tmulank,
    inputNumber,
    handleInputChange,
    setInputValue,
    summedNumber,
    personalMonth,
    pythagorean,
    chaldean,
    heartDesire,
    personality,
    namank,
    habitNumber,
    firstCharacter,
    firstVowel,
    paschimPythagoreanGrid,
    chinesePythagoreanGrid,
    paschimChaldeanGrid,
    chineseChaldeanGrid,
    janamBalKaalNumbers,animal,handleGenerate,
  } = useNumerology();

  const colorScheme = useColorScheme();
  const [result, setResult] = useState(null);
  const [predictionHtml, setPredictionHtml] = useState('');
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [appReady, setAppReady] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setAppReady(true);
        SplashScreen.hideAsync();
      }, 1000); // Simulating splash screen delay for better UX
    }
  }, [loaded]);

  if (!loaded || !appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#fff' : '#000'} />
      </View>
    );
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm(''); // Clear search term when closing the search bar
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const countries = [
    { name: 'India', link: 'numerology' },
    { name: 'United States', link: 'https://example.com/usa' },
    { name: 'Canada', link: 'https://example.com/canada' },
    { name: 'Australia', link: 'https://example.com/australia' },
    { name: 'United Kingdom', link: 'https://example.com/uk' },
    // Add more countries as needed
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(products);
    }
  };

  const handleProductSelect = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { id: product.id, qty: 1 }];
      }
    });
    setShowCart(true);
  };

  const increaseQty = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderHeaderRight = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
      {isSearchOpen ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoFocus
          />
          <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
            <Icon name="x" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={toggleSearch} style={{ marginRight: 15 }}>
            <Icon name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNav}>
            <Icon name="menu" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  

  return (
    <>
    <Provider store={store} >
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Numbirth" screenOptions={{ headerTintColor: 'white', headerTitleStyle: { fontWeight: 'bold', }, }}>
          {/* HomeScreen should be inside the Stack.Navigator */}
          <Stack.Screen
            name="home"
            options={{
              headerShown: true,
              headerTitle: 'BTTS',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <HomeScreen />}
          </Stack.Screen>

          <Stack.Screen
            name="Form"
            options={{ 
              headerShown: true,
              headerTitle: 'Astrology Form',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
             }}
          >
            {() => <FormComponent setResult={setResult} setPredictionHtml={setPredictionHtml} />}
          </Stack.Screen>

          <Stack.Screen
            name="Results"
            options={{ 
              headerShown: true,
              headerTitle: 'Astrology',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <AstrologyDataComponent result={result} />}
          </Stack.Screen>

          <Stack.Screen
            name="nadiData"
            options={{
              headerShown: true,
              headerTitle: 'Nadi Astrology',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <NadiData result={result} />}
          </Stack.Screen>
          
          <Stack.Screen
            name="astroTables"
            options={{
              headerShown: true,
              headerTitle: 'Astrology Tables',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <AstroTables result={result} />}
          </Stack.Screen>

          <Stack.Screen
            name="Prediction"
            options={{ 
              headerShown: true,
              headerTitle: 'Prediction',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
             }}
          >
            {() => <PredictionComponent predictionHtml={predictionHtml} />}
          </Stack.Screen>

          <Stack.Screen
            name="about"
            options={{
              headerShown: true,
              headerTitle: 'About Us',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <About />}
          </Stack.Screen>

          <Stack.Screen
            name="person"
            options={{
              headerShown: true,
              headerTitle: 'Detail',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Person />}
          </Stack.Screen>

          <Stack.Screen
            name="custom"
            options={{
              headerShown: true,
              headerTitle: 'Custom Prediction',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Custom />}
          </Stack.Screen>

          <Stack.Screen
            name="services"
            options={{
              headerShown: true,
              headerTitle: 'Services',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Services />}
          </Stack.Screen>

          <Stack.Screen
            name="vastuservices"
            options={{
              headerShown: true,
              headerTitle: 'Services',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <VastuServices />}
          </Stack.Screen>

          <Stack.Screen
            name="shiksha"
            options={{
              headerShown: true,
              headerTitle: 'Shiksha',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Shiksha />}
          </Stack.Screen>

          <Stack.Screen
            name="yantra"
            options={{
              headerShown: true,
              headerTitle: 'Yantra',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Yantra />}
          </Stack.Screen>

          <Stack.Screen
            name="rudraksha"
            options={{
              headerShown: true,
              headerTitle: 'Rudraksha',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Rudraksha />}
          </Stack.Screen>

          <Stack.Screen
            name="aarti"
            options={{
              headerShown: true,
              headerTitle: 'Aarti',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Aarti />}
          </Stack.Screen>

          <Stack.Screen
            name="chalisa"
            options={{
              headerShown: true,
              headerTitle: 'Chalisa',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Chalisa />}
          </Stack.Screen>

          <Stack.Screen
            name="path"
            options={{
              headerShown: true,
              headerTitle: 'Path',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Path />}
          </Stack.Screen>

          <Stack.Screen
            name="jyotish"
            options={{
              headerShown: true,
              headerTitle: 'Jyotish',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Jyotish />}
          </Stack.Screen>

          <Stack.Screen
            name="sadhna"
            options={{
              headerShown: true,
              headerTitle: 'Sadhna',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Sadhna />}
          </Stack.Screen>

          <Stack.Screen
            name="story"
            options={{
              headerShown: true,
              headerTitle: 'Vrat Katha',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Story />}
          </Stack.Screen>

          <Stack.Screen
            name="bhajan"
            options={{
              headerShown: true,
              headerTitle: 'Bhajan',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Bhajan />}
          </Stack.Screen>

          <Stack.Screen
            name="mantra"
            options={{
              headerShown: true,
              headerTitle: 'Mantra',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Mantra />}
          </Stack.Screen>

          <Stack.Screen
            name="sapna"
            options={{
              headerShown: true,
              headerTitle: 'Sapna',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Sapna />}
          </Stack.Screen>

          <Stack.Screen
            name="tarot"
            options={{
              headerShown: true,
              headerTitle: 'Tarot',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Tarot />}
          </Stack.Screen>

          <Stack.Screen
            name="color"
            options={{
              headerShown: true,
              headerTitle: 'Today',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Color />}
          </Stack.Screen>

          <Stack.Screen
            name="todayprediction"
            options={{
              headerShown: true,
              headerTitle: 'Today',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Todayprediction />}
          </Stack.Screen>

          <Stack.Screen
            name="todaytaro"
            options={{
              headerShown: true,
              headerTitle: 'Today',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Todaytaro />}
          </Stack.Screen>

          <Stack.Screen
            name="today"
            options={{
              headerShown: true,
              headerTitle: 'Today',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Today />}
          </Stack.Screen>

          <Stack.Screen
            name="puratan"
            options={{
              headerShown: true,
              headerTitle: 'Puratan Astrology',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Puratan />}
          </Stack.Screen>

          <Stack.Screen
            name="kaudi"
            options={{
              headerShown: true,
              headerTitle: 'Puratan Astrology',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Kaudi />}
          </Stack.Screen>

          <Stack.Screen
            name="gun"
            options={{
              headerShown: true,
              headerTitle: 'Gun Milan',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Gun />}
          </Stack.Screen>

          <Stack.Screen
            name="vastu"
            options={{
              headerShown: true,
              headerTitle: 'Vastu',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Vastu />}
          </Stack.Screen>

          <Stack.Screen
            name="viewfloor"
            options={{
              headerShown: true,
              headerTitle: 'Vastu',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <ViewFloor />}
          </Stack.Screen>

          <Stack.Screen
            name="numbirth"
            options={{
              headerShown: true,
              headerTitle: 'Numerology',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Numbirth inputValue={inputValue} setInputValue={setInputValue} inputNumber={inputNumber} handleInputChange={handleInputChange} month={month} age={age} setAge={setAge} setMonth={setMonth} dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} anotherDate={anotherDate} setAnotherDate={setAnotherDate} handleGenerate={handleGenerate} />}
          </Stack.Screen>

          <Stack.Screen
            name="numerology"
            options={{
              headerShown: true,
              headerTitle: 'Numerology',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Numerology handleGenerate={handleGenerate} paschimPythagoreanGrid={paschimPythagoreanGrid} chinesePythagoreanGrid={chinesePythagoreanGrid} paschimChaldeanGrid={paschimChaldeanGrid} chineseChaldeanGrid={chineseChaldeanGrid} luShuGrid={luShuGrid} PaschimluShuGrid={PaschimluShuGrid} tluShuGrid={tluShuGrid} />}
          </Stack.Screen>

          <Stack.Screen
            name="numberdetails"
            options={{
              headerShown: true,
              headerTitle: 'Numbers',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <NumbersDetails handleGenerate={handleGenerate} pythagorean={pythagorean} chaldean={chaldean} heartDesire={heartDesire} personality={personality} namank={namank} habitNumber={habitNumber} firstCharacter={firstCharacter} firstVowel={firstVowel} summedNumber={summedNumber} tbhagyank={tbhagyank} tmulank={tmulank} value={value} mulank={mulank} bhagyank={bhagyank} chunotiNumbers={chunotiNumbers} kalashNumbers={kalashNumbers} personalYear={personalYear} personalMonth={personalMonth} janamBalKaalNumbers={janamBalKaalNumbers} animal={animal} />}
          </Stack.Screen>

          <Stack.Screen
            name="ankdasa"
            options={{
              headerShown: true,
              headerTitle: 'Ank Dasa',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Ankdasa tableData={tableData} inputValue={inputValue} />}
          </Stack.Screen>

          <Stack.Screen
            name="numpy"
            options={{
              headerShown: true,
              headerTitle: 'Numerology',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Numpy />}
          </Stack.Screen>

          <Stack.Screen
            name="joke"
            options={{
              headerShown: true,
              headerTitle: 'Joke',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Joke />}
          </Stack.Screen>

          <Stack.Screen
            name="meme"
            options={{
              headerShown: true,
              headerTitle: 'Meme',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <MemeGenerator />}
          </Stack.Screen>

          <Stack.Screen
            name="fact"
            options={{
              headerShown: true,
              headerTitle: 'Fact',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Fact />}
          </Stack.Screen>

          <Stack.Screen
            name="quotes"
            options={{
              headerShown: true,
              headerTitle: 'Motivational',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Quotes />}
          </Stack.Screen>

          <Stack.Screen
            name="sankalp"
            options={{
              headerShown: true,
              headerTitle: 'Sankalp',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <MantraComponent />}
          </Stack.Screen>

          <Stack.Screen
            name="panchang"
            options={{
              headerShown: true,
              headerTitle: 'Panchang',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Panchang />}
          </Stack.Screen>

          <Stack.Screen
            name="chat"
            options={{
              headerShown: false,
              headerTitle: 'Chat',
              headerStyle: { backgroundColor: 'black' }
            }}
          >
            {() => <Chat />}
          </Stack.Screen>

          <Stack.Screen
            name="voicechat"
            options={{
              headerShown: false,
              headerTitle: 'Video Call',
              headerStyle: { backgroundColor: 'black' }
            }}
          >
            {() => <Voicechat />}
          </Stack.Screen>

          <Stack.Screen
            name="shopping"
            options={{
              headerShown: true,
              headerTitle: 'Shopping',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Shopping query={searchQuery} onSearch={handleSearch} products={searchResults} addToCart={addToCart} onProductSelect={handleProductSelect} />}
          </Stack.Screen>


          <Stack.Screen
            name="message"
            options={{
              headerShown: true,
              headerTitle: 'Message',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Message />}
          </Stack.Screen>


          <Stack.Screen
            name="vastuprediction"
            options={{
              headerShown: true,
              headerTitle: 'Prediction',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Vastuprediction />}
          </Stack.Screen>

          <Stack.Screen
            name="payn"
            options={{
              headerShown: true,
              headerTitle: 'kuch bhi hai na',
              headerStyle: { backgroundColor: 'black' },
              headerRight: renderHeaderRight,
            }}
          >
            {() => <Payn />}
          </Stack.Screen>

          <Stack.Screen
            name="+not-found"
            options={{
              headerShown: true,
              headerTitle: 'Page Not Found',
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
              },
              headerTintColor: colorScheme === 'dark' ? '#fff' : '#333',
              headerRight: renderHeaderRight,
            }}
          >
            {() => <NotFoundScreen />}
          </Stack.Screen>
        </Stack.Navigator>
        {/* Navigation Modal */}
        <Modal visible={isNavOpen} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleNav} style={styles.closeButton}>
              <Icon name="x" size={24} color="white" />
            </TouchableOpacity>
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Text style={styles.navItem}>{item.name}</Text>
              )}
            />
          </View>
        </Modal>
      </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
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
