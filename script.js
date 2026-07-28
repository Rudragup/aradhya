/* Floating rose petals */
(function initPetals() {
  const canvas = document.getElementById("petals");
  const ctx = canvas.getContext("2d");
  let petals = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createPetal() {
    return {
      x: Math.random() * w,
      y: Math.random() * h - h,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 0.6 + 0.3,
      sway: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.35 + 0.15,
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = "#e8a0b4";
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    petals.forEach((p) => {
      p.y += p.speed;
      p.x += Math.sin(p.y * p.sway) * 0.5;
      p.angle += p.rotSpeed;
      if (p.y > h + 20) {
        Object.assign(p, createPetal(), { y: -20 });
      }
      drawPetal(p);
    });
    requestAnimationFrame(animate);
  }

  resize();
  petals = Array.from({ length: 28 }, createPetal);
  window.addEventListener("resize", resize);
  animate();
})();

/* Scroll reveal */
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
cards.forEach((card) => observer.observe(card));

/* Typewriter letter */
const letter =
  "My Ladoo, you chose me — and I chose you. That choice means everything to Aradhya. " +
  "I failed you when you needed my ears and my heart the most. " +
  "Please give me one more chance to hold your feelings with care, " +
  "to listen without judgment, and to love you the way you deserve. " +
  "I miss you, Ladoo. I am sorry. I am here — whenever you are ready. — Aradhya";

const typeEl = document.getElementById("typewriter");
const letterCard = typeEl.closest(".letter-card");
let charIndex = 0;
let typingStarted = false;

function typeChar() {
  if (charIndex < letter.length) {
    typeEl.textContent += letter[charIndex];
    charIndex++;
    setTimeout(typeChar, 32);
  } else {
    letterCard.classList.add("done");
  }
}

const letterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !typingStarted) {
        typingStarted = true;
        setTimeout(typeChar, 400);
      }
    });
  },
  { threshold: 0.4 }
);
letterObserver.observe(letterCard);

/* Heart button */
const heartBtn = document.getElementById("heartBtn");
const toast = document.getElementById("toast");
const messages = [
  "I love you, Ladoo — more than words can say ♥",
  "You mean the world to me, my Ladoo",
  "Aradhya is waiting — with open arms and an open heart",
  "Every day without talking hurts, Ladoo. Please come back to me.",
  "Your feelings matter. You matter. Always, Ladoo.",
];

let msgIndex = 0;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

function spawnHearts(btn) {
  const container = btn.querySelector(".btn-hearts");
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♥";
    heart.style.left = `${20 + Math.random() * 60}%`;
    heart.style.bottom = "50%";
    heart.style.animationDelay = `${i * 0.08}s`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}

heartBtn.addEventListener("click", () => {
  spawnHearts(heartBtn);
  showToast(messages[msgIndex % messages.length]);
  msgIndex++;
});

/* Gentle entrance for first card */
setTimeout(() => {
  const first = document.querySelector(".apology-card");
  if (first) first.classList.add("visible");
}, 300);
