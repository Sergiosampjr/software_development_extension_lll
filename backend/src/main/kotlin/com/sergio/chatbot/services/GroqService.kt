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

    /**
     * 1️⃣ Carrega a API KEY primeiro da variável de ambiente (recomendado no backend)
     * 2️⃣ Se estiver vazio, tenta carregar do arquivo local.properties
     */
    private val apiKey: String = System.getenv("GROQ_API_KEY")
        ?: readLocalPropertiesKey()
        ?: ""

    /**
     * Lê a chave do arquivo local.properties
     */
    private fun readLocalPropertiesKey(): String? {
        return try {
            val props = java.util.Properties()
            val file = java.io.File("local.properties")
            if (file.exists()) {
                props.load(file.inputStream())
                props.getProperty("GROQ_API_KEY")
            } else null
        } catch (e: Exception) {
            null
        }
    }

    suspend fun gerarResposta(pergunta: String): String {
        println("Chamando Groq API...")

        if (apiKey.isBlank()) {
            println("❌ ERRO: API KEY não encontrada. Configure no local.properties ou variável ambiente.")
            return "Erro interno: API KEY não configurada."
        }

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
            val respostaGerada =
                result.choices.firstOrNull()?.message?.content
                    ?: "Desculpe, não consegui gerar uma resposta."

            println("Resposta da API: $respostaGerada")
            respostaGerada

        } catch (e: Exception) {
            e.printStackTrace()
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
