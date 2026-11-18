const letterModal = document.getElementById('letterModal');
const heartsLayer = document.getElementById('heartsLayer');
const soundToggle = document.getElementById('soundToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const volumeSlider = document.getElementById('volumeSlider');
backgroundMusic.volume = Number(volumeSlider.value) / 100;

function openLetter() {
  letterModal.classList.add('open');
  letterModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  document.getElementById('closeLetter').focus();
  burstHearts(18);
}

function closeLetter() {
  letterModal.classList.remove('open');
  letterModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  document.getElementById('openLetter').focus();
}

function burstHearts(count = 10) {
  const symbols = ['♥', '♡', '✦'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    heart.style.animationDelay = `${Math.random() * 0.7}s`;
    heartsLayer.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}

document.getElementById('openLetter').addEventListener('click', openLetter);
document.getElementById('closeLetter').addEventListener('click', closeLetter);
letterModal.querySelector('[data-close]').addEventListener('click', closeLetter);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && letterModal.classList.contains('open')) closeLetter();
});

soundToggle.addEventListener('click', async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      soundToggle.classList.add('playing');
      soundToggle.setAttribute('aria-label', 'Pausar Coming Up Roses');
      document.getElementById('soundIcon').textContent = '❚❚';
      document.getElementById('soundLabel').textContent = 'Pausar';
    } catch (error) {
      document.getElementById('soundLabel').textContent = 'Intenta otra vez';
    }
  } else {
    backgroundMusic.pause();
    soundToggle.classList.remove('playing');
    soundToggle.setAttribute('aria-label', 'Reproducir Coming Up Roses');
    document.getElementById('soundIcon').textContent = '▶';
    document.getElementById('soundLabel').textContent = 'Reproducir';
  }
});

function setVolume(value) {
  const nextVolume = Math.max(0, Math.min(100, value));
  volumeSlider.value = nextVolume;
  backgroundMusic.volume = nextVolume / 100;
}

volumeSlider.addEventListener('input', () => setVolume(Number(volumeSlider.value)));
document.getElementById('volumeDown').addEventListener('click', () => setVolume(Number(volumeSlider.value) - 10));
document.getElementById('volumeUp').addEventListener('click', () => setVolume(Number(volumeSlider.value) + 10));

// Hearts appear softly as the visitor scrolls into the page.
let heartCooldown = false;
window.addEventListener('scroll', () => {
  if (heartCooldown || window.scrollY < 120) return;
  heartCooldown = true;
  if (Math.random() > 0.68) burstHearts(2);
  setTimeout(() => { heartCooldown = false; }, 1500);
}, { passive: true });
