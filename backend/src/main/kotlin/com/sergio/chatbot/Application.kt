package com.sergio.chatbot

import io.ktor.server.plugins.cors.routing.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

// SEUS IMPORTS DAS ROTAS E MODELS
import com.sergio.chatbot.routes.localRoutes
import com.sergio.chatbot.routes.chatRoutes
import com.sergio.chatbot.routes.authRoutes
import com.sergio.chatbot.models.Usuarios

fun main() {

    embeddedServer(Netty, port = 9090, module = Application::module)
        .start(wait = true)
}

fun Application.module() {

    Database.connect(
        url = "jdbc:mysql://localhost:3306/uecencontra_db",
        driver = "com.mysql.cj.jdbc.Driver",
        user = "root",
        password = "123456"
    )

    transaction {
        SchemaUtils.create(Usuarios)
    }


    install(ContentNegotiation) {
        json(
            Json {
                prettyPrint = true
                isLenient = true
                ignoreUnknownKeys = true
                encodeDefaults = true
            }
        )
    }


    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Options) // Importante para login via browser/axios
        allowMethod(HttpMethod.Put)
    }


    routing {

        get("/") {
            call.respondText("Servidor Ktor rodando com sucesso!")
        }

        authRoutes()
        chatRoutes()
        localRoutes()
    }
}