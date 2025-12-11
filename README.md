# Uecencontra 🚀

## 📌 Informações do Projeto

Este chatbot serve para o usuário da universidade obter informações de lugares expecíficos do campus,como localizar um departamento.O chatbot exclarece duvidas se um lugar está aberto ou não.
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
- Navegação no frontend: configurar o `ChatScreen` para detectar frases e abrir o `MapaScreen` exigiu regex e integração        com React Navigation.  
- Formatação das respostas: lidar com quebras de linha (`\n`) para que o texto aparecesse bem no chat.
- Gerenciamento de tempo com a equipe
- Integrar a API do google maps

## 📈 Evolução do Projeto
1. **Primeira versão**: Apenas o backend em Ktor respondendo mensagens simples.  
2. **Segunda versão**: Criação do frontend em React Native com a tela de chat.  
3. **Terceira versão**: Integração entre frontend e backend via requisições HTTP.


![alt text](imagens/Captura de tela de 2025-12-11 17-10-51.png)


4. **Quarta versão**: Validação da requisição de prompts/método post para a tela de chat.  
4. **Quarta versão**: Implementação da navegação automática para o mapa quando o usuário solicita.  
5  **Quinta versão**: Implementação da API do google maps.  
![alt text](imagens/googleMaps.jpeg)
6  **sexta versão**: Desistência da integração da API do google maps. 

6  **sexta versão**: Implementação do método banco de imagens de rotas dos lugares da UECE.  
7. **Versão atual**: Backend padronizado retornando sempre `resposta`, frontend exibindo corretamente as mensagens e rotas funcionando.



Próximos passos:

Integrar a alguma API de mapa.

![alt text](imagens/WhatsApp Image 2025-12-11 at 09.14.15.jpeg)


![alt text](imagens/WhatsApp Image 2025-12-11 at 08.51.47.jpeg)

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


Integrantes da equipe:

Sérgio Nunes Sampaio Junior - Gerente/gestor/backend
Gabriel Brasil - Backend/supervisor
Emanuel Da Silva Oliveira - Frontend/UX,UI
Ana Beatriz Silva Vasconcelos Dos Santos - Frontend/UX,UI
