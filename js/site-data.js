import footerLogoAsset from "../src/assets/angela-logo-rodape-circular.png.asset.json";

// Conteúdo do site em um só lugar para facilitar as atualizações.
export const site = {
  name: "Ângela Oliveira",
  oldName: "antiga Pimenta Rosa Festas",
  city: "São Paulo, SP",
  whatsappPhone: "5511984383266",
  phoneDisplay: "(11) 98438-3266",
  // Link padrão do WhatsApp, com mensagem pronta. Use o mesmo formato (wa.me/número?text=...) em todo o site.
  whatsapp: `https://wa.me/5511984383266?text=${encodeURIComponent("Olá, Ângela! Vim pelo site e gostaria de fazer uma encomenda.")}`,
  email: "angelaoliveira.cakedesigner@gmail.com",
  instagram: "https://www.instagram.com/angelaoliveira.cakedesing/",
  links: "https://beacons.ai/angelacake",
  logo: footerLogoAsset.url,
  footerLogo: footerLogoAsset.url,
  // Cópia local usada se o CDN do Lovable não responder (por exemplo, fora da hospedagem do Lovable).
  logoFallback: "/images/marca/angela-logo-circular.webp",
};

export const categories = [
  { name: "Bolos temáticos", image: "catalogo/bolo-7.jpg", description: "Personagens, cores e cenários montados à mão para festas infantis e temas favoritos de qualquer idade." },
  { name: "Bolos comemorativos", image: "catalogo/bolo-3.jpg", description: "Aniversários, 15 anos e datas especiais com acabamento delicado, topo personalizado e detalhes em dourado." },
  { name: "Bolos florais e frutas", image: "catalogo/bolo-1.jpg", description: "Chantilly, frutas frescas e flores naturais para quem prefere um bolo clássico, leve e elegante." },
  { name: "Doces artesanais", image: "catalogo/coracao-de-chocolate-decorado.jpg", description: "Doces decorados sob encomenda para presentear e celebrar momentos especiais." },
];

export const products = [
  { name: "Bolo de morangos com chantilly", category: "Bolos florais e frutas", description: "Chantilly em bico rendado, morangos frescos no topo e laço de cetim.", detail: "Andar único · sabores a combinar", image: "catalogo/bolo-1.jpg" },
  { name: "Bolo tropical flamingo", category: "Bolos temáticos", description: "Dois andares em rosetas rosa e turquesa, com folhagens e topo de flamingos.", detail: "Dois andares", image: "catalogo/bolo-2.jpg" },
  { name: "Bolo pink 15 anos", category: "Bolos comemorativos", description: "Pink metálico espatulado, rosas em papel e nome personalizado em dourado.", detail: "Andar único · nome personalizado", image: "catalogo/bolo-3.jpg" },
  { name: "Bolo uvas e vinho", category: "Bolos florais e frutas", description: "Drip vinho sobre chantilly texturizado, com uvas frescas e detalhes cintilantes.", detail: "Andar único", image: "catalogo/bolo-4.jpg" },
  { name: "Bolo rock'n'roll", category: "Bolos temáticos", description: "Cobertura preta acetinada, topo de guitarra, estrelas e nome em relevo.", detail: "Andar único", image: "catalogo/bolo-5.jpg" },
  { name: "Bolo tema redes sociais", category: "Bolos temáticos", description: "Espatulado rosa e azul com respingos dourados e topo com os aplicativos favoritos.", detail: "Andar único", image: "catalogo/bolo-6.jpg" },
  { name: "Bolo safári", category: "Bolos temáticos", description: "Dois andares com tronco em chocolate texturizado, gramado e bichinhos da savana.", detail: "Dois andares", image: "catalogo/bolo-7.jpg" },
  { name: "Bolo unicórnio surpresa", category: "Bolos comemorativos", description: "Azul em rosetas e babados, confeitos coloridos e unicórnio modelado à mão.", detail: "Andar único · recheio surpresa", image: "catalogo/bolo-8.jpg" },
  { name: "Bolo super-herói", category: "Bolos temáticos", description: "Cenário em relevo com base dourada, verde vibrante e topo do herói preferido.", detail: "Dois andares", image: "catalogo/bolo-9.jpg" },
  { name: "Bolo afro com flores", category: "Bolos florais e frutas", description: "Andares com estampas africanas, flores naturais amarelas e nome no topo.", detail: "Dois andares · flores naturais", image: "catalogo/bolo-10.jpg" },
  { name: "Bolo rosa com flores e detalhes dourados", category: "Bolos comemorativos", description: "Decoração rosa com flores, borboleta e detalhes dourados para uma celebração especial.", detail: "Tema e cores personalizáveis", image: "catalogo/bolo-rosa-flores-douradas.jpg" },
  { name: "Bolo rosa floral com topo personalizado", category: "Bolos comemorativos", description: "Acabamento em rosa e branco, flores decorativas, borboletas e topo personalizado.", detail: "Topo personalizado", image: "catalogo/bolo-rosa-floral-topo-personalizado.jpg" },
  { name: "Coração de chocolate decorado", category: "Doces artesanais", description: "Peça em formato de coração com acabamento dourado e doces decorados ao redor.", detail: "Decoração sob encomenda", image: "catalogo/coracao-de-chocolate-decorado.jpg" },
  { name: "Bolo infantil com personagens", category: "Bolos temáticos", description: "Cobertura azul vibrante com personagens, balões e elementos coloridos para festa infantil.", detail: "Tema personalizável", image: "catalogo/bolo-infantil-personagens-azul.jpg" },
  { name: "Bolo de chá de bebê lilás", category: "Bolos comemorativos", description: "Bolo retangular com decoração lilás e detalhes delicados para celebrar a chegada de um bebê.", detail: "Tema e nome personalizáveis", image: "catalogo/bolo-cha-de-bebe-lilas.jpg" },
  { name: "Bolo azul com detalhe de coração", category: "Bolos comemorativos", description: "Cobertura branca com acabamento azul, coração no topo e base amarela.", detail: "Cores personalizáveis", image: "catalogo/bolo-azul-coracao.jpg" },
  { name: "Bolo lilás com borboletas", category: "Bolos comemorativos", description: "Decoração lilás com borboletas coloridas e topo personalizado para aniversário.", detail: "Topo e idade personalizáveis", image: "catalogo/bolo-lilas-borboletas.jpg" },
  { name: "Bolo branco com corações vermelhos", category: "Bolos comemorativos", description: "Cobertura branca decorada com pequenos corações vermelhos e acabamento clássico.", detail: "Decoração sob encomenda", image: "catalogo/bolo-branco-coracoes.jpg" },
  { name: "Bolo com morangos e mirtilos", category: "Bolos florais e frutas", description: "Cobertura clara com morangos e mirtilos distribuídos delicadamente no topo.", detail: "Decoração com frutas", image: "catalogo/bolo-morangos-mirtilos.jpg" },
  { name: "Bolo verde-menta com pérolas douradas", category: "Bolos comemorativos", description: "Acabamento verde-menta com trabalho de bicos e pérolas douradas.", detail: "Cores personalizáveis", image: "catalogo/bolo-verde-menta-perolado.jpg" },
];

// Vitrine da página inicial, na ordem em que aparece. O bolo de morangos (bolo-1) fica de fora
// porque já é a foto de capa logo acima.
const homeFeaturedImagePaths = [
  "catalogo/bolo-3.jpg", "catalogo/bolo-7.jpg", "catalogo/bolo-rosa-flores-douradas.jpg",
  "catalogo/bolo-10.jpg", "catalogo/bolo-5.jpg", "catalogo/bolo-lilas-borboletas.jpg",
  "catalogo/bolo-4.jpg", "catalogo/bolo-9.jpg", "catalogo/bolo-rosa-floral-topo-personalizado.jpg",
  "catalogo/bolo-infantil-personagens-azul.jpg", "catalogo/coracao-de-chocolate-decorado.jpg",
];
export const homeFeaturedProducts = homeFeaturedImagePaths.map((path) => products.find((item) => item.image === path)).filter(Boolean);

// Fotos enviadas por clientes. Aparecem na página de Feedback e na página inicial.
export const clientPhotos = [
  { image: "/images/feedback/bolo-azul-primeiro-aniversario.jpg", alt: "Bolo azul de aniversário de 1 ano com tema Poderoso Chefinho", caption: "Bolo temático do primeiro aniversário" },
  { image: "/images/feedback/familia-bolo-infantil-azul.jpg", alt: "Família reunida ao lado de bolo infantil azul em uma comemoração", caption: "Uma comemoração em família" },
  { image: "/images/feedback/bolo-festa-15-anos.jpg", alt: "Jovem comemora 15 anos diante de uma mesa com bolo decorado em tons de azul", caption: "Uma festa de 15 anos em azul e dourado" },
  { image: "/images/feedback/familia-bolo-comemoracao-rosa.jpg", alt: "Família reunida ao lado de um bolo de aniversário decorado em rosa", caption: "Um aniversário para guardar na memória" },
];

// Calculadora "Quanto bolo eu preciso?" (cardápio e formulário de orçamento).
// CONFIRMAR COM A ÂNGELA: gramas por convidado, pedido mínimo e prazos.
export const partyPlanning = {
  gramsPerGuest: 100,       // fatia média de festa (~100 g por pessoa)
  minimumKg: 1,             // menor bolo aceito
  roundToKg: 0.5,           // arredonda a sugestão para cima, de meio em meio quilo
  decoratedLeadDays: 7,     // antecedência ideal para bolos decorados (mesmo texto do FAQ)
  sweetsLeadDays: 3,        // antecedência mínima para doces (FAQ: 3 a 5 dias)
};

// Cardápio transcrito do PDF de setembro de 2026. Para mudar um preço ou sabor, edite aqui.
export const menuSections = [
  { id: "moda-da-casa", title: "Bolos à Moda da Casa",
    items: [
      { name: "Luxo de Pêssego", price: "R$ 98,00/kg", description: "Pão-de-ló branco, recheio de doce de leite com pêssego e creme especial de pêssego, coberto com chantilly ou marshmallow." },
      { name: "Baianinho", price: "R$ 95,00/kg", description: "Pão-de-ló branco, recheio de doce de leite com cocada mole e creme de coco, coberto com chantilly ou marshmallow." },
      { name: "Paixão", price: "R$ 115,00/kg", description: "Pão-de-ló branco, recheio de chantilly de creme de leite com morangos frescos ou geleia de morango. Preço sujeito a alteração fora da época do morango." },
      { name: "Gabriel", price: "R$ 98,00/kg", description: "Pão-de-ló branco, recheio de doce de leite com abacaxi e creme especial de abacaxi, coberto com chantilly ou marshmallow." },
      { name: "Bem-Casado Tradicional", price: "R$ 95,00/kg", description: "Pão-de-ló branco original com fécula de batata, recheio de doce de leite, em naked cake, chantilly ou marshmallow." },
      { name: "Bem-Casado", price: "R$ 125,00/kg", description: "Pão-de-ló branco com fécula de batata, recheio de doce de leite com nozes, em naked cake, chantilly ou marshmallow." },
      { name: "Ângela", price: "R$ 110,00/kg", description: "A moda da casa surpreende: pão-de-ló branco com maçã cremosa, passas, nozes e massa folhada, em creme especial." },
      { name: "Floresta Branco Encantado", price: "R$ 110,00/kg", description: "Pão-de-ló branco, trufa de chocolate branco e mousse de chocolate branco com cereja, finalizado com raspas ou decoração de chocolate." },
      { name: "Pina Colado", price: "R$ 99,00/kg", description: "Pão-de-ló branco, recheio de doce de abacaxi com coco e doce de leite, coberto com chantilly ou marshmallow." },
    ] },
  { id: "sucesso-da-casa", title: "Bolos de Sucesso da Casa",
    items: [
      { name: "Criança Feliz", price: "R$ 115,00/kg", description: "Pão-de-ló de chocolate com brigadeiro gourmet e prestígio, coberto com chantilly ou chantininho." },
      { name: "Brigadeiro Gourmet", price: "R$ 125,00/kg", description: "Pão-de-ló de chocolate com recheio de brigadeiro gourmet, coberto com chantilly, chantininho ou chantilly de chocolate." },
      { name: "Prestígio", price: "R$ 99,00/kg", description: "Pão-de-ló de chocolate com cocada de leite condensado especial, coberto com chantilly ou chantininho." },
      { name: "Floresta Negra", price: "R$ 135,00/kg", description: "Pão-de-ló de chocolate com chantilly de creme de leite fresco e cerejas picadas." },
      { name: "Amor Fiel", price: "R$ 105,00/kg", description: "Pão-de-ló branco com mousse de maracujá e chocolate branco, coberto com chantilly ou chantininho." },
      { name: "Trufado de Chocolate Escuro", price: "R$ 135,00/kg", description: "Massa de chocolate ou branca com trufa sabor tradicional, café, canela, amêndoas, nozes, laranja, cereja, mel, amarula, morango, coco, vinho ou maracujá — consulte outros sabores." },
      { name: "Trufado de Chocolate Branco", price: "R$ 139,00/kg", description: "Mesma base do trufado, com trufa de chocolate branco nos mesmos sabores à escolha." },
      { name: "Mousses", price: "R$ 95,00/kg", description: "Pão-de-ló de chocolate ou branco com mousse de morango, maracujá, pêssego, limão, abacaxi, cappuccino ou nozes." },
      { name: "Olho de Sogra", price: "R$ 125,00/kg", description: "Massa branca com beijinho cremoso e ameixas, e doce de leite com ameixas." },
      { name: "Ameixa Especial", price: "R$ 115,00/kg", description: "Massa branca com mousse de doce de leite e ameixas, e doce de leite com ameixas." },
      { name: "Olho de Sogro (Damasco)", price: "R$ 125,00/kg", description: "Pão-de-ló branco com beijinho cremoso e damascos." },
      { name: "Ameixas Pretas", price: "R$ 110,00/kg", description: "Pão-de-ló branco com doce de ameixa e doce de leite, ou creme de confeiteiro ao vinho." },
      { name: "Giselle", price: "R$ 115,00/kg", description: "Pão-de-ló de chocolate com mousse de chocolate e geleia de morangos, ou brigadeiro gourmet com morangos in natura." },
      { name: "Maria", price: "R$ 125,00/kg", description: "Pão-de-ló branco com doce de leite e nozes, ou creme de confeiteiro de vinho branco e nozes, em chantilly, chantininho ou buttercream." },
      { name: "Napolitano", price: "R$ 145,00/kg", description: "Pão-de-ló branco ou de chocolate com mousse de chocolate escuro, mousse de leite ninho e mousse de morangos." },
      { name: "Thalita", price: "R$ 135,00/kg", description: "Massa de chocolate com doce de leite e brigadeiro gourmet de Nutella, finalizado com Nutella pura por cima." },
      { name: "Ninho com Morangos", price: "R$ 115,00/kg", description: "Pão-de-ló branco com mousse de morango e brigadeiro de leite ninho com geleia de morangos." },
      { name: "Ninho Trufado", price: "R$ 125,00/kg", description: "O famoso das confeitarias: massa branca em dupla camada de mousse de ninho especial." },
      { name: "Kauan", price: "R$ 135,00/kg", description: "Massa branca com mousse de leite ninho e trufa especial de limão siciliano com chocolate branco e cream cheese." },
    ] },
  { id: "bombons", title: "Bolos Bombons Famosos",
    items: [
      { name: "Tipo Kit Kat", price: "R$ 135,00/kg", description: "Brigadeiro de chocolate com creme de avelã/Nutella e pedaços de Kit Kat, ganache de chocolate. Kit Kat cobrado à parte." },
      { name: "Tipo Raffaello", price: "R$ 150,00/kg", description: "Pão-de-ló branco com recheio de chocolate branco, coco, amêndoas e Raffaello picado, coberto com ganache de chocolate branco." },
      { name: "Tipo Nutella", price: "R$ 135,00/kg", description: "Brigadeiro de Nutella e creme de avelã original, cobertura a combinar." },
      { name: "Tipo Ovomaltine", price: "R$ 135,00/kg", description: "Brigadeiro e recheio de Ovomaltine original, coberto com chantilly ou marshmallow." },
      { name: "Tipo Ferrero Rocher", price: "R$ 150,00/kg", description: "Brigadeiro gourmet de chocolate com creme de avelã e avelãs picadas." },
      { name: "Tipo Leite Ninho (Laka)", price: "R$ 125,00/kg", description: "Mousse branca com leite em pó Ninho, leite condensado e chocolate Laka original." },
      { name: "Tipo Sensação", price: "R$ 135,00/kg", description: "Brigadeiro de chocolate gourmet com creme especial de morango e raspas de chocolate nobre." },
      { name: "Tentação de Cereja", price: "R$ 145,00/kg", description: "Trufa de chocolate com cereja, finalizado com raspas ou decoração de chocolate." },
      { name: "Kinder Bueno", price: "R$ 125,00/kg", description: "Brigadeiro de Kinder Bueno, coberto com chantilly ou chantininho." },
    ] },
  { id: "moca-cremosa", title: "Bolos com Moça Cremosa (Nestlé)",
    items: [
      { name: "Moça Cremosa", price: "R$ 115,00/kg", description: "Pão-de-ló branco com leite condensado encorpado branco, exclusivo Nestlé." },
      { name: "Moça Cremosa com Morangos", price: "R$ 135,00/kg", description: "Mesma receita da Moça Cremosa, com morangos — sujeito à época." },
      { name: "Moça Cremosa Cereja", price: "R$ 155,00/kg", description: "Mesma receita da Moça Cremosa, com cereja." },
      { name: "Leite Ninho com Morangos (Original)", price: "R$ 115,00/kg", description: "Pão-de-ló branco ou de chocolate com mousse de leite Ninho e morangos, coberto com chantininho." },
      { name: "Torta Mineira", price: "R$ 115,00/kg", description: "Beijinho cremoso com compota de abacaxi e brigadeiro branco de leite Ninho com abacaxi e coco." },
      { name: "2 Amores", price: "R$ 125,00/kg", description: "Massa de chocolate com brigadeiro de chocolate escuro e brigadeiro de chocolate branco." },
      { name: "Juliana — Surpresa de Uva", price: "R$ 125,00/kg", description: "Brigadeiro de leite Ninho com uvas verdes sem sementes e mousse de leite Ninho com geleia de uvas verdes." },
    ] },
  { id: "gelados", title: "Bolos Gelados Embrulhados",
    intro: "Sabores mais pedidos, embalados com embalagem especial para bolos gelados.",
    prices: [["Apenas com cobertura (massa branca ou de chocolate)", "R$ 7,50 / un"], ["Com recheio e cobertura", "a partir de R$ 10,00 / un"]],
    items: [
      { name: "Prestígio", description: "Massa de chocolate com calda e cobertura de cocada prestígio." },
      { name: "Toalha Felpuda (Infância)", description: "Pão-de-ló de coco com calda cremosa de coco, leite condensado e cobertura de coco ralado." },
      { name: "Brigadeiro", description: "Massa de chocolate com calda e cobertura de brigadeiro e granulado." },
      { name: "Brigadeiro Gourmet", description: "Massa de chocolate com calda/cobertura de brigadeiro gourmet e granulado craquelado." },
      { name: "Leite Ninho®", description: "Massa branca recheada com creme de Ninho® e chocolate Laka, cobertura de chantilly com Ninho® em pó." },
      { name: "Creme com Abacaxi", description: "Massa branca recheada com creme e abacaxi em pedaços, cobertura de chantilly." },
      { name: "Creme com Pêssego", description: "Massa branca recheada com creme especial de confeiteiro e pêssego em pedaços, cobertura de chantilly." },
      { name: "Doce de Leite", description: "Massa branca recheada com doce de leite, cobertura de chantilly." },
      { name: "Doce de Leite com Nozes", description: "Massa de chocolate recheada com doce de leite e nozes trituradas, cobertura de chantilly de chocolate." },
      { name: "Sensação", description: "Massa de chocolate com brigadeiro sabor morango, geleia de morango natural e gotas de chocolate, coberto com granulado." },
      { name: "Maracujá Cremoso", description: "Bolo gelado com recheio cremoso de maracujá." },
    ] },
];

export const menuNotes = [
  "Consulte outras coberturas: ganache, buttercream, marshmallow, pasta americana ou Kit Kat.",
  "Toppers personalizados são cobrados à parte, conforme orçamento.",
  "Bolos de andar têm valores diferenciados conforme o modelo escolhido.",
  "Valores sujeitos a alteração sem aviso prévio, especialmente para itens fora de época (ex.: morango).",
];

export const gallery = [
  ["Bolo de cenoura com casca de chocolate, raspas e farofa crocante", "pascoa-1.jpg"],
  ["Bolo vulcão de Páscoa com coelhinho de chocolate e confeitos coloridos", "pascoa-2.jpg"],
  ["Ovo de Páscoa de chocolate branco embalado com laço dourado", "pascoa-3.jpg"],
  ["Ovo de Páscoa ao leite com relevo de corações e laço rosa", "pascoa-4.jpg"],
  ["Ovo de colher com chocolate ao leite e crocantes cobertos de chocolate branco", "pascoa-5.jpg"],
  ["Cascas de ovo de Páscoa de chocolate branco com corações em relevo", "pascoa-6.jpg"],
  ["Ovo de Páscoa de chocolate branco embalado com laços rosa e dourado", "pascoa-7.jpg"],
  ["Ovos de Páscoa artesanais de chocolate branco com relevo de corações", "pascoa-8.jpg"],
  ["Casca de ovo de Páscoa de chocolate branco com pedaços crocantes", "pascoa-9.jpg"],
  ["Ovo de colher com brigadeiro e massa amanteigada", "pascoa-10.jpg"],
].map(([alt, image]) => ({ image: `/images/portfolio/${image}`, alt }));

export const processVideos = [
  { title: "Cupcakes de chocolate no forno", description: "Uma fôrma com doze cupcakes de chocolate crescendo no forno. Vídeo curto, sem som.", src: "/videos/processo-bolo-01.mp4", poster: "/images/portfolio/videos/processo-bolo-01.webp", muted: true },
  { title: "Massa branca crescendo", description: "Cupcakes de massa branca em forminhas de papel, crescendo e dourando no forno.", src: "/videos/processo-bolo-02.mp4", poster: "/images/portfolio/videos/processo-bolo-02.webp" },
  { title: "Pão de ló no ponto", description: "Duas fôrmas redondas de pão de ló dourando no forno: a base dos bolos recheados.", src: "/videos/processo-bolo-03.mp4", poster: "/images/portfolio/videos/processo-bolo-03.webp" },
];
