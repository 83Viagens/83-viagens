// ============================================================
//  RENDERIZAÇÃO DOS PACOTES
// ------------------------------------------------------------
//  Transforma os dados de pacotes.js em HTML na tela.
//    - renderizarCards()            -> cards da home (index.html)
//    - renderizarDatas('Destino')   -> lista de "Datas Disponíveis"
//                                      da página de destino
//
//  IMPORTANTE: nas páginas de destino, a chamada a
//  renderizarDatas() precisa ficar ANTES do script do WhatsApp,
//  que preenche os links dos botões "Quero esse!".
// ============================================================

function renderizarCards() {
    const container = document.querySelector('.cards-container');
    if (!container) {
        console.warn('Container .cards-container não encontrado nesta página.');
        return;
    }

    container.innerHTML = PACOTES.map(pacote => `
        <div class="card">
            <img src="${pacote.imagem}" alt="Pacote para ${pacote.destino}" class="card-img">
            <h3>${pacote.destino}</h3>
            <p>${pacote.descricao}</p>
            <a href="${pacote.pagina}" class="btn-card">Ver Pacote</a>
        </div>
    `).join('');
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
