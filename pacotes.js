// ============================================================
//  PACOTES DA 83 VIAGENS — FONTE ÚNICA DE VERDADE DO SITE
// ------------------------------------------------------------
//  Os cards da home e as PÁGINAS DE DESTINO inteiras nascem
//  daqui:
//    - Home: os cards são montados pelo render-pacotes.js;
//    - Páginas de destino: os arquivos em destinos/ são apenas
//      cascas (um <title> e um data-destino) — o
//      montar-pagina.js constrói todo o resto a partir daqui.
//
//  COMO ADICIONAR UM PACOTE NOVO:
//    1. Copie um bloco { ... } inteiro e cole no final da lista;
//    2. Preencha os campos:
//         destino   -> nome EXATO (tem que ser igual ao
//                      data-destino da casca em destinos/);
//         pagina    -> caminho do arquivo da casca, a partir da
//                      raiz (ex.: "destinos/fortaleza.html");
//         imagem    -> caminho da imagem, a partir da raiz;
//         descricao -> frase do card da home (com o preço);
//         chamada   -> frase do hero da página do destino;
//         sobre     -> OPCIONAL: caminho do arquivo de artigo,
//                      a partir da raiz (ex.: "sobre/sobre-fortaleza.html"). Preenchido,
//                      aparece o botão "Conheça o destino";
//         datas     -> lista de { data, detalhes }.
//    3. Copie uma casca existente (ex.: destinos/lisboa.html),
//       troque o <title> e o data-destino e salve com o nome
//       indicado no campo "pagina".
//
//  COMO ADICIONAR UMA DATA: inclua mais um item no array
//  "datas" do pacote. O link de WhatsApp do botão "Quero
//  esse!" é montado automaticamente a partir de data + detalhes.
// ============================================================

// Número do WhatsApp da 83 Viagens (País + DDD + Número, só dígitos).
// Usado pelo montar-pagina.js nos botões "Quero esse!" e "Contato".
// ATENÇÃO: o botão "Entre em contato" do hero da home (index.html)
// tem o número escrito direto no link — trocar nos dois lugares.
const NUMERO_WHATSAPP = '5583993162533';

const PACOTES = [
    {
        destino: "Assunção",
        pagina: "destinos/assuncao.html",
        imagem: "imagens/assuncao.jpeg",
        descricao: "Conheça esse destino espetacular por apenas R$ 1.399,90",
        chamada: "A nova suíça, está lhe esperando com braços abertos, aproveite que chegando por via aérea a cota de importação são de US$ 1.000.",
        datas: [
            { data: "12 a 18 de Novembro de 2026", detalhes: "Voo direto + Hospedagem 4 estrelas com café da manhã" },
            { data: "05 a 11 de Dezembro de 2026", detalhes: "Voo direto + Hospedagem 4 estrelas + Transfer incluso" },
            { data: "15 a 22 de Janeiro de 2027", detalhes: "Pacote Férias: Voo + Resort all-inclusive" }
        ]
    },
    {
        destino: "Estados Unidos",
        pagina: "destinos/eua.html",
        imagem: "imagens/eua.jpg",
        descricao: "Vá para a terra da liberdade por apenas R$ 2.599,99 (até 6x sem juros)",
        chamada: "A terra da liberdade está lhe esperando de braços abertos: cidades icônicas, parques naturais espetaculares e experiências que só os Estados Unidos podem oferecer.",
        datas: [
            { data: "12 a 18 de Novembro de 2026", detalhes: "Voo direto + Hospedagem 4 estrelas com café da manhã" },
            { data: "05 a 11 de Dezembro de 2026", detalhes: "Voo direto + Hospedagem 4 estrelas + Transfer incluso" },
            { data: "15 a 22 de Janeiro de 2027", detalhes: "Pacote Férias: Voo + Resort all-inclusive" }
        ]
    },
    {
        destino: "Lisboa",
        pagina: "destinos/lisboa.html",
        imagem: "imagens/lisboa.jpg",
        descricao: "Voos diretos da TAP, a partir de R$ 3.980,99 (até 10x sem juros)",
        chamada: "A cidade das sete colinas está lhe esperando de braços abertos: voos diretos da TAP, história milenar e uma gastronomia inigualável.",
        sobre: "sobre/sobre-lisboa.html",
        datas: [
            { data: "12 a 18 de Novembro de 2026", detalhes: "Voo direto + Hospedagem 4 estrelas com café da manhã" },
            { data: "05 a 11 de Dezembro de 2026", detalhes: "Voo direto + Hospedagem 4 estrelas + Transfer incluso" },
            { data: "15 a 22 de Janeiro de 2027", detalhes: "Pacote Férias: Voo + Resort all-inclusive" }
        ]
    }
];
