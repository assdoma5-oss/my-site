/* 🎧 الموسيقى */
const music = document.getElementById("music");

document.addEventListener("click", () => {
    music.play().catch(()=>{});
}, { once: true });

function toggleMusic(){
    music.paused ? music.play() : music.pause();
}

/* ❤️ القلوب */
function heart(){
    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (10 + Math.random() * 10) + "px";
    h.style.animationDuration = (3 + Math.random() * 3) + "s";

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 7000);
}
setInterval(heart, 500);

/* 💬 الكتابة */
const msg = document.getElementById("msg");

const text = `كل سنة وانتي طيبة يا أجمل حاجة في حياتي ❤️
يا نور عيني وضحكتي اللي بتيجي من غير سبب أول ما بفتكرك.

بجد أنا بحبك حب كبير أوي، حب مخليني شايفك أحلى اختيار أخدته في حياتي كلها… وممتن لوجودك معايا بكل تفصيلة فيكي.
انتي مش بس حبيبتي، انتي راحتي، وأماني، وكل حاجة حلوة في دنيتي.

يمكن نعرف بعض من فترة مش طويلة، بس انتي دخلتي حياتي وغيّرتي كل حاجة… خدتي قلبي وعقلي من غير ما أحس، وخليتي أيامي كلها ورد في ورد.
أنا مبسوط بيكي بشكل مش طبيعي، ومبسوط إن ربنا كتبلي إنك تكوني في حياتي.

وأتمنى من كل قلبي إن السنة الجاية تبقي خطيبتي، واللي بعدها تبقي معايا في بيتي، قريبة مني وعلى طول في حضني 🤍
أنا عايزك معايا دايمًا… عايز نكمل سوا، ونكبر سوا، ونفضل سند لبعض مهما حصل.

بحبك أكتر مما الكلام يقدر يوصف… وربنا ما يحرمنيش منك أبدًا يا أجمل وأغلى حاجة في حياتي 🌸`;

let i = 0;

function typeWriter() {
    if (!msg || i >= text.length) return;

    const char = text[i];

    msg.innerHTML += (char === "\n") ? "<br>" :
                     (char === " ") ? " " :
                     <span>${char}</span>;

    i++;
    setTimeout(typeWriter, 40);
}

/* 📸 الصور */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.animationPlayState = "running";
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".card").forEach(c => observer.observe(c));

/* 🖼 اللوجو */
const logoCanvas = document.getElementById("logo");
const logoCtx = logoCanvas.getContext("2d");
const img = document.getElementById("img");

const logoSize = 50;

function startLogo() {

    logoCanvas.width = logoSize;
    logoCanvas.height = logoSize;

    function move() {
        const maxX = window.innerWidth - logoSize;
        const maxY = window.innerHeight - logoSize;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        logoCanvas.style.left = x + "px";
        logoCanvas.style.top = y + "px";

        logoCtx.clearRect(0, 0, logoSize, logoSize);
        logoCtx.drawImage(img, 0, 0, logoSize, logoSize);

        let imageData = logoCtx.getImageData(0, 0, logoSize, logoSize);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i] < 40 && data[i+1] < 40 && data[i+2] < 40) {
                data[i+3] = 0;
            }
        }

        logoCtx.putImageData(imageData, 0, 0);

        logoCanvas.style.opacity = "1";

        setTimeout(() => {
            logoCanvas.style.opacity = "0";
        }, 500);
    }

    setInterval(move, 1000);
}

/* 🫧 الفقاعات */
const bubblesCanvas = document.getElementById("bubbles");
const bubblesCtx = bubblesCanvas.getContext("2d");

let bubbles = [];

function resizeBubblesCanvas() {
    bubblesCanvas.width = window.innerWidth;
    bubblesCanvas.height = window.innerHeight;
}
resizeBubblesCanvas();

function createBubbles(count = 40) {
    for (let i = 0; i < count; i++) {
        bubbles.push({
            x: Math.random() > 0.5 ? 0 : bubblesCanvas.width,
            y: Math.random() * bubblesCanvas.height,
            size: Math.random() * 15 + 8,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: Math.random() * -2 - 0.5,
            alpha: 1
        });
    }
}

function drawBubbles() {
    bubblesCtx.clearRect(0, 0, bubblesCanvas.width, bubblesCanvas.height);

    for (let i = bubbles.length - 1; i >= 0; i--) {
        let b = bubbles[i];
        b.x += b.speedX;
        b.y += b.speedY;
        b.alpha -= 0.008;

        let gradient = bubblesCtx.createRadialGradient(
            b.x, b.y, 0,
            b.x, b.y, b.size
        );

        gradient.addColorStop(0, rgba(255,105,180,${b.alpha}));
        gradient.addColorStop(1, rgba(255,105,180,0));

        bubblesCtx.beginPath();
        bubblesCtx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        bubblesCtx.fillStyle = gradient;
        bubblesCtx.fill();

        if (b.alpha <= 0) {
            bubbles.splice(i, 1);
        }
    }

    if (bubbles.length < 20) {
        createBubbles(10);
    }

    requestAnimationFrame(drawBubbles);
}

/* 🚀 تشغيل كل حاجة */
window.addEventListener("load", () => {
    setTimeout(typeWriter, 500);

    if (img.complete && img.naturalWidth > 0) {
        startLogo();
    } else {
        img.onload = startLogo;
    }

    createBubbles();
    drawBubbles();
});

window.addEventListener("resize", resizeBubblesCanvas);
