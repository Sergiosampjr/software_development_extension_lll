package com.sergio.chatbot.routes

import com.models.ChatRequest

import io.ktor.http.*
import com.sergio.chatbot.services.GroqService
import io.ktor.server.request.*
import com.sergio.chatbot.services.GoogleMapsService
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.* // necessário para chamadas suspend

fun Route.chatInfoRoutes() {
    get("/pergunta") {
        val pergunta = call.request.queryParameters["q"] ?: ""
        val resposta = when {
            pergunta.contains("biblioteca", ignoreCase = true) -> "A Biblioteca Central funciona das 08:00 às 20:00."
            pergunta.contains("RU", ignoreCase = true) -> "O Restaurante Universitário serve almoço das 11:00 às 14:00."
            pergunta.contains("bloco F", ignoreCase = true) -> "O Bloco F está fechado para manutenção."
            pergunta.contains("história", ignoreCase = true) -> "O Centro Acadêmico de História funciona das 09:00 às 17:00."
            pergunta.contains("Complexo Poliesportivo - UECE", ignoreCase = true) -> "A Biblioteca Central funciona das 08:00 às 20:00."
            else -> "Desculpe, não entendi sua pergunta."
        }
        call.respondText(resposta)
    }
}

fun Routing.chatRoutes() {
    post("/chat") {
        println("Requisição recebida no /chat")

        val body = call.receive<ChatRequest>()
        println("Body recebido: $body")

        val pergunta = body.mensagem
        println("Pergunta recebida: $pergunta")

        // Chama a LLM da GROQ para gerar a resposta
        val respostaLLM = GroqService.gerarResposta(pergunta)
        println("Resposta da LLM: $respostaLLM")

        // Verifica se a resposta está vazia ou contém erro
        if (respostaLLM.isBlank() || respostaLLM.contains("erro", ignoreCase = true)) {
            call.respond(HttpStatusCode.BadRequest, mapOf("erro" to "Não consegui gerar uma resposta."))
            return@post
        }

        // Retorna diretamente a resposta da LLM para o frontend
        call.respond(mapOf("resposta" to respostaLLM))
    }

}
