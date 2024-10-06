import Div from "@/components/div";
import Navbar from "@/components/HelloWave";
import Siri from "@/components/Siri";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from "@/components/BottomNavbar";

export default function HomeScreen() {
  const navigation = useNavigation();

  const categories = [
    { name: 'Astrology', route: 'Form', icon: '🔮' },
    { name: 'Vastu', route: 'vastu', icon: '🏠' },
    { name: 'Tarot', route: 'tarot', icon: '🃏' },
    { name: 'Numerology', route: 'numpy', icon: '🔢' },
    { name: 'Sapna', route: 'sapna', icon: '💭' },
    { name: 'Panchang', route: 'panchang', icon: '📅' },
    { name: 'Puratan', route: 'puratan', icon: '📜' },
    { name: 'Gun Milan', route: 'gun', icon: '❤️' },
    { name: 'Chat', route: 'chat', icon: '💬' },
    { name: 'Today', route: 'color', icon: '🔍' },
    { name: 'Shiksha', route: 'shiksha', icon: '📚' },
    { name: 'Services', route: 'services', icon: '🛠️' },
    { name: 'Custom', route: 'custom', icon: '⚙️' },
];

  return (
    <>
    <View style={styles.container}>
      <Siri />
      <Div />

    <View style={styles.smallcontainer}>
    <ScrollView style={styles.scrollView}>
        <View style={styles.grid}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => navigation.navigate(category.route)}
                >
                    <View style={styles.cardContent}>
                        {/* Replace with your SVG component or icon */}
                        <Text style={styles.icon}>{category.icon}</Text>
                        <Text style={styles.categoryName}>{category.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </ScrollView>
</View>
</View>
<BottomNavbar />
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container fill the entire screen
    backgroundColor: 'white', // Set background color to white
    paddingBottom: 70,
  },
  smallcontainer: {
    flex: 1,
    backgroundColor: '#fff',
},
scrollView: {
    flex: 1,
},
grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
},
card: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
},
cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
},
icon: {
    fontSize: 24,
    marginRight: 8,
},
categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
},
});
