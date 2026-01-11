// Controles para a página de sonhos

// Overlays dos contos
const storyOverlay1 = document.getElementById("storyOverlay1");
const storyOverlay2 = document.getElementById("storyOverlay2");
const closeBtn1 = document.getElementById("closeBtn1");
const closeBtn2 = document.getElementById("closeBtn2");

// Botões dos cards
const dreamReadBtns = document.querySelectorAll('.dream-read-btn');
const dreamCard1 = document.getElementById('dreamCard1');
const dreamCard2 = document.getElementById('dreamCard2');

// Botão voltar
const backToMainBtn = document.getElementById('backToMainBtn');

// 🎵 Áudio (se houver na página de sonhos)
const audio = document.getElementById('bgMusic');
let audioStarted = false;

// Função para iniciar áudio
function startAudioOnce() {
  if (!audio || audioStarted) return;
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

// 📖 Abrir contos a partir dos cards
dreamReadBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const dreamNumber = btn.getAttribute('data-dream');
    
    if (dreamNumber === '1' && storyOverlay1) {
      storyOverlay1.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else if (dreamNumber === '2' && storyOverlay2) {
      storyOverlay2.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    startAudioOnce();
  });
});

// 🃏 Abrir contos ao clicar em todo o card
if (dreamCard1) {
  dreamCard1.addEventListener('click', (e) => {
    if (!e.target.closest('.dream-read-btn') && storyOverlay1) {
      storyOverlay1.classList.add('active');
      document.body.style.overflow = 'hidden';
      startAudioOnce();
    }
  });
}

if (dreamCard2) {
  dreamCard2.addEventListener('click', (e) => {
    if (!e.target.closest('.dream-read-btn') && storyOverlay2) {
      storyOverlay2.classList.add('active');
      document.body.style.overflow = 'hidden';
      startAudioOnce();
    }
  });
}

// ❌ Fechar overlays
if (closeBtn1) {
  closeBtn1.addEventListener('click', () => {
    storyOverlay1.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (closeBtn2) {
  closeBtn2.addEventListener('click', () => {
    storyOverlay2.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

// Fechar ao clicar fora do modal
[storyOverlay1, storyOverlay2].forEach(overlay => {
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (storyOverlay1 && storyOverlay1.classList.contains('active')) {
      storyOverlay1.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    if (storyOverlay2 && storyOverlay2.classList.contains('active')) {
      storyOverlay2.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});

// 🔙 Voltar para página principal
if (backToMainBtn) {
  backToMainBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// 🎵 Iniciar áudio na primeira interação
document.addEventListener('touchstart', startAudioOnce, { once: true });
document.addEventListener('click', startAudioOnce, { once: true });

// ✨ Efeitos de hover nos cards
const dreamCards = document.querySelectorAll('.dream-card');
dreamCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.webkitTransform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.webkitTransform = 'translateY(0)';
  });
});

// 📱 Detectar Safari
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Aplicar correções específicas para Safari
if (isSafari()) {
  document.body.classList.add('safari-browser');
  
  // Corrigir problemas de backdrop-filter no Safari
  const modals = document.querySelectorAll('.story-modal');
  modals.forEach(modal => {
    modal.style.backdropFilter = 'none';
    modal.style.webkitBackdropFilter = 'blur(5px)';
  });
}