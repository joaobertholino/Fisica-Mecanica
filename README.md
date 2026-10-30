# Mecânica — laboratório de Física I

Site estático em português, feito em **HTML, CSS e JavaScript puro**, sem instalação, serviços externos ou processo de build. Referência: Young e Freedman, *Física I: Mecânica*, 14ª edição.

## Abrir

Abra `index.html` no navegador. Para uma prévia por servidor local:

```sh
cd ~/Documents/Projeto-Fisica
python3 -m http.server 8000
```

Acesse `http://localhost:8000`. Para testar num celular na mesma rede, acesse `http://IP-DO-COMPUTADOR:8000` (a rede/firewall precisa permitir). A página publicada funciona diretamente no navegador do celular.

## GitHub Pages

Envie **o conteúdo desta pasta**, incluindo `downloads/` e `.nojekyll`, para um repositório. Configure o GitHub Pages para publicar a raiz da branch que contém os arquivos. Não é necessário compilar o site. Todos os caminhos de recursos são relativos, inclusive os downloads, para funcionar também em `usuario.github.io/nome-do-repositorio/`.

Este projeto foi preparado localmente; nenhuma publicação ou criação de repositório foi feita.

## Conteúdo e controles

- 10 experiências: vetores, movimento retilíneo, projéteis, movimento circular, forças e atrito, energia, colisões, rotação, equilíbrio e elasticidade.
- Reprodução, pausa, reinício, velocidades de 0,25× a 2× e linha do tempo.
- Passo a passo em 20 intervalos (21 estados), com descrição contextual e valores instantâneos. Os botões de etapa pausam a animação. O experimento para no final; “Repetir” inicia outro ciclo.
- Parâmetros ajustáveis; mudanças reiniciam o tempo do experimento, preservando o estado de reprodução/pausa.
- Coordenadas tridimensionais e câmera ortográfica implementadas em JavaScript para vetores, projéteis, movimento circular e rotação. Arraste com mouse/toque ou use as setas do teclado sobre a cena. Alternância de vista 3D e 2D; a vista 2D de vetores é a projeção xy (a componente z continua indicada numericamente).
- Canvas dimensionado pela densidade real de pixels da tela. Layout para desktop, tablets e celulares; menu horizontal rolável em telas pequenas; controles por toque e teclado. Respeita preferência de redução de movimento na carga inicial.
- PDF de 8 páginas compilado de LaTeX, com resumo, 5 exemplos adaptados do livro e soluções comentadas. O livro original não é distribuído pelo site.

## Arquivos

- `index.html`: estrutura e downloads.
- `styles.css`: visual e comportamento responsivo.
- `app.js`: conteúdos, equações, modelos analíticos, câmera 3D e animações.
- `downloads/resumo-mecanica.tex`: fonte editável do material.
- `downloads/resumo-mecanica.pdf`: PDF pronto para baixar.
- `.nojekyll`: publicação estática direta no GitHub Pages.

Para recompilar o PDF com uma instalação de LaTeX:

```sh
cd downloads
pdflatex -interaction=nonstopmode -halt-on-error resumo-mecanica.tex
```

O site e as animações são JavaScript; LaTeX só é usado para preparar o PDF estático.

## Hipóteses e limites

As hipóteses estão abaixo de cada experiência. As soluções analíticas evitam acúmulo de erro por integração numérica. O site usa g = 9,81 m/s²; os exercícios do livro no PDF usam g = 9,80 m/s². As escalas de objetos e vetores são didáticas; somente grandezas do mesmo tipo indicadas em escala comum podem ser comparadas visualmente. O eixo y é vertical.

Projéteis partem e chegam no mesmo nível; o ensaio de energia encerra antes do impacto; colisões são instantâneas; a barra de equilíbrio é mantida horizontal por suporte; a mola representa carregamento quase estático. Esses últimos dois modelos não simulam, respectivamente, tombamento nem oscilação livre.

Para versões antigas sem Canvas 2D moderno, a renderização pode não funcionar. Alvos: navegadores modernos Chrome, Edge, Firefox e Safari; não foi feita verificação em aparelhos físicos de todos os fabricantes.

## Verificação desta versão

Foram exercitados os dez conceitos no navegador, os valores finais, avanço e retrocesso, troca de vista, controle da câmera por teclado, colisão perfeitamente inelástica e repouso sem força horizontal. Não foram registrados erros de JavaScript nesses testes. O layout foi conferido nas larguras 320, 375, 414, 768 e 1280 px, sem transbordamento horizontal da página. O download do PDF foi testado; as oito páginas foram renderizadas e revisadas. Isso não substitui testes em dispositivos físicos e em todos os navegadores-alvo.
