// ============================================================
//  MONTADOR DAS PÁGINAS DE DESTINO
// ------------------------------------------------------------
//  Os arquivos em destinos/ são apenas cascas: um <title>
//  escrito à mão (bom para buscadores) e um data-destino no
//  <body>. Este script lê o data-destino, busca o pacote em
//  pacotes.js e constrói a página inteira: header com menu,
//  hero, datas e rodapé — e por cima preenche os links de
//  WhatsApp dos botões "Quero esse!".
//
//  IMPORTANTE: as cascas moram um nível abaixo da raiz do
//  site, então TODOS os caminhos gerados aqui usam "../".
// ============================================================

(function () {
    const nomeDestino = document.body.dataset.destino;
    const pacote = PACOTES.find(p => p.destino === nomeDestino);

    if (!pacote) {
        document.body.innerHTML = `
            <div class="pacote-nao-encontrado">
                <h1>Pacote não encontrado</h1>
                <p>Não há nenhum pacote chamado "${nomeDestino}" no site.</p>
                <a href="../index.html">Voltar para a página inicial</a>
            </div>
        `;
        console.warn('Nenhum pacote chamado "' + nomeDestino + '" encontrado em pacotes.js.');
        return;
    }

    // O botão "Conheça o destino" só existe quando o pacote tem página "sobre"
    const botaoSobre = pacote.sobre
        ? `<a href="../${pacote.sobre}" class="btn-discreto">Conheça o destino</a>`
        : '';

    // Fundo do hero: película azul para leitura + imagem do destino
    // (o campo "imagem" é relativo à raiz, por isso o "../")
    const fundoHero = `linear-gradient(rgba(0, 74, 173, 0.6), rgba(0, 74, 173, 0.8)), url('../${pacote.imagem}')`;

    document.body.innerHTML = `
        <header class="header" id="main-header">
            <a href="../index.html" class="logo">
                <img src="../imagens/logo-83viagens.png" alt="Logo 83 Viagens" style="height: 45px; width: auto;">
            </a>
            <nav class="nav-menu">
                <a href="../index.html">Home</a>
                <a href="../pacotes.html">Pacotes</a>
                <a href="../contato.html">Contato</a>
            </nav>
            <div class="hamburger" id="menu-btn">&#9776;</div>
        </header>

        <section class="hero-destination" style="background-image: ${fundoHero}">
            <h1>${pacote.destino}</h1>
            <h2>${pacote.chamada}</h2>
            <a href="#datas" class="scroll-down-btn">DATAS DISPONÍVEIS</a>
            ${botaoSobre}
        </section>

        <section id="datas" class="dates-section">
            <h3>Datas Disponíveis</h3>
            <ul class="dates-list"></ul>
        </section>

        <footer class="footer">
            <span>83 VIAGENS</span> <span class="separator">|</span>
            <span>CNPJ: 68.609.278/0001-02</span> <span class="separator">|</span>
            <span>(83) 99316-2533</span>
        </footer>
    `;

    // Preenche a lista de datas (função do render-pacotes.js)
    renderizarDatas(nomeDestino);

    // Preenche os links de WhatsApp dos botões "Quero esse!"
    // (lógica que antes ficava em um <script> em cada página)
    document.querySelectorAll('.btn-quero').forEach(botao => {
        const itemLista = botao.closest('.date-item');
        if (itemLista) {
            const dataViagem = itemLista.querySelector('h4').innerText;
            const detalhesViagem = itemLista.querySelector('p').innerText;
            const mensagem = `Olá, tenho interesse no pacote de ${dataViagem} / ${detalhesViagem}`;
            botao.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
            botao.target = '_blank';
        }
    });

    // Menu hambúrguer (lógica que antes ficava duplicada em cada página)
    const menuBtn = document.getElementById('menu-btn');
    const header = document.getElementById('main-header');

    menuBtn.addEventListener('click', function () {
        header.classList.toggle('menu-active');
        if (header.classList.contains('menu-active')) {
            menuBtn.innerHTML = '&times;'; // Ícone de "X"
        } else {
            menuBtn.innerHTML = '&#9776;'; // Ícone de hambúrguer
        }
    });
})();
