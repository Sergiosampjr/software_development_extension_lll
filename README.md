# Projeto de Software

Este é um projeto de chatbot universitário desenvolvido com:
- Frontend: React Native
- Backend: Kotlin utilizando o framework Ktor

🚀 Funcionalidades
App mobile desenvolvido com React Native + Expo Router.
Integração com LLM (Large Language Model) para geração de respostas do chatbot.
API backend construída com Ktor responsável por orquestrar requisições ao LLM.
Navegação estruturada com rotas do Expo Router.

🛠️ Como rodar o projeto
📱 1. Rodando o Frontend (React Native + Expo Router)
Acesse a pasta frontend e siga os passos:
1) cd frontend
2) npm install
3) npx expo start
Use um emulador ou dispositivo físico para abrir o aplicativo.

🔧 2. Rodando o Backend (Kotlin + Ktor)
Acesse a pasta backend e execute os comandos abaixo:
1) Limpar e compilar o projeto: ./gradlew clean build
2) Executar o servidor: ./gradlew run
3) Acessar no navegador: http://localhost:8080/
4) Retorno esperado: Servidor Ktor rodando com sucesso!

🧠 Uso da LLM com Groq API
Este projeto utiliza LLMs (Large Language Models) para gerar respostas inteligentes no chatbot.
A integração é feita através da Groq API, que permite acesso gratuito a modelos como Llama 3, Mixtral, entre outros.
- Como obter uma Groq API gratuita
1) Crie uma conta gratuita no Groq Cloud:
2) Acesse o site oficial da Groq Cloud.
3) Clique em Sign Up e finalize o cadastro.
4) Acesse o Console da Groq:
5) Após logar, vá para a área API Keys.
6) Clique em Create API Key, dê um nome (ex.: chatbot-universitario) e copie sua chave.

obs: A API é 100% gratuita, mas possui limites de requisições por minuto e por dia.

- Como utilizar essa chave no backend:
No repositorio backend, você deve colocar sua API Key no arquivo *GroqService.kt* na linha de codigo "private const val apiKey = "" // sua chave da Groq".

