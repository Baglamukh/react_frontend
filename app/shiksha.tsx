import Div from "@/components/div";
import Navbar from "@/components/HelloWave";
import Siri from "@/components/Siri";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from "@/components/BottomNavbar";

export default function Shiksha() {
  const navigation = useNavigation();

  const categories = [
    { name: 'Yantra', route: 'yantra', icon: '📝' },
    { name: 'Mantra', route: 'mantra', icon: '🕉️' },
    { name: 'Sadhna', route: 'sadhna', icon: '🧘‍♂️' },
    { name: 'Jyotish', route: 'jyotish', icon: '🔭' },
    { name: 'Path', route: 'path', icon: '📚' },
    { name: 'Rudraksh', route: 'rudraksha', icon: '🌱' },
    { name: 'Chalisa', route: 'chalisa', icon: '📖' },
    { name: 'Aarti', route: 'aarti', icon: '🪔' },
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
