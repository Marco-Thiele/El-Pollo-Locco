let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let clickCount = 0;
let clickCountInfo = 0;
let clickCountEye = 0;
let intervalsId = [];
let winOreLoose = new Audio('audio/winOreLoose.mp3');
let mute = false;
let firstpush = false;
let startTime;
let endTime;
let runTime;
let gameEnd = false;
let bestTime;
let gameStarted;

/**
 * This function is used for initialization canvas
 * 
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileBTN();
    stopGame();
    checkSoundMuted();
}

/**
 * This function is used for the mobile movement
 * 
 */
function mobileBTN() {
    let elLeft = document.getElementById('left');
    let elRight = document.getElementById('right');
    let elJump = document.getElementById('jump');
    let elThrow = document.getElementById('throw');
    moveLeft(elLeft);
    moveRight(elRight);
    jump(elJump);
    throwBottle(elThrow);
}


/**
 * mobile version move left
 * 
 * @param {Objekt} elLeft 
 */
function moveLeft(elLeft) {
    elLeft.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.left = true;
    });

    elLeft.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.left = false;
    });
}

/**
 * mobile version move right
 * 
 * @param {Objekt} elRight 
 */
function moveRight(elRight) {
    elRight.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.right = true;
    });

    elRight.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.right = false;
    });
}

/**
 * mobile version jump
 * 
 * @param {Objekt} elJump 
 */
function jump(elJump) {
    elJump.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.space = true;
    });

    elJump.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.space = false;
    });
}

/**
 * mobile version throw bottle
 * 
 * @param {Objekt} elThrow 
 */
function throwBottle(elThrow) {
    elThrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.d = true;
    });

    elThrow.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.d = false;
    });
}



/**
 * This function is used for the pc movment
 * 
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.right = true;
    }
    if (event.keyCode == 37) {
        keyboard.left = true;
    }
    if (event.keyCode == 38) {
        keyboard.up = true;
    }
    if (event.keyCode == 40) {
        keyboard.down = true;
    }
    if (event.keyCode == 32) {
        keyboard.space = true;
    }
    if (event.keyCode == 68) {
        keyboard.d = true;
    }

})


/**
 * This function is used for the pc movment
 * 
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.right = false;
    }
    if (event.keyCode == 37) {
        keyboard.left = false;
    }
    if (event.keyCode == 38) {
        keyboard.up = false;
    }
    if (event.keyCode == 40) {
        keyboard.down = false;
    }
    if (event.keyCode == 32) {
        keyboard.space = false;
    }
    if (event.keyCode == 68) {
        keyboard.d = false;
    }
})


/**
 * Start game
 * 
 */
function startGame() {
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('reStartButton').classList.add('d-none');
    document.getElementById('startImg').classList.add('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('time').classList.add('d-none');
    init();
    startTime = new Date().getTime();
    gameEnd = false;
    gameStarted = true;
}


/**
 * Start intervals and push dem in the array intervalsId
 * 
 * @param {funktion} fn - funktion for setInterval
 * @param {time} time - time for setInterval
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time)
    if (!firstpush)
        intervalsId.push({ id, time, fn })
}


/**
 * This funktion is used for resume the game after it was paused
 * 
 */
function resumeGame() {
    intervalsId.forEach(interval => {
        const { time, fn } = interval;
        setStoppableInterval(() => fn(), time);
    });
}


/**
 * this function elevated the variable clickCount
 * 
 */
function soundOff() {
    clickCount++;
    if (clickCount == 2 || clickCount == 4 || clickCount == 6 || clickCount == 8 || clickCount == 10) {

        document.getElementById('speaker').src = 'img/9_intro_outro_screens/start/speaker-32.ico';
    }
    if (clickCount == 1 || clickCount == 3 || clickCount == 5 || clickCount == 7 || clickCount == 9)
        document.getElementById('speaker').src = 'img/9_intro_outro_screens/start/mute-2-32.ico';
}


/**
 * This function checked if the Game is muted
 * 
 */
function checkSoundMuted() {
    setStoppableInterval(() => {
        if (clickCount == 2 || clickCount == 4 || clickCount == 6 || clickCount == 8 || clickCount == 10)
            CheckSpeakerOn();
        if (clickCount == 1 || clickCount == 3 || clickCount == 5 || clickCount == 7 || clickCount == 9)
            checkSpeakerOff()
    }, 100);
}


/**
 * This function is for play music
 * 
 */
function CheckSpeakerOn() {
    world.backgroundSound.volume = 0.1;
    world.backgroundSound.currentTime += 6;
    world.backgroundSound.play();
    clickCount = 0;
    world.mute = false;
}


/**
 * This function is for mute music
 * 
 */
function checkSpeakerOff() {
    world.backgroundSound.pause()

    world.mute = true;
}


/**
 * This function show info for the game
 * 
 */
function showInfo() {
    clickCountInfo++;
    if (clickCountInfo == 1) {
        if (!gameStarted)
            showInfoGameNotStarded();
        else
            showInfoGameStarded();
    }
    if (clickCountInfo == 2)
        continuePlay();
}


/**
 * This function show infos for the game when the game has not started
 * 
 */
function showInfoGameNotStarded() {
    document.getElementById('info').classList.remove('d-none');
    document.getElementById('info').classList.remove('info');
    document.getElementById('info').classList.add('info2');
    document.getElementById('startButton').classList.add('d-none');
}


/**
 * This function show infos for the game when the game has  started
 * 
 */
function showInfoGameStarded() {
    document.getElementById('info').classList.remove('info2');
    document.getElementById('info').classList.add('info');
    document.getElementById('info').classList.remove('d-none');
    firstpush = true;
    world.clearAllIntervals();
}


/**
 * This function remove infos for the game
 * 
 */
function continuePlay() {
    document.getElementById('info').classList.add('d-none');
    clickCountInfo = 0;
    resumeGame();
    if (!gameStarted)
        document.getElementById('startButton').classList.remove('d-none');
}


/**
 * This function stops the Game
 * 
 */
function stopGame() {
    setStoppableInterval(() => {
        if (isGameEnd()) {
            if (!gameEnd) {
                checkPlaySoundWinn()
                intervalsId = [];
                firstpush = false;
                setTime()
                loadTime();
                showTime();
                saveTime();
            }
        }
    }, 500);
}


/**
 * this function show the endscreen
 * 
 */
function stopGameClearIntervall() {
    world.clearAllIntervals();
    document.getElementById('gameOver').classList.remove('d-none');
    document.getElementById('reStartButton').classList.remove('d-none');
    world.backgroundSound.pause();
    world.character.walking_sound.pause();
}


/**
 * This function play the loose sound
 * 
 */
function playSoundLoose() {
    winOreLoose.currentTime += 2;
    winOreLoose.play();
    setTimeout(() => {
        winOreLoose.pause();
        winOreLoose.currentTime = 0;
    }, 2000);
}


/**
 * This function play the winning sound
 * 
 */
function playSoundWinn() {
    winOreLoose.play();
    setTimeout(() => {
        winOreLoose.pause();
        winOreLoose.currentTime = 0;
    }, 2000);
}


/**
 * this function checks which sound should be played
 * 
 */
function checkPlaySoundWinn() {
    setTimeout(() => {
        stopGameClearIntervall()
        if (!world.mute) {
            if (world.character.isDead())
                playSoundLoose();
            else
                playSoundWinn();
        }
    }, 1000);
}


/**
 * Is the Character or the Endboss dead?
 * 
 * @returns true ore false
 */
function isGameEnd() {
    return world.character.isDead() || world.level.endboss[0].isDead();
}


/**
 * this function calculates the playing time
 * 
 */
function setTime() {
    endTime = new Date().getTime();
    runTime = endTime - startTime;
    runTime = runTime / 1000;
    gameEnd = true;
}


/**
 * This function save the best time to the localStorage
 * 
 */
function saveTime() {
    if (runTime <= bestTime && world.level.endboss[0].isDead()) {
        let runtimeAsText = JSON.stringify(runTime);
        localStorage.setItem('Time', runtimeAsText);
    }
}

/**
 * This function load the best time from the localStorage
 * 
 */
function loadTime() {
    let runtimeAsText = localStorage.getItem('Time');
    bestTime = JSON.parse(runtimeAsText);
}


/**
 * This funktion shows the best and the current time
 * 
 */
function showTime() {
    if (world.level.endboss[0].isDead()) {
        if (bestTime == undefined)
            bestTime = runTime
        let time = document.getElementById('time');
        time.classList.remove('d-none');
        time.innerHTML = '';
        setTimeout(() => {
            time.innerHTML = `
                       Your current Time:  ${runTime} s <br>
                       Your Best Time:  ${bestTime} s `;
        }, 900);

    }
}


/**
 * Check the window width
 * 
 */
function checkScreenWidth() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let screenHight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (screenWidth <= 720 && screenWidth <= screenHight) {
        document.getElementById('rotate').classList.remove('d-none');
    } else {
        document.getElementById('rotate').classList.add('d-none');
    }
}


/**
 * checkd the screen orientation
 * 
 */
function checkScreenOrientation() {
    if (window.orientation === 90 || window.orientation === -90) {
        checkScreenWidth();
    }
}


/**
 * checked if its touch enabled
 * 
 */
function checkIsMobile() {
    if ('ontouchstart' in window) {
        document.getElementById('mobileBTN').classList.remove('d-none')
    } else {
        document.getElementById('mobileBTN').classList.add('d-none')
    }
}


window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);
window.addEventListener('orientationchange', checkScreenOrientation);


