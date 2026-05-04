const btn = document.getElementById("loginBtn");
const input = document.getElementById("password");
const error = document.getElementById("error");

// ===== LOGIN =====
btn.addEventListener("click", () => {
    const password = input.value;

    // الباسورد الجديد
    if (password === "بحبك") {
        window.location.href = "hearts.html";
    } else {
        error.innerText = "❌ Wrong password";
    }
});

// ===== HEARTS ANIMATION =====
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = (10 + Math.random() * 25) + "px";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 200);

