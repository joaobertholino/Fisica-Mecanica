"use strict";
const $ = (s) => document.querySelector(s),
  TAU = Math.PI * 2,
  G = 9.81;
const fmt = (n, d = 2) =>
  (Math.abs(Number(n)) < 0.5 * 10 ** -d ? 0 : Number(n)).toLocaleString("pt-BR", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
const C = {
  mint: "#77e4c7",
  gold: "#ffc781",
  blue: "#83bbf4",
  muted: "#91b0bc",
  grid: "#25404a",
  white: "#e0eef0",
};
const control = (id, label, min, max, step, value, unit) => ({
  id,
  label,
  min,
  max,
  step,
  value,
  unit,
  digits: (String(step).split(".")[1] || "").length,
});
const concepts = [
  {
    id: "vetores",
    name: "Vetores no espaço",
    chapter: "01 · VETORES",
    ref: "Cap. 1 · seções 1.7–1.10",
    three: true,
    subtitle: "Direção, sentido e intensidade: a geometria por trás das grandezas físicas.",
    controls: [
      control("x", "Componente x", -4, 4, 0.5, 3, "m"),
      control("y", "Componente y", -4, 4, 0.5, 2, "m"),
      control("z", "Componente z", -4, 4, 0.5, 2, "m"),
    ],
    tip: "Gire a cena e altere z. Um vetor pode sair do plano da tela sem perder suas componentes.",
    text: "<p>Uma posição no espaço precisa de três coordenadas. O vetor reúne essas informações em uma seta: seu comprimento representa a intensidade e sua orientação indica direção e sentido.</p><p>As componentes são deslocamentos independentes ao longo dos eixos. A animação constrói o caminho x → y → z e mostra que o vetor resultante liga diretamente o ponto inicial ao final.</p>",
    assumptions:
      "Base cartesiana ortogonal em três dimensões. A construção é uma sequência geométrica, não a trajetória física de uma partícula.",
    formulas: [
      ["Decomposição", "r⃗ = x î + y ĵ + z k̂"],
      ["Módulo", "|r⃗| = √(x² + y² + z²)"],
    ],
    variables: "x, y e z são as componentes, em metros. î, ĵ e k̂ são vetores unitários.",
    legend: [
      ["Componentes", "blue"],
      ["Vetor resultante", "mint"],
    ],
  },
  {
    id: "movimento",
    name: "Movimento retilíneo",
    chapter: "02 · CINEMÁTICA",
    ref: "Cap. 2 · seção 2.4",
    subtitle: "Veja como a aceleração transforma velocidade e posição ao longo do tempo.",
    controls: [
      control("v", "Velocidade inicial", 0, 10, 0.5, 3, "m/s"),
      control("a", "Aceleração", -2, 3, 0.1, 1, "m/s²"),
    ],
    tip: "Escolha uma aceleração negativa. O corpo desacelera, para e pode inverter o sentido.",
    text: "<p>A velocidade diz quanto a posição muda por segundo. A aceleração diz quanto a velocidade muda por segundo. Uma aceleração constante não produz deslocamentos iguais em intervalos iguais.</p><p>As marcas no trilho registram a posição a cada segundo. Quando ficam mais afastadas, o módulo da velocidade está aumentando. O gráfico mostra a velocidade: sua inclinação é a aceleração.</p>",
    assumptions:
      "Movimento unidimensional com aceleração constante e posição inicial zero. O ciclo dura 8 s; reiniciar representa um novo experimento.",
    formulas: [
      ["Velocidade", "v = v₀ + at"],
      ["Posição", "x = x₀ + v₀t + ½at²"],
    ],
    variables: "x em m; v em m/s; a em m/s²; t em s.",
    legend: [
      ["Posição / velocidade", "mint"],
      ["Posições a cada 1 s", "blue"],
    ],
  },
  {
    id: "projetil",
    name: "Lançamento de projétil",
    chapter: "03 · MOVIMENTO NO ESPAÇO",
    ref: "Cap. 3 · seção 3.3",
    three: true,
    subtitle: "Um movimento horizontal uniforme, uma queda vertical e uma única trajetória.",
    controls: [
      control("v", "Velocidade inicial", 5, 30, 0.5, 18, "m/s"),
      control("angle", "Ângulo de lançamento", 10, 80, 1, 45, "°"),
      control("azimuth", "Direção no plano", -60, 60, 5, 0, "°"),
    ],
    tip: "Compare 30° e 60° com a mesma velocidade. O alcance é igual, mas a altura e o tempo de voo mudam.",
    text: "<p>Sem resistência do ar, a gravidade muda apenas a componente vertical da velocidade. No plano horizontal, o projétil continua avançando uniformemente enquanto sobe e desce.</p><p>No ponto mais alto, a velocidade vertical é zero, mas a velocidade horizontal continua existindo. A direção no plano gira a trajetória no espaço sem alterar sua altura nem seu alcance.</p>",
    assumptions:
      "Partícula sem resistência do ar; g = 9,81 m/s²; lançamento e chegada no mesmo nível. O eixo y é vertical. Setas de velocidade são ilustrativas, em escala própria.",
    formulas: [
      ["No plano horizontal", "ρ = v₀ cos(θ) t"],
      ["Na vertical", "y = v₀ sen(θ) t − ½gt²"],
      ["Alcance no mesmo nível", "R = v₀² sen(2θ) / g"],
    ],
    variables:
      "ρ é a distância horizontal; θ é o ângulo de elevação. x = ρ cos(φ) e z = ρ sen(φ), com φ dado pela direção no plano.",
    legend: [
      ["Trajetória / projétil", "mint"],
      ["Velocidade", "gold"],
    ],
  },
  {
    id: "circular",
    name: "Movimento circular",
    chapter: "03 · MOVIMENTO NO ESPAÇO",
    ref: "Cap. 3 · seção 3.4",
    three: true,
    subtitle: "Mesmo com rapidez constante, mudar de direção exige aceleração.",
    controls: [
      control("r", "Raio", 1, 5, 0.1, 3, "m"),
      control("v", "Rapidez", 1, 6, 0.1, 3, "m/s"),
    ],
    tip: "Dobre a rapidez mantendo o raio. A aceleração centrípeta fica quatro vezes maior.",
    text: "<p>A velocidade é tangente à circunferência. Como essa tangente muda continuamente, o vetor velocidade muda mesmo quando seu módulo permanece constante.</p><p>A aceleração aponta para o centro. Ela é chamada centrípeta: o nome descreve sua direção, não uma força adicional. A força resultante radial produz essa aceleração.</p>",
    assumptions:
      "Movimento circular uniforme no plano xz. Setas de velocidade e aceleração têm escalas visuais distintas. A câmera 3D permite observar o plano da órbita.",
    formulas: [
      ["Aceleração centrípeta", "a꜀ = v² / r"],
      ["Período", "T = 2πr / v"],
    ],
    variables: "r é o raio, v é a rapidez e T é o tempo de uma volta.",
    legend: [
      ["Velocidade tangente", "mint"],
      ["Aceleração para o centro", "gold"],
    ],
  },
  {
    id: "forcas",
    name: "Leis de Newton e atrito",
    chapter: "04–05 · DINÂMICA",
    ref: "Caps. 4–5 · seções 4.3 e 5.3",
    subtitle: "A força resultante determina a aceleração. O atrito pode impedir o movimento.",
    controls: [
      control("f", "Força aplicada", 0, 30, 1, 16, "N"),
      control("m", "Massa", 1, 5, 0.1, 2, "kg"),
      control("mu", "Coeficiente de atrito", 0, 0.6, 0.02, 0.2, ""),
    ],
    tip: "Aumente a massa. O limite de atrito aumenta e a mesma força pode deixar de mover o bloco.",
    text: "<p>Forças são interações. Aqui, o peso é equilibrado pela força normal na vertical. Na horizontal, uma força empurra o bloco e o atrito se opõe à tendência de deslizamento.</p><p>Enquanto a força aplicada não supera o limite de atrito estático, a resultante é zero. Depois de iniciar o movimento, a diferença entre a força aplicada e o atrito acelera o bloco.</p>",
    assumptions:
      "Plano horizontal e bloco inicialmente em repouso. Para simplificar, μ estático = μ cinético = μ. Força constante e positiva. Setas de força em escala comum; o deslocamento é autoajustado.",
    formulas: [
      ["Segunda lei", "ΣFₓ = F − f = ma"],
      ["Repouso", "fₛ ≤ μN; N = mg"],
      ["Deslizamento", "f꜀ = μmg"],
    ],
    variables:
      "F é a força aplicada, f é o módulo do atrito, N a normal e μ o coeficiente de atrito.",
    legend: [
      ["Força aplicada / normal", "mint"],
      ["Atrito / peso", "gold"],
    ],
  },
  {
    id: "energia",
    name: "Trabalho e energia",
    chapter: "06–07 · CONSERVAÇÃO",
    ref: "Caps. 6–7 · seções 6.2 e 7.1",
    subtitle: "A energia muda de forma enquanto o corpo cai. O total permanece constante.",
    controls: [
      control("h", "Altura inicial", 2, 20, 0.5, 12, "m"),
      control("m", "Massa", 1, 5, 0.5, 2, "kg"),
    ],
    tip: "Dobre a massa. As energias dobram, mas o tempo de queda e a velocidade final não mudam.",
    text: "<p>Ao soltar um corpo, sua altura diminui e sua velocidade aumenta. A energia potencial gravitacional se transforma em energia cinética.</p><p>O trabalho da gravidade é igual ao aumento da energia cinética. Se apenas a gravidade realiza trabalho, a soma K + U permanece constante. As barras tornam essa troca visível.</p>",
    assumptions:
      "Queda a partir do repouso, sem resistência do ar, com g constante. U = 0 no solo. A simulação termina imediatamente antes do impacto; não modela a colisão com o chão.",
    formulas: [
      ["Duas formas de energia", "K = ½mv²; U = mgy"],
      ["Conservação", "E = K + U = mgh₀"],
      ["Trabalho e energia", "Wᵣₑₛ = ΔK"],
    ],
    variables: "K é a energia cinética, U a potencial e E a mecânica, em joules (J).",
    legend: [
      ["Energia potencial U", "mint"],
      ["Energia cinética K", "gold"],
    ],
  },
  {
    id: "colisoes",
    name: "Momento e colisões",
    chapter: "08 · SISTEMAS DE PARTÍCULAS",
    ref: "Cap. 8 · seções 8.2–8.4",
    subtitle: "Durante uma colisão, os corpos trocam momento linear.",
    controls: [
      control("m1", "Massa do corpo A", 1, 5, 0.5, 2, "kg"),
      control("m2", "Massa do corpo B", 1, 5, 0.5, 2, "kg"),
      control("e", "Restituição", 0, 1, 0.1, 1, ""),
    ],
    tip: "Com massas iguais e e = 1, o corpo A para e transfere sua velocidade ao corpo B. Com e = 0, os dois seguem juntos.",
    text: "<p>Momento linear é massa vezes velocidade. Se o impulso externo é desprezível, o momento total antes e depois da colisão é o mesmo, mesmo que cada corpo mude de velocidade.</p><p>Na colisão elástica (e = 1), a energia cinética também se conserva. Na perfeitamente inelástica (e = 0), os corpos passam a ter a mesma velocidade e parte da energia cinética se transforma em energia interna.</p>",
    assumptions:
      "Colisão unidimensional instantânea, sem forças externas horizontais. A chega com 3 m/s e B está parado. e é o coeficiente de restituição (extensão para interpolar os casos do livro).",
    formulas: [
      ["Conservação do momento", "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂"],
      ["Restituição", "v₂ − v₁ = e(u₁ − u₂)"],
    ],
    variables: "u indica velocidade antes da colisão; v, depois. Aqui u₁ = 3 m/s e u₂ = 0.",
    legend: [
      ["Corpo A", "mint"],
      ["Corpo B", "gold"],
    ],
  },
  {
    id: "rotacao",
    name: "Rotação e torque",
    chapter: "09–10 · CORPOS RÍGIDOS",
    ref: "Caps. 9–10 · seções 9.4 e 10.2",
    three: true,
    subtitle:
      "O torque muda a velocidade angular; o momento de inércia mede a resistência a essa mudança.",
    controls: [
      control("torque", "Torque aplicado", 0, 4, 0.1, 1, "N·m"),
      control("m", "Massa do disco", 1, 5, 0.5, 2, "kg"),
      control("r", "Raio do disco", 0.5, 2, 0.1, 1, "m"),
    ],
    tip: "Dobre o raio sem alterar massa ou torque. O momento de inércia quadruplica e a aceleração angular cai para um quarto.",
    text: "<p>Na translação, uma força resultante muda a velocidade. Na rotação em torno de um eixo fixo, um torque resultante muda a velocidade angular.</p><p>A distribuição de massa importa: quanto mais longe do eixo estiver a massa, maior o momento de inércia. O disco rígido gira como um conjunto; todos os seus pontos têm a mesma velocidade angular, mas os mais distantes percorrem arcos maiores.</p>",
    assumptions:
      "Disco uniforme, eixo fixo vertical, inicialmente em repouso, torque constante e sem atrito. Eixo y vertical; disco no plano xz.",
    formulas: [
      ["Dinâmica de rotação", "τ = Iα; I = ½mR²"],
      ["Cinemática angular", "ω = αt; θ = ½αt²"],
      ["Energia cinética de rotação", "K = ½Iω²"],
    ],
    variables: "τ em N·m; I em kg·m²; α em rad/s²; ω em rad/s.",
    legend: [
      ["Disco e ponto na borda", "mint"],
      ["Eixo de rotação", "gold"],
    ],
  },
  {
    id: "equilibrio",
    name: "Equilíbrio de torques",
    chapter: "11 · EQUILÍBRIO",
    ref: "Cap. 11 · seções 11.1–11.3",
    subtitle: "Equilibrar forças não basta: os torques também precisam se cancelar.",
    controls: [
      control("m1", "Massa à esquerda", 1, 5, 0.5, 2, "kg"),
      control("m2", "Massa à direita", 1, 5, 0.5, 2, "kg"),
      control("d", "Braço à direita", 0.5, 2, 0.1, 1, "m"),
    ],
    tip: "Coloque 4 kg à esquerda e 2 kg a 2 m à direita. Os torques têm o mesmo módulo e se cancelam.",
    text: "<p>Uma força aplicada longe do apoio tem maior capacidade de fazer uma barra girar. Essa capacidade é medida pelo torque: força vezes braço perpendicular.</p><p>Para uma barra ficar em equilíbrio estático, tanto a soma das forças quanto a soma dos torques deve ser zero. A animação destaca alternadamente os dois torques; a barra é mantida horizontal para comparar seus valores.</p>",
    assumptions:
      "Barra ideal sem massa, braço esquerdo de 1 m, cargas pontuais e g = 9,81 m/s². Um suporte mantém a barra horizontal: quando os torques não se cancelam, ele fornece o torque de reação. Não é uma simulação de tombamento.",
    formulas: [
      ["Equilíbrio estático", "ΣF = 0; Στ = 0"],
      ["Comparação em torno do apoio", "τᵣₑₛ = m₁g d₁ − m₂g d₂"],
    ],
    variables:
      "Sentido anti-horário positivo; d₁ = 1 m. τᵣₑₛ indica a soma dos torques das cargas.",
    legend: [
      ["Torque da esquerda", "mint"],
      ["Torque da direita", "gold"],
    ],
  },
  {
    id: "elasticidade",
    name: "Elasticidade e lei de Hooke",
    chapter: "11 · DEFORMAÇÃO",
    ref: "Cap. 11 · seção 11.4; cap. 7 · seção 7.2",
    subtitle: "Uma mola responde à deformação com uma força restauradora.",
    controls: [
      control("k", "Constante elástica", 20, 100, 5, 40, "N/m"),
      control("f", "Força máxima", 1, 20, 1, 12, "N"),
    ],
    tip: "Dobre a constante elástica mantendo a força. A deformação fica pela metade.",
    text: "<p>Dentro do regime elástico linear, a força da mola é proporcional à deformação e aponta para a posição de equilíbrio. Uma mola mais rígida tem constante elástica maior.</p><p>A animação aplica e retira a força lentamente, passando por uma sequência de equilíbrios. Ao esticar a mola, o agente externo armazena energia potencial elástica, que pode ser recuperada quando ela volta.</p>",
    assumptions:
      "Mola ideal no regime linear. Variação quase estática: inércia desprezada, sem oscilação livre. A duração exibida é apenas o tempo didático da sequência.",
    formulas: [
      ["Força restauradora", "Fₘₒₗₐ = −kx"],
      ["Equilíbrio a cada etapa", "x = Fₑₓₜ / k"],
      ["Energia armazenada", "U = ½kx²"],
    ],
    variables: "k em N/m; x é o alongamento em m. O sinal negativo indica a direção restauradora.",
    legend: [
      ["Mola", "mint"],
      ["Força externa", "gold"],
    ],
  },
];
extendConcepts(concepts, control);
let current,
  params = {},
  t = 0,
  playing = !matchMedia("(prefers-reduced-motion: reduce)").matches,
  last = 0,
  view3d = true,
  yaw = -0.6,
  pitch = 0.48;
const canvas = $("#scene"),
  ctx = canvas.getContext("2d");
const toolsBar = document.createElement("div");
toolsBar.className = "step-tools";
toolsBar.innerHTML =
  '<button id="back" aria-label="Voltar uma etapa">← Etapa</button><button id="next" aria-label="Avançar uma etapa">Etapa →</button><input id="timeline" type="range" min="0" max="1000" value="0" aria-label="Posição na simulação"><button id="view">Vista 2D</button><label class="loop-option"><input id="loop" type="checkbox"> Repetir em loop</label>';
$(".transport").after(toolsBar);
const zoomControls = document.createElement("div");
zoomControls.className = "zoom-controls";
zoomControls.hidden = true;
zoomControls.innerHTML =
  '<button id="zoom-out" aria-label="Diminuir zoom">−</button><label for="zoom">Zoom</label><input id="zoom" type="range" min="50" max="250" step="10" value="100"><output id="zoom-value" for="zoom">100%</output><button id="zoom-in" aria-label="Aumentar zoom">+</button><button id="zoom-reset">Restaurar</button>';
toolsBar.after(zoomControls);
let sceneZoom = 1;
function setZoom(value) {
  sceneZoom = Math.max(0.5, Math.min(2.5, value));
  $("#zoom").value = Math.round(sceneZoom * 100);
  $("#zoom-value").textContent = Math.round(sceneZoom * 100) + "%";
  draw();
}
$("#zoom").oninput = (e) => setZoom(+e.target.value / 100);
$("#zoom-in").onclick = () => setZoom(sceneZoom + 0.1);
$("#zoom-out").onclick = () => setZoom(sceneZoom - 0.1);
$("#zoom-reset").onclick = () => setZoom(1);
canvas.addEventListener(
  "wheel",
  (e) => {
    if (zoomControls.hidden || e.ctrlKey) return;
    e.preventDefault();
    setZoom(sceneZoom + (e.deltaY < 0 ? 0.1 : -0.1));
  },
  { passive: false },
);
const cameraHint = document.createElement("p");
cameraHint.className = "camera-hint";
cameraHint.textContent = "3D · Arraste para girar a câmera. Use as setas do teclado na cena.";
$(".canvas-wrap").after(cameraHint);
canvas.tabIndex = 0;
const phase = document.createElement("div");
phase.className = "phase";
phase.setAttribute("aria-live", "polite");
$(".readings").after(phase);
$("#concept-menu").innerHTML = concepts
  .filter((c) => c.family === c.id)
  .map(
    (c, i) =>
      `<button data-id="${c.id}"><span class="number">${String(i + 1).padStart(2, "0")}</span>${c.name}</button>`,
  )
  .join("");
$("#concept-menu").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) select(b.dataset.id);
});
$("#experiment-select").addEventListener("change", (e) => select(e.target.value));
function select(id) {
  current = concepts.find((c) => c.id === id) || concepts[2];
  params = Object.fromEntries(current.controls.map((c) => [c.id, c.value]));
  t = 0;
  yaw = -0.6;
  pitch = 0.48;
  view3d = true;
  $("#experiment-select").innerHTML = concepts
    .filter((c) => c.family === current.family)
    .map(
      (c) =>
        `<option value="${c.id}" ${c.id === current.id ? "selected" : ""}>${c.experimentName}</option>`,
    )
    .join("");
  $("#derivation-list").innerHTML = current.formulas
    .map(
      ([title, formula], i) =>
        `<details ${i === 0 ? "open" : ""}><summary><span>${title}</span><span class="derivation-formula">${mathMarkup(formula)}</span></summary><ol>${current.derivations[i].map((step) => `<li>${inlineMath(step)}</li>`).join("")}</ol></details>`,
    )
    .join("");
  $("#chapter").textContent = current.chapter;
  $("#title").textContent = current.name;
  $("#subtitle").textContent = current.subtitle;
  $("#tip").textContent = current.tip;
  $("#explanation").innerHTML = current.text;
  $("#assumptions").textContent = current.assumptions;
  $("#formulas").innerHTML = current.formulas
    .map(([l, f]) => `<div class="formula"><small>${l}</small>${mathMarkup(f)}</div>`)
    .join("");
  $("#variables").textContent = current.variables;
  $("#reference").textContent = `Young & Freedman, 14ª ed. · ${current.ref}`;
  $("#legend").innerHTML = current.legend
    .map(([l, c]) => `<span style="--color:${C[c]}">${l}</span>`)
    .join("");
  $("#sliders").innerHTML = current.controls
    .map(
      (c) =>
        `<div class="control"><label for="param-${c.id}">${c.label}<output id="out-${c.id}" for="param-${c.id}">${fmt(c.value, c.digits)} ${c.unit}</output></label><input id="param-${c.id}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}"><div class="range-labels"><span>${fmt(c.min, c.digits)} ${c.unit}</span><span>${fmt(c.max, c.digits)} ${c.unit}</span></div></div>`,
    )
    .join("");
  current.controls.forEach((c) =>
    $("#param-" + c.id).addEventListener("input", (e) => {
      params[c.id] = +e.target.value;
      $("#out-" + c.id).textContent = `${fmt(params[c.id], c.digits)} ${c.unit}`;
      t = 0;
      updatePlay();
      draw();
    }),
  );
  document
    .querySelectorAll("nav button")
    .forEach((b) => b.setAttribute("aria-current", String(b.dataset.id === current.family)));
  $("#view").hidden = !current.three;
  cameraHint.hidden = !current.three;
  $("#view").textContent = "Vista 2D";
  canvas.setAttribute(
    "aria-label",
    `${current.name}. ${current.three ? "Arraste para girar a visualização 3D." : ""} Valores numéricos abaixo da animação.`,
  );
  $("#readings").innerHTML = Array.from(
    { length: 3 },
    () => '<div class="reading"><small></small><strong></strong><span class="unit"></span></div>',
  ).join("");
  try {
    history.replaceState(null, "", "#" + current.id);
  } catch {}
  updatePlay();
  draw();
}
function duration() {
  const p = params;
  if (current.duration) return current.duration(p);
  switch (current.id) {
    case "projetil":
      return (2 * p.v * Math.sin((p.angle * Math.PI) / 180)) / G;
    case "energia":
      return Math.sqrt((2 * p.h) / G);
    case "circular":
      return (TAU * p.r) / p.v;
    case "vetores":
      return 6;
    case "colisoes":
      return 4;
    default:
      return 8;
  }
}
function updatePlay() {
  phase.setAttribute("aria-live", playing ? "off" : "polite");
  const end = t >= duration();
  $("#play").innerHTML = playing
    ? "Ⅱ <span>Pausar</span>"
    : `▶ <span>${end ? "Repetir" : "Reproduzir"}</span>`;
  $("#play").setAttribute(
    "aria-label",
    playing ? "Pausar animação" : end ? "Repetir animação" : "Reproduzir animação",
  );
  $("#status").textContent = playing
    ? "Simulação em andamento"
    : end
      ? "Experimento concluído"
      : "Simulação pausada";
}
$("#play").onclick = () => {
  if (t >= duration()) t = 0;
  playing = !playing;
  updatePlay();
};
$("#reset").onclick = () => {
  t = 0;
  updatePlay();
  draw();
};
$("#speed").onchange = () => {
  last = performance.now();
};
function seek(value) {
  playing = false;
  t = Math.max(0, Math.min(duration(), value));
  updatePlay();
  draw();
}
$("#back").onclick = () => seek(t - duration() / 20);
$("#next").onclick = () => seek(t + duration() / 20);
$("#timeline").oninput = (e) => seek((+e.target.value / 1000) * duration());
$("#view").onclick = () => {
  view3d = !view3d;
  $("#view").textContent = view3d ? "Vista 2D" : "Vista 3D";
  cameraHint.hidden = !view3d;
  draw();
};
let pointer = null;
canvas.addEventListener("pointerdown", (e) => {
  if (!current.three || !view3d) return;
  pointer = { x: e.clientX, y: e.clientY };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener("pointermove", (e) => {
  if (!pointer) return;
  yaw += (e.clientX - pointer.x) * 0.009;
  pitch = Math.max(-1.1, Math.min(1.3, pitch + (e.clientY - pointer.y) * 0.009));
  pointer = { x: e.clientX, y: e.clientY };
  draw();
});
["pointerup", "pointercancel", "lostpointercapture"].forEach((event) =>
  canvas.addEventListener(event, () => (pointer = null)),
);
canvas.addEventListener("keydown", (e) => {
  if (!current.three || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
    return;
  e.preventDefault();
  yaw += e.key === "ArrowLeft" ? -0.12 : e.key === "ArrowRight" ? 0.12 : 0;
  pitch = Math.max(
    -1.1,
    Math.min(1.3, pitch + (e.key === "ArrowUp" ? 0.12 : e.key === "ArrowDown" ? -0.12 : 0)),
  );
  draw();
});
function line(a, b, color = C.grid, width = 1, dash = []) {
  ctx.beginPath();
  ctx.setLineDash(dash);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(...a);
  ctx.lineTo(...b);
  ctx.stroke();
  ctx.setLineDash([]);
}
function label(text, x, y, color = C.muted, size = 14, align = "left") {
  ctx.font = `${size}px system-ui`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}
function ball(x, y, r, color = C.mint) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(x - r * 0.25, y - r * 0.28, r * 0.22, 0, TAU);
  ctx.fillStyle = "#ffffff80";
  ctx.fill();
}
function arrow(a, b, color = C.mint, text = "") {
  line(a, b, color, 2.5);
  const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
  if (Math.hypot(b[0] - a[0], b[1] - a[1]) > 1) {
    line(b, [b[0] - 10 * Math.cos(angle - 0.45), b[1] - 10 * Math.sin(angle - 0.45)], color, 2.5);
    line(b, [b[0] - 10 * Math.cos(angle + 0.45), b[1] - 10 * Math.sin(angle + 0.45)], color, 2.5);
  }
  if (text) label(text, b[0] + 9, b[1] - 9, color, 15);
}
function block(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x - w / 2, y - h / 2, w, h, 5);
  else ctx.rect(x - w / 2, y - h / 2, w, h);
  ctx.fill();
}
function path(points, color = C.mint, width = 2, dash = []) {
  ctx.beginPath();
  ctx.setLineDash(dash);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  points.forEach((p, i) => (i ? ctx.lineTo(...p) : ctx.moveTo(...p)));
  ctx.stroke();
  ctx.setLineDash([]);
}
function grid() {
  for (let x = 30; x < 900; x += 40) line([x, 25], [x, 425]);
  for (let y = 25; y < 450; y += 40) line([30, y], [870, y]);
}
// Orthographic 3D camera: world coordinates are rotated around y, then x.
function project(v, scale = 45, origin = [450, 260]) {
  let [x, y, z] = v;
  if (!view3d) {
    if (["circular", "rotacao"].includes(current.family) && current.id !== "rotacao--rolamento")
      return [origin[0] + x * scale, origin[1] - z * scale];
    if (current.id === "projetil") {
      const az = (params.azimuth * Math.PI) / 180;
      return [origin[0] + (x * Math.cos(az) + z * Math.sin(az)) * scale, origin[1] - y * scale];
    }
    return [origin[0] + x * scale, origin[1] - y * scale];
  }
  const a = x * Math.cos(yaw) + z * Math.sin(yaw),
    b = -x * Math.sin(yaw) + z * Math.cos(yaw);
  return [origin[0] + a * scale, origin[1] - (y * Math.cos(pitch) - b * Math.sin(pitch)) * scale];
}
function axes3(scale = 45, origin = [450, 230], extent = 4) {
  return drawSpatialAxes((v) => project(v, scale, origin), extent);
}
function drawSpatialAxes(pr, extent = 4) {
  for (let i = -extent; i <= extent; i++) {
    line(pr([-extent, 0, i]), pr([extent, 0, i]), C.grid);
    line(pr([i, 0, -extent]), pr([i, 0, extent]), C.grid);
  }
  arrow(pr([0, 0, 0]), pr([extent, 0, 0]), "#577b89", "x");
  arrow(pr([0, 0, 0]), pr([0, extent, 0]), "#577b89", "y");
  arrow(pr([0, 0, 0]), pr([0, 0, extent]), "#577b89", "z");
  return pr;
}
function readings(values) {
  [...$("#readings").children].forEach((el, i) => {
    el.children[0].textContent = values[i][0];
    el.children[1].textContent =
      typeof values[i][1] === "number" ? fmt(values[i][1]) : values[i][1];
    el.children[2].textContent = values[i][2];
  });
}
function draw() {
  if (!current) return;
  const ratio = Math.max(1, devicePixelRatio || 1),
    w = canvas.clientWidth || 900,
    h = canvas.clientHeight || 460;
  if (canvas.width !== Math.round(w * ratio) || canvas.height !== Math.round(h * ratio)) {
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const fit =
    Math.min(canvas.width / 900, canvas.height / 460) * (zoomControls.hidden ? 1 : sceneZoom);
  ctx.setTransform(fit, 0, 0, fit, (canvas.width - 900 * fit) / 2, (canvas.height - 460 * fit) / 2);
  if (!current.three) grid();
  const p = params,
    d = duration(),
    f = Math.min(t / d, 1);
  let info = current.render ? current.render() : "";
  if (current.id === "vetores") {
    const A = [p.x, 0, 0],
      B = [p.x, p.y, 0],
      D = [p.x, p.y, p.z],
      pr = drawSpatialAxes(fittedWorld([[0, 0, 0], A, B, D]), 5),
      q = Math.min(f * 3, 3),
      at = q < 1 ? [p.x * q, 0, 0] : q < 2 ? [p.x, p.y * (q - 1), 0] : [p.x, p.y, p.z * (q - 2)];
    path([[0, 0, 0], A, B, D].map(pr), C.blue, 2, [6, 6]);
    arrow(pr([0, 0, 0]), pr(D), C.mint, "r");
    ball(...pr(at), 8, C.gold);
    label(`r = (${fmt(p.x, 1)}; ${fmt(p.y, 1)}; ${fmt(p.z, 1)}) m`, 35, 430, C.white);
    readings([
      ["Módulo do vetor", Math.hypot(p.x, p.y, p.z), "m"],
      ["Componente vertical", p.y, "m"],
      ["Etapa geométrica", Math.min(3, Math.floor(q) + 1) + "/3", ""],
    ]);
    info =
      q < 1
        ? "Construa a componente x."
        : q < 2
          ? "Acrescente a componente y."
          : "Acrescente z: a seta resultante liga a origem ao ponto final.";
  }
  if (current.id === "movimento") {
    const x = p.v * t + 0.5 * p.a * t * t,
      v = p.v + p.a * t;
    let candidates = [0, p.v * 8 + 0.5 * p.a * 64];
    if (p.a && -p.v / p.a > 0 && -p.v / p.a < 8) candidates.push((-p.v * p.v) / (2 * p.a));
    const lo = Math.min(...candidates) - 5,
      hi = Math.max(...candidates) + 5,
      X = (a) => 65 + ((a - lo) / (hi - lo)) * 770;
    line([45, 220], [850, 220], C.muted, 2);
    for (let s = 0; s <= t; s++) ball(X(p.v * s + 0.5 * p.a * s * s), 220, 3, C.blue);
    block(X(x), 195, 45, 32, C.mint);
    arrow([X(x), 165], [X(x) + v * 3, 165], C.mint, "v");
    label(`x = ${fmt(x)} m`, X(x), 258, C.white, 16, "center");
    label("POSIÇÕES A CADA SEGUNDO", 45, 85, C.muted, 12);
    const vlo = Math.min(0, p.v, p.v + 8 * p.a) - 2,
      vhi = Math.max(0, p.v, p.v + 8 * p.a) + 2,
      V = (a) => 400 - ((a - vlo) / (vhi - vlo)) * 100;
    line([80, V(0)], [820, V(0)], "#567884");
    line([80, 290], [80, 410], "#567884");
    path(
      [
        [80, V(p.v)],
        [80 + 740 * f, V(v)],
      ],
      C.mint,
      3,
    );
    ball(80 + 740 * f, V(v), 5);
    label("v (m/s)", 90, 285);
    label("t (s)", 810, 430);
    label("0", 62, V(0));
    label("8", 820, 430);
    readings([
      ["Posição", x, "m"],
      ["Velocidade", v, "m/s"],
      ["Aceleração", p.a, "m/s²"],
    ]);
    info =
      v < 0
        ? "O corpo se move no sentido negativo do eixo."
        : p.a < 0
          ? "A velocidade diminui; após parar, o corpo pode inverter o sentido."
          : "A inclinação do gráfico v × t representa a aceleração.";
  }
  if (current.id === "projetil") {
    const angle = (p.angle * Math.PI) / 180,
      az = (p.azimuth * Math.PI) / 180,
      vh = p.v * Math.cos(angle),
      vy0 = p.v * Math.sin(angle),
      R = vh * d,
      H = (vy0 * vy0) / (2 * G),
      pos = (s) => [
        vh * s * Math.cos(az),
        Math.max(0, vy0 * s - 0.5 * G * s * s),
        vh * s * Math.sin(az),
      ],
      sample = Array.from({ length: 81 }, (_, i) => project(pos((d * i) / 80), 1, [0, 0])),
      xs = sample.map((v) => v[0]),
      ys = sample.map((v) => v[1]),
      minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minY = Math.min(...ys),
      maxY = Math.max(...ys),
      scale = Math.min(620 / Math.max(maxX - minX, 1), 240 / Math.max(maxY - minY, 1)),
      origin = [450 - ((minX + maxX) * scale) / 2, 240 - ((minY + maxY) * scale) / 2];
    const pr = (v) => project(v, scale, origin);
    axes3(scale, origin, Math.max(1, Math.ceil(R / 4)));
    path(
      Array.from({ length: 81 }, (_, i) => pr(pos((d * i) / 80))),
      "#466570",
      2,
      [5, 6],
    );
    path(
      Array.from({ length: 81 }, (_, i) => pr(pos((t * i) / 80))),
      C.mint,
      3,
    );
    const point = pos(t),
      screen = pr(point),
      tip = pr([
        point[0] + vh * Math.cos(az) * 0.25,
        point[1] + (vy0 - G * t) * 0.25,
        point[2] + vh * Math.sin(az) * 0.25,
      ]);
    line(screen, pr([point[0], 0, point[2]]), "#66848e", 1, [4, 4]);
    ball(...screen, 11);
    arrow(screen, tip, C.gold, "v");
    label(`Alcance total: ${fmt(R)} m`, 35, 430, C.muted);
    readings([
      ["Distância horizontal", vh * t, "m"],
      ["Altura", point[1], "m"],
      ["Velocidade vertical", vy0 - G * t, "m/s"],
    ]);
    info =
      f < 0.48
        ? "Subida: a gravidade reduz a componente vertical da velocidade."
        : f < 0.52
          ? "No topo, vᵧ = 0; a velocidade horizontal continua."
          : f < 1
            ? "Descida: a gravidade aumenta a rapidez vertical para baixo."
            : "Chegada ao nível inicial. Compare o alcance com outro ângulo.";
  }
  if (current.id === "circular") {
    const pr = axes3(35, [450, 230], 6),
      a = (p.v / p.r) * t,
      pt = [p.r * Math.cos(a), 0, p.r * Math.sin(a)],
      vel = [-Math.sin(a) * p.v, 0, Math.cos(a) * p.v],
      acc = [(-Math.cos(a) * p.v * p.v) / p.r, 0, (-Math.sin(a) * p.v * p.v) / p.r];
    path(
      Array.from({ length: 121 }, (_, i) =>
        pr([p.r * Math.cos((TAU * i) / 120), 0, p.r * Math.sin((TAU * i) / 120)]),
      ),
      "#507b87",
      2,
    );
    line(pr([0, 0, 0]), pr(pt), C.muted, 1, [4, 4]);
    arrow(pr(pt), pr(pt.map((x, i) => x + vel[i] * 0.5)), C.mint, "v");
    arrow(pr(pt), pr(pt.map((x, i) => x + acc[i] * 0.15)), C.gold, "a꜀");
    ball(...pr(pt), 10);
    readings([
      ["Rapidez", p.v, "m/s"],
      ["Aceleração centrípeta", (p.v * p.v) / p.r, "m/s²"],
      ["Período", d, "s"],
    ]);
    info = "A velocidade é tangente; a aceleração aponta para o centro em todas as etapas.";
  }
  if (current.id === "forcas") {
    const friction = Math.min(p.f, p.mu * p.m * G),
      a = (p.f - friction) / p.m,
      x = 0.5 * a * t * t,
      bx = 180 + (a ? 440 * f * f : 0),
      by = 230,
      s = 3;
    line([50, 265], [850, 265], C.muted, 2);
    block(bx, by, 68, 68, C.blue);
    arrow([bx + 36, by], [bx + 36 + p.f * s, by], C.mint, "F");
    arrow([bx - 36, by], [bx - 36 - friction * s, by], C.gold, "f");
    arrow([bx, by - 35], [bx, by - 35 - p.m * G * s], C.mint, "N");
    arrow([bx, by + 35], [bx, by + 35 + p.m * G * s], C.gold, "mg");
    label(a ? "DESLIZAMENTO" : "REPOUSO · FORÇAS EQUILIBRADAS", 40, 70, C.white, 13);
    label(`Deslocamento: ${fmt(x)} m (escala automática)`, 40, 425);
    readings([
      ["Força resultante", p.f - friction, "N"],
      ["Aceleração", a, "m/s²"],
      ["Atrito", friction, "N"],
    ]);
    info = a
      ? "A força aplicada supera o atrito: a resultante acelera o bloco."
      : "O atrito estático iguala a força aplicada e impede o início do deslizamento.";
  }
  if (current.id === "energia") {
    const y = Math.max(0, p.h - 0.5 * G * t * t),
      v = G * t,
      U = p.m * G * y,
      K = 0.5 * p.m * v * v,
      E = p.m * G * p.h;
    line([100, 365], [360, 365], C.muted, 2);
    line([230, 70], [230, 365], C.muted, 1, [5, 6]);
    ball(230, 350 - (y / p.h) * 260, 16);
    label(`h = ${fmt(y)} m`, 285, 200, C.white, 17);
    [
      ["U", U, C.mint],
      ["K", K, C.gold],
      ["E", E, C.blue],
    ].forEach(([name, val, color], i) => {
      const x = 490 + i * 110;
      block(x, 225, 55, 250, "#213e49");
      const h = (val / E) * 250;
      ctx.fillStyle = color;
      ctx.fillRect(x - 27.5, 350 - h, 55, h);
      label(name, x, 382, color, 19, "center");
      label(fmt(val, 1) + " J", x, 80, color, 16, "center");
    });
    readings([
      ["Energia potencial", U, "J"],
      ["Energia cinética", K, "J"],
      ["Energia mecânica", E, "J"],
    ]);
    info =
      "A perda de energia potencial é igual ao ganho de energia cinética. A barra E permanece constante.";
  }
  if (current.id === "colisoes") {
    const hit = 1.5,
      u = 3,
      v1 = ((p.m1 - p.e * p.m2) / (p.m1 + p.m2)) * u,
      v2 = (((1 + p.e) * p.m1) / (p.m1 + p.m2)) * u,
      after = t >= hit,
      dt = Math.max(0, t - hit),
      x1 = after ? 0 + v1 * dt : -u * (hit - t),
      x2 = after ? v2 * dt : 0;
    const X = (x) => 410 + x * 26;
    line([40, 280], [860, 280], C.muted, 2);
    block(X(x1) - 24, 252, 48, 48, C.mint);
    block(X(x2) + 24, 252, 48, 48, C.gold);
    label("A", X(x1) - 24, 258, "#17352e", 18, "center");
    label("B", X(x2) + 24, 258, "#40301a", 18, "center");
    arrow([X(x1) - 24, 205], [X(x1) - 24 + (after ? v1 : u) * 20, 205], C.mint);
    arrow([X(x2) + 24, 175], [X(x2) + 24 + (after ? v2 : 0) * 20, 175], C.gold);
    const K = after ? 0.5 * p.m1 * v1 * v1 + 0.5 * p.m2 * v2 * v2 : 0.5 * p.m1 * u * u;
    label(after ? "DEPOIS DA COLISÃO" : "ANTES DA COLISÃO", 40, 75, C.white, 13);
    label("Contato em t = 1,50 s", 40, 425);
    readings([
      ["Momento total", p.m1 * u, "kg·m/s"],
      ["Energia cinética", K, "J"],
      ["Velocidades A / B", fmt(after ? v1 : u, 1) + " / " + fmt(after ? v2 : 0, 1), "m/s"],
    ]);
    info = after
      ? "O momento total se conserva. A energia cinética só se conserva para e = 1."
      : "A se aproxima; B está em repouso. Os corpos não recebem impulso externo horizontal.";
  }
  if (current.id === "rotacao") {
    const I = 0.5 * p.m * p.r * p.r,
      alpha = p.torque / I,
      a = 0.5 * alpha * t * t,
      omega = alpha * t,
      pr = axes3(85, [450, 230], 3);
    const ring = Array.from({ length: 81 }, (_, i) =>
      pr([p.r * Math.cos((TAU * i) / 80), 0, p.r * Math.sin((TAU * i) / 80)]),
    );
    ctx.beginPath();
    ring.forEach((q, i) => (i ? ctx.lineTo(...q) : ctx.moveTo(...q)));
    ctx.closePath();
    ctx.fillStyle = "#27554f";
    ctx.fill();
    path(ring, C.mint, 3);
    for (let i = 0; i < 8; i++)
      line(
        pr([0, 0, 0]),
        pr([p.r * Math.cos(a + (i * TAU) / 8), 0, p.r * Math.sin(a + (i * TAU) / 8)]),
        "#559e8e",
        2,
      );
    arrow(pr([0, -1, 0]), pr([0, 2.1, 0]), C.gold, "eixo");
    ball(...pr([p.r * Math.cos(a), 0, p.r * Math.sin(a)]), 10);
    readings([
      ["Momento de inércia", I, "kg·m²"],
      ["Aceleração angular", alpha, "rad/s²"],
      ["Velocidade angular", omega, "rad/s"],
    ]);
    info =
      "O torque constante produz aceleração angular constante. Os pontos do disco giram juntos.";
  }
  if (current.id === "equilibrio") {
    const l = p.m1 * G,
      r = p.m2 * G * p.d,
      net = l - r;
    line([200, 210], [450 + p.d * 130, 210], C.blue, 8);
    ctx.beginPath();
    ctx.moveTo(450, 218);
    ctx.lineTo(425, 265);
    ctx.lineTo(475, 265);
    ctx.closePath();
    ctx.fillStyle = C.muted;
    ctx.fill();
    line([210, 265], [780, 265], C.muted, 1);
    arrow([320, 210], [320, 210 + p.m1 * 20], C.mint, "m₁g");
    arrow([450 + p.d * 130, 210], [450 + p.d * 130, 210 + p.m2 * 20], C.gold, "m₂g");
    label("1,00 m", 375, 185, C.mint, 17, "center");
    label(fmt(p.d) + " m", 450 + p.d * 65, 185, C.gold, 17, "center");
    label(
      Math.abs(net) < 0.01 ? "TORQUES EM EQUILÍBRIO" : "O SUPORTE COMPENSA O TORQUE RESULTANTE",
      450,
      90,
      C.white,
      15,
      "center",
    );
    const side = Math.floor(t * 1.2) % 2;
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3) ** 2;
    arrow(
      [450, 350],
      [450 + (side ? -1 : 1) * 100, 350],
      side ? C.gold : C.mint,
      side ? "τ direita" : "τ esquerda",
    );
    ctx.globalAlpha = 1;
    readings([
      ["Torque esquerdo", l, "N·m"],
      ["Torque direito", -r, "N·m"],
      ["Soma das cargas", net, "N·m"],
    ]);
    info =
      Math.abs(net) < 0.01
        ? "Os torques opostos se cancelam. A reação vertical do apoio equilibra os pesos."
        : "Sem o torque de reação do suporte, a barra começaria a girar.";
  }
  if (current.id === "elasticidade") {
    const force = (p.f * (1 - Math.cos(TAU * f))) / 2,
      x = force / p.k,
      end = 420 + x * 270;
    line([125, 150], [125, 305], C.muted, 6);
    let pts = [
      [125, 230],
      [150, 230],
    ];
    for (let i = 0; i <= 24; i++)
      pts.push([150 + ((end - 180) * i) / 24, 230 + (i % 2 ? 25 : -25)]);
    pts.push([end, 230]);
    path(pts, C.mint, 3);
    block(end + 25, 230, 50, 65, C.blue);
    arrow([end + 55, 230], [end + 55 + force * 5, 230], C.gold, "F");
    line([420, 290], [end, 290], C.mint, 2);
    label(`x = ${fmt(x)} m`, 450, 345, C.white, 18, "center");
    label("CARREGAMENTO QUASE ESTÁTICO", 40, 75, C.muted, 12);
    readings([
      ["Força externa", force, "N"],
      ["Alongamento", x, "m"],
      ["Energia elástica", 0.5 * p.k * x * x, "J"],
    ]);
    info =
      f < 0.5
        ? "A força aumenta lentamente e a mola se alonga."
        : "A força diminui e a mola retorna ao comprimento natural.";
  }
  $("#time").textContent = "t = " + fmt(t) + " s";
  $("#timeline").value = Math.round(f * 1000);
  const phaseText = `Etapa ${Math.min(20, Math.floor(f * 20 + 1e-8)) + 1} de 21 · ${info}`;
  if (phase.textContent !== phaseText) phase.textContent = phaseText;
  canvas.style.touchAction = current.three && view3d ? "none" : "auto";
  $("#back").disabled = t <= 0;
  $("#next").disabled = t >= d;
}
function frame(now) {
  if (last && playing) {
    const next = t + Math.min((now - last) / 1000, 0.06) * Number($("#speed").value);
    if (next >= duration()) {
      if ($("#loop").checked) {
        t = next % duration();
      } else {
        t = duration();
        playing = false;
        updatePlay();
        draw();
      }
    } else t = next;
  }
  last = now;
  if (playing) draw();
  requestAnimationFrame(frame);
}
const scenePanel = $(".scene-column");
let fallbackFullscreen = false,
  oldOverflow = "";
function syncFullscreen() {
  const active = document.fullscreenElement === scenePanel || fallbackFullscreen;
  zoomControls.hidden = !active;
  $("#fullscreen").textContent = active ? "⛶ Sair da tela cheia" : "⛶ Tela cheia";
  $("#fullscreen").setAttribute("aria-pressed", String(active));
  $("#fullscreen").setAttribute(
    "aria-label",
    active ? "Sair da tela cheia" : "Abrir animação em tela cheia",
  );
  requestAnimationFrame(draw);
}
function closeFallback() {
  fallbackFullscreen = false;
  scenePanel.classList.remove("fullscreen-fallback");
  document.body.style.overflow = oldOverflow;
  syncFullscreen();
  $("#fullscreen").focus();
}
$("#fullscreen").onclick = async () => {
  if (document.fullscreenElement === scenePanel) {
    await document.exitFullscreen();
    return;
  }
  if (fallbackFullscreen) {
    closeFallback();
    return;
  }
  try {
    if (!scenePanel.requestFullscreen) throw new Error("Fallback");
    await scenePanel.requestFullscreen();
  } catch {
    fallbackFullscreen = true;
    oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scenePanel.classList.add("fullscreen-fallback");
  }
  syncFullscreen();
};
document.addEventListener("fullscreenchange", syncFullscreen);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && fallbackFullscreen) closeFallback();
});
if (typeof ResizeObserver !== "undefined")
  new ResizeObserver(() => requestAnimationFrame(draw)).observe($(".canvas-wrap"));
window.addEventListener("resize", draw);
document.addEventListener("visibilitychange", () => (last = 0));
window.addEventListener("hashchange", () => {
  if (
    concepts.some((c) => c.id === location.hash.slice(1)) &&
    location.hash.slice(1) !== current.id
  )
    select(location.hash.slice(1));
});
select(location.hash.slice(1) || "projetil");
requestAnimationFrame(frame);
