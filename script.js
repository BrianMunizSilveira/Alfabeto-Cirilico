// Dados do alfabeto cirílico russo
const alfabetoRusso = [
    { maiuscula: 'А', minuscula: 'а', latim: 'A', pronuncia: 'a', exemplo: 'Анна (Anna)' },
    { maiuscula: 'Б', minuscula: 'б', latim: 'B', pronuncia: 'b', exemplo: 'Борис (Boris)' },
    { maiuscula: 'В', minuscula: 'в', latim: 'V', pronuncia: 'v', exemplo: 'Вера (Vera)' },
    { maiuscula: 'Г', minuscula: 'г', latim: 'G', pronuncia: 'g', exemplo: 'Галина (Galina)' },
    { maiuscula: 'Д', minuscula: 'д', latim: 'D', pronuncia: 'd', exemplo: 'Дмитрий (Dmitri)' },
    { maiuscula: 'Е', minuscula: 'е', latim: 'E', pronuncia: 'ye', exemplo: 'Елена (Yelena)' },
    { maiuscula: 'Ё', minuscula: 'ё', latim: 'Ë', pronuncia: 'yo', exemplo: 'Ёжик (Yozhik - ouriço)' },
    { maiuscula: 'Ж', minuscula: 'ж', latim: 'Zh', pronuncia: 'zh', exemplo: 'Женя (Zhenya)' },
    { maiuscula: 'З', minuscula: 'з', latim: 'Z', pronuncia: 'z', exemplo: 'Зоя (Zoya)' },
    { maiuscula: 'И', minuscula: 'и', latim: 'I', pronuncia: 'ee', exemplo: 'Ирина (Irina)' },
    { maiuscula: 'Й', minuscula: 'й', latim: 'Y', pronuncia: 'y', exemplo: 'Йогурт (iogurte)' },
    { maiuscula: 'К', minuscula: 'к', latim: 'K', pronuncia: 'k', exemplo: 'Кирилл (Kirill)' },
    { maiuscula: 'Л', minuscula: 'л', latim: 'L', pronuncia: 'l', exemplo: 'Любовь (Lyubov - amor)' },
    { maiuscula: 'М', minuscula: 'м', latim: 'M', pronuncia: 'm', exemplo: 'Мария (Maria)' },
    { maiuscula: 'Н', minuscula: 'н', latim: 'N', pronuncia: 'n', exemplo: 'Наталья (Natalya)' },
    { maiuscula: 'О', minuscula: 'о', latim: 'O', pronuncia: 'o', exemplo: 'Ольга (Olga)' },
    { maiuscula: 'П', minuscula: 'п', latim: 'P', pronuncia: 'p', exemplo: 'Пётр (Pyotr)' },
    { maiuscula: 'Р', minuscula: 'р', latim: 'R', pronuncia: 'r', exemplo: 'Россия (Rossiya - Rússia)' },
    { maiuscula: 'С', minuscula: 'с', latim: 'S', pronuncia: 's', exemplo: 'Сергей (Sergey)' },
    { maiuscula: 'Т', minuscula: 'т', latim: 'T', pronuncia: 't', exemplo: 'Татьяна (Tatyana)' },
    { maiuscula: 'У', minuscula: 'у', latim: 'U', pronuncia: 'oo', exemplo: 'Ульяна (Ulyana)' },
    { maiuscula: 'Ф', minuscula: 'ф', latim: 'F', pronuncia: 'f', exemplo: 'Фёдор (Fyodor)' },
    { maiuscula: 'Х', minuscula: 'х', latim: 'Kh', pronuncia: 'kh', exemplo: 'Хабаровск (Khabarovsk)' },
    { maiuscula: 'Ц', minuscula: 'ц', latim: 'Ts', pronuncia: 'ts', exemplo: 'Царь (Tsar)' },
    { maiuscula: 'Ч', minuscula: 'ч', latim: 'Ch', pronuncia: 'ch', exemplo: 'Чай (Chai - chá)' },
    { maiuscula: 'Ш', minuscula: 'ш', latim: 'Sh', pronuncia: 'sh', exemplo: 'Школа (Shkola - escola)' },
    { maiuscula: 'Щ', minuscula: 'щ', latim: 'Shch', pronuncia: 'shch', exemplo: 'Щука (Shchuka - lúcio)' },
    { maiuscula: 'Ъ', minuscula: 'ъ', latim: '', pronuncia: 'sinal duro', exemplo: 'Подъезд (entrada)' },
    { maiuscula: 'Ы', minuscula: 'ы', latim: 'Y', pronuncia: 'ih', exemplo: 'Мы (My - nós)' },
    { maiuscula: 'Ь', minuscula: 'ь', latim: '', pronuncia: 'sinal suave', exemplo: 'День (Den - dia)' },
    { maiuscula: 'Э', minuscula: 'э', latim: 'E', pronuncia: 'eh', exemplo: 'Эра (Era)' },
    { maiuscula: 'Ю', minuscula: 'ю', latim: 'Yu', pronuncia: 'yoo', exemplo: 'Юлия (Yuliya)' },
    { maiuscula: 'Я', minuscula: 'я', latim: 'Ya', pronuncia: 'ya', exemplo: 'Январь (Yanvar - Janeiro)' }
];

// Variáveis globais
let letraAtualPratica = 0;
let perguntaAtualTeste = null;
let pontuacaoTeste = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    // Carregar o alfabeto
    carregarAlfabeto();

    // Configurar eventos dos botões de modo
    const botoesModo = document.querySelectorAll('.modo-btn');
    botoesModo.forEach(botao => {
        botao.addEventListener('click', function () {
            botoesModo.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const modo = this.dataset.modo;
            document.querySelectorAll('.modo-conteudo').forEach(secao => {
                secao.classList.remove('ativo');
            });
            document.getElementById(modo).classList.add('ativo');

            if (modo === 'praticar') {
                iniciarPratica();
            } else if (modo === 'testar') {
                iniciarTeste();
            }
        });
    });

    // Configurar eventos dos botões de filtro
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function () {
            botoesFiltro.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filtro = this.dataset.filtro;
            filtrarAlfabeto(filtro);
        });
    });

    // Configurar prática
    document.querySelectorAll('.virar-carta').forEach(botao => {
        botao.addEventListener('click', function () {
            document.querySelector('.pratica-carta').classList.toggle('virou');
        });
    });

    document.getElementById('proxima-carta').addEventListener('click', proximaLetraPratica);
    document.getElementById('proxima-pergunta').addEventListener('click', iniciarTeste);

    // Controle do Modo Escuro
    const modoEscuroBtn = document.getElementById('modo-escuro-btn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Verificar preferência do sistema ou armazenamento local
    if (localStorage.getItem('modoEscuro') === 'true' ||
        (localStorage.getItem('modoEscuro') === null && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        modoEscuroBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    }

    // Alternar modo escuro
    modoEscuroBtn.addEventListener('click', function () {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            modoEscuroBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Escuro';
            localStorage.setItem('modoEscuro', 'false');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            modoEscuroBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
            localStorage.setItem('modoEscuro', 'true');
        }
    });
});

// Funções do alfabeto
function carregarAlfabeto() {
    const container = document.getElementById('alfabeto-container');
    container.innerHTML = '';

    alfabetoRusso.forEach(letra => {
        const card = document.createElement('div');
        card.className = 'letra-card';
        card.innerHTML = `
            <div class="letra-cirilica">${letra.maiuscula} ${letra.minuscula}</div>
            <div class="letra-latin">${letra.latin || '-'}</div>
            <div class="pronuncia">${letra.pronuncia}</div>
            <div class="exemplo">${letra.exemplo}</div>
        `;
        container.appendChild(card);
    });
}

function filtrarAlfabeto(filtro) {
    const container = document.getElementById('alfabeto-container');
    const cards = container.querySelectorAll('.letra-card');
    let letrasVisiveis = 0;

    // Remove mensagem anterior se existir
    const mensagemAnterior = container.querySelector('.sem-resultados');
    if (mensagemAnterior) {
        container.removeChild(mensagemAnterior);
    }

    cards.forEach((card, index) => {
        const letra = alfabetoRusso[index];
        let mostrar = true;

        switch (filtro) {
            case 'maiusculas':
                card.innerHTML = `
                    <div class="letra-cirilica">${letra.maiuscula}</div>
                    <div class="letra-latin">${letra.latin || '-'}</div>
                    <div class="pronuncia">${letra.pronuncia}</div>
                    <div class="exemplo">${letra.exemplo}</div>
                `;
                break;
            case 'minusculas':
                card.innerHTML = `
                    <div class="letra-cirilica">${letra.minuscula}</div>
                    <div class="letra-latin">${letra.latin || '-'}</div>
                    <div class="pronuncia">${letra.pronuncia}</div>
                    <div class="exemplo">${letra.exemplo}</div>
                `;
                break;
            case 'semelhantes':
                // Apenas letras com 1 caractere latino A-Z
                mostrar = letra.latin && letra.latin.length === 1 && /^[A-Za-z]$/.test(letra.latin);
                break;
            case 'diferentes':
                // Letras sem correspondente ou com múltiplos caracteres
                mostrar = !letra.latin || letra.latin.length !== 1 || !/^[A-Za-z]$/.test(letra.latin);
                break;
            default: // 'todos'
                card.innerHTML = `
                    <div class="letra-cirilica">${letra.maiuscula} ${letra.minuscula}</div>
                    <div class="letra-latin">${letra.latin || '-'}</div>
                    <div class="pronuncia">${letra.pronuncia}</div>
                    <div class="exemplo">${letra.exemplo}</div>
                `;
        }

        card.style.display = mostrar ? 'block' : 'none';
        if (mostrar) letrasVisiveis++;
    });

    // Mostra mensagem se nenhuma letra for encontrada
    if (letrasVisiveis === 0) {
        const mensagem = document.createElement('p');
        mensagem.className = 'sem-resultados';
        mensagem.textContent = 'Nenhuma letra encontrada com este filtro.';
        container.appendChild(mensagem);
    }
}

// Funções da prática
function iniciarPratica() {
    letraAtualPratica = 0;
    atualizarCartaPratica();
}

function atualizarCartaPratica() {
    const letra = alfabetoRusso[letraAtualPratica];
    const carta = document.querySelector('.pratica-carta');

    if (carta.classList.contains('virou')) {
        carta.classList.remove('virou');
    }

    document.querySelector('.carta-frente .letra-pratica').textContent = letra.maiuscula;
    document.querySelector('.carta-verso .pronuncia').textContent = `Pronúncia: "${letra.pronuncia}"`;
    document.querySelector('.carta-verso .exemplo').textContent = `Exemplo: ${letra.exemplo}`;
}

function proximaLetraPratica() {
    letraAtualPratica = (letraAtualPratica + 1) % alfabetoRusso.length;
    atualizarCartaPratica();
}

// Funções do teste
function iniciarTeste() {
    // Limpar feedback anterior
    document.querySelector('.resultado').textContent = '';
    document.querySelector('.explicacao').textContent = '';

    // Gerar nova pergunta
    perguntaAtualTeste = gerarPerguntaTeste();

    // Exibir pergunta
    document.querySelector('.pergunta-texto').textContent = `"${perguntaAtualTeste.pergunta}"`;

    // Exibir opções
    const opcoesContainer = document.querySelector('.opcoes-teste');
    opcoesContainer.innerHTML = '';

    perguntaAtualTeste.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('div');
        botao.className = 'opcao-teste';
        botao.textContent = opcao.letra;
        botao.dataset.index = index;

        botao.addEventListener('click', function () {
            verificarRespostaTeste(index);
        });

        opcoesContainer.appendChild(botao);
    });
}

function gerarPerguntaTeste() {
    const tiposPergunta = ['pronuncia-letra', 'letra-pronuncia', 'exemplo-letra'];
    const tipo = tiposPergunta[Math.floor(Math.random() * tiposPergunta.length)];

    // Selecionar letra correta aleatoriamente
    const letraCorreta = alfabetoRusso[Math.floor(Math.random() * alfabetoRusso.length)];

    // Gerar 3 letras incorretas aleatoriamente
    let letrasIncorretas = [];
    while (letrasIncorretas.length < 3) {
        const letra = alfabetoRusso[Math.floor(Math.random() * alfabetoRusso.length)];
        if (letra !== letraCorreta && !letrasIncorretas.includes(letra)) {
            letrasIncorretas.push(letra);
        }
    }

    // Misturar opções
    const todasOpcoes = [letraCorreta, ...letrasIncorretas];
    for (let i = todasOpcoes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todasOpcoes[i], todasOpcoes[j]] = [todasOpcoes[j], todasOpcoes[i]];
    }

    // Criar pergunta
    let pergunta;
    if (tipo === 'pronuncia-letra') {
        pergunta = `Pronúncia: "${letraCorreta.pronuncia}"`;
    } else if (tipo === 'letra-pronuncia') {
        pergunta = `Letra: ${letraCorreta.maiuscula}`;
    } else { // 'exemplo-letra'
        pergunta = `Exemplo: ${letraCorreta.exemplo.split(' ')[0]}`;
    }

    return {
        pergunta: pergunta,
        respostaCorreta: todasOpcoes.findIndex(opcao => opcao === letraCorreta),
        opcoes: todasOpcoes.map(opcao => ({
            letra: tipo === 'letra-pronuncia' ? opcao.pronuncia : opcao.maiuscula,
            dados: opcao
        })),
        tipo: tipo
    };
}

function verificarRespostaTeste(indexSelecionado) {
    const opcoes = document.querySelectorAll('.opcao-teste');
    const feedback = document.querySelector('.feedback-teste');
    const resultado = document.querySelector('.resultado');
    const explicacao = document.querySelector('.explicacao');

    // Desativar todos os botões
    opcoes.forEach(opcao => {
        opcao.style.pointerEvents = 'none';
    });

    // Verificar resposta
    if (indexSelecionado === perguntaAtualTeste.respostaCorreta) {
        pontuacaoTeste++;
        resultado.textContent = 'Correto! ✅';
        resultado.classList.add('correta');
        resultado.classList.remove('incorreta');
    } else {
        resultado.textContent = 'Incorreto! ❌';
        resultado.classList.add('incorreta');
        resultado.classList.remove('correta');
    }

    // Marcar opções
    opcoes.forEach((opcao, index) => {
        if (index === perguntaAtualTeste.respostaCorreta) {
            opcao.classList.add('correta');
        } else if (index === indexSelecionado && index !== perguntaAtualTeste.respostaCorreta) {
            opcao.classList.add('incorreta');
        }
    });

    // Mostrar explicação
    const letraCorreta = perguntaAtualTeste.opcoes[perguntaAtualTeste.respostaCorreta].dados;
    if (perguntaAtualTeste.tipo === 'pronuncia-letra') {
        explicacao.textContent = `${letraCorreta.maiuscula} ${letraCorreta.minuscula} - Pronúncia: "${letraCorreta.pronuncia}", Exemplo: ${letraCorreta.exemplo}`;
    } else if (perguntaAtualTeste.tipo === 'letra-pronuncia') {
        explicacao.textContent = `${letraCorreta.maiuscula} ${letraCorreta.minuscula} - Pronúncia: "${letraCorreta.pronuncia}", Exemplo: ${letraCorreta.exemplo}`;
    } else {
        explicacao.textContent = `${letraCorreta.maiuscula} ${letraCorreta.minuscula} - Pronúncia: "${letraCorreta.pronuncia}", Exemplo: ${letraCorreta.exemplo}`;
    }
}