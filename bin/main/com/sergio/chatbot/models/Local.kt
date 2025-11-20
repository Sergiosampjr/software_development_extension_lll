package com.sergio.chatbot.models

import kotlinx.serialization.Serializable

@Serializable
data class Local(
    val id: Int,
    val nome: String,
    val tipo: String,
    val descricao: String,
    val latitude: Double,
    val longitude: Double,
    val horarioFuncionamento: String?
)
