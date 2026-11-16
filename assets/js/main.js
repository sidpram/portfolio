/* ==========================================================================
   Siddharth Pramanik — portfolio interactions
   ========================================================================== */
(function () {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Footer year & IST clock ---------- */
  const yearEl = doc.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const timeEl = doc.getElementById("localTime");
  if (timeEl) {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata"
    });
    const updateClock = () => {
      try {
        timeEl.textContent = formatter.format(new Date());
      } catch (err) {
        timeEl.textContent = "—:—";
      }
    };
    updateClock();
    window.setInterval(updateClock, 30000);
  }

  /* ---------- Sticky nav & scroll progress ---------- */
  const nav = doc.getElementById("nav");
  const scrollBar = doc.getElementById("scrollBar");
  let scrollQueued = false;

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("nav--scrolled", y > 24);

    if (scrollBar) {
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      scrollBar.style.transform = "scaleX(" + progress.toFixed(4) + ")";
    }
    scrollQueued = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!scrollQueued) {
        scrollQueued = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle = doc.getElementById("navToggle");
  const navLinks = doc.getElementById("navLinks");

  function setMenu(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("nav--open", open);
    doc.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("nav--open"));
    });

    navLinks.addEventListener("click", function (event) {
      const link = event.target.closest("a");
      if (!link) return;

      const isOpen = nav.classList.contains("nav--open");
      if (!isOpen) return;

      const hash = link.getAttribute("href");
      setMenu(false);

      if (hash && hash.charAt(0) === "#" && hash.length > 1) {
        const target = doc.querySelector(hash);
        if (target) {
          event.preventDefault();
          window.requestAnimationFrame(function () {
            target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
          });
        }
      }
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("nav--open")) {
        setMenu(false);
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && nav.classList.contains("nav--open")) {
        setMenu(false);
      }
    });
  }

  /* ---------- Scroll spy ---------- */
  const spyLinks = Array.prototype.slice.call(
    doc.querySelectorAll('#navLinks a[href^="#"]')
  );
  const sectionIds = ["home", "about", "skills", "work", "services", "experience", "contact"];

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;

          spyLinks.forEach(function (link) {
            const active = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", active);
            if (active) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-43% 0px -52% 0px", threshold: 0 }
    );

    sectionIds.forEach(function (id) {
      const section = doc.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = doc.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.getAttribute("data-delay") || 0);
          window.setTimeout(function () {
            entry.target.classList.add("is-visible");
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Animated counters ---------- */
  const numberFormat = new Intl.NumberFormat("en-IN");

  function runCounter(el) {
    const target = Number(el.getAttribute("data-count") || 0);

    if (reduceMotion) {
      el.textContent = numberFormat.format(target);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = numberFormat.format(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  const counters = doc.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Cursor glow ---------- */
  const glow = doc.getElementById("cursorGlow");

  if (glow && finePointer && !reduceMotion) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animating = false;

    function glowFrame() {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      glow.style.transform =
        "translate(" + currentX + "px, " + currentY + "px) translate(-50%, -50%)";

      if (Math.abs(targetX - currentX) > 0.4 || Math.abs(targetY - currentY) > 0.4) {
        window.requestAnimationFrame(glowFrame);
      } else {
        animating = false;
      }
    }

    window.addEventListener(
      "pointermove",
      function (event) {
        targetX = event.clientX;
        targetY = event.clientY;
        doc.body.classList.add("has-cursor");
        if (!animating) {
          animating = true;
          window.requestAnimationFrame(glowFrame);
        }
      },
      { passive: true }
    );

    doc.addEventListener("pointerleave", function () {
      doc.body.classList.remove("has-cursor");
    });
  }

  /* ---------- Subtle card tilt ---------- */
  if (finePointer && !reduceMotion) {
    doc.querySelectorAll(".tilt").forEach(function (card) {
      let bounds = null;

      card.addEventListener("pointerenter", function () {
        bounds = card.getBoundingClientRect();
      });

      card.addEventListener("pointermove", function (event) {
        if (!bounds) bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--ry", (x * 5).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg");
      });

      card.addEventListener("pointerleave", function () {
        bounds = null;
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
      });
    });
  }

  /* ---------- Copy email ---------- */
  const copyBtn = doc.getElementById("copyEmail");

  function fallbackCopy(text) {
    const textarea = doc.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
    doc.body.appendChild(textarea);
    textarea.select();
    const ok = doc.execCommand("copy");
    doc.body.removeChild(textarea);
    if (!ok) throw new Error("Copy command failed");
  }

  if (copyBtn) {
    const email = copyBtn.getAttribute("data-email") || "";
    const label = copyBtn.querySelector(".copy-btn__label");
    let resetTimer = null;

    copyBtn.addEventListener("click", function () {
      const done = function () {
        copyBtn.classList.add("is-copied");
        if (label) label.textContent = "Copied!";
        if (resetTimer) window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(function () {
          copyBtn.classList.remove("is-copied");
          if (label) label.textContent = "Copy email";
        }, 2400);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done).catch(function () {
          try {
            fallbackCopy(email);
            done();
          } catch (err) {
            if (label) label.textContent = "Ctrl+C to copy";
          }
        });
      } else {
        try {
          fallbackCopy(email);
          done();
        } catch (err) {
          if (label) label.textContent = "Ctrl+C to copy";
        }
      }
    });
  }

  /* ---------- Keyboard: close menu on escape fallback ---------- */
  doc.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      doc.body.classList.remove("nav-open");
    }
  });
})();
