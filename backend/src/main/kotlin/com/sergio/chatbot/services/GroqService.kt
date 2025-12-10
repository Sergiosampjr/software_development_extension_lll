package com.sergio.chatbot.services


import io.ktor.http.content.TextContent
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.client.request.forms.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

object GroqService {

    private val client = HttpClient {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    // COLOQUE SUA CHAVE AQUI
    private val apiKey: String = "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".trim()

    // Histórico de mensagens (contexto)
    private val mensagens = mutableListOf<Pair<String, String>>() // Pair<role, content>

    /**
     * Gera resposta da LLM mantendo o contexto da conversa.
     * Envia system message + histórico de mensagens.
     */
    suspend fun gerarResposta(pergunta: String): String {
        // Adiciona a pergunta do usuário ao histórico
        mensagens.add("user" to pergunta)

        // Constrói o array JSON de mensagens
        val jsonMessages = buildString {
            append("[")
            // System message fixa
            append("""
                {
                    "role": "system",
                    "content": "Você é um assistente especializado em fornecer informações sobre os locais da UECE Campus Itaperi. Sempre que o usuário fizer uma pergunta contendo a frase 'aonde fica', você deve retornar no formato JSON com 'answer' e 'action'. Para perguntas administrativas, apenas retorne 'answer'."
                }
            """.trimIndent())

            if (mensagens.isNotEmpty()) append(",")

            // Mensagens do histórico
            mensagens.forEachIndexed { index, (role, content) ->
                val escapedContent = content.replace("\"", "\\\"") // escapa aspas
                append("""
                    {
                        "role": "$role",
                        "content": "$escapedContent"
                    }
                """.trimIndent())
                if (index < mensagens.size - 1) append(",")
            }
            append("]")
        }

        val jsonBody = """
            {
              "model": "llama-3.1-8b-instant",
              "messages": $jsonMessages
            }
        """.trimIndent()

        return try {
            val response: HttpResponse = client.post("https://api.groq.com/openai/v1/chat/completions") {
                headers {
                    append(HttpHeaders.Authorization, "Bearer $apiKey")
                    append(HttpHeaders.ContentType, "application/json")
                }
                setBody(TextContent(jsonBody, ContentType.Application.Json))
            }

            val raw = response.bodyAsText()
            println("RAW RESPONSE >>> $raw") // depuração

            // Extrai apenas o conteúdo da primeira escolha
            val json = Json.parseToJsonElement(raw).jsonObject
            val choices = json["choices"]?.jsonArray
            val content = choices?.get(0)?.jsonObject
                ?.get("message")?.jsonObject
                ?.get("content")?.jsonPrimitive?.content

            if (!content.isNullOrBlank()) {
                // Adiciona a resposta do assistant ao histórico
                mensagens.add("assistant" to content)
            }

            content ?: "Erro: resposta vazia"

        } catch (e: Exception) {
            e.printStackTrace()
            "Erro ao chamar a API"
        }
    }

    // Limpa o histórico de mensagens (opcional)
    fun limparHistorico() {
        mensagens.clear()
    }
}
