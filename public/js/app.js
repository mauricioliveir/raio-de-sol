const quotes = [
  "Ela não entra… <strong>ela acontece</strong>.",
  "Os olhos, duas <strong>pérolas azuis</strong>, guardam mistérios calmos.",
  "Virginiana, intensa, precisa. <strong>Elegância que não se ensina.</strong>",
  "Sua presença não pede atenção. <strong>chega e domina.</strong>",
  "Com uma cintura que a memória nunca esquece.",
  "E quando o sinto seu cheiro… <strong>é porque jamais esqueci</strong>."
];

const track = document.getElementById("track");
const quoteEl = document.getElementById("quote");
const dotsEl = document.getElementById("dots");
const audio = document.getElementById("bgMusic");

// Elementos da página principal
const dreamsBtn = document.getElementById("dreamsBtn");

// Overlays dos contos (na página principal)
const storyOverlay1 = document.getElementById("storyOverlay1");
const storyOverlay2 = document.getElementById("storyOverlay2");
const closeBtn1 = document.getElementById("closeBtn1");
const closeBtn2 = document.getElementById("closeBtn2");

let index = 0;
let startX = 0;
let audioStarted = false;

// 🔄 Atualiza carrossel
function update() {
  track.style.transform = `translateX(-${index * 100}%)`;
  quoteEl.innerHTML = quotes[index];
  renderDots();
}

// ⚪ Dots
function renderDots() {
  dotsEl.innerHTML = "";
  quotes.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === index) dot.classList.add("active");
    dotsEl.appendChild(dot);
  });
}

// 👉 Swipe
track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (diff > 50 && index < quotes.length - 1) index++;
  if (diff < -50 && index > 0) index--;
  update();
  startAudioOnce();
});

// 🎵 Som inicia na PRIMEIRA interação
function startAudioOnce() {
  if (audioStarted) return;
  audioStarted = true;

  audio.volume = 0;
  audio.play().then(() => {
    let v = 0;
    const fade = setInterval(() => {
      if (v < 0.15) {
        v += 0.01;
        audio.volume = v;
      } else {
        clearInterval(fade);
      }
    }, 200);
  }).catch(() => {});
}

// ❌ Fechar overlays
if (closeBtn1) {
  closeBtn1.addEventListener("click", () => {
    storyOverlay1.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

if (closeBtn2) {
  closeBtn2.addEventListener("click", () => {
    storyOverlay2.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// 🚀 Navegação para página de Sonhos
if (dreamsBtn) {
  dreamsBtn.addEventListener("click", () => {
    window.location.href = "sonhos.html";
  });
}

// Fechar overlays ao clicar fora
if (storyOverlay1) {
  storyOverlay1.addEventListener("click", (e) => {
    if (e.target === storyOverlay1) {
      storyOverlay1.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

if (storyOverlay2) {
  storyOverlay2.addEventListener("click", (e) => {
    if (e.target === storyOverlay2) {
      storyOverlay2.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Fechar overlays com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (storyOverlay1 && storyOverlay1.classList.contains("active")) {
      storyOverlay1.classList.remove("active");
      document.body.style.overflow = "auto";
    }
    if (storyOverlay2 && storyOverlay2.classList.contains("active")) {
      storyOverlay2.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }
});

// Fallback para qualquer toque (iniciar música)
document.addEventListener("touchstart", startAudioOnce, { once: true });
document.addEventListener("click", startAudioOnce, { once: true });

// 🔄 Auto slide
setInterval(() => {
  index = (index + 1) % quotes.length;
  update();
}, 6500);

// Inicializar
update();