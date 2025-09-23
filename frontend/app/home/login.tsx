"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"

export default function LoginScreen() {
  const [email, setEmail] = useState("")

  const handleLogin = () => {
    // Lógica de login aqui
    console.log("Login com email:", email)
    // Navegar para próxima tela após login
  }

  const handleCreateAccount = () => {
    // Navegar para tela de cadastro
    console.log("Criar conta")
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo/Brasão da UECE */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>🏛️</Text>
            <Text style={styles.flamesText}>🔥🔥🔥</Text>
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>UECEbot</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>Efetue seu login</Text>

        {/* Campo de email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email institucional"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link para criar conta */}
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>
            Não possui conta? <Text style={styles.linkText}>Clique aqui</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F5F5F5",
    borderRadius: 60,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 40,
    marginBottom: 8,
  },
  flamesText: {
    fontSize: 16,
    position: "absolute",
    top: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666666",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#333333",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  createAccountText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666666",
  },
  linkText: {
    color: "#2196F3",
    fontWeight: "500",
  },
})