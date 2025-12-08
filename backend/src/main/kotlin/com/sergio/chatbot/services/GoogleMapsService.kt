package com.sergio.chatbot.services // Ajuste o pacote se necessário

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

// --- Classes para o JSON do Gemini (API) ---
@Serializable
data class GeminiRequest(val contents: List_GeminiContent)

@Serializable
data class GeminiContent(val parts: List_GeminiPart)

@Serializable
data class GeminiPart(val text: String)

@Serializable
data class GeminiResponse(val candidates: List<GeminiCandidate>? = null)

@Serializable
data class GeminiCandidate(val content: GeminiContent)

// --- O Serviço ---
class GoogleMapsService {

    // ⚠️ COLOQUE SUA CHAVE AQUI
    private val apiKey = "AIzaSyC4KwYZ1q_it1R3k7rHDMhIO6HmY-L9IYA"

    // Configura o cliente HTTP do Ktor
    private val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    suspend fun generateContent(prompt: String): String {
        val url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$apiKey"

        try {
            // Monta o JSON para enviar
            val requestBody = GeminiRequest(
                contents = listOf(
                    GeminiContent(parts = listOf(GeminiPart(text = prompt)))
                )
            )

            // Faz o POST para o Google
            val response = client.post(url) {
                contentType(ContentType.Application.Json)
                setBody(requestBody)
            }

            // Lê a resposta
            if (response.status == HttpStatusCode.OK) {
                val responseData: GeminiResponse = response.body()
                // Pega o texto da resposta
                return responseData.candidates?.firstOrNull()?.content?.parts?.firstOrNull()?.text
                    ?: "A IA não retornou texto."
            } else {
                return "Erro na API do Google: ${response.status}"
            }

        } catch (e: Exception) {
            return "Erro ao chamar o Gemini: ${e.message}"
        }
    }
}

// Pequeno helper para listas
typealias List_GeminiContent = List<GeminiContent>
typealias List_GeminiPart = List<GeminiPart>