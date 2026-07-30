// Alforgan homepage — shared interactions + GA4 event tracking.
// Vanilla JS, no build step.
(function () {
  "use strict";

  /* ==================================================================
     GA4 tracking helper
     Online donations are not live yet (pending the fundraising permit),
     so there is no "purchase" to record. These events are the honest
     proxies for donor and student intent, and are what Google Ads
     imports as conversions for the Ad Grants account.
     Analytics must never break the page, hence the guard + try/catch.
     ================================================================== */
  function track(name, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, params || {});
      }
    } catch (e) {
      /* no-op: never let analytics interfere with the site */
    }
  }

  function pageLang() {
    return document.documentElement.lang || "unknown";
  }

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

  /* ---- Before / After slider(s) ----
     Retained for any page still using the wipe slider; harmless when absent. */
  document.querySelectorAll("[data-ba-slider]").forEach(function (wrap) {
    var clip = wrap.querySelector(".ba-before-clip");
    var handle = wrap.querySelector(".ba-handle");
    var range = wrap.querySelector(".ba-range");
    if (!clip || !range) return;
    var isRtl = document.documentElement.dir === "rtl";
    function update(pct) {
      pct = Math.max(0, Math.min(100, pct));
      clip.style.clipPath = isRtl
        ? "inset(0 0 0 " + (100 - pct) + "%)"
        : "inset(0 " + (100 - pct) + "% 0 0)";
      if (handle) handle.style[isRtl ? "insetInlineEnd" : "insetInlineStart"] = pct + "%";
    }
    range.addEventListener("input", function () { update(Number(range.value)); });
    update(Number(range.value || 50));
  });

  /* ---- Copy IBAN  →  strongest donation-intent signal on the site ---- */
  document.querySelectorAll("[data-copy-iban]").forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener("click", function () {
      var iban = btn.getAttribute("data-copy-iban");
      navigator.clipboard.writeText(iban).then(function () {
        btn.textContent = btn.getAttribute("data-copied-label") || "\u2713";
        btn.classList.add("copied");
        // fire only on a genuine successful copy, not on the click attempt
        track("copy_iban", { method: "bank_transfer", language: pageLang() });
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
      var panel = btn.closest(".donate-panel");
      var note = panel ? panel.querySelector("[data-pay-note]") : null;
      if (note) {
        note.textContent = msg;
        note.style.display = "block";
      }
      // Not a conversion. Tracked only so we can see demand for online
      // payment while the permit is pending.
      track("online_payment_unavailable", {
        requested_method: (btn.textContent || "").trim(),
        language: pageLang()
      });
    });
  });

  /* ---- Contacting the trustee  →  direct donor/enquiry intent ---- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[href^='mailto:'], a[href^='tel:']");
    if (!link) return;
    var href = link.getAttribute("href") || "";
    track("contact_trustee", {
      contact_method: href.indexOf("tel:") === 0 ? "phone" : "email",
      language: pageLang()
    });
  });

  /* ---- Programme interest  →  secondary engagement signals ---- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[href^='/halaqat-interest/'], a[href^='/recite/']");
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (href.indexOf("/halaqat-interest/") === 0) {
      track("open_halaqat_form", { language: pageLang() });
    } else {
      track("open_recite_tool", { language: pageLang() });
    }
  });
})();
