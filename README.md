# Ângela Oliveira — Confeitaria Brasileira

Site institucional feito com HTML, CSS e JavaScript sem framework.

## Estrutura

- `index.html`, `catalogo.html`, `cardapio.html`, `portifolio.html`, `endereco.html` e `contato.html`: páginas do site.
- `styles.css`: estilos e adaptação para celular.
- `js/site-data.js`: textos, produtos, categorias e imagens.
- `js/main.js`: cabeçalho, rodapé, filtros e galeria.
- `public/images/`: cópias locais das imagens e do PDF usados pelo site.

As páginas usam imagens locais, metadados de compartilhamento e um sitemap. A página de contato reúne prazos, entrega, pagamento e perguntas frequentes; o portfólio permite pausar a galeria.

## Orçamento e métricas

- O formulário de contato prepara uma mensagem com os detalhes do pedido e abre o WhatsApp. O site não armazena os dados nem recebe pagamentos.
- O GA4 é opcional. Quando houver um ID no formato `G-...`, copie `.env.example` para `.env.local` e preencha `VITE_GA_MEASUREMENT_ID`. O tag só é carregado depois que a pessoa aceita a análise; cliques no WhatsApp e no catálogo são registrados sem incluir o conteúdo do pedido.
- Para a publicação, configure o mesmo ID como variável de ambiente de build na plataforma de hospedagem. Não coloque `.env.local` no GitHub.
- O `public/sitemap.xml` e o `public/robots.txt` já estão prontos para o Search Console. Depois de verificar a propriedade do domínio, envie o sitemap `https://angelaoliveiracake.lovable.app/sitemap.xml` no Search Console.
- O site direciona ao perfil do Instagram para ver criações recentes e tem uma página de endereço com rota do Google Maps. A integração das avaliações do Google aguarda o link público do Perfil da Empresa ou o Place ID.

## Abrir o site

Instale as dependências com `npm install`, inicie com `npm run dev` e abra o endereço mostrado no terminal. Para gerar os arquivos publicados, use `npm run build`; eles serão criados na pasta `dist`.
