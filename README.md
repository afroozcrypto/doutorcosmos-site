# doutorcosmos-site

Site estático do Doutor Cosmos, em Astro 7 e PT-PT. Sem servidor, sem analytics, sem segredos e sem deploy nesta versão.

```bash
npm ci
npm run check          # valida fontes, créditos e licenças
npm run build          # check + build para dist/
npm run build:preview  # igual, com noindex e robots Disallow
```

## Conteúdo
- `src/content/shorts/`: uma ficha por Short (vídeo, fontes A e B, créditos, confiança, correções).
- `src/content/posts/`: análises de 150 a 300 palavras com três secções: "O que sabemos", "O que não sabemos" e "O que mudou desde o vídeo".
- `draft: true` fica fora das rotas, do sitemap e do RSS.

## O build falha se
- uma fonte não tiver URL https, licença ou crédito (o crédito é dispensado na licença `resumo`);
- um Short não tiver fonte B nem `sourceBNotFound` (com o motivo no corpo);
- faltar `confidence`;
- um post adaptado de ESA CC BY-SA IGO não tiver a licença `cc-by-sa-3.0-igo` e o link da licença;
- um post publicado ligar a um Short em rascunho.

## Licenças
As classes estão em `src/lib/licences.mjs`, lidas nas páginas oficiais a 2026-11-04. Não substituem aconselhamento jurídico.
Por decidir pelo Conde: a licença do código e dos textos originais deste repositório.
