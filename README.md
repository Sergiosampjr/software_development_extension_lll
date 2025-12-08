# UECEBot 🚀

## 📌 Informações do Projeto

Este chatbot serve para o usuário da universidade obter informações de lugares expecíficos do campus,como localizar um departamento.
Este projeto integra **Frontend (React Native)** e **Backend (Ktor em Kotlin)** para criar um assistente virtual da UECE.  
- O **Frontend** possui uma tela de chat (`ChatScreen`) e uma tela de mapa (`MapaScreen`).  
- O **Backend** expõe a rota `/chat`, que recebe mensagens e retorna respostas geradas pela LLM da GROQ.  
- Funcionalidade extra: quando o usuário digita frases como *“eu quero chegar em X a partir de Y”*, o app abre automaticamente o mapa com a rota traçada.

---

## ⚙️ Tecnologias Utilizadas
- **Frontend**: React Native, Expo, React Navigation, WebView  
- **Backend**: Kotlin, Ktor, integração com GROQ  
- **Ferramentas**: VSCode, Gradle, npm, curl para testes

---

## 💡 Dificuldades Encontradas
- Integração entre frontend e backend: inicialmente o backend retornava `erro` em vez de `resposta`, causando mensagens `undefined` no chat.  
- Ajuste da rota `/chat`: foi necessário padronizar a saída para sempre retornar `resposta`.  
- Navegação no frontend: configurar o `ChatScreen` para detectar frases e abrir o `MapaScreen` exigiu regex e integração com React Navigation.  
- Formatação das respostas: lidar com quebras de linha (`\n`) para que o texto aparecesse bem no chat.
- Gerenciamento de tempo com a equipe
---

## 📈 Evolução do Projeto
1. **Primeira versão**: apenas o backend em Ktor respondendo mensagens simples.  
2. **Segunda versão**: criação do frontend em React Native com a tela de chat.  
3. **Terceira versão**: integração entre frontend e backend via requisições HTTP.  
4. **Quarta versão**: implementação da navegação automática para o mapa quando o usuário pede rotas.  
5. **Versão atual**: backend padronizado retornando sempre `resposta`, frontend exibindo corretamente as mensagens e rotas funcionando.

---

## 🚀 Como Executar
### Backend (Linux - Ubunto)
```bash
cd backend
./gradlew clean build
./gradlew run



## 🚀 Como Executar
### Backend WIndows)
```bash
cd backend
gradlew.bat clean build
gradlew.bat run




frontend 

cd frontend

npx expo start
