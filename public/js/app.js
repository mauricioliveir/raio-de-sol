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

// Fallback para qualquer toque
document.addEventListener("touchstart", startAudioOnce, { once: true });
document.addEventListener("click", startAudioOnce, { once: true });

// 🔄 Auto slide
setInterval(() => {
  index = (index + 1) % quotes.length;
  update();
}, 6500);

update();
