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

    private const val apiKey = "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" // sua chave da Groq

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
    Você é um assistente especializado em fornecer informações sobre os locais da UECE Campus Itaperi.

Sua função é:
- responder a localização dos lugares
- responder números de contato
- responder horários de funcionamento
- dizer se o lugar está aberto ou fechado no momento
- fornecer informações gerais

Sempre que o usuário fizer uma pergunta contendo a frase "aonde fica", você DEVE retornar no formato JSON abaixo:

{
  "answer": "resposta curta explicando onde fica",
  "action": {
    "type": "SHOW_MAP",
    "locationName": "Nome do lugar",
    "coordinates": {
      "lat": <latitude>,
      "lng": <longitude>
    }
  }
}

Se o usuário perguntar sobre:
- telefone
- contato
- horário
- se está aberto
- informações administrativas

Você DEVE responder APENAS no campo "answer" (sem action), assim:

{
  "answer": "resposta aqui"
}

NÃO use "action" para nenhum caso exceto localização.

Você conhece todos os locais cadastrados no seguinte banco:

<LISTA_DE_LOCAIS_AQUI>

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