# 📘 Alfabeto Cirílico: Guia Interativo

![Status Concluído](https://img.shields.io/badge/Status-Desenvolvimento-brightgreen) ![Licença MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow)  

Um projeto interativo para aprender o alfabeto cirílico de forma prática e visual. Ideal para estudantes de línguas eslavas (russo, ucraniano, búlgaro etc.) — com flashcards, áudio e um modo de quiz.

---

## 📋 Tabela de Conteúdos

- [Sobre o Projeto](#-sobre-o-projeto)  
- [Funcionalidades](#-funcionalidades)  
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
- [Como Executar](#-como-executar)  
- [Estrutura do Projeto](#-estrutura-do-projeto)  
- [Contribuição](#-contribui%C3%A7%C3%A3o)  
- [Licença](#-licen%C3%A7a)  
- [Contato](#-contato)  

---

## 🚀 Sobre o Projeto

Este projeto foi criado para facilitar o aprendizado do alfabeto cirílico russo através de uma interface simples e responsiva. Cada letra apresenta forma maiúscula/minúscula, transliteração, pronúncia e exemplos — além de áudio quando disponível.

Dados das letras: veja [`alphabetData`](src/data/alphabetData.js). A aplicação principal está em [`App`](src/App.js) e a entrada em [`index.js`](src/index.js).

---

## ✨ Funcionalidades

- Visualização por flashcards com frente/verso (`LearningMode`) — veja o componente [`LearningMode`](src/components/LearningMode.jsx).  
- Modo prática com flip card e navegação (`PracticeMode`) — veja [`PracticeMode`](src/components/PracticeMode.jsx).  
- Modo teste/quiz com pontuação (`TestMode`) — veja [`TestMode`](src/components/TestMode.jsx).  
- Reprodução de áudio das letras (arquivos em [public/assets/audio](public/assets/audio)).  
- Filtros, modo aleatório e fallback TTS quando o MP3 não estiver disponível.  
- Design responsivo e atenção à acessibilidade.

Componentes principais: [`AlphabetCard`](src/components/AlphabetCard.jsx), [`Header`](src/components/Header.jsx), [`Footer`](src/components/Footer.jsx).

---

## 🛠 Tecnologias Utilizadas

- Frontend: HTML5, CSS3, JavaScript (ES6+)  
- Biblioteca: React (componentes em `src/components/`)  
- Build / scripts: [`package.json`](package.json) (`react-scripts`)  
- Áudio: arquivos MP3 em [public/assets/audio](public/assets/audio)

Arquivos importantes:
- [src/App.js](src/App.js) — componente principal  
- [src/index.js](src/index.js) — ponto de entrada  
- [src/data/alphabetData.js](src/data/alphabetData.js) — dados do alfabeto  
- [public/index.html](public/index.html) — HTML base

---

## 📂 Como Executar

Pré-requisitos:
- Node.js v14+  
- npm ou yarn  
- Git (opcional)

Passos rápidos:

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/alfabeto-cirilico.git
cd alfabeto-cirilico
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o projeto:

```bash
npm start
# ou
yarn start
```

O projeto será iniciado em `http://localhost:3000`.

---

## 📁 Estrutura do Projeto

```
alfabeto-cirilico/
├── public/
│   ├── assets/
│   │   └── audio/         # Arquivos de áudio das letras
│   ├── index.html         # HTML base
│   └── ...
├── src/
│   ├── components/        # Componentes React
│   │   ├── AlphabetCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LearningMode.jsx
│   │   ├── PracticeMode.jsx
│   │   └── TestMode.jsx
│   ├── data/
│   │   └── alphabetData.js # Dados do alfabeto
│   ├── App.js             # Componente principal
│   └── index.js           # Ponto de entrada
├── .gitignore
├── package.json
└── README.md
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar um pull request ou abrir uma issue para discutirmos melhorias.

---

## 📜 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📫 Contato

Para dúvidas ou sugestões, entre em contato:

- Brian Muniz - [brian.muniz.silveira@gmail.com](mailto:brian.muniz.silveira@gmail.com)  
- GitHub: [Brian Muniz Silveira](https://github.com/BrianMunizSilveira)  

