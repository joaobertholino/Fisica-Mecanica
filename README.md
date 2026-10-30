# Mecânica — laboratório de Física I

Laboratório estático em português, com **30 animações em dez temas**, feito em HTML, CSS e JavaScript. Referência: Young e Freedman, _Física I: Mecânica_, 14ª edição. Não exige instalação, servidor de aplicação nem processo de build.

## Abrir e publicar

Abra `index.html` no navegador. Para uma prévia por servidor local:

```sh
cd ~/Documents/Projeto-Fisica
python3 -m http.server 8000
```

Acesse `http://localhost:8000`. No celular conectado à mesma rede, use o IP do computador na porta 8000, desde que a rede permita.

Para **GitHub Pages**, publique a raiz da branch que contém os arquivos. Inclua `vendor/`, `downloads/` e `.nojekyll`. Os recursos usam caminhos relativos e funcionam em subdiretórios de repositórios. Não há serviços externos em tempo de execução. Nenhuma publicação foi feita por esta implementação.

## Experimentos

| Tema                | Experimento principal | Mais animações                                      |
| ------------------- | --------------------- | --------------------------------------------------- |
| Vetores             | Componentes no espaço | Soma; produto escalar e projeção                    |
| Movimento retilíneo | Aceleração constante  | Encontro; queda livre comparada                     |
| Projéteis           | Lançamento oblíquo    | Ângulos complementares; lançamento horizontal       |
| Movimento circular  | Movimento uniforme    | Comparação de raios; aceleração tangencial e radial |
| Leis de Newton      | Força e atrito        | Plano inclinado; máquina de Atwood                  |
| Energia             | Queda e conservação   | Mola oscilante; trabalho do atrito                  |
| Colisões            | Restituição e momento | Impulso; centro de massa                            |
| Rotação             | Disco sob torque      | Rolamento; conservação do momento angular           |
| Equilíbrio          | Comparação de torques | Viga em dois apoios; cabos simétricos               |
| Elasticidade        | Carregamento de mola  | Molas em série; molas em paralelo                   |

## Recursos

- Menu de temas e seletor com três experiências por tema.
- Parâmetros, valores instantâneos, explicações e hipóteses de cada modelo.
- 68 blocos de fórmulas, cada um acompanhado de dedução ou explicação da definição/lei utilizada. Uma mesma relação pode aparecer em mais de um experimento.
- Fórmulas tipografadas com **KaTeX 0.16.22**, com fontes locais e MathML para acessibilidade. A biblioteca e sua licença MIT estão em `vendor/katex/`; nenhuma CDN é usada.
- Câmera 3D ortográfica em JavaScript, ajustável por arraste/toque ou pelas setas do teclado. Cenas espaciais não exibem a grade 2D fixa.
- Pausa, reinício, velocidade, linha do tempo e 20 intervalos de avanço/retrocesso (21 estados).
- Opção **Repetir em loop**. A sequência reinicia automaticamente ao final enquanto estiver em reprodução.
- **Tela cheia**, com alternativa visual para navegadores sem a API nativa. Saia pelo botão ou por Escape.
- **Zoom em tela cheia** de 50% a 250%, por controle deslizante, botões ou roda do mouse. Restaurar retorna a 100%. O zoom usa o centro da cena como referência; os vetores têm enquadramento ajustado ao conteúdo.
- Tema claro/escuro: começa seguindo o sistema e salva a escolha explícita no armazenamento local. Se o armazenamento estiver indisponível, o botão continua funcionando na sessão.
- Layout responsivo, controles por toque e teclado, Canvas ajustado à densidade de pixels e respeito à preferência de redução de movimento na carga inicial.
- PDF de **23 páginas**, com síntese, dez seções detalhadas de teoria/deduções e dez exercícios resolvidos: cinco adaptados de exemplos identificados do livro e cinco adicionais do laboratório.

## Organização dos arquivos

- `index.html`: estrutura, controles e downloads.
- `styles.css`: temas, responsividade, tela cheia e apresentação.
- `app.js`: experiências originais, estado, câmera, desenho e reprodução.
- `experiments.js`: experiências adicionais e textos das deduções.
- `math.js`: correspondência entre fórmulas e sua representação LaTeX/KaTeX.
- `theme.js`: escolha e persistência do tema.
- `downloads/resumo-mecanica.tex`: fonte editável do material.
- `downloads/resumo-mecanica.pdf`: arquivo pronto para baixar.
- `vendor/katex/`: biblioteca, fontes e licença de terceiros.
- `tests/validate.cjs`: verificações locais do catálogo, fórmulas e modelos adicionais.

## Desenvolvimento

O site funciona sem Node.js. Node só é necessário para verificações e formatação do código:

```sh
node tests/validate.cjs
npm install
npm run format
npm run format:check
```

A configuração usa dois espaços e evita reformatar arquivos de terceiros. Para recompilar o PDF, com uma instalação de LaTeX:

```sh
cd downloads
pdflatex -interaction=nonstopmode -halt-on-error resumo-mecanica.tex
```

O `.tex` é independente e não depende de arquivos extras. O navegador baixa o PDF já compilado.

## Hipóteses e limites

As soluções analíticas evitam acúmulo de erro de integração. O site usa g = 9,81 m/s²; os exemplos do livro no PDF usam g = 9,80 m/s². Escalas gráficas são didáticas; vetores de grandezas diferentes não compartilham necessariamente a escala. As condições de cada experimento estão indicadas abaixo da cena.

A mola oscilante é uma extensão dinâmica da lei de Hooke; o volume seguinte desenvolve movimento periódico. O coeficiente de restituição interpola os casos de colisão. Carregamentos de molas e deslocamento de carga sobre viga representam sequências quase estáticas. As colisões são instantâneas, sem simulação de deformação durante o contato.

Alvos: navegadores modernos Chrome, Edge, Firefox e Safari. Os testes de tela cheia nativa dependem do navegador; a alternativa visual cobre sua ausência. A verificação em larguras diferentes não substitui testes em aparelhos físicos de todos os fabricantes.
