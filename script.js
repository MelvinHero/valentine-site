// Таймер
const startDate = new Date("2024-07-05");
const timerEl = document.getElementById("timer");

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    timerEl.innerHTML = "Біз  " + days + " күн біргеміз ❤️";
}

updateTimer();
setInterval(updateTimer, 1000);

// Слайдер
let slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}, 3000);

// Кнопка "Нет"
const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

function moveButton() {
    const parent = document.querySelector(".buttons");
    const x = Math.random() * (parent.clientWidth - noBtn.offsetWidth);
    const y = Math.random() * 40;

    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

// Кнопка "Да"
const yesBtn = document.getElementById("yesBtn");
yesBtn.addEventListener("click", accept);

function accept() {
    document.getElementById("main").style.display = "none";
    const overlay = document.getElementById("overlay");
    overlay.style.opacity = 0.9;

    setTimeout(startFireworks, 1500);
}

// Фейерверк
function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function explode(x, y) {
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 8,
                dy: (Math.random() - 0.5) * 8,
                life: 100
            });
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.fillStyle = "pink";
            ctx.fillRect(p.x, p.y, 3, 3);
            p.x += p.dx;
            p.y += p.dy;
            p.life--;
        });

        particles = particles.filter(p => p.life > 0);
        requestAnimationFrame(animate);
    }

    explode(canvas.width / 2, canvas.height / 2);
    animate();

    const text = document.createElement("div");
    text.className = "finalText";
    text.innerHTML = "Мен сені шексіз жақсы көремін, Жаркынай ❤️";
    document.body.appendChild(text);

    setTimeout(() => text.style.opacity = 1, 500);
}
