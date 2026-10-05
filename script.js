/* =========================================
   PARTICLES
========================================= */

const particles =
    document.getElementById("particles");

for (let i = 0; i < 35; i++) {

    const particle =
        document.createElement("span");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (8 + Math.random() * 12) + "s";

    particle.style.animationDelay =
        Math.random() * 8 + "s";

    particle.style.opacity =
        (0.15 + Math.random() * 0.3);

    particles.appendChild(particle);
}



/* =========================================
   CURSOR
========================================= */

const cursorLight =
    document.querySelector(".cursor-light");

document.addEventListener("mousemove", (e) => {

    cursorLight.style.left =
        e.clientX + "px";

    cursorLight.style.top =
        e.clientY + "px";

});



/* =========================================
   ELEMENTS
========================================= */

const introScreen =
    document.getElementById("introScreen");

const game =
    document.getElementById("game");

const startMission =
    document.getElementById("startMission");

const levelNumber =
    document.getElementById("levelNumber");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");



let currentLevel = 1;

const totalLevels = 4;



/* =========================================
   START GAME
========================================= */

function startGame() {

    introScreen.style.display = "none";

    game.classList.remove("hidden");

    currentLevel = 1;

    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


startMission.addEventListener(
    "click",
    startGame
);



/* ENTER KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            introScreen.style.display !== "none"
        ) {

            startGame();

        }

    }
);



/* =========================================
   LEVEL SYSTEM
========================================= */

function showLevel(number) {

    document
        .querySelectorAll(".level")
        .forEach(level => {

            level.classList.remove("active");

        });


    const nextLevel =
        document.getElementById(
            "level" + number
        );


    if (nextLevel) {

        nextLevel.classList.add("active");

    }


    currentLevel = number;

    levelNumber.textContent =
        String(number).padStart(2, "0");

    updateProgress();


    window.scrollTo({

        top:
            game.offsetTop - 20,

        behavior: "smooth"

    });

}



function updateProgress() {

    const percentage =
        Math.round(
            ((currentLevel - 1) / totalLevels) * 100
        );


    progressBar.style.width =
        percentage + "%";

    progressText.textContent =
        percentage + "%";

}



/* =========================================
   LEVEL 1
========================================= */

const executeButton =
    document.getElementById(
        "executeButton"
    );

const terminalOutput =
    document.getElementById(
        "terminalOutput"
    );


let levelOneDone = false;


executeButton.addEventListener(
    "click",
    () => {

        if (levelOneDone) return;

        levelOneDone = true;

        executeButton.disabled = true;

        const messages = [

            "> connecting to mentor database...",

            "> instructor detected:",

            "> Bashir Hussain Ebrahimi",

            "> knowledge module: ACTIVE",

            "> inspiration module: ACTIVE",

            "> gratitude protocol: READY"

        ];


        terminalOutput.innerHTML = "";


        messages.forEach(
            (message, index) => {

                setTimeout(() => {

                    const line =
                        document.createElement("div");

                    line.textContent =
                        message;

                    terminalOutput.appendChild(
                        line
                    );


                    if (
                        index ===
                        messages.length - 1
                    ) {

                        setTimeout(() => {

                            showLevel(2);

                        }, 1000);

                    }

                }, index * 450);

            }
        );

    }
);



/* =========================================
   LEVEL 2 PUZZLE
========================================= */

const puzzleButtons =
    document.querySelectorAll(
        ".puzzle-options button"
    );

const puzzleMessage =
    document.getElementById(
        "puzzleMessage"
    );


let puzzleSolved = false;


puzzleButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (puzzleSolved) return;


            const correct =
                button.dataset.answer === "true";


            if (correct) {

                button.classList.add(
                    "correct"
                );

                document.getElementById(
                    "missingValue"
                ).textContent = "true";


                puzzleMessage.textContent =
                    "✓ Correct. Inspiration is always active.";


                puzzleSolved = true;


                setTimeout(() => {

                    showLevel(3);

                }, 1200);


            } else {

                button.classList.add(
                    "wrong"
                );


                puzzleMessage.textContent =
                    "✕ Not quite. Think about what a great teacher gives beyond knowledge.";


                setTimeout(() => {

                    button.classList.remove(
                        "wrong"
                    );

                }, 800);

            }

        }
    );

});



/* =========================================
   LEVEL 3 MEMORY
========================================= */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );

const memoryContinue =
    document.getElementById(
        "memoryContinue"
    );


const correctMemory = [
    "knowledge",
    "patience",
    "creativity",
    "confidence"
];


let selectedMemory = [];


memoryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const value =
                card.dataset.value;


            if (
                selectedMemory.includes(value)
            ) {

                selectedMemory =
                    selectedMemory.filter(
                        item => item !== value
                    );

                card.classList.remove(
                    "selected"
                );

            } else {

                if (
                    selectedMemory.length >= 3
                ) {

                    return;

                }


                selectedMemory.push(value);

                card.classList.add(
                    "selected"
                );

            }


            memoryContinue.disabled =
                selectedMemory.length !== 3;

        }
    );

});


memoryContinue.addEventListener(
    "click",
    () => {

        const correctCount =
            selectedMemory.filter(
                value =>
                    correctMemory.includes(value)
            ).length;


        if (correctCount === 3) {

            showLevel(4);

        } else {

            memoryCards.forEach(card => {

                if (
                    selectedMemory.includes(
                        card.dataset.value
                    )
                ) {

                    card.classList.add("wrong");

                    setTimeout(() => {

                        card.classList.remove(
                            "wrong"
                        );

                    }, 700);

                }

            });

            selectedMemory = [];

            memoryCards.forEach(card => {

                card.classList.remove(
                    "selected"
                );

            });

            memoryContinue.disabled = true;

        }

    }
);



/* =========================================
   LEVEL 4
========================================= */

const finalInput =
    document.getElementById(
        "finalInput"
    );

const unlockButton =
    document.getElementById(
        "unlockButton"
    );

const commandResult =
    document.getElementById(
        "commandResult"
    );


unlockButton.addEventListener(
    "click",
    checkFinalCommand
);


finalInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            checkFinalCommand();

        }

    }
);


function checkFinalCommand() {

    const value =
        finalInput.value
            .trim()
            .toLowerCase();


    if (
        value === "thank you" ||
        value === "thankyou" ||
        value === "thanks"
    ) {

        commandResult.innerHTML =
            `
            <div style="color:#5c8d8a">
                ✓ COMMAND ACCEPTED
            </div>

            <div>
                Gratitude successfully compiled.
            </div>
            `;


        unlockButton.textContent =
            "ACCESS GRANTED";


        setTimeout(
            showFinalScreen,
            1200
        );

    } else {

        commandResult.innerHTML =
            `
            <div style="color:#b47f70">
                ✕ ACCESS DENIED
            </div>

            <div>
                Hint: sometimes the simplest command
                is the most meaningful.
            </div>
            `;

    }

}



/* =========================================
   FINAL SCREEN
========================================= */

function showFinalScreen() {

    document
        .querySelectorAll(".level")
        .forEach(level => {

            level.classList.remove(
                "active"
            );

        });


    document.querySelector(
        ".progress-bar"
    ).style.width = "100%";


    progressText.textContent =
        "100%";


    document.querySelector(
        ".final-screen"
    ).classList.add("show");


    levelNumber.textContent =
        "✓";


    launchConfetti();

}



/* =========================================
   CONFETTI
========================================= */

function launchConfetti() {

    const colors = [
        "#b78a4b",
        "#d7b77e",
        "#5c8d8a",
        "#17343d",
        "#eee4d2"
    ];


    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");


        piece.style.position =
            "fixed";

        piece.style.left =
            "50%";

        piece.style.top =
            "45%";

        piece.style.width =
            "8px";

        piece.style.height =
            "14px";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.zIndex =
            "999";

        piece.style.pointerEvents =
            "none";


        document.body.appendChild(
            piece
        );


        const x =
            (Math.random() - .5) *
            window.innerWidth;

        const y =
            (Math.random() - .5) *
            window.innerHeight;


        piece.animate(
            [
                {
                    transform:
                        "translate(0,0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px,${y}px) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1800 + Math.random() * 1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );


        setTimeout(() => {

            piece.remove();

        }, 3000);

    }

}



/* =========================================
   REPLAY
========================================= */

const replayButton =
    document.getElementById(
        "replayButton"
    );


replayButton.addEventListener(
    "click",
    () => {

        window.location.reload();

    }
);



/* =========================================
   MUSIC
========================================= */

const musicButton =
    document.getElementById(
        "musicButton"
    );


let audioContext = null;

let masterGain = null;

let musicPlaying = false;

let musicTimer = null;


function createAmbientMusic() {

    if (audioContext) return;


    audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();


    masterGain =
        audioContext.createGain();


    masterGain.gain.value =
        0.035;


    masterGain.connect(
        audioContext.destination
    );

}


function playNote(
    frequency,
    duration,
    delay
) {

    if (!audioContext) return;


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.type =
        "sine";


    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0,
        audioContext.currentTime +
        delay
    );


    gain.gain.linearRampToValueAtTime(
        0.35,
        audioContext.currentTime +
        delay +
        0.1
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime +
        delay +
        duration
    );


    oscillator.connect(gain);

    gain.connect(masterGain);


    oscillator.start(
        audioContext.currentTime +
        delay
    );


    oscillator.stop(
        audioContext.currentTime +
        delay +
        duration
    );

}


function playAmbientLoop() {

    if (!musicPlaying) return;


    const notes = [
        146.83,
        174.61,
        220,
        261.63,
        220,
        174.61
    ];


    notes.forEach(
        (note, index) => {

            playNote(
                note,
                2.8,
                index * 1.2
            );

        }
    );


    musicTimer =
        setTimeout(
            playAmbientLoop,
            7200
        );

}


musicButton.addEventListener(
    "click",
    async () => {

        createAmbientMusic();


        if (
            audioContext.state ===
            "suspended"
        ) {

            await audioContext.resume();

        }


        musicPlaying =
            !musicPlaying;


        const icon =
            musicButton.querySelector("i");


        if (musicPlaying) {

            icon.className =
                "fa-solid fa-volume-high";

            musicButton.querySelector(
                "span"
            ).textContent =
                "ON";

            playAmbientLoop();

        } else {

            icon.className =
                "fa-solid fa-volume-xmark";

            musicButton.querySelector(
                "span"
            ).textContent =
                "MUSIC";


            clearTimeout(
                musicTimer
            );

        }

    }
);