/* ===== Nav: scroll state + mobile toggle ===== */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 40);
}, { passive: true });

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.textContent = open ? "Close" : "Menu";
});
navLinks?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.textContent = "Menu";
  })
);

/* ===== Scroll reveal (staggered) ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = Math.min(i * 60, 240) + "ms";
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ===== Hero line reveal on load ===== */
addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".hero-title .line-in");
  lines.forEach((l, i) => {
    l.style.transitionDelay = 120 + i * 120 + "ms";
    requestAnimationFrame(() => requestAnimationFrame(() => l.classList.add("in")));
  });
});

/* ===== Scroll progress + parallax (rAF-throttled) ===== */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const progress = document.getElementById("scrollProgress");
const parallaxEls = [...document.querySelectorAll("[data-parallax]")].map((el) => ({
  el, speed: parseFloat(el.dataset.parallax),
}));
let ticking = false;

function onScroll() {
  const scrolled = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + "%";

  if (!reduce) {
    const mid = scrolled + innerHeight / 2;
    for (const p of parallaxEls) {
      const r = p.el.getBoundingClientRect();
      const center = r.top + scrolled + r.height / 2;
      const offset = (mid - center) * p.speed;
      p.el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
  }
  ticking = false;
}
addEventListener("scroll", () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
addEventListener("resize", onScroll, { passive: true });
onScroll();

/* ===== Magnetic links ===== */
if (!reduce && matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 0.35;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* ===== Smooth eased anchor scroll ===== */
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function smoothScrollTo(targetY, duration = 850) {
  const startY = scrollY;
  const dist = targetY - startY;
  let start;
  function step(ts) {
    if (start === undefined) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    scrollTo(0, startY + dist * easeInOutCubic(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id === "#" || id === "#top") { e.preventDefault(); reduce ? scrollTo(0, 0) : smoothScrollTo(0); return; }
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + scrollY - 64;
    reduce ? scrollTo(0, y) : smoothScrollTo(y);
  });
});

/* ===== Footer year ===== */
document.getElementById("year").textContent = new Date().getFullYear();
