import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native"

export default function HomeScreen() {
  const handleStartChat = () => {
    // Aqui você pode navegar para a tela do chat
    console.log("Iniciar chat")
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      {/* Barra verde superior */}
      <View style={styles.topBar} />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bem vindo ao</Text>
        <Text style={styles.botName}>UECEBot</Text>

        {/* Ícone do mascote - usando emoji como placeholder */}
        <View style={styles.iconContainer}>
          <Text style={styles.botIcon}>🤖</Text>
        </View>
      </View>

      {/* Botão iniciar chat */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartChat}>
          <Text style={styles.buttonText}>Iniciar chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topBar: {
    height: 60,
    backgroundColor: "#4CAF50",
    width: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  botName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  botIcon: {
    fontSize: 80,
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
})