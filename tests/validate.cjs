// Run with Node.js. Exercises the same analytical render models used by the site.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const app = read("app.js");
let lastReadings = [];
function finite(...values) {
  for (const value of values.flat(Infinity)) {
    if (typeof value === "number")
      assert.ok(Number.isFinite(value), "Non-finite drawing coordinate");
  }
}
const drawing = Object.fromEntries(
  ["line", "ball", "arrow", "path", "block", "label"].map((name) => [name, finite]),
);
const context = {
  ...drawing,
  katex: require(path.join(root, "vendor/katex/katex.min.js")),
  ctx: new Proxy({}, { get: (target, key) => target[key] ?? finite }),
  readings: (values) => {
    values.forEach((row) => finite(row[1]));
    lastReadings = values;
  },
};
vm.createContext(context);
const setup = app.slice(0, app.indexOf("let current"));
const projection = app.slice(app.indexOf("function project("), app.indexOf("function readings("));
vm.runInContext(
  read("experiments.js") +
    "\n" +
    read("math.js") +
    "\n" +
    setup +
    "\n" +
    projection +
    `
let current, params, t, view3d = true, yaw = -.6, pitch = .48;
function duration() { return current.duration(params); }
this.catalog = concepts;
this.renderMath = mathMarkup;
this.formulaLookup = formulaTeX;
this.run = (id, overrides, fraction, use3d = true) => {
  current = concepts.find(c => c.id === id);
  params = Object.assign(Object.fromEntries(current.controls.map(c => [c.id, c.value])), overrides);
  t = duration() * fraction;
  view3d = use3d;
  return drawExtra();
};
`,
  context,
);
const { catalog } = context;
assert.equal(catalog.length, 30);
assert.equal(new Set(catalog.map((c) => c.id)).size, 30);
for (const family of new Set(catalog.map((c) => c.family))) {
  assert.equal(catalog.filter((c) => c.family === family).length, 3);
}
let formulaCount = 0;
let simulationChecks = 0;
for (const concept of catalog) {
  assert.equal(concept.formulas.length, concept.derivations.length, concept.id);
  concept.formulas.forEach(([title, formula], index) => {
    assert.ok(context.formulaLookup.has(formula), "Missing TeX: " + formula);
    assert.ok(context.renderMath(formula).includes("katex-mathml"), title);
    assert.ok(concept.derivations[index].length >= 2, "Missing derivation: " + title);
    formulaCount++;
  });
  if (!concept.render) continue;
  const cases = [{}, ...concept.controls.flatMap((c) => [{ [c.id]: c.min }, { [c.id]: c.max }])];
  for (const overrides of cases) {
    for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
      for (const use3d of [true, false]) {
        const description = context.run(concept.id, overrides, fraction, use3d);
        assert.ok(description.length > 10, concept.id);
        assert.equal(lastReadings.length, 3, concept.id);
        simulationChecks++;
      }
    }
  }
}
function close(actual, expected) {
  assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} differs from ${expected}`);
}
function values(id, params, time) {
  context.run(id, params, time);
  return lastReadings.map((row) => row[1]);
}
let [xa, xb] = values("movimento--encontro", {}, 1);
close(xa, xb);
close(values("vetores--produto", { angle: 90 }, 1)[0], 0);
close(values("forcas--atwood", { m1: 3, m2: 3 }, 1)[0], 0);
close(values("forcas--rampa", { angle: 10, mu: 0.6 }, 1)[1], 0);
close(values("elasticidade--serie", {}, 1)[1], 0.45);
close(values("elasticidade--paralelo", {}, 1)[1], 0.1);
close(values("energia--dissipacao", {}, 1)[2], 16);
close(values("colisoes--impulso", {}, 1)[0], 12);
const springEnergies = [0, 0.25, 0.5, 0.75, 1].map((t) => values("energia--mola", {}, t)[2]);
springEnergies.forEach((e) => close(e, 2.5));
const angular = [0, 0.25, 0.5, 0.75, 1].map((t) => values("rotacao--momento", {}, t)[2]);
angular.forEach((L) => close(L, 16));
for (const e of [0, 0.5, 1]) {
  close(values("colisoes--centro", { e }, 1)[1], 1.2);
  close(values("colisoes--centro", { e }, 1)[0], 3);
}
const reactions = values("equilibrio--apoios", {}, 1);
close(reactions[1] + reactions[2], 4 * 9.81);
console.log(
  `OK: 30 experiments, ${formulaCount} formula/derivation pairs, ${simulationChecks} numerical rendering checks and physical invariants.`,
);
