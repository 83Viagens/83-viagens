// ============================================================
//  RENDERIZAÇÃO DOS PACOTES
// ------------------------------------------------------------
//  Transforma os dados de pacotes.js em HTML na tela.
//    - renderizarCards()            -> cards da home (index.html):
//                                      apenas os pacotes com
//                                      destaque: true (se nenhum
//                                      estiver marcado, mostra todos);
//    - renderizarDatas('Destino')   -> lista de "Datas Disponíveis"
//                                      da página de destino;
//    - pacotesFiltrados(filtros)    -> filtra a lista por tipo de
//                                      viagem e período (De/Até);
//    - iniciarBiblioteca()          -> página de pesquisa
//                                      (pacotes.html): monta os cards
//                                      e ativa os filtros em tempo
//                                      real + o botão "Limpar filtros".
//
//  IMPORTANTE: nas páginas de destino, a chamada a
//  renderizarDatas() precisa ficar ANTES do script do WhatsApp,
//  que preenche os links dos botões "Quero esse!".
// ============================================================

// HTML de um card. "comSelo" só é usado pela pacotes.html, que
// mostra um selo "Nacional/Internacional" no canto do card
// (a home mantém o visual de sempre, sem selo).
function cardHTML(pacote, comSelo) {
    const selo = comSelo && pacote.tipo
        ? `<span class="selo-tipo">${pacote.tipo === 'nacional' ? 'Nacional' : 'Internacional'}</span>`
        : '';

    return `
        <div class="card">
            <img src="${pacote.imagem}" alt="Pacote para ${pacote.destino}" class="card-img">
            ${selo}
            <h3>${pacote.destino}</h3>
            <p>${pacote.descricao}</p>
            <a href="${pacote.pagina}" class="btn-card">Ver Pacote</a>
        </div>
    `;
}

function renderizarCards() {
    const container = document.querySelector('.cards-container');
    if (!container) {
        console.warn('Container .cards-container não encontrado nesta página.');
        return;
    }

    // Home: só os pacotes marcados como destaque. Se nenhum
    // estiver marcado, mostra todos (a home nunca fica vazia).
    const destaques = PACOTES.filter(p => p.destaque);
    const lista = destaques.length > 0 ? destaques : PACOTES;

    container.innerHTML = lista.map(pacote => cardHTML(pacote, false)).join('');
}

// ============================================================
//  FILTROS DA BIBLIOTECA (pacotes.html)
// ------------------------------------------------------------
//  filtros = { tipo: 'todos'|'nacional'|'internacional',
//              de:   'AAAA-MM-DD' ou '' (data mínima de saída),
//              ate:  'AAAA-MM-DD' ou '' (data máxima de saída) }
//
//  Os filtros se combinam (todos precisam passar). No período,
//  o pacote passa se QUALQUER uma de suas datas tiver "inicio"
//  dentro do intervalo; datas sem "inicio" são ignoradas quando
//  há período ativo. Datas ISO (AAAA-MM-DD) comparam bem como
//  texto. Novos filtros entram como mais uma checagem aqui.
// ============================================================
function pacotesFiltrados(filtros) {
    return PACOTES.filter(pacote => {
        if (filtros.tipo && filtros.tipo !== 'todos' && pacote.tipo !== filtros.tipo) {
            return false;
        }

        if (filtros.de || filtros.ate) {
            const noPeriodo = pacote.datas.some(item => {
                if (!item.inicio) return false;
                if (filtros.de && item.inicio < filtros.de) return false;
                if (filtros.ate && item.inicio > filtros.ate) return false;
                return true;
            });
            if (!noPeriodo) return false;
        }

        return true;
    });
}

// Lê os campos do formulário, filtra e redesenha a grade,
// o contador e o estado vazio da pacotes.html.
function renderizarBiblioteca() {
    const container = document.querySelector('.cards-container');
    if (!container) {
        console.warn('Container .cards-container não encontrado nesta página.');
        return;
    }

    const campoTipo = document.getElementById('filtro-tipo');
    const campoDe = document.getElementById('filtro-de');
    const campoAte = document.getElementById('filtro-ate');

    const lista = pacotesFiltrados({
        tipo: campoTipo ? campoTipo.value : 'todos',
        de: campoDe ? campoDe.value : '',
        ate: campoAte ? campoAte.value : ''
    });

    container.innerHTML = lista.map(pacote => cardHTML(pacote, true)).join('');

    const contagem = document.getElementById('contagem-pacotes');
    if (contagem) {
        contagem.textContent = lista.length === 1
            ? '1 pacote encontrado'
            : lista.length + ' pacotes encontrados';
    }

    const semResultados = document.getElementById('sem-resultados');
    if (semResultados) {
        semResultados.style.display = lista.length === 0 ? 'block' : 'none';
    }
}

// Zera os campos de filtro e redesenha (botões "Limpar filtros").
function limparFiltrosBiblioteca() {
    const campos = ['filtro-tipo', 'filtro-de', 'filtro-ate'];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return;
        campo.value = id === 'filtro-tipo' ? 'todos' : '';
    });
    renderizarBiblioteca();
}

// Ponto de entrada da pacotes.html: primeira renderização +
// filtros em tempo real (input/change) + botões de limpar.
function iniciarBiblioteca() {
    ['filtro-tipo', 'filtro-de', 'filtro-ate'].forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return;
        campo.addEventListener('input', renderizarBiblioteca);
        campo.addEventListener('change', renderizarBiblioteca);
    });

    ['limpar-filtros', 'limpar-filtros-vazio'].forEach(id => {
        const botao = document.getElementById(id);
        if (botao) botao.addEventListener('click', limparFiltrosBiblioteca);
    });

    renderizarBiblioteca();
}

function renderizarDatas(destino) {
    const lista = document.querySelector('.dates-list');
    if (!lista) {
        console.warn('Lista .dates-list não encontrada nesta página.');
        return;
    }

    const pacote = PACOTES.find(p => p.destino === destino);
    if (!pacote) {
        console.warn('Nenhum pacote chamado "' + destino + '" encontrado em pacotes.js.');
        return;
    }

    lista.innerHTML = pacote.datas.map(item => `
        <li class="date-item">
            <div class="date-info">
                <h4>${item.data}</h4>
                <p>${item.detalhes}</p>
            </div>
            <a href="#" class="btn-quero">Quero esse!</a>
        </li>
    `).join('');
}
