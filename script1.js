/* ==========================================
   PRELOADER
========================================== */

const preloader = document.getElementById("preloader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderNumber = document.getElementById("loaderNumber");
const loadingText = document.getElementById("loadingText");

const loadingMessages = [
    "Preparing something special...",
    "Loading memories...",
    "Loading knowledge...",
    "Loading inspiration...",
    "Almost ready..."
];

let progress = 0;

const loadingInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 5) + 1;

    if (progress > 100) {
        progress = 100;
    }

    loaderProgress.style.width = `${progress}%`;
    loaderNumber.textContent = progress;

    if (progress < 25) {
        loadingText.textContent = loadingMessages[0];
    } 
    else if (progress < 45) {
        loadingText.textContent = loadingMessages[1];
    } 
    else if (progress < 70) {
        loadingText.textContent = loadingMessages[2];
    } 
    else if (progress < 90) {
        loadingText.textContent = loadingMessages[3];
    } 
    else {
        loadingText.textContent = loadingMessages[4];
    }

    if (progress >= 100) {

        clearInterval(loadingInterval);

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 700);

    }

}, 70);


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});

function animateCursor() {

    followerX += (mouseX - followerX) * .12;
    followerY += (mouseY - followerY) * .12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


document.querySelectorAll("button, a").forEach(element => {

    element.addEventListener("mouseenter", () => {
        document.body.classList.add("hovering");
    });

    element.addEventListener("mouseleave", () => {
        document.body.classList.remove("hovering");
    });

});


/* ==========================================
   MENU
========================================== */

const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {

    menuOverlay.classList.add("open");
    document.body.classList.add("no-scroll");

});

closeMenu.addEventListener("click", () => {

    menuOverlay.classList.remove("open");
    document.body.classList.remove("no-scroll");

});


document.querySelectorAll(".menu-overlay a").forEach(link => {

    link.addEventListener("click", () => {

        menuOverlay.classList.remove("open");
        document.body.classList.remove("no-scroll");

    });

});


/* ==========================================
   ENTER EXPERIENCE
========================================== */

const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {

    document.querySelector(".architect")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* ==========================================
   CODE EXECUTION
========================================== */

const runCode = document.getElementById("runCode");
const outputContent = document.getElementById("outputContent");

runCode.addEventListener("click", () => {

    outputContent.innerHTML = "";

    const messages = [
        "✓ Knowledge loaded",
        "✓ Inspiration loaded",
        "✓ Confidence built",
        "✓ Future unlocked",
        "",
        "OUTPUT:",
        "A GREAT TEACHER",
        "LEAVES KNOWLEDGE IN OUR MINDS",
        "AND CONFIDENCE IN OUR FUTURE."
    ];

    let index = 0;

    function printMessage() {

        if (index >= messages.length) return;

        const line = document.createElement("div");

        line.textContent = messages[index];

        if (messages[index].startsWith("✓")) {
            line.style.color = "#83ad83";
        }

        if (messages[index] === "OUTPUT:") {
            line.style.color = "#d9bf8b";
            line.style.marginTop = "15px";
        }

        if (
            messages[index] ===
            "A GREAT TEACHER"
        ) {
            line.style.color = "#b99455";
            line.style.fontWeight = "600";
        }

        outputContent.appendChild(line);

        index++;

        setTimeout(printMessage, 350);
    }

    printMessage();

});


/* ==========================================
   IMPACT NODES
========================================== */

const impactNodes =
    document.querySelectorAll(".impact-node");

const nodeMessage =
    document.getElementById("nodeMessage");

const nodeMessages = {

    "KNOWLEDGE":
        "Knowledge is the foundation of every great journey.",

    "PATIENCE":
        "Patience gives students the courage to keep trying.",

    "GUIDANCE":
        "A great mentor makes difficult paths easier to navigate.",

    "CREATIVITY":
        "Creativity turns ideas into something real.",

    "CONFIDENCE":
        "The greatest gift a teacher can give is confidence."
};


impactNodes.forEach(node => {

    node.addEventListener("click", () => {

        impactNodes.forEach(item => {
            item.classList.remove("active");
        });

        node.classList.add("active");

        nodeMessage.querySelector("span").textContent =
            nodeMessages[node.textContent.trim()];

        nodeMessage.classList.add("show");

        setTimeout(() => {
            nodeMessage.classList.remove("show");
        }, 3500);

    });

});


/* ==========================================
   SECRET EASTER EGG
========================================== */

const secretBtn = document.getElementById("secretBtn");
const secretResult = document.getElementById("secretResult");

let secretClicks = 0;

secretBtn.addEventListener("click", () => {

    secretClicks++;

    if (secretClicks === 1) {

        secretResult.textContent =
            "Scanning...";

    }

    if (secretClicks === 2) {

        secretResult.textContent =
            "Almost there...";

    }

    if (secretClicks >= 3) {

        secretResult.innerHTML =
            "🔓 SECRET UNLOCKED — GREAT TEACHERS CREATE GREAT DEVELOPERS.";

        secretBtn.textContent =
            "UNLOCKED ✓";

        secretBtn.disabled = true;

        createConfetti();

    }

});


/* ==========================================
   PARTICLE CANVAS
========================================== */

const canvas =
    document.getElementById("particles");

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 1.8 + .5;

        this.speedX =
            (Math.random() - .5) * .3;

        this.speedY =
            (Math.random() - .5) * .3;

        this.opacity =
            Math.random() * .5 + .1;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;

        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(185,148,85,${this.opacity})`;

        ctx.fill();

    }

}


for (let i = 0; i < 80; i++) {

    particles.push(
        new Particle()
    );

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* ==========================================
   CONFETTI
========================================== */

function createConfetti() {

    const symbols = ["✦", "✧", "•", "◆"];

    for (let i = 0; i < 80; i++) {

        const confetti =
            document.createElement("span");

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-20px";

        confetti.style.zIndex = "999";

        confetti.style.fontSize =
            Math.random() * 15 + 8 + "px";

        confetti.style.color =
            Math.random() > .5
                ? "#b99455"
                : "#667c99";

        confetti.style.pointerEvents =
            "none";

        document.body.appendChild(
            confetti
        );

        const duration =
            Math.random() * 3 + 2;

        confetti.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 700}deg)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    duration * 1000,

                easing:
                    "cubic-bezier(.2,.8,.3,1)"
            }
        );

        setTimeout(() => {

            confetti.remove();

        }, duration * 1000);

    }

}


/* ==========================================
   REPLAY
========================================== */

const replay =
    document.getElementById("replay");

replay.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==========================================
   KEYBOARD EASTER EGG
========================================== */

let keys = "";

document.addEventListener("keydown", (e) => {

    keys += e.key.toLowerCase();

    if (keys.length > 20) {
        keys = keys.slice(-20);
    }

    if (keys.includes("bashir")) {

        createConfetti();

        keys = "";

    }

});


/* ==========================================
   SIMPLE 3D EFFECT
========================================== */

const nameCard =
    document.querySelector(".name-card");

if (window.innerWidth > 800) {

    nameCard.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                nameCard.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                (x / rect.width - .5) * 8;

            const rotateX =
                (y / rect.height - .5) * -8;

            nameCard.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    nameCard.addEventListener(
        "mouseleave",
        () => {

            nameCard.style.transform =
                "";

        }
    );

}