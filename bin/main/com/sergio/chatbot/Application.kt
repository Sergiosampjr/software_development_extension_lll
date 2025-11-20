package com.sergio.chatbot
import io.ktor.http.*
import io.ktor.server.response.*

import com.sergio.chatbot.routes.localRoutes
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(Netty, port = 8080) {
        module()
    }.start(wait = true)
}

fun Application.module() {
    install(ContentNegotiation) {
        json()
    }

    routing {
        localRoutes()
        // 👇 Adicione aqui:
        get("/") {
            call.respondText("Servidor Ktor rodando com sucesso!", ContentType.Text.Plain)
        }
    }
}
