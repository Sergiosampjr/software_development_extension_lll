package com.sergio.chatbot.routes

import com.sergio.chatbot.models.Local
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.localRoutes() {
    val locais = listOf(
        Local(1, "Biblioteca Central", "biblioteca", "Aberta", -3.7765, -38.5772, "08:00 - 20:00"),
        Local(2, "Bloco F", "bloco", "Fechado para manutenção", -3.7750, -38.5780, null),
        Local(3, "Restaurante Universitário", "RU", "Aberto", -3.7768, -38.5765, "11:00 - 14:00"),
        Local(4, "Centro Acadêmico de História", "centro_academico", "Aberto", -3.7762, -38.5775, "09:00 - 17:00")
    )

    get("/locais") {
        try {
            call.respond(locais) // agora deve funcionar
        } catch (e: Exception) {
            e.printStackTrace()
            call.respondText(
                "Erro ao processar /locais: ${e.message}",
                status = io.ktor.http.HttpStatusCode.InternalServerError
            )
        }
    }
}
