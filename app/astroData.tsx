// AstrologyDataComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function AstrologyDataComponent({ result }) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('index');

  const handlePrediction = () => {
    navigateTo('Prediction');
  };

  const handleNadi = () => {
    navigateTo('nadiData');
  };

  const handleTables = () => {
    navigateTo('astroTables');
  };

  const navigateTo = (screen) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  const data = {
    planetData: result.varga_result,
    centralText: 'D-2',
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
        body { margin: 0; }
        canvas { border: 1px solid red; border-radius: 12px; }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="970" height="887"></canvas>
  <script>
        function wrapT(ctx, text, x, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, y);
        }

        function writeDiamondChart(n, w) {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const Z = Math.min(canvas.width, canvas.height) / 2; // Use the smaller dimension for scaling
            const W = canvas.width / 2; // Half of the canvas width for positioning
            ctx.translate(W, Z); // Translate to center the diamond shape
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';

            // Drawing the diamond shape based on width and height
            ctx.beginPath();
            ctx.moveTo(0, -Z); // Top vertex
            ctx.lineTo(Z, 0);  // Right vertex
            ctx.lineTo(0, Z);  // Bottom vertex
            ctx.lineTo(-Z, 0); // Left vertex
            ctx.closePath();
            ctx.stroke();

            // Draw diagonal lines with dynamic lengths based on width and height
            ctx.beginPath();
            const diagonalLength = Math.sqrt(Math.pow(Z, 2) + Math.pow(Z, 2)); // Length of diagonals
            ctx.moveTo(-W, -Z); // Top left to bottom right
            ctx.lineTo(W, Z);
            ctx.moveTo(W, -Z);  // Top right to bottom left
            ctx.lineTo(-W, Z);
            ctx.stroke();

            // Define coordinates for the text inside the chart
            const c = [[-W * 0.05, -Z * 0.70], [-W * 0.55, -Z * 0.875], [-W * 0.85, -Z * 0.6],
                       [-W * 0.55, -Z * 0.05], [-W * 0.85, Z * 0.4], [-W * 0.55, Z * 0.725],
                       [-W * 0.05, Z * 0.425], [W * 0.4, Z * 0.7], [W * 0.85, Z * 0.35],
                       [W * 0.4, -Z * 0.05], [W * 0.85, -Z * 0.65], [W * 0.45, -Z * 0.875]];

            const C = [[-W * 0.0, -Z * 0.1], [-W * 0.25, -Z * 0.9], [-W * 0.70, -Z * 0.45],
                       [-W * 0.25, -Z * 0.1], [-W * 0.70, Z * 0.55], [-W * 0.255, Z * 0.95],
                       [-W * 0.0, Z * 0.15], [W * 0.15, Z * 0.95], [W * 0.625, Z * 0.55],
                       [W * 0.15, -Z * 0.1], [W * 0.625, -Z * 0.45], [W * 0.2, -Z * 0.9]];

            // Fill the chart with the planet names
            ctx.fillStyle = "#f0f";
            ctx.font = (Z * 0.15) + "px Verdana";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";

            for (let i = 0; i < 12; i++) {
                wrapT(ctx, n[i], c[i][0], c[i][1], Z * 0.3, Z * 0.12);  // Draw planet names
                ctx.fillText((i + 1), C[i][0], C[i][1]);  // Draw the numbers in the chart
            }

            ctx.font = (Z * 0.18) + "px Verdana";
            ctx.fillText(w, 0, 0);  // Draw the central text (e.g., 'w')
        }

        // Example data, replace with actual data if needed
        const planetNames = "${data.planetData}";
        const centralText = "${data.centralText}";

        writeDiamondChart(planetNames, centralText);
</script>
</body>
</html>

  `;

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerItem} onPress={handleNadi} >Nadi</Text>
          <Text style={styles.headerItem} onPress={handleTables}>Tables</Text>
          <Text style={styles.headerItem}>Item 3</Text>
          <Text style={styles.headerItem}>Item 4</Text>
          <Text style={styles.headerItem}>Item 5</Text>
          <Text style={styles.headerItem}>Item 6</Text>
          <Text style={styles.headerItem}>Item 7</Text>
          {/* Add more items as needed */}
        </View>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.container}>
        {result && (
          <>
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              style={styles.webView}
            />
            {Object.keys(result.varga_chart).map((key) => (
              <View key={key} style={styles.vargaContainer}>
                <Text style={styles.subtitle}>{key}</Text>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Planet</Text>
                    <Text style={styles.tableHeaderText}>Rashi</Text>
                  </View>
                  <FlatList
                    data={['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index }) => (
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item}</Text>
                        <Text style={styles.tableCell}>{result.varga_chart[key][index]}</Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            ))}

            {result.bhaava_madya && (
              <View style={styles.bhaavaContainer}>
                <Text style={styles.subtitle}>Bhaava Madya</Text>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>House</Text>
                    <Text style={styles.tableHeaderText}>Rashi</Text>
                  </View>
                  <FlatList
                    data={Object.entries(result.bhaava_madya)}
                    keyExtractor={([house]) => house}
                    renderItem={({ item: [house, rashi] }) => (
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{house}</Text>
                        <Text style={styles.tableCell}>{rashi}</Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            )}
            <View>
              <Button
                title="Prediction"
                onPress={handlePrediction}
                color="black"
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  basicInfo: {
    flex: 1,
    marginRight: 8,
  },
  astroDetails: {
    flex: 1,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row', // Align items horizontally
    paddingVertical: 10,
    backgroundColor: 'white', // Background color for the header
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  vargaContainer: {
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
  },
  bhaavaContainer: {
    marginBottom: 16,
  },
  webView: {
    width: 330,
    height: 300,
    marginBottom: 60,
  },
  tablecontainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
});
