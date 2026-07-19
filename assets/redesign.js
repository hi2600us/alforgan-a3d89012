// Alforgan homepage — shared interactions (vanilla JS, no build step).
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById("menu-btn");
  var menuPanel = document.getElementById("mobile-menu");
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", function () {
      var willOpen = menuPanel.classList.contains("hidden");
      menuPanel.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
    menuPanel.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menuPanel.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Generic tab groups: any [data-tabgroup] with [data-tab] buttons
     controlling sibling [data-panel] elements ---- */
  document.querySelectorAll("[data-tabgroup]").forEach(function (group) {
    var buttons = group.querySelectorAll("[data-tab]");
    var panelsRoot = document.querySelector(group.getAttribute("data-panels")) || group.parentElement;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-selected", "false"); });
        btn.setAttribute("aria-selected", "true");
        var target = btn.getAttribute("data-tab");
        panelsRoot.querySelectorAll("[data-panel]").forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === target);
        });
      });
    });
  });

  /* ---- Before / After slider(s) ---- */
  document.querySelectorAll("[data-ba-slider]").forEach(function (wrap) {
    var clip = wrap.querySelector(".ba-before-clip");
    var handle = wrap.querySelector(".ba-handle");
    var range = wrap.querySelector(".ba-range");
    if (!clip || !range) return;
    var isRtl = document.documentElement.dir === "rtl";
    function update(pct) {
      pct = Math.max(0, Math.min(100, pct));
      // In RTL, "before" (skeleton) still reveals from the same visual side
      // as the range thumb; clip-path handles the reveal regardless of dir.
      clip.style.clipPath = isRtl
        ? "inset(0 0 0 " + (100 - pct) + "%)"
        : "inset(0 " + (100 - pct) + "% 0 0)";
      if (handle) handle.style[isRtl ? "insetInlineEnd" : "insetInlineStart"] = pct + "%";
    }
    range.addEventListener("input", function () { update(Number(range.value)); });
    update(Number(range.value || 50));
  });

  /* ---- Copy IBAN ---- */
  document.querySelectorAll("[data-copy-iban]").forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener("click", function () {
      var iban = btn.getAttribute("data-copy-iban");
      navigator.clipboard.writeText(iban).then(function () {
        btn.textContent = btn.getAttribute("data-copied-label") || "\u2713";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 2000);
      });
    });
  });

  /* ---- Disabled payment methods: explain why, don't pretend to work ---- */
  document.querySelectorAll("[data-pay-disabled]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var msg = btn.getAttribute("data-pay-disabled");
      var note = btn.closest(".donate-panel").querySelector("[data-pay-note]");
      if (note) {
        note.textContent = msg;
        note.style.display = "block";
      }
    });
  });
})();
