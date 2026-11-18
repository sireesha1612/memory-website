
const SECRET_CODE = "2611";

// YOUR PHOTOS
const photos = [
    "images/anu.jpeg",
    "images/photo 3.jpeg",
    "images/photo 13.jpeg",
    "images/photo 1.jpeg",
    "images/photo 5.jpeg",
    "images/photo10.jpeg",
    "images/photo 6.jpeg",
    "images/photo4.jpeg",
    "images/photo 11.jpeg",
    "images/photo19.jpeg",
    "images/photo2.jpeg"
];

let currentPhoto = 0;
let slideshowTimer = null;
let candlesBlown = false;


// SCREEN CHANGER
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
    window.scrollTo(0, 0);
}


// UNLOCK SURPRISE
function unlockSurprise() {
    const enteredCode = document.getElementById("passcode").value.trim();
    const error = document.getElementById("errorMessage");

    if (enteredCode === SECRET_CODE) {
        error.textContent = "Yayyy! Your surprise is ready! ♡";

        createConfetti();

        setTimeout(() => {
            showScreen("cakeScreen");
        }, 1000);

    } else {
        error.textContent = "Oops! Try the secret passcode again ♡";
    }
}


// PRESS ENTER TO UNLOCK
document.addEventListener("DOMContentLoaded", function() {
    const passcode = document.getElementById("passcode");

    if (passcode) {
        passcode.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                unlockSurprise();
            }
        });
    }

    // GENERATE QR CODE
    const qrElement = document.getElementById("qrcode");

    if (qrElement && typeof QRCode !== "undefined") {
        new QRCode(qrElement, {
            text: "https://sireesha1612.github.io/memory-website/",
            width: 200,
            height: 200,
            colorDark: "#806a83",
            colorLight: "#fffafa",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
});


// BLOW CANDLES
function blowCandles() {
    const button = document.getElementById("blowButton");
    const flames = document.querySelectorAll(".flame");

    if (!candlesBlown) {
        flames.forEach(flame => flame.classList.add("out"));

        button.textContent = "Continue to your letter ♡";
        candlesBlown = true;

        createConfetti();
    } else {
        showScreen("letterScreen");
    }
}


// CONFETTI
function createConfetti() {
    const symbols = ["🎀", "🎈", "🐼", "🌟", "🧸"];

    for (let i = 0; i < 35; i++) {
        const piece = document.createElement("span");

        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-20px";
        piece.style.fontSize = (15 + Math.random() * 20) + "px";
        piece.style.zIndex = "1000";
        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const duration = 2500 + Math.random() * 2000;

        piece.animate([
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: "translateY(110vh) rotate(500deg)", opacity: 0 }
        ], {
            duration: duration,
            easing: "ease-in"
        });

        setTimeout(() => piece.remove(), duration);
    }
}


// START MEMORIES
function startMemories() {
    currentPhoto = 0;
    displayPhoto();
    showScreen("memoryScreen");
}


// DISPLAY PHOTO
function displayPhoto() {
    const image = document.getElementById("memoryImage");
    const counter = document.getElementById("photoCounter");

    image.onerror = function() {
        counter.textContent = "Photo not found! Check filename ♡";
    };

    image.src = photos[currentPhoto];

    counter.textContent = `Memory ${currentPhoto + 1} of ${photos.length} ♡`;
}


// NEXT PHOTO
function nextPhoto() {
    currentPhoto = (currentPhoto + 1) % photos.length;
    displayPhoto();
}


// PREVIOUS PHOTO
function previousPhoto() {
    currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
    displayPhoto();
}


// SLIDESHOW
function toggleSlideshow() {
    const button = document.getElementById("pauseButton");

    if (slideshowTimer) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
        button.textContent = "Play";
    } else {
        slideshowTimer = setInterval(nextPhoto, 3000);
        button.textContent = "Pause";
    }
}


// FINAL SURPRISE
function finishSurprise() {
    if (slideshowTimer) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
    }

    showScreen("finalScreen");
    createConfetti();
}
