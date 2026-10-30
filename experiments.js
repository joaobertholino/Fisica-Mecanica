"use strict";
// Content and analytical models for the additional experiments. No network dependencies.
function extendConcepts(list, c) {
  const proof = (...steps) => steps;
  const base = {
    vetores: [
      proof(
        "Em uma base ortonormal, projete r⃗ em cada eixo: x = r⃗·î, y = r⃗·ĵ e z = r⃗·k̂.",
        "Como os três eixos independentes abrangem o espaço, a soma das projeções reconstrói o vetor: r⃗ = xî + yĵ + zk̂.",
      ),
      proof(
        "Calcule r⃗·r⃗ expandindo as componentes.",
        "Os produtos entre eixos diferentes são zero; cada vetor unitário tem produto consigo mesmo igual a 1. Assim, |r⃗|² = x² + y² + z².",
        "Tome a raiz positiva, pois o módulo não é negativo.",
      ),
    ],
    movimento: [
      proof(
        "Por definição, a = dv/dt. Neste modelo a é constante.",
        "Integre de 0 a t: ∫ dv = ∫ a dt, obtendo v − v₀ = at.",
        "Isole v: v = v₀ + at.",
      ),
      proof(
        "Por definição, v = dx/dt. Substitua v(t) = v₀ + at.",
        "Integre: x − x₀ = ∫₀ᵗ (v₀ + as) ds = v₀t + at²/2.",
        "Some x₀. A expressão exige aceleração constante.",
      ),
    ],
    projetil: [
      proof(
        "Decomponha v₀ na horizontal e vertical: v₀ₕ = v₀ cos θ e v₀ᵧ = v₀ sen θ.",
        "Sem arrasto, a aceleração horizontal é zero. Integrar dρ/dt = v₀ₕ a partir de ρ₀ = 0 dá ρ = v₀ cos θ t.",
        "No plano horizontal, projete ρ na direção azimutal φ: x = ρ cos φ e z = ρ sen φ.",
      ),
      proof(
        "Escolha y positivo para cima. A gravidade fornece aᵧ = −g.",
        "Integre para obter vᵧ = v₀ sen θ − gt.",
        "Integre novamente com y₀ = 0: y = v₀ sen θ t − gt²/2.",
      ),
      proof(
        "Para a chegada na altura inicial, imponha y = 0: t(v₀ sen θ − gt/2) = 0.",
        "Descarte a raiz inicial t = 0. O tempo de voo é T = 2v₀ sen θ/g.",
        "Substitua em R = v₀ cos θ T. Como 2 sen θ cos θ = sen(2θ), R = v₀² sen(2θ)/g. Não se aplica diretamente a alturas diferentes.",
      ),
    ],
    circular: [
      proof(
        "Parametrize a órbita no plano xz: r⃗(t) = r(cos ωt, 0, sen ωt), com ω constante.",
        "Diferencie duas vezes: a⃗ = −ω²r⃗. A aceleração aponta para o centro e tem módulo ω²r.",
        "A primeira derivada tem módulo v = ωr. Substitua ω = v/r para obter a꜀ = v²/r.",
      ),
      proof(
        "Uma volta percorre a distância 2πr.",
        "Com rapidez constante, tempo = distância/rapidez.",
        "Logo T = 2πr/v. Equivalentemente, ωT = 2π.",
      ),
    ],
    forcas: [
      proof(
        "A segunda lei de Newton é uma lei física fundamental do modelo clássico, não uma identidade algébrica demonstrável por estas fórmulas.",
        "Para massa constante, ela relaciona a resultante à aceleração: ΣF⃗ = ma⃗.",
        "Projete no eixo horizontal: a força aplicada é positiva e o atrito é negativo. Portanto F − f = ma.",
      ),
      proof(
        "Na vertical não há aceleração: N − mg = 0, portanto N = mg.",
        "O limite fₛ ≤ μₛN é uma lei empírica aproximada de atrito seco. Não se deduz apenas das leis de Newton.",
        "Em repouso, a equação horizontal exige fₛ = F, enquanto F não excede μₛN.",
      ),
      proof(
        "Durante o deslizamento, adota-se a lei empírica f꜀ = μ꜀N.",
        "Neste plano horizontal, N = mg. Substituindo, f꜀ = μ꜀mg.",
        "A simulação iguala os coeficientes estático e cinético para simplificar; superfícies reais podem ter valores diferentes.",
      ),
    ],
    energia: [
      proof(
        "Use F = m dv/dt e dx = v dt. O trabalho elementar é F dx = mv dv.",
        "Integre do repouso até v: K = ∫₀ᵛ mu du = mv²/2, escolhendo K = 0 no repouso.",
        "Para a gravidade, Fᵧ = −mg e dU = −Fᵧ dy = mg dy. Integrando e fixando U = 0 em y = 0: U = mgy.",
      ),
      proof(
        "Para uma força conservativa, W = −ΔU. Pelo teorema trabalho–energia, W = ΔK.",
        "Logo ΔK + ΔU = 0: K + U é constante.",
        "O corpo parte do repouso na altura h₀, portanto E = 0 + mgh₀. Sem arrasto, esse total permanece igual durante a queda.",
      ),
      proof(
        "Some o trabalho de todas as forças: Wᵣₑₛ = ∫ F⃗ᵣₑₛ·d r⃗.",
        "Use F⃗ᵣₑₛ = m d v⃗/dt e d r⃗ = v⃗ dt, obtendo ∫ m v⃗·d v⃗.",
        "Como d(v²) = 2 v⃗·d v⃗, a integral é mvf²/2 − mvi²/2 = ΔK.",
      ),
    ],
    colisoes: [
      proof(
        "Para o sistema dos dois corpos, some as equações de Newton. As forças internas de ação e reação se cancelam nessa soma.",
        "Assim, dP⃗/dt = F⃗ externa. Se o impulso externo durante a colisão é zero, Pf = Pi.",
        "Escreva P = m₁v₁ + m₂v₂ ao longo do trilho e use u para as velocidades iniciais: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.",
      ),
      proof(
        "O coeficiente e é definido como rapidez relativa de afastamento dividida pela de aproximação, ao longo da linha de impacto.",
        "Com os sentidos desta cena, e = (v₂ − v₁)/(u₁ − u₂). Multiplique pelo denominador para obter a fórmula exibida.",
        "Essa é uma definição/modelo de impacto. e = 1 corresponde ao caso elástico e e = 0 à velocidade final comum.",
      ),
    ],
    rotacao: [
      proof(
        "Para cada massa pontual do corpo, a aceleração tangencial é rα; o torque correspondente é r(maₜ) = mr²α. Somar dá τ = (Σmr²)α = Iα.",
        "No disco uniforme, a densidade superficial é σ = m/(πR²). Um anel de raio r e espessura dr tem massa dm = 2πσr dr.",
        "Integre I = ∫₀ᴿ r² dm = 2πσ∫₀ᴿr³dr = πσR⁴/2 = mR²/2.",
      ),
      proof(
        "Por definição α = dω/dt. Para α constante e ω₀ = 0, integrar dá ω = αt.",
        "Como ω = dθ/dt, integre novamente com θ₀ = 0.",
        "O resultado é θ = αt²/2. Condições iniciais não nulas acrescentam ω₀ e θ₀.",
      ),
      proof(
        "Cada elemento dm do corpo tem rapidez v = rω.",
        "Some as energias cinéticas: K = ∫ v² dm/2 = ω²∫r²dm/2.",
        "Reconheça I = ∫r²dm. Portanto K = Iω²/2.",
      ),
    ],
    equilibrio: [
      proof(
        "Equilíbrio estático significa repouso persistente, com aceleração translacional e angular nulas.",
        "Na segunda lei, a = 0 implica ΣF⃗ = 0. Na equação de rotação, α = 0 implica Στ = 0.",
        "As duas condições são necessárias. As forças podem se equilibrar e ainda formar um binário que faça o corpo girar.",
      ),
      proof(
        "O módulo do torque é força vezes braço perpendicular. Os pesos são m₁g e m₂g.",
        "Escolha o sentido anti-horário como positivo. A carga à esquerda dá +m₁gd₁; a da direita dá −m₂gd₂.",
        "Some as contribuições. O suporte deve fornecer o torque oposto se essa soma não for zero.",
      ),
    ],
    elasticidade: [
      proof(
        "A proporcionalidade entre força restauradora e deformação é a lei empírica de Hooke no regime linear.",
        "Defina k > 0 como a rigidez. Para x positivo, a mola puxa no sentido negativo.",
        "Essa convenção fornece Fₘₒₗₐ = −kx. Fora do regime elástico linear, a relação deixa de valer.",
      ),
      proof(
        "Em cada equilíbrio quase estático, a força resultante horizontal é zero.",
        "Fₑₓₜ + Fₘₒₗₐ = 0. Substitua Fₘₒₗₐ = −kx.",
        "Fₑₓₜ − kx = 0 implica x = Fₑₓₜ/k.",
      ),
      proof(
        "A energia potencial obedece dU = −Fₘₒₗₐ dx = kx dx.",
        "Integre a partir da deformação zero, escolhendo U(0) = 0.",
        "U(x) = ∫₀ˣ ks ds = kx²/2. É também a área triangular sob o gráfico da força externa contra o alongamento.",
      ),
    ],
  };
  const originals = [...list];
  originals.forEach((x) => {
    x.family = x.id;
    x.experimentName = "Experimento principal";
    x.derivations = base[x.id];
  });
  const add = (family, slug, name, description, controls, formulas, steps, options = {}) => {
    const parent = originals.find((x) => x.id === family);
    list.push({
      ...parent,
      ...options,
      id: family + "--" + slug,
      family,
      name,
      experimentName: name,
      subtitle: description,
      controls,
      formulas,
      derivations: steps,
      text: `<p>${description}</p><p>${options.explain || "Compare os valores instantâneos enquanto avança a sequência. Use as deduções abaixo para relacionar o desenho às equações."}</p>`,
      tip:
        options.tip ||
        "Mude um parâmetro de cada vez e compare as previsões das equações com a animação.",
      variables:
        options.variables ||
        "As leituras usam unidades do SI. Consulte as hipóteses e as etapas da dedução para interpretar cada símbolo.",
      render: drawExtra,
      duration: options.duration || (() => 6),
    });
  };
  add(
    "vetores",
    "soma",
    "Soma de dois vetores",
    "Translade um vetor sem mudar suas componentes e construa a soma pelo método ponta–cauda.",
    [
      c("ax", "Aₓ", -3, 3, 0.5, 2, "m"),
      c("by", "Bᵧ", -3, 3, 0.5, 2, "m"),
      c("bz", "B𝓏", -3, 3, 0.5, 1, "m"),
    ],
    [
      ["Soma por componentes", "R⃗ = A⃗ + B⃗ = (Aₓ, Bᵧ, B𝓏)"],
      ["Módulo da soma", "|R⃗| = √(Aₓ² + Bᵧ² + B𝓏²)"],
    ],
    [
      proof(
        "Aqui A⃗ = (Aₓ,0,0) e B⃗ = (0,Bᵧ,B𝓏).",
        "A adição vetorial soma as componentes de cada eixo: (Aₓ+0,0+Bᵧ,0+B𝓏).",
        "Transladar B⃗ para a ponta de A⃗ preserva B⃗ e mostra geometricamente R⃗.",
      ),
      proof(
        "Os componentes de R⃗ estão em eixos perpendiculares.",
        "Aplique Pitágoras no plano xy e depois entre esse plano e z.",
        "Assim, |R⃗|² = Aₓ² + Bᵧ² + B𝓏²; tome a raiz positiva.",
      ),
    ],
    {
      assumptions:
        "Construção geométrica de vetores livres, sem representar velocidade física. A fica no eixo x; B fica no plano yz.",
      legend: [
        ["A e resultante", "mint"],
        ["B transladado", "gold"],
      ],
    },
  );
  add(
    "vetores",
    "produto",
    "Produto escalar e projeção",
    "A projeção mede quanto de um vetor aponta na direção de outro.",
    [
      c("a", "Módulo A", 1, 4, 0.5, 3, "m"),
      c("b", "Módulo B", 1, 4, 0.5, 2, "m"),
      c("angle", "Ângulo entre vetores", 0, 180, 5, 60, "°"),
    ],
    [
      ["Produto escalar", "A⃗·B⃗ = AB cos θ"],
      ["Projeção com sinal", "B∥ = B cos θ"],
    ],
    [
      proof(
        "Escolha o eixo x na direção de A⃗: A⃗ = (A,0,0).",
        "B⃗ possui componente B cos θ nessa direção. Pelo produto por componentes, A⃗·B⃗ = A(B cos θ).",
        "A expressão é independente da orientação da base. O resultado é negativo para θ > 90°.",
      ),
      proof(
        "No triângulo retângulo, cos θ é componente adjacente dividida pelo módulo B.",
        "Multiplique por B: B∥ = B cos θ.",
        "Para ângulos obtusos, a projeção fica no sentido oposto ao eixo positivo.",
      ),
    ],
    {
      assumptions:
        "Vetores no plano xy, visualizados no espaço. A projeção é construída progressivamente; os vetores não mudam de direção durante o ciclo.",
      legend: [
        ["A", "mint"],
        ["B / projeção", "gold"],
      ],
    },
  );
  add(
    "movimento",
    "encontro",
    "Encontro de dois móveis",
    "Dois corpos em movimento uniforme se aproximam. O encontro depende da velocidade relativa.",
    [
      c("v1", "Rapidez A", 1, 6, 0.5, 3, "m/s"),
      c("v2", "Rapidez B", 1, 6, 0.5, 2, "m/s"),
      c("L", "Separação inicial", 10, 40, 2, 24, "m"),
    ],
    [
      ["Posições", "xA = vAt; xB = L − vBt"],
      ["Instante do encontro", "tₑ = L / (vA + vB)"],
    ],
    [
      proof(
        "Integre dx/dt constante para cada corpo.",
        "A começa em zero e se move para a direita: xA = vAt.",
        "B começa em L e tem velocidade −vB: xB = L − vBt.",
      ),
      proof(
        "No encontro, xA = xB. Substitua as funções de posição.",
        "vAt = L − vBt implica (vA + vB)t = L.",
        "Divida pela soma das rapidezes positivas.",
      ),
    ],
    {
      duration: (p) => p.L / (p.v1 + p.v2),
      assumptions: "Partículas em MRU. A sequência termina no encontro e não modela uma colisão.",
      legend: [
        ["Móvel A", "mint"],
        ["Móvel B", "gold"],
      ],
    },
  );
  add(
    "movimento",
    "queda",
    "Queda livre comparada",
    "Duas massas diferentes caem juntas no vácuo. A aceleração gravitacional não depende da massa.",
    [c("h", "Altura", 2, 20, 1, 10, "m"), c("m", "Massa B", 1, 8, 1, 4, "kg")],
    [
      ["Altura e velocidade", "y = h − ½gt²; vᵧ = −gt"],
      ["Tempo de queda", "T = √(2h/g)"],
    ],
    [
      proof(
        "A força peso é −mg. Em maᵧ = −mg, cancele a massa: aᵧ = −g.",
        "Integre com vᵧ(0) = 0: vᵧ = −gt.",
        "Integre novamente com y(0) = h: y = h − gt²/2.",
      ),
      proof(
        "No solo, y = 0. Logo h = gT²/2.",
        "Isole T² = 2h/g.",
        "Escolha a raiz positiva, pois a queda ocorre após a soltura.",
      ),
    ],
    {
      duration: (p) => Math.sqrt((2 * p.h) / G),
      assumptions:
        "Vácuo, g constante, repouso inicial. Massa A = 1 kg. A sequência encerra antes do impacto; os tamanhos são ilustrativos.",
      legend: [
        ["Massa A", "mint"],
        ["Massa B", "gold"],
      ],
    },
  );
  const projProof = proof(
    "Integre a aceleração vertical −g e a horizontal zero para obter ρ = v₀ cos θ t e y = v₀ sen θ t − gt²/2.",
    "Resolva y(T) = 0 para a raiz positiva T = 2v₀ sen θ/g.",
    "Substitua em ρ(T) e use 2 sen θ cos θ = sen(2θ).",
  );
  add(
    "projetil",
    "angulos",
    "Ângulos complementares",
    "Compare duas trajetórias com a mesma rapidez inicial e ângulos que somam 90°.",
    [
      c("v", "Rapidez inicial", 5, 25, 1, 16, "m/s"),
      c("angle", "Ângulo da trajetória A", 15, 45, 1, 30, "°"),
    ],
    [
      ["Alcances iguais", "R(θ) = R(90° − θ)"],
      ["Alcance", "R = v₀² sen(2θ)/g"],
    ],
    [
      proof(
        "Use a fórmula do alcance para o ângulo complementar: sen[2(90°−θ)] = sen(180°−2θ).",
        "Pela simetria do seno, sen(180°−2θ) = sen(2θ).",
        "Como v₀ e g são iguais, os alcances são iguais. Os tempos e alturas não precisam coincidir.",
      ),
      projProof,
    ],
    {
      duration: (p) => (2 * p.v * Math.cos((p.angle * Math.PI) / 180)) / G,
      assumptions:
        "Duas partículas sem arrasto, mesmo nível de partida e chegada. Cada partícula para ao tocar o solo. A câmera mostra trajetórias no plano xy.",
      legend: [
        ["Ângulo θ", "mint"],
        ["Ângulo 90° − θ", "gold"],
      ],
    },
  );
  add(
    "projetil",
    "horizontal",
    "Lançamento horizontal",
    "Uma bola lançada horizontalmente e outra solta caem ao solo no mesmo instante.",
    [
      c("h", "Altura inicial", 2, 15, 1, 8, "m"),
      c("v", "Velocidade horizontal", 1, 12, 0.5, 6, "m/s"),
    ],
    [
      ["Trajetória", "x = v₀t; y = h − ½gt²"],
      ["Alcance horizontal", "R = v₀√(2h/g)"],
    ],
    [
      proof(
        "A aceleração horizontal é zero, portanto x = v₀t a partir de x₀ = 0.",
        "Na vertical, vᵧ₀ = 0 e aᵧ = −g. Integrar duas vezes dá y = h − gt²/2.",
        "A partícula simplesmente solta possui a mesma equação vertical.",
      ),
      proof(
        "Imponha y(T) = 0 e obtenha T = √(2h/g).",
        "O movimento horizontal não altera esse tempo.",
        "Substitua o tempo em R = v₀T.",
      ),
    ],
    {
      duration: (p) => Math.sqrt((2 * p.h) / G),
      assumptions:
        "Sem arrasto. A trajetória está no plano xy; a segunda bola é solta com velocidade inicial zero. A sequência termina no solo.",
      legend: [
        ["Lançamento horizontal", "mint"],
        ["Queda vertical", "gold"],
      ],
    },
  );
  add(
    "circular",
    "raios",
    "Duas órbitas, mesma rapidez",
    "Com a mesma rapidez, um raio menor exige maior aceleração centrípeta e produz voltas mais rápidas.",
    [c("r", "Raio externo", 2, 5, 0.5, 4, "m"), c("v", "Rapidez comum", 1, 5, 0.5, 3, "m/s")],
    [
      ["Comparação das acelerações", "aᵢ/aₑ = rₑ/rᵢ = 2"],
      ["Velocidade angular", "ω = v/r"],
    ],
    [
      proof(
        "Para cada órbita, a = v²/r; as rapidezes são iguais.",
        "Divida: aᵢ/aₑ = (v²/rᵢ)/(v²/rₑ) = rₑ/rᵢ.",
        "Nesta experiência, rᵢ = rₑ/2, logo aᵢ = 2aₑ.",
      ),
      proof(
        "O comprimento de arco é s = rθ, com θ em radianos.",
        "Diferencie em relação ao tempo: v = r dθ/dt = rω.",
        "Isole ω = v/r.",
      ),
    ],
    {
      duration: (p) => (TAU * p.r) / p.v,
      assumptions:
        "Órbitas concêntricas no plano xz; raio interno igual à metade do externo. Mesma rapidez constante.",
      legend: [
        ["Órbita interna", "mint"],
        ["Órbita externa", "gold"],
      ],
    },
  );
  add(
    "circular",
    "acelerado",
    "Movimento circular acelerado",
    "Quando a rapidez muda, a aceleração tem uma componente tangencial e outra radial.",
    [
      c("r", "Raio", 1, 4, 0.5, 2, "m"),
      c("alpha", "Aceleração angular", 0.1, 0.6, 0.1, 0.2, "rad/s²"),
    ],
    [
      ["Cinemática angular", "ω = αt; θ = ½αt²"],
      ["Componentes da aceleração", "aₜ = rα; aᵣ = rω²"],
      ["Módulo total", "a = √(aₜ² + aᵣ²)"],
    ],
    [
      base.rotacao[1],
      proof(
        "A rapidez tangencial é v = rω. Para raio constante, dv/dt = r dω/dt = rα.",
        "A curvatura exige a componente radial v²/r.",
        "Substituindo v = rω, aᵣ = rω²; essa componente aponta para o centro.",
      ),
      proof(
        "A tangente e o raio são perpendiculares.",
        "Some vetorialmente as duas componentes.",
        "Pelo teorema de Pitágoras, o módulo é a = √(aₜ²+aᵣ²).",
      ),
    ],
    {
      duration: () => 4,
      assumptions:
        "Raio fixo, repouso inicial, α constante. As setas são reescaladas para legibilidade e mostram a direção de cada componente.",
      legend: [
        ["Aceleração tangencial", "mint"],
        ["Aceleração radial", "gold"],
      ],
    },
  );
  add(
    "forcas",
    "rampa",
    "Bloco em um plano inclinado",
    "Decomponha o peso e veja quando a componente ao longo da rampa supera o atrito.",
    [
      c("angle", "Inclinação", 10, 50, 1, 30, "°"),
      c("mu", "Coeficiente de atrito", 0, 0.6, 0.02, 0.2, ""),
      c("m", "Massa", 1, 4, 0.5, 2, "kg"),
    ],
    [
      ["Normal", "N = mg cos θ"],
      ["Aceleração ao deslizar", "a = g(sen θ − μ cos θ)"],
      ["Condição de repouso", "tan θ ≤ μ"],
    ],
    [
      proof(
        "Projete o peso na direção perpendicular à rampa: sua componente para dentro vale mg cos θ.",
        "Como não há aceleração perpendicular, N − mg cos θ = 0.",
        "Logo N = mg cos θ; aqui a normal não é igual ao peso.",
      ),
      proof(
        "No sentido descendente, a componente do peso é mg sen θ. O atrito cinético opõe-se com μN.",
        "A segunda lei fornece ma = mg sen θ − μmg cos θ.",
        "Cancele m. Esta expressão é usada depois de vencer o atrito estático.",
      ),
      proof(
        "O repouso exige mg sen θ ≤ μₛN.",
        "Substitua N = mg cos θ e divida por mg cos θ > 0.",
        "Resulta tan θ ≤ μₛ. A cena usa μₛ = μ꜀ = μ.",
      ),
    ],
    {
      assumptions:
        "Plano fixo, bloco inicialmente em repouso e μ estático igual ao cinético. A escala do deslocamento se ajusta à duração; setas de força usam escala comum.",
      legend: [
        ["Normal", "mint"],
        ["Peso / atrito", "gold"],
      ],
    },
  );
  add(
    "forcas",
    "atwood",
    "Máquina de Atwood",
    "Duas massas ligadas por um fio aceleram juntas. A tensão transmite a interação entre elas.",
    [c("m1", "Massa esquerda", 1, 5, 0.5, 2, "kg"), c("m2", "Massa direita", 1, 5, 0.5, 3, "kg")],
    [
      ["Aceleração (direita para baixo)", "a = (m₂ − m₁)g/(m₁ + m₂)"],
      ["Tensão", "T = 2m₁m₂g/(m₁ + m₂)"],
    ],
    [
      proof(
        "Tome a aceleração da esquerda positiva para cima e a da direita positiva para baixo.",
        "As equações são T − m₁g = m₁a e m₂g − T = m₂a.",
        "Some para eliminar T: (m₂−m₁)g = (m₁+m₂)a. Isole a.",
      ),
      proof(
        "Da massa esquerda, T = m₁(g+a).",
        "Substitua a = (m₂−m₁)g/(m₁+m₂).",
        "Coloque no mesmo denominador e simplifique: T = 2m₁m₂g/(m₁+m₂).",
      ),
    ],
    {
      duration: () => 0.8,
      assumptions:
        "Fio inextensível e sem massa; polia sem massa e sem atrito. As duas massas partem do repouso. O sinal de a indica qual lado desce.",
      legend: [
        ["Massa esquerda", "mint"],
        ["Massa direita", "gold"],
      ],
    },
  );
  add(
    "energia",
    "mola",
    "Troca de energia em uma mola",
    "Um bloco oscila sem atrito: energia elástica e cinética se alternam, mantendo a soma constante.",
    [
      c("k", "Rigidez", 10, 60, 5, 20, "N/m"),
      c("m", "Massa", 1, 5, 0.5, 2, "kg"),
      c("A", "Amplitude", 0.1, 0.8, 0.1, 0.5, "m"),
    ],
    [
      ["Movimento harmônico", "x = A cos(ωt); ω = √(k/m)"],
      ["Energia total", "E = K + U = ½kA²"],
    ],
    [
      proof(
        "Combine F = −kx com F = mẍ: ẍ + (k/m)x = 0.",
        "Uma solução que começa em x=A e v=0 é x=A cos(ωt), pois ẍ=−ω²x.",
        "Substitua e obtenha ω²=k/m, tomando ω positivo.",
      ),
      proof(
        "Diferencie x: v = −Aω sen(ωt). Assim K = mA²ω² sen²(ωt)/2.",
        "Com mω²=k, K = kA² sen²(ωt)/2. A energia elástica é U = kA² cos²(ωt)/2.",
        "Some e use sen²+cos²=1. E = kA²/2.",
      ),
    ],
    {
      duration: (p) => TAU * Math.sqrt(p.m / p.k),
      assumptions:
        "Mola ideal, massa pontual e ausência de atrito. Extensão dinâmica da lei de Hooke; movimento periódico é desenvolvido no volume seguinte.",
      legend: [
        ["Energia potencial", "mint"],
        ["Energia cinética", "gold"],
      ],
    },
  );
  add(
    "energia",
    "dissipacao",
    "Trabalho do atrito",
    "A energia cinética de um bloco deslizando se transforma em energia interna até ele parar.",
    [
      c("v", "Rapidez inicial", 1, 8, 0.5, 4, "m/s"),
      c("mu", "Atrito cinético", 0.1, 0.6, 0.05, 0.2, ""),
      c("m", "Massa", 1, 4, 0.5, 2, "kg"),
    ],
    [
      ["Frenagem", "v = v₀ − μgt; x = v₀t − ½μgt²"],
      ["Energia transformada", "Q = μmgx = K₀ − K"],
      ["Distância de parada", "d = v₀²/(2μg)"],
    ],
    [
      proof(
        "O atrito cinético é −μmg, então a = −μg.",
        "Integre a com v(0)=v₀ para obter v.",
        "Integre v com x(0)=0 para obter x. Valem até a parada.",
      ),
      proof(
        "O trabalho do atrito sobre o bloco é W = −μmgx.",
        "Pelo teorema trabalho–energia, K−K₀=W.",
        "A energia mecânica transformada em energia interna é Q = −W = μmgx = K₀−K.",
      ),
      proof(
        "Aplique v²=v₀²+2ax com a=−μg.",
        "Na parada, v=0 e x=d.",
        "0=v₀²−2μgd implica d=v₀²/(2μg).",
      ),
    ],
    {
      duration: (p) => p.v / (p.mu * G),
      assumptions:
        "Atrito cinético constante em plano horizontal. Q representa energia mecânica convertida em energia interna no conjunto bloco–superfície; não é uma medição de temperatura.",
      legend: [
        ["Energia cinética", "mint"],
        ["Energia interna acumulada", "gold"],
      ],
    },
  );
  add(
    "colisoes",
    "impulso",
    "Impulso como área",
    "Uma força constante atua por um intervalo finito. A área do gráfico força–tempo mede o impulso.",
    [
      c("force", "Força", 1, 12, 1, 6, "N"),
      c("m", "Massa", 1, 5, 0.5, 2, "kg"),
      c("dt", "Duração do pulso", 0.5, 3, 0.5, 2, "s"),
    ],
    [
      ["Impulso", "J = ∫F dt = FΔt"],
      ["Mudança da velocidade", "Δv = J/m"],
    ],
    [
      proof(
        "A segunda lei para massa constante é F = dp/dt.",
        "Multiplique por dt e integre durante a interação: ∫F dt = pf−pi = J.",
        "Para força constante, a integral é a área retangular FΔt.",
      ),
      proof(
        "Como p=mv e a massa é constante, Δp=mΔv.",
        "Pelo teorema do impulso, Δp=J.",
        "Divida por m para obter Δv=J/m.",
      ),
    ],
    {
      duration: (p) => p.dt + 1,
      assumptions:
        "Pulso externo horizontal constante, aplicado a um corpo inicialmente em repouso. Após o pulso, não há força horizontal. Este experimento ilustra impulso, não uma colisão detalhada.",
      legend: [
        ["Corpo / velocidade", "mint"],
        ["Área do impulso", "gold"],
      ],
    },
  );
  add(
    "colisoes",
    "centro",
    "Centro de massa na colisão",
    "As velocidades individuais mudam na colisão, mas o centro de massa segue em movimento uniforme.",
    [
      c("m1", "Massa A", 1, 5, 0.5, 2, "kg"),
      c("m2", "Massa B", 1, 5, 0.5, 3, "kg"),
      c("e", "Restituição", 0, 1, 0.1, 0.5, ""),
    ],
    [
      ["Centro de massa", "xCM = (m₁x₁ + m₂x₂)/(m₁ + m₂)"],
      ["Velocidade do centro", "vCM = P/(m₁ + m₂)"],
    ],
    [
      proof(
        "Defina o centro de massa como a média das posições ponderada pelas massas.",
        "Multiplique a posição de cada corpo por sua massa e some.",
        "Divida pela massa total. Essa é uma definição; sua utilidade dinâmica aparece ao diferenciá-la.",
      ),
      proof(
        "Diferencie xCM com massas constantes: vCM=(m₁v₁+m₂v₂)/(m₁+m₂).",
        "O numerador é o momento total P.",
        "Sem força externa, P é constante, logo vCM é constante mesmo durante a colisão.",
      ),
    ],
    {
      duration: () => 4,
      assumptions:
        "Partículas pontuais em trilho sem atrito. A chega a 3 m/s e B parte do repouso. As trajetórias são desenhadas em trilhos separados apenas para legibilidade; as coordenadas x são comuns.",
      legend: [
        ["A / B", "mint"],
        ["Centro de massa", "gold"],
      ],
    },
  );
  add(
    "rotacao",
    "rolamento",
    "Rolamento sem deslizamento",
    "Uma roda combina translação do centro e rotação. O ponto em contato fica instantaneamente parado.",
    [c("r", "Raio", 0.5, 1.5, 0.1, 1, "m"), c("v", "Rapidez do centro", 0.5, 3, 0.5, 1, "m/s")],
    [
      ["Vínculo do rolamento", "vCM = ωR"],
      ["Trajetória de um ponto da borda", "x = R(θ − sen θ); y = R(1 − cos θ)"],
    ],
    [
      proof(
        "Sem deslizamento, o arco desenrolado Rθ é igual ao deslocamento do centro.",
        "Diferencie xCM = Rθ com raio constante.",
        "vCM = R dθ/dt = Rω.",
      ),
      proof(
        "O centro está em (Rθ,R). Um ponto que começa no contato tem deslocamento relativo (−R sen θ,−R cos θ).",
        "Some as coordenadas do centro e as relativas para obter x e y.",
        "A curva é uma cicloide. No contato inicial, as velocidades de translação e rotação se cancelam.",
      ),
    ],
    {
      three: true,
      duration: (p) => (TAU * p.r) / p.v,
      assumptions:
        "Roda rígida em rolamento uniforme sem deslizamento; plano de movimento xy. A câmera 3D revela a posição do ponto na borda.",
      legend: [
        ["Roda", "mint"],
        ["Ponto da borda / cicloide", "gold"],
      ],
    },
  );
  add(
    "rotacao",
    "momento",
    "Conservação do momento angular",
    "Massas que se aproximam do eixo fazem o conjunto girar mais rápido se não houver torque externo.",
    [
      c("m", "Massa de cada corpo", 1, 4, 0.5, 2, "kg"),
      c("r", "Raio final", 0.5, 1.8, 0.1, 1, "m"),
      c("omega", "Velocidade inicial", 0.5, 2, 0.5, 1, "rad/s"),
    ],
    [
      ["Duas massas pontuais", "I = 2mr²"],
      ["Conservação angular", "L = Iω = constante; ω = L/I"],
    ],
    [
      proof(
        "Por definição, I = Σmᵢrᵢ² em torno do eixo.",
        "As duas massas são iguais e estão à mesma distância r.",
        "Portanto I=mr²+mr²=2mr²; a haste ideal tem massa desprezível.",
      ),
      proof(
        "A dinâmica angular fornece dL/dt = τ externo. Sem torque externo, dL/dt=0 e L se conserva.",
        "Para as massas girando em torno desse eixo, L=Iω.",
        "Assim ω=L/I: reduzir I aumenta ω. A energia cinética pode aumentar porque o mecanismo radial realiza trabalho.",
      ),
    ],
    {
      three: true,
      assumptions:
        "Duas massas em haste sem massa, raio inicial de 2 m e contração radial uniforme durante 6 s. Sem torque externo; um atuador interno controla o raio e pode realizar trabalho.",
      legend: [
        ["Massas / haste", "mint"],
        ["Eixo", "gold"],
      ],
    },
  );
  add(
    "equilibrio",
    "apoios",
    "Viga sobre dois apoios",
    "Mover uma carga muda as reações de apoio mesmo quando a força total permanece igual.",
    [
      c("m", "Massa da carga", 1, 8, 1, 4, "kg"),
      c("x", "Posição final da carga", 0.2, 3.8, 0.2, 2.8, "m"),
    ],
    [
      ["Reação direita", "RB = mgx/L"],
      ["Reação esquerda", "RA = mg(1 − x/L)"],
    ],
    [
      proof(
        "Considere uma viga sem massa de comprimento L, apoiada em A e B.",
        "Some os torques em torno de A: RB·L − mg·x = 0.",
        "Isole RB = mgx/L.",
      ),
      proof(
        "O equilíbrio vertical exige RA + RB − mg = 0.",
        "Substitua RB = mgx/L.",
        "Isole RA = mg − mgx/L = mg(1−x/L).",
      ),
    ],
    {
      assumptions:
        "Viga sem massa de 4 m. A posição da carga varia lentamente de 0,2 m até o valor escolhido, como sequência de equilíbrios. Não há dinâmica de transporte.",
      legend: [
        ["Reações dos apoios", "mint"],
        ["Peso", "gold"],
      ],
    },
  );
  add(
    "equilibrio",
    "cabos",
    "Carga suspensa por dois cabos",
    "Cabos quase horizontais precisam de tensões muito grandes para sustentar a mesma carga.",
    [
      c("m", "Massa suspensa", 1, 5, 0.5, 2, "kg"),
      c("angle", "Ângulo com a horizontal", 15, 75, 5, 45, "°"),
    ],
    [
      ["Tensão em cada cabo", "T = mg/(2 sen θ)"],
      ["Cancelamento horizontal", "T cos θ − T cos θ = 0"],
    ],
    [
      proof(
        "Por simetria, as tensões nos dois cabos têm o mesmo módulo T.",
        "As componentes verticais somam 2T sen θ e equilibram o peso: 2T sen θ = mg.",
        "Isole T. Quando θ tende a zero, a tensão necessária cresce sem limite no modelo ideal.",
      ),
      proof(
        "Projete cada tensão no eixo horizontal.",
        "Os módulos são iguais a T cos θ e os sentidos são opostos.",
        "A soma é zero. A simetria é essencial para essa igualdade.",
      ),
    ],
    {
      assumptions:
        "Dois cabos ideais simétricos e sem massa. A animação constrói o diagrama vetorial; a carga permanece em equilíbrio.",
      legend: [
        ["Tensões", "mint"],
        ["Peso", "gold"],
      ],
    },
  );
  const seriesProof = proof(
    "Em série, a mesma força F atravessa ambas as molas. Cada alongamento é xᵢ=F/kᵢ.",
    "O alongamento total é x=F/k₁+F/k₂=F(1/k₁+1/k₂).",
    "Defina F=kₑqx. Então 1/kₑq=1/k₁+1/k₂ e kₑq=k₁k₂/(k₁+k₂).",
  );
  const parallelProof = proof(
    "Em paralelo, as duas molas têm o mesmo alongamento x.",
    "As forças somam: F=k₁x+k₂x=(k₁+k₂)x.",
    "Comparando com F=kₑqx, conclua kₑq=k₁+k₂.",
  );
  for (const type of ["serie", "paralelo"])
    add(
      "elasticidade",
      type,
      type === "serie" ? "Molas em série" : "Molas em paralelo",
      type === "serie"
        ? "Em série, os alongamentos se somam: o conjunto fica menos rígido que cada mola."
        : "Em paralelo, as forças se somam: o conjunto fica mais rígido.",
      [
        c("k1", "Rigidez da mola 1", 10, 60, 5, 20, "N/m"),
        c("k2", "Rigidez da mola 2", 10, 60, 5, 40, "N/m"),
        c("f", "Força máxima", 1, 12, 1, 6, "N"),
      ],
      [
        ["Rigidez equivalente", type === "serie" ? "kₑq = k₁k₂/(k₁ + k₂)" : "kₑq = k₁ + k₂"],
        ["Alongamento do conjunto", "x = F/kₑq"],
      ],
      [
        type === "serie" ? seriesProof : parallelProof,
        proof(
          "Substitua a associação por uma mola equivalente, definida para ter a mesma força total e o mesmo alongamento total.",
          "A lei de Hooke do conjunto é F=kₑqx no equilíbrio.",
          "Divida por kₑq > 0 para obter x=F/kₑq.",
        ),
      ],
      {
        assumptions:
          "Molas ideais e conectores sem massa, deformações no regime linear. Carregamento quase estático; a força aplicada aumenta lentamente de zero ao máximo.",
        legend: [
          ["Mola 1", "mint"],
          ["Mola 2", "gold"],
        ],
      },
    );
  const references = {
    "movimento--queda": "Cap. 2 · seção 2.5",
    "circular--acelerado": "Cap. 3 · seção 3.4; cap. 9 · seção 9.3",
    "forcas--atwood": "Cap. 5 · seção 5.2",
    "energia--mola": "Cap. 7 · seção 7.2; extensão ao movimento periódico",
    "colisoes--impulso": "Cap. 8 · seção 8.1",
    "colisoes--centro": "Cap. 8 · seção 8.5",
    "rotacao--rolamento": "Cap. 10 · seção 10.3",
    "rotacao--momento": "Cap. 10 · seção 10.6",
  };
  list.forEach((experiment) => {
    if (references[experiment.id]) experiment.ref = references[experiment.id];
  });
}
function fittedWorld(points) {
  const q = points.map((v) => project(v, 1, [0, 0])),
    xs = q.map((v) => v[0]),
    ys = q.map((v) => v[1]),
    loX = Math.min(...xs),
    hiX = Math.max(...xs),
    loY = Math.min(...ys),
    hiY = Math.max(...ys),
    s = Math.min(620 / Math.max(hiX - loX, 1), 260 / Math.max(hiY - loY, 1), 100);
  return (v) => project(v, s, [450 - ((loX + hiX) * s) / 2, 235 - ((loY + hiY) * s) / 2]);
}
function spring(a, b, y, color = C.mint) {
  const pts = [
    [a, y],
    [a + 15, y],
  ];
  for (let i = 0; i <= 20; i++)
    pts.push([a + 15 + ((b - a - 30) * i) / 20, y + (i % 2 ? 13 : -13)]);
  pts.push([b, y]);
  path(pts, color, 2.5);
}
function energyBars(items, total) {
  items.forEach(([name, value, color], i) => {
    const x = 560 + i * 100,
      h = (Math.max(0, value) / Math.max(total, 0.001)) * 200;
    block(x, 245, 45, 200, "#23424c");
    ctx.fillStyle = color;
    ctx.fillRect(x - 22.5, 345 - h, 45, h);
    label(name, x, 375, color, 17, "center");
    label(fmt(value, 1) + " J", x, 125, color, 14, "center");
  });
}
function drawExtra() {
  const p = params,
    d = duration(),
    f = t / d,
    id = current.id;
  if (id === "vetores--soma") {
    const A = [p.ax, 0, 0],
      B = [0, p.by, p.bz],
      R = A.map((x, i) => x + B[i]),
      pr = drawSpatialAxes(fittedWorld([[0, 0, 0], A, B, R]), 4),
      start = A.map((x) => x * f);
    arrow(pr([0, 0, 0]), pr(A), C.mint, "A");
    arrow(pr(start), pr(start.map((x, i) => x + B[i])), C.gold, "B");
    arrow(pr([0, 0, 0]), pr(R), C.blue, "R");
    path([A, R].map(pr), C.muted, 1, [5, 5]);
    readings([
      ["Módulo A", Math.abs(p.ax), "m"],
      ["Módulo B", Math.hypot(p.by, p.bz), "m"],
      ["Módulo da soma", Math.hypot(...R), "m"],
    ]);
    return "Transladar B preserva suas componentes. No fim, sua cauda coincide com a ponta de A.";
  }
  if (id === "vetores--produto") {
    const a = (p.angle * Math.PI) / 180,
      B = [p.b * Math.cos(a), p.b * Math.sin(a), 0],
      pr = drawSpatialAxes(fittedWorld([[0, 0, 0], [p.a, 0, 0], B]), 4);
    arrow(pr([0, 0, 0]), pr([p.a, 0, 0]), C.mint, "A");
    arrow(pr([0, 0, 0]), pr(B), C.gold, "B");
    line(pr(B), pr([B[0], B[1] * (1 - f), 0]), C.blue, 2, [5, 5]);
    arrow(pr([0, 0, 0]), pr([B[0] * f, 0, 0]), C.blue, "B∥");
    readings([
      ["Produto escalar", p.a * B[0], "m²"],
      ["Projeção de B", B[0], "m"],
      ["Ângulo", p.angle, "°"],
    ]);
    return "Observe o sinal da projeção. O produto escalar é zero quando os vetores são perpendiculares.";
  }
  if (id === "movimento--encontro") {
    const xa = p.v1 * t,
      xb = p.L - p.v2 * t,
      X = (x) => 100 + (x / p.L) * 700;
    line([100, 245], [800, 245], C.muted, 2);
    ball(X(xa), 220, 14);
    ball(X(xb), 270, 14, C.gold);
    label("A", X(xa), 190, C.mint);
    label("B", X(xb), 310, C.gold);
    label("0 m", 100, 370);
    label(fmt(p.L, 0) + " m", 800, 370, C.muted, 14, "right");
    readings([
      ["Posição A", xa, "m"],
      ["Posição B", xb, "m"],
      ["Tempo do encontro", d, "s"],
    ]);
    return "A distância entre as partículas diminui à razão vA + vB. Elas estão em alturas gráficas distintas apenas para legibilidade.";
  }
  if (id === "movimento--queda") {
    const y = Math.max(0, p.h - 0.5 * G * t * t),
      Y = 350 - (y / p.h) * 250;
    line([170, 370], [700, 370], C.muted, 2);
    ball(300, Y, 13);
    ball(580, Y, 13 + Math.sqrt(p.m) * 3, C.gold);
    label("1 kg", 300, 410, C.mint, 17, "center");
    label(fmt(p.m, 0) + " kg", 580, 410, C.gold, 17, "center");
    readings([
      ["Altura das duas", y, "m"],
      ["Velocidade vertical", -G * t, "m/s"],
      ["Tempo total", d, "s"],
    ]);
    return "Sem resistência do ar, as duas massas têm a mesma posição vertical em cada instante.";
  }
  if (id === "projetil--angulos" || id === "projetil--horizontal") {
    const horizontal = id.endsWith("horizontal"),
      a = horizontal ? 0 : (p.angle * Math.PI) / 180,
      v = p.v,
      starts = horizontal ? [p.h, p.h] : [0, 0],
      angles = horizontal ? [0, 0] : [a, Math.PI / 2 - a],
      times = horizontal ? [d, d] : angles.map((q) => (2 * v * Math.sin(q)) / G),
      pos = (j, s) => {
        s = Math.min(s, times[j]);
        return [
          horizontal && j === 1 ? 0 : v * Math.cos(angles[j]) * s,
          Math.max(0, starts[j] + v * Math.sin(angles[j]) * s - 0.5 * G * s * s),
          0,
        ];
      },
      curves = [0, 1].map((j) => Array.from({ length: 61 }, (_, i) => pos(j, (times[j] * i) / 60))),
      pr = fittedWorld(curves.flat());
    line(pr([0, 0, 0]), pr([Math.max(...curves.flat().map((q) => q[0])), 0, 0]), C.muted, 2);
    [0, 1].forEach((j) => {
      const color = j ? C.gold : C.mint;
      path(curves[j].map(pr), color, 1, [4, 5]);
      path(
        Array.from({ length: 61 }, (_, i) => pr(pos(j, (Math.min(t, times[j]) * i) / 60))),
        color,
        3,
      );
      ball(...pr(pos(j, t)), 10, color);
    });
    readings([
      ["Altura A", pos(0, t)[1], "m"],
      ["Altura B", pos(1, t)[1], "m"],
      [horizontal ? "Alcance A" : "Alcance comum", pos(0, times[0])[0], "m"],
    ]);
    return horizontal
      ? "As duas bolas têm a mesma aceleração vertical; a velocidade horizontal não altera o tempo de queda."
      : "A trajetória mais baixa termina antes, mas as duas chegam à mesma coordenada horizontal.";
  }
  if (id === "circular--raios" || id === "circular--acelerado") {
    const radii = id.endsWith("raios") ? [p.r / 2, p.r] : [p.r],
      pr = axes3(42, [450, 230], 5);
    radii.forEach((r, j) => {
      const a = id.endsWith("raios") ? (p.v / r) * t : 0.5 * p.alpha * t * t,
        pt = [r * Math.cos(a), 0, r * Math.sin(a)],
        color = j ? C.gold : C.mint;
      path(
        Array.from({ length: 101 }, (_, i) =>
          pr([r * Math.cos((TAU * i) / 100), 0, r * Math.sin((TAU * i) / 100)]),
        ),
        color,
        1,
      );
      ball(...pr(pt), 10, color);
      if (id.endsWith("acelerado")) {
        const at = r * p.alpha,
          ar = r * (p.alpha * t) ** 2,
          s = 1 / Math.max(1, at, ar);
        arrow(
          pr(pt),
          pr(pt.map((x, i) => x + [-Math.sin(a) * at, 0, Math.cos(a) * at][i] * s)),
          C.mint,
          "aₜ",
        );
        arrow(
          pr(pt),
          pr(pt.map((x, i) => x + [-Math.cos(a) * ar, 0, -Math.sin(a) * ar][i] * s)),
          C.gold,
          "aᵣ",
        );
      }
    });
    if (id.endsWith("raios")) {
      readings([
        ["Aceleração interna", (2 * p.v * p.v) / p.r, "m/s²"],
        ["Aceleração externa", (p.v * p.v) / p.r, "m/s²"],
        ["Voltas da interna", 2 * f, ""],
      ]);
      return "A partícula interna completa duas voltas enquanto a externa completa uma.";
    }
    const at = p.r * p.alpha,
      ar = p.r * (p.alpha * t) ** 2;
    readings([
      ["Aceleração tangencial", at, "m/s²"],
      ["Aceleração radial", ar, "m/s²"],
      ["Aceleração total", Math.hypot(at, ar), "m/s²"],
    ]);
    return "A componente tangencial muda a rapidez. A componente radial muda a direção e aumenta à medida que ω cresce.";
  }
  if (id === "forcas--rampa") {
    const a = (p.angle * Math.PI) / 180,
      N = p.m * G * Math.cos(a),
      fr = Math.min(p.m * G * Math.sin(a), p.mu * N),
      acc = Math.max(0, G * Math.sin(a) - fr / p.m),
      start = [220, 130],
      end = [220 + 500 * Math.cos(a), 130 + 500 * Math.sin(a)],
      u = acc ? f * f : 0,
      b = [start[0] + (end[0] - start[0]) * u, start[1] + (end[1] - start[1]) * u - 25];
    line(start, end, C.muted, 5);
    block(...b, 40, 40, C.blue);
    arrow(b, [b[0], b[1] + p.m * G * 2], C.gold, "mg");
    arrow(b, [b[0] + N * Math.sin(a) * 2, b[1] - N * Math.cos(a) * 2], C.mint, "N");
    if (fr) arrow(b, [b[0] - fr * Math.cos(a) * 2, b[1] - fr * Math.sin(a) * 2], C.gold, "f");
    label("Deslocamento em escala automática", 40, 430);
    readings([
      ["Normal", N, "N"],
      ["Aceleração", acc, "m/s²"],
      ["Deslocamento", 0.5 * acc * t * t, "m"],
    ]);
    return acc
      ? "A componente do peso ao longo da rampa supera o limite de atrito."
      : "O atrito estático equilibra a componente tangencial do peso.";
  }
  if (id === "forcas--atwood") {
    const a = ((p.m2 - p.m1) * G) / (p.m1 + p.m2),
      T = (2 * p.m1 * p.m2 * G) / (p.m1 + p.m2),
      s = 0.5 * a * t * t * 35,
      y1 = 260 - s,
      y2 = 260 + s;
    ctx.beginPath();
    ctx.arc(450, 110, 55, 0, TAU);
    ctx.strokeStyle = C.muted;
    ctx.lineWidth = 3;
    ctx.stroke();
    path(
      [
        [395, y1],
        [395, 110],
      ],
      C.white,
      2,
    );
    path(
      [
        [505, 110],
        [505, y2],
      ],
      C.white,
      2,
    );
    block(395, y1, 50, 50, C.mint);
    block(505, y2, 50, 50, C.gold);
    label("m₁", 360, y1, C.mint);
    label("m₂", 540, y2, C.gold);
    readings([
      ["Aceleração direita", a, "m/s²"],
      ["Tensão", T, "N"],
      ["Deslocamento direito", 0.5 * a * t * t, "m"],
    ]);
    return a === 0
      ? "Massas iguais: tensões e pesos equilibram cada corpo."
      : "O lado mais pesado desce; o fio impõe deslocamentos de mesmo módulo.";
  }
  if (id === "energia--mola") {
    const w = Math.sqrt(p.k / p.m),
      x = p.A * Math.cos(w * t),
      v = -p.A * w * Math.sin(w * t),
      U = 0.5 * p.k * x * x,
      K = 0.5 * p.m * v * v,
      E = 0.5 * p.k * p.A * p.A,
      b = 270 + x * 160;
    line([75, 170], [75, 290], C.muted, 4);
    spring(75, b - 25, 240);
    block(b, 240, 50, 50, C.blue);
    line([270, 180], [270, 320], C.muted, 1, [3, 5]);
    energyBars(
      [
        ["U", U, C.mint],
        ["K", K, C.gold],
        ["E", E, C.blue],
      ],
      E,
    );
    readings([
      ["Posição", x, "m"],
      ["Velocidade", v, "m/s"],
      ["Energia total", E, "J"],
    ]);
    return "Nos extremos a energia é elástica; no centro é cinética. A energia mecânica total permanece constante.";
  }
  if (id === "energia--dissipacao") {
    const v = Math.max(0, p.v - p.mu * G * t),
      x = p.v * t - 0.5 * p.mu * G * t * t,
      E = 0.5 * p.m * p.v * p.v,
      K = 0.5 * p.m * v * v,
      Q = E - K,
      end = (p.v * p.v) / (2 * p.mu * G);
    line([70, 280], [430, 280], C.muted, 2);
    block(100 + (300 * x) / end, 253, 45, 50, C.mint);
    energyBars(
      [
        ["K", K, C.mint],
        ["Q", Q, C.gold],
        ["K + Q", E, C.blue],
      ],
      E,
    );
    readings([
      ["Rapidez", v, "m/s"],
      ["Distância percorrida", x, "m"],
      ["Energia transformada", Q, "J"],
    ]);
    return "O trabalho negativo do atrito reduz K. No sistema bloco–superfície, essa energia aumenta a energia interna.";
  }
  if (id === "colisoes--impulso") {
    const active = Math.min(t, p.dt),
      J = p.force * active,
      v = J / p.m,
      x = ((0.5 * p.force) / p.m) * active * active + v * Math.max(0, t - p.dt),
      end = ((0.5 * p.force) / p.m) * p.dt * p.dt + (p.force * p.dt) / p.m;
    line([80, 180], [800, 180], C.muted, 2);
    ball(100 + (650 * x) / end, 160, 14);
    const X = (s) => 100 + (650 * s) / d,
      Y = 350 - p.force * 10;
    line([100, 350], [800, 350], C.muted, 2);
    line([100, 220], [100, 350], C.muted, 2);
    ctx.fillStyle = "#ffc78166";
    ctx.fillRect(100, Y, X(active) - 100, 350 - Y);
    path(
      [
        [100, Y],
        [X(p.dt), Y],
        [X(p.dt), 350],
        [X(d), 350],
      ],
      C.gold,
      2,
    );
    label("F (N)", 105, 215);
    label("tempo (s)", 700, 385);
    readings([
      ["Impulso acumulado", J, "N·s"],
      ["Velocidade", v, "m/s"],
      ["Força atual", t < p.dt ? p.force : 0, "N"],
    ]);
    return t < p.dt
      ? "A área cresce durante a aplicação da força; o momento do corpo aumenta."
      : "O pulso terminou: o impulso acumulado fica constante e o corpo segue em MRU.";
  }
  if (id === "colisoes--centro") {
    const v1 = (3 * (p.m1 - p.e * p.m2)) / (p.m1 + p.m2),
      v2 = (3 * (1 + p.e) * p.m1) / (p.m1 + p.m2),
      dt = Math.max(0, t - 1.5),
      xa = t < 1.5 ? -4.5 + 3 * t : v1 * dt,
      xb = v2 * dt,
      cm = (p.m1 * xa + p.m2 * xb) / (p.m1 + p.m2),
      X = (x) => 380 + x * 30;
    for (let y of [160, 240, 320]) line([80, y], [820, y], C.muted, 1);
    ball(X(xa), 160, 12);
    ball(X(xb), 240, 12, C.blue);
    ball(X(cm), 320, 10, C.gold);
    label("A", 65, 165, C.mint);
    label("B", 65, 245, C.blue);
    label("CM", 45, 325, C.gold);
    readings([
      ["Posição CM", cm, "m"],
      ["Velocidade CM", (3 * p.m1) / (p.m1 + p.m2), "m/s"],
      ["Momento total", 3 * p.m1, "kg·m/s"],
    ]);
    return "O centro de massa não sofre mudança de velocidade na colisão: os impulsos internos se cancelam.";
  }
  if (id === "rotacao--rolamento") {
    const theta = (p.v / p.r) * t,
      x = p.r * theta,
      trace = (s) => [p.r * (s - Math.sin(s)), p.r * (1 - Math.cos(s)), 0],
      outline = Array.from({ length: 101 }, (_, i) => trace((TAU * i) / 100)),
      pr = fittedWorld([...outline, [TAU * p.r + p.r, 2 * p.r, 0], [-p.r, 0, 0]]);
    line(pr([-p.r, 0, 0]), pr([TAU * p.r + p.r, 0, 0]), C.muted, 2);
    path(
      Array.from({ length: 81 }, (_, i) =>
        pr([x + p.r * Math.cos((TAU * i) / 80), p.r + p.r * Math.sin((TAU * i) / 80), 0]),
      ),
      C.mint,
      3,
    );
    path(
      Array.from({ length: 101 }, (_, i) => pr(trace((theta * i) / 100))),
      C.gold,
      2,
    );
    line(pr([x, p.r, 0]), pr(trace(theta)), C.mint, 2);
    ball(...pr(trace(theta)), 9, C.gold);
    readings([
      ["Velocidade do centro", p.v, "m/s"],
      ["Velocidade angular", p.v / p.r, "rad/s"],
      ["Ângulo percorrido", theta, "rad"],
    ]);
    return "A roda avança um comprimento de circunferência por volta. A trajetória do ponto na borda é uma cicloide.";
  }
  if (id === "rotacao--momento") {
    const r = 2 + (p.r - 2) * f,
      L = 2 * p.m * 4 * p.omega,
      I = 2 * p.m * r * r,
      w = L / I,
      theta = (p.omega * 2 * t) / r,
      pr = axes3(65, [450, 230], 3),
      pt = [r * Math.cos(theta), 0, r * Math.sin(theta)];
    line(pr(pt), pr(pt.map((x) => -x)), C.mint, 3);
    ball(...pr(pt), 14);
    ball(...pr(pt.map((x) => -x)), 14);
    arrow(pr([0, -1, 0]), pr([0, 2, 0]), C.gold, "eixo");
    readings([
      ["Raio atual", r, "m"],
      ["Velocidade angular", w, "rad/s"],
      ["Momento angular", L, "kg·m²/s"],
    ]);
    return "Contrair a distribuição de massa reduz I. Para conservar L, a velocidade angular aumenta.";
  }
  if (id === "equilibrio--apoios") {
    const x = 0.2 + (p.x - 0.2) * f,
      Rb = (p.m * G * x) / 4,
      Ra = p.m * G - Rb;
    line([150, 230], [750, 230], C.blue, 7);
    arrow([150, 330], [150, 230], C.mint, "RA");
    arrow([750, 330], [750, 230], C.mint, "RB");
    arrow([150 + (x / 4) * 600, 130], [150 + (x / 4) * 600, 225], C.gold, "mg");
    label("A", 150, 370);
    label("B", 750, 370);
    label("L = 4 m", 450, 400, C.muted, 16, "center");
    readings([
      ["Posição da carga", x, "m"],
      ["Reação A", Ra, "N"],
      ["Reação B", Rb, "N"],
    ]);
    return "A reação maior fica no apoio mais próximo da carga. A soma das reações continua igual ao peso.";
  }
  if (id === "equilibrio--cabos") {
    const a = (p.angle * Math.PI) / 180,
      T = (p.m * G) / (2 * Math.sin(a)),
      origin = [450, 215],
      dx = 110 * Math.cos(a),
      dy = 110 * Math.sin(a);
    line([450 - dx, 215 - dy], origin, C.muted, 3);
    line(origin, [450 + dx, 215 - dy], C.muted, 3);
    block(450, 240, 40, 50, C.blue);
    arrow(origin, [450 - dx * f, 215 - dy * f], C.mint, "T");
    arrow(origin, [450 + dx * f, 215 - dy * f], C.mint, "T");
    arrow(origin, [450, 215 + 2 * dy * f], C.gold, "mg");
    readings([
      ["Tensão de cada cabo", T, "N"],
      ["Componente vertical", T * Math.sin(a), "N"],
      ["Peso total", p.m * G, "N"],
    ]);
    return "A construção mostra as duas componentes verticais sustentando o peso. As componentes horizontais se cancelam.";
  }
  if (id === "elasticidade--serie" || id === "elasticidade--paralelo") {
    const series = id.endsWith("serie"),
      F = p.f * f,
      k = series ? (p.k1 * p.k2) / (p.k1 + p.k2) : p.k1 + p.k2,
      x = F / k,
      scale = 80,
      base = 620;
    if (series) {
      const x1 = F / p.k1,
        x2 = F / p.k2;
      spring(120, 350 + x1 * scale, 230, C.mint);
      spring(350 + x1 * scale, base + (x1 + x2) * scale, 230, C.gold);
      block(base + x * scale, 230, 25, 50, C.blue);
    } else {
      spring(150, base + x * scale, 180, C.mint);
      spring(150, base + x * scale, 280, C.gold);
      line([base + x * scale, 160], [base + x * scale, 300], C.blue, 5);
    }
    label("F = " + fmt(F) + " N", 450, 370, C.white, 18, "center");
    readings([
      ["Rigidez equivalente", k, "N/m"],
      ["Alongamento total", x, "m"],
      ["Força aplicada", F, "N"],
    ]);
    return series
      ? "A força é a mesma em ambas as molas; seus alongamentos se somam."
      : "O alongamento é comum às duas molas; as forças exercidas se somam.";
  }
  return "";
}
