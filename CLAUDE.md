# Doutor Cosmos (site Astro estático)

## Comandos
- `npm ci`
- `npm run build` (corre `scripts/check-content.mjs` e depois `astro build`; tem de sair com exit 0)

## Alojamento
- Cloudflare Workers Static Assets, NÃO Pages. Sem adaptador. Config em `wrangler.jsonc`.
- Cabeçalhos de segurança em `public/_headers` (copiado para `dist/_headers`; só vale para respostas estáticas).
- Só mudar o CSP depois de testar com `curl -sI`.

## Regras
- Sem `git commit`, `push` ou merge sem o Conde ver o comando e dizer OK. Uma commit por tarefa, com o diff mostrado antes.
- Sem tocar em DNS, Cloudflare, VPS ou segredos. Não ler `.env`.
- Não apagar ficheiros: renomear para `.disabled` ou mover para `_quarentena/`.
- Valor concreto = comando + resultado cru. O que não se sabe fica `[por confirmar]`. Sem inventar datas, números ou nomes.
- Se faltar acesso ou ficheiro, dizer exatamente o quê e parar.
- Não marcar `reviewed` em posts: decisão do Conde.
- Em cada tarefa: fazer, `npm run build`, mostrar o diff, parar.
- Português de Portugal, respostas curtas.
