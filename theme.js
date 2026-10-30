"use strict";
(() => {
  const system = matchMedia("(prefers-color-scheme: dark)");
  let preference = null;
  try {
    preference = localStorage.getItem("mecanica-theme");
  } catch {}
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    const b = document.getElementById("theme-toggle");
    if (b) {
      b.setAttribute("aria-pressed", String(theme === "dark"));
      b.textContent = theme === "dark" ? "☀ Modo claro" : "◐ Modo escuro";
      b.setAttribute("aria-label", theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
    }
  }
  apply(
    preference === "dark" || preference === "light"
      ? preference
      : system.matches
        ? "dark"
        : "light",
  );
  document.addEventListener("DOMContentLoaded", () => {
    apply(document.documentElement.dataset.theme);
    document.getElementById("theme-toggle").addEventListener("click", () => {
      preference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      apply(preference);
      try {
        localStorage.setItem("mecanica-theme", preference);
      } catch {}
    });
  });
  system.addEventListener("change", (e) => {
    if (!preference) apply(e.matches ? "dark" : "light");
  });
})();
