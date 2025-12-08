package com.sergio.chatbot.models

import org.jetbrains.exposed.sql.Table

object Usuarios : Table("Usuarios") {
    val id = integer("id").autoIncrement()
    val nome = varchar("nome", 255)
    val email = varchar("email", 255).uniqueIndex()
    val matricula = varchar("matricula", 20).nullable() // Novo campo
    val senhaHash = varchar("senha_hash", 255)

    override val primaryKey = PrimaryKey(id)
}