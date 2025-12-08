"use client"

import { router } from "expo-router"
import { useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator // Adicionei para mostrar que está carregando
} from "react-native"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Novo estado para controlar o loading

  const handleLogin = async () => {
    // Validação básica
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha email e senha.")
      return
    }

    setIsLoading(true) // Ativa o loading

    try {
      // ⚠️ IMPORTANTE:
      // Se for Emulador Android use: 'http://10.0.2.2:8080/auth/login'
      // Se for iOS Simulator use: 'http://localhost:8080/auth/login'
      // Se for celular físico use o IP do seu PC: 'http://192.168.X.X:8080/auth/login'

      const response = await fetch('http://10.0.2.2:9090/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password, // O backend espera "senha", mas aqui usamos "password"
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Sucesso!
        console.log("Login realizado com ID:", data.id)
        router.push("/home/chat")
      } else {
        // Erro vindo do backend (ex: senha errada)
        Alert.alert("Falha no Login", data.error || "Email ou senha incorretos")
      }

    } catch (error) {
      console.error(error)
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor. Verifique se o backend está rodando.")
    } finally {
      setIsLoading(false) // Desativa o loading
    }
  }

  const handleCreateAccount = () => {
    // Se você tiver uma rota de cadastro, mude aqui.
    // Por enquanto, vou deixar um alerta.
    Alert.alert("Em breve", "A tela de cadastro será implementada.")
    // router.push("/auth/register")
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          {/* Certifique-se que essa imagem existe neste caminho */}
          <Image
            source={require('../../public/UECE_2023.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>UECEbot</Text>
        <Text style={styles.subtitle}>Efetue seu login</Text>

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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Botão Entrar com Loading */}
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

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
  logo: {
    width: 120,
    height: 120,
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
  loginButtonDisabled: {
    backgroundColor: "#A5D6A7", // Um verde mais claro para indicar desabilitado
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