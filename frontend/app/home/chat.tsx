<<<<<<< Updated upstream
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native"
=======
"use client"

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
} from "react-native"
>>>>>>> Stashed changes
import { useState } from "react"
import { StatusBar } from "react-native"

interface Message {
  id: string
  text: string
  isUser: boolean
  isTyping?: boolean
<<<<<<< Updated upstream
=======
  mapImageUrl?: string
}

const mockMaps = [
  require("../../public/images/mock-map-1.jpg"),
  require("../../public/images/mock-map-2.jpg"),
  require("../../public/images/mock-map-3.jpg"),
  require("../../public/images/mock-map-4.jpg"),
]

const getMapForDestination = (text: string): any | null => {
  const lowerText = text.toLowerCase()

  // NC2A → mock-map-1
  if (lowerText.includes("nc2a") || lowerText.includes("nc2-a") || lowerText.includes("nc 2a")) {
    return mockMaps[0]
  }

  // Reitoria → mock-map-2
  if (lowerText.includes("reitoria")) {
    return mockMaps[1]
  }

  // Restaurante Universitário → mock-map-3
  if (lowerText.includes("restaurante") || lowerText.includes("ru") || lowerText.includes("refeitório")) {
    return mockMaps[2]
  }

  // Complexo Esportivo → mock-map-4
  if (lowerText.includes("complexo esportivo") || lowerText.includes("ginásio") || lowerText.includes("quadra")) {
    return mockMaps[3]
  }

  return null
}

const detectRouteKeywords = (text: string): boolean => {
  const keywords = [
    "rota",
    "caminho",
    "direção",
    "vire",
    "siga",
    "bloco",
    "prédio",
    "biblioteca",
    "sala",
    "auditório",
    "laboratório",
    "chegar",
    "localização",
    "onde fica",
    "como chego",
  ]
  const lowerText = text.toLowerCase()
  return keywords.some((keyword) => lowerText.includes(keyword))
>>>>>>> Stashed changes
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([])
<<<<<<< Updated upstream
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (inputText.trim() === '') return
=======
  const [inputText, setInputText] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [currentMapImage, setCurrentMapImage] = useState<any>(null)

  const handleSend = async () => {
    if (inputText.trim() === "") return
>>>>>>> Stashed changes

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    }
<<<<<<< Updated upstream
    
    setMessages(prev => [...prev, newUserMessage])
    setInputText('')

    // Simula "digitando..." do bot
    setTimeout(() => {
      const typingMessage: Message = {
        id: Date.now().toString() + '_typing',
        text: '...',
        isUser: false,
        isTyping: true,
      }
      setMessages(prev => [...prev, typingMessage])

      // Simula resposta do bot após 1 segundo
      setTimeout(() => {
        setMessages(prev => {
          const filtered = prev.filter(msg => !msg.isTyping)
          return [...filtered, {
            id: Date.now().toString(),
            text: 'Esta é uma resposta simulada do bot',
            isUser: false,
          }]
        })
      }, 1000)
    }, 500)
=======
    setMessages((prev) => [...prev, newUserMessage])

    const pergunta = inputText
    setInputText("")

    const typingMessage: Message = {
      id: Date.now().toString() + "_typing",
      text: "...",
      isUser: false,
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: pergunta }),
      })

      const data = await response.json()
      console.log("Resposta do backend:", data)

      const mapForDestination = getMapForDestination(pergunta)
      const hasRouteKeywords = detectRouteKeywords(data.resposta || "")

      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isTyping)
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            text: data.resposta ?? data.erro ?? "sem resposta do backend",
            isUser: false,
            mapImageUrl: mapForDestination && hasRouteKeywords ? "mock" : undefined,
          },
        ]
      })

      if (mapForDestination && hasRouteKeywords) {
        setCurrentMapImage(mapForDestination)
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isTyping)
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            text: "Erro ao conectar com o backend",
            isUser: false,
          },
        ]
      })
    }
  }

  const handleShowMap = (imageUrl: string | any) => {
    if (imageUrl === "mock") {
      // currentMapImage já foi definido no handleSend
    } else {
      setCurrentMapImage({ uri: imageUrl })
    }
    setModalVisible(true)
>>>>>>> Stashed changes
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageRow, item.isUser && styles.messageRowUser]}>
      {!item.isUser && (
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarText}>🤖</Text>
        </View>
      )}
      <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.messageText, item.isUser && styles.userMessageText]}>{item.text}</Text>
        {!item.isUser && item.mapImageUrl && !item.isTyping && (
          <TouchableOpacity style={styles.mapButton} onPress={() => handleShowMap(item.mapImageUrl!)}>
            <Text style={styles.mapButtonText}>📍 Ver mapa</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🤖</Text>
          </View>
          <Text style={styles.headerTitle}>Uecencontra</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Image source={currentMapImage} style={styles.mapImage} resizeMode="contain" />
            <Text style={styles.modalTitle}>Rota no Mapa</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pergunte aqui..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={inputText.trim() === ""}>
          <Text style={styles.sendIcon}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< Updated upstream
    backgroundColor: '#f5f5f5',
=======
    backgroundColor: "#f5f5f5",
>>>>>>> Stashed changes
  },
  header: {
    backgroundColor: "#4CAF50",
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
<<<<<<< Updated upstream
    flexDirection: 'row',
    alignItems: 'center',
=======
    flexDirection: "row",
    alignItems: "center",
>>>>>>> Stashed changes
  },
  headerIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
<<<<<<< Updated upstream
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
=======
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
>>>>>>> Stashed changes
    marginRight: 10,
  },
  headerIconText: {
    fontSize: 20,
  },
  headerTitle: {
<<<<<<< Updated upstream
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
=======
    color: "white",
    fontSize: 20,
    fontWeight: "600",
>>>>>>> Stashed changes
  },
  messagesList: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  messageRow: {
<<<<<<< Updated upstream
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
=======
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  messageRowUser: {
    justifyContent: "flex-end",
>>>>>>> Stashed changes
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
<<<<<<< Updated upstream
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
=======
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
>>>>>>> Stashed changes
  },
  botAvatarText: {
    fontSize: 18,
  },
  messageBubble: {
<<<<<<< Updated upstream
    maxWidth: '75%',
=======
    maxWidth: "75%",
>>>>>>> Stashed changes
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  botBubble: {
<<<<<<< Updated upstream
    backgroundColor: '#e8e8e8',
    borderTopLeftRadius: 5,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
=======
    backgroundColor: "#e8e8e8",
    borderTopLeftRadius: 5,
  },
  userBubble: {
    backgroundColor: "#4CAF50",
>>>>>>> Stashed changes
    borderTopRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
<<<<<<< Updated upstream
    color: '#333',
  },
  userMessageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
=======
    color: "#333",
  },
  userMessageText: {
    color: "white",
  },
  mapButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  mapButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#666",
    fontWeight: "600",
  },
  mapImage: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
>>>>>>> Stashed changes
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
<<<<<<< Updated upstream
    borderColor: '#e0e0e0',
=======
    borderColor: "#e0e0e0",
>>>>>>> Stashed changes
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
<<<<<<< Updated upstream
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
=======
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
})

>>>>>>> Stashed changes
