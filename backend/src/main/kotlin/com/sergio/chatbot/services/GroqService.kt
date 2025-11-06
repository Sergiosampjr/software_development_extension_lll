package com.sergio.chatbot.services

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

object GroqService {
    private val client = HttpClient {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    private const val apiKey = "" // sua chave da Groq

    suspend fun gerarResposta(pergunta: String): String {
        println("Chamando Groq API...")

        return try {
            val response: HttpResponse = client.post("https://api.groq.com/openai/v1/chat/completions") {
                headers {
                    append(HttpHeaders.Authorization, "Bearer $apiKey")
                    append(HttpHeaders.ContentType, "application/json")
                }
                setBody(
                    ChatRequest(
                        model = "llama-3.1-8b-instant",
                        messages = listOf(
                            Message("system", """
    Você é um assistente especializado **exclusivamente** na Universidade Estadual do Ceará (UECE),
    campus Itaperi, em Fortaleza.

    Locais conhecidos no campus:
    - Biblioteca Central
    - Complexo Poliesportivo (também conhecido como Complexo Esportivo)
    - Centro de Humanidades (CH)
    - Centro de Ciências da Saúde (CCS)
    - Reitoria
    - Restaurante Universitário (RU)
    - Auditório Central
    - Laboratórios de Informática
    - Centro de Educação (CED)
    - Lago da UECE

    Instruções:
    - Quando o usuário fizer uma pergunta, identifique **o local mais relacionado por nome ou tema**.
    - Se a pergunta contiver palavras semelhantes a "esporte", "quadra", "ginásio", responda: "Complexo Poliesportivo".
    - Se a pergunta for genérica (ex: "quais locais existem"), liste todos os locais.
    - Se o local não estiver na lista, responda:
      "Só posso responder sobre locais do campus Itaperi da UECE."
    - Seja preciso e não invente locais.
    """.trimIndent()),
                            Message("user", pergunta)
                        )
                    )
                )
            }

            val result: ChatResponse = response.body()
            val respostaGerada = result.choices.firstOrNull()?.message?.content ?: "Desculpe, não consegui gerar uma resposta."
            println("Resposta da API: $respostaGerada")
            respostaGerada

        } catch (e: Exception) {
    e.printStackTrace() // mostra o erro completo no terminal
    println("Erro ao chamar a Groq API: ${e.message}")
    "Desculpe, ocorreu um erro ao gerar a resposta."
}

    }
}

@Serializable
data class Message(val role: String, val content: String)

@Serializable
data class ChatRequest(val model: String, val messages: List<Message>)

@Serializable
data class ChatResponse(val choices: List<Choice>)

@Serializable
data class Choice(val message: Message)



