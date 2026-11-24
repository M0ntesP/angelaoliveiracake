# Ângela Oliveira — Confeitaria Brasileira

Site institucional feito com HTML, CSS e JavaScript sem framework.

## Estrutura

- `index.html`, `catalogo.html`, `cardapio.html`, `portfolio.html`, `endereco.html`, `contato.html` e `404.html`: páginas de entrada do Vite, mantidas na raiz para preservar as URLs atuais.
- `css/styles.css`: estilos e adaptação para celular.
- `js/site-data.js`: textos, produtos, categorias e imagens.
- `js/image-manifest.json`: dimensões e variantes responsivas das fotos otimizadas.
- `js/main.js`: cabeçalho, rodapé, filtros e galeria.
- `js/lightbox.js`: visualizador de fotos em tela cheia (catálogo e fotos de clientes).
- `js/inspirations.js`: lista "Minhas inspirações" — o cliente salva bolos do catálogo e envia a lista pelo WhatsApp ou junto com o pedido.
- `js/party-planning.js`: calculadora "Quanto bolo eu preciso?" (cardápio) e aviso de prazo no formulário. As regras (gramas por convidado, pedido mínimo, antecedência) ficam em `partyPlanning`, em `js/site-data.js`.
- `portifolio.html`: endereço antigo, só redireciona para `portfolio.html`.
- `public/images/catalogo/`: fotos dos bolos e doces do catálogo.
- `public/images/portfolio/`: fotos do portfólio e das celebrações.
- `public/images/perfil/`: retratos e fotos da equipe usados na apresentação.
- `public/images/cardapio/`: PDF do cardápio. Os sabores e preços ficam em `js/site-data.js` (`menuSections`); o PDF é gerado imprimindo a página `cardapio.html` (Imprimir → Salvar como PDF, tamanho A4).
- `public/images/marca/`: logo pública, cópia circular local do logo (reserva caso o CDN falhe) e `compartilhamento.jpg` (prévia de links, 1200×630); a arte oficial do topo e do rodapé usa o ponteiro de CDN em `src/assets/`.
- `public/images/optimized/`: versões WebP separadas por catálogo, portfólio e perfil.
- `public/videos/`: vídeos dos bastidores de criação. As capas ficam em `public/images/portfolio/videos/`.
- `public/fonts/`: fontes Fraunces e Montserrat hospedadas no próprio site (licença OFL), sem depender do Google Fonts.
- `archive/brand-history/`: versões antigas de artes preservadas fora dos arquivos publicados.
- `docs/roadmap.md`: histórico e próximos passos do projeto.

As páginas usam imagens locais, metadados de compartilhamento e um sitemap. As fotos de produto e do carrossel têm variantes WebP responsivas, enquanto os originais permanecem preservados. A página de contato reúne prazos, entrega, pagamento e perguntas frequentes; o portfólio permite pausar a galeria e assistir aos vídeos do processo.

## Orçamento e métricas

- O formulário de contato prepara uma mensagem com os detalhes do pedido e abre o WhatsApp. O site não armazena os dados nem recebe pagamentos.
- O GA4 é opcional. Quando houver um ID no formato `G-...`, copie `.env.example` para `.env.local` e preencha `VITE_GA_MEASUREMENT_ID`. O tag só é carregado depois que a pessoa aceita a análise; os eventos incluem visualização do catálogo e produtos, início/preparo de orçamento e cliques no WhatsApp e Instagram, sem enviar dados pessoais do formulário.
- Para a publicação, configure o mesmo ID como variável de ambiente de build na plataforma de hospedagem. Não coloque `.env.local` no GitHub.
- O `public/sitemap.xml` e o `public/robots.txt` já estão prontos para o Search Console. Depois de verificar a propriedade do domínio, envie o sitemap `https://angelaoliveira.lovable.app/sitemap.xml` no Search Console.
- O site direciona ao perfil do Instagram para ver criações recentes e tem uma página de endereço com rota do Google Maps. A integração das avaliações do Google aguarda o link público do Perfil da Empresa ou o Place ID.

## Abrir o site

Instale as dependências com `npm install`, inicie com `npm run dev` e abra o endereço mostrado no terminal. Para gerar os arquivos publicados, use `npm run build`; eles serão criados na pasta `dist`.
