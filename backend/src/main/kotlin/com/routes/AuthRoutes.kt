package com.sergio.chatbot.routes

import com.sergio.chatbot.models.Usuarios
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

@Serializable
data class LoginRequest(val email: String, val senha: String)

@Serializable
data class RegistroRequest(val nome: String, val email: String, val senha: String)

fun Route.authRoutes() {
    route("/auth") {

        // Rota de Registro (Cadastro)
        post("/register") {
            val dados = call.receive<RegistroRequest>()
            if (!dados.email.endsWith("@aluno.uece.br") && !dados.email.endsWith("@uece.br")) {
                call.respond(HttpStatusCode.Forbidden, mapOf("error" to "Apenas emails institucionais da UECE são permitidos."))
                return@post
            }

            try {
                transaction {
                    Usuarios.insert {
                        it[nome] = dados.nome
                        it[email] = dados.email
                        it[senhaHash] = dados.senha // Em produção, use BCrypt aqui!
                    }
                }
                call.respond(HttpStatusCode.Created, mapOf("status" to "Usuário criado!"))
            } catch (e: Exception) {
                call.respond(HttpStatusCode.Conflict, mapOf("error" to "E-mail já existe ou erro no banco"))
            }
        }

        // Rota de Login
        post("/login") {
            val dados = call.receive<LoginRequest>()

            val usuario = transaction {
                Usuarios.select { Usuarios.email eq dados.email }
                    .singleOrNull()
            }

            if (usuario != null && usuario[Usuarios.senhaHash] == dados.senha) {
                call.respond(mapOf("status" to "Login realizado", "id" to usuario[Usuarios.id]))
            } else {
                call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Credenciais inválidas"))
            }
        }
    }
}