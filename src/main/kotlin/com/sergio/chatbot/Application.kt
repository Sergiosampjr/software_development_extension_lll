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
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import com.sergio.chatbot.models.Usuarios

fun main() {
    embeddedServer(Netty, port = 8080) {
        module()
    }.start(wait = true)
}

fun Application.module() {
    // CONECTA AO BANCO
    Database.connect(
        url = "jdbc:mysql://localhost:3306/uecencontra_db",
        driver = "com.mysql.cj.jdbc.Driver",
        user = "root",
        password = "123456"
    )
    // CRIA A TABELA AUTOMATICAMENTE
    transaction {
        SchemaUtils.create(Usuarios)
    }
    install(ContentNegotiation) {
        json()
    }

    routing {
        localRoutes()

        get("/") {
            call.respondText("Servidor Ktor rodando e conectado ao MySQL!", ContentType.Text.Plain)
        }
    }
}