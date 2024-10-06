import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigation = useNavigation(); // For navigation

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user", timestamp: new Date().toLocaleTimeString() };
      setMessages([...messages, userMessage]);

      const response = await fetch('http://192.168.1.4:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.response, sender: "bot", timestamp: new Date().toLocaleTimeString() };
      setMessages([...messages, userMessage, botMessage]);

      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Text style={styles.arrowText}>{"➔"}</Text>
        </TouchableOpacity>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://st2.depositphotos.com/2024219/47854/i/450/depositphotos_478548142-stock-photo-young-caucasian-woman-isolated-yellow.jpg" }}
        />
        <View>
          <Text style={styles.userName}>John Doe</Text>
          <View style={styles.statusContainer}>
            <View style={styles.onlineDot}></View>
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('voicechat')} style={styles.iconButton}>
          <Text style={styles.iconText}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('about')} style={styles.iconButton}>
          <Text style={styles.iconText}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.sender === 'user' ? 'U' : 'B'}</Text>
            </View>
            <View>
              <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.messagesList}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'black',
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 50,
  },
  iconText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginRight: 5,
  },
  statusText: {
    color: '#bbb',
    fontSize: 12,
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#888',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  userBubble: {
    backgroundColor: 'black',
  },
  botBubble: {
    backgroundColor: 'white',
  },
  messageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  arrowText: {
    fontWeight: 'bold',
    transform: [{ rotate: '180deg' }],
    color: '#fff',
  },
  sendButtonText: {
    fontWeight: 'bold',
    transform: [{ rotate: '310deg' }],
    color: '#fff',
  },
});

export default Chat;
