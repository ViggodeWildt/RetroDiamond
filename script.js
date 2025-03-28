const canvas = document.getElementById("countdownCanvas");
const ctx = canvas.getContext("2d");
const targetDate = new Date("2025-08-01T23:59:59").getTime();

function drawCircle(percentage, color, radius, lineWidth) {
    ctx.beginPath();
    ctx.arc(100, 100, radius, -0.5 * Math.PI, (percentage * 2 * Math.PI) - 0.5 * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        document.getElementById("countdown-text").innerHTML = "Tijd is verstreken!";
        clearInterval(interval);
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("countdown-text").innerHTML = `${days}d ${hours}u ${minutes}m ${seconds}s`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle(1, "#333", 80, 10); // Achtergrondcirkel
    drawCircle(seconds / 60, "#ff3e3e", 80, 10); // Voortgangscirkel

    drawCircle(1, "#333", 60, 10);
    drawCircle(minutes / 60, "#ff9f1a", 60, 10);

    drawCircle(1, "#333", 40, 10);
    drawCircle(hours / 24, "#1aff91", 40, 10);
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);

// knop word een andere kleur

window.addEventListener("scroll", function() {
    let button = document.getElementById("submit");
    let scrollPosition = document.documentElement.scrollTop || window.scrollY;
    
    if (scrollPosition > 1000) { // Check of je wél kunt scrollen
        button.style.backgroundColor = "blue";
        button.style.color = "white";
        button.style.textShadow = "2px 2px 4px #000";
    } else {
        button.style.backgroundColor = "#1aff91";
        button.style.color = "black";
        button.style.textShadow = "none";
    }
});
