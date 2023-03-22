// Constantes y variables 
// --------------------------------------------------------------------------------------------------

const CANVAS = document.getElementById("gameContainer");
const CANVAS_CTX = CANVAS.getContext("2d");

const IMAGES_BASE_PATH = "/projects/images/"; // Esto nos ayuda a tener la ruta donde el servidor sirve las imágenes en un solo sitio, por si cambia
const imageSpaceship = new Image();
imageSpaceship.src = IMAGES_BASE_PATH + 'spaceship.png';

const SHIP_SIZE = 51;

const GAME_STATE = {
    shipPosX: 332,
    shipPosY: 191,
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    asteroids: [],
    isGameOver: false // Nuevo booleano
}

let lastRender = 0;
const VELOCITY = 108; // pxs / sec
const ASTEROID_SIZE = 85;
const imageAsteroid = new Image();
imageAsteroid.src = IMAGES_BASE_PATH + 'asteroid.png';

const imageGameover = new Image();
imageGameover.src = IMAGES_BASE_PATH + 'game_end.png';


// Actualizar estado del juego
// --------------------------------------------------------------------------------------------------

function updateSpaceship(timeDelta) {
    const distanceTraveled = VELOCITY * timeDelta;

    if (GAME_STATE.pressedKeys.right === true) {
        if (GAME_STATE.shipPosX + SHIP_SIZE < CANVAS.width) {
            GAME_STATE.shipPosX += distanceTraveled;
        } else {
            GAME_STATE.shipPosX = CANVAS.width - SHIP_SIZE;
        }
    }

    if (GAME_STATE.pressedKeys.left) {
        if (GAME_STATE.shipPosX > 0) {
            GAME_STATE.shipPosX = GAME_STATE.shipPosX - distanceTraveled;
        } else {
            GAME_STATE.shipPosX = 0;

        }
    }

    if (GAME_STATE.pressedKeys.up) {
        if (GAME_STATE.shipPosY > 0) {
            GAME_STATE.shipPosY = GAME_STATE.shipPosY - distanceTraveled;
        } else {
            GAME_STATE.shipPosY = 0;
        }
    }

    if (GAME_STATE.pressedKeys.down) {
        if (GAME_STATE.shipPosY + SHIP_SIZE < CANVAS.height) {
            GAME_STATE.shipPosY = GAME_STATE.shipPosY + distanceTraveled;
        } else {
            GAME_STATE.shipPosY = CANVAS.height - SHIP_SIZE;
        }
    }
}

function updateAsteroid(asteroid, timeDelta) {
    asteroid.posX += asteroid.velX * timeDelta;
    asteroid.posY += asteroid.velY * timeDelta;
    if (asteroid.posX > CANVAS.width) {
        asteroid.posX -= (CANVAS.width + ASTEROID_SIZE)
    } else if (asteroid.posX < -ASTEROID_SIZE) {
        asteroid.posX += CANVAS.width + ASTEROID_SIZE
    } else if (asteroid.posY > CANVAS.height) {
        asteroid.posY -= (CANVAS.height + ASTEROID_SIZE)
    } else if (asteroid.posY < -ASTEROID_SIZE) {
        asteroid.posY += CANVAS.height + ASTEROID_SIZE
    }
}

function update(progressInMilliseconds) {
    console.log("Han pasado " + progressInMilliseconds + " ms desde el último frame");
    const progressInSeconds = progressInMilliseconds / 1000;
    updateSpaceship(progressInSeconds);

    for (const asteroid of GAME_STATE.asteroids) {
        updateAsteroid(asteroid, progressInSeconds);
        if (isCollisioning(asteroid)) {
            console.log("Fin de la partida");
            GAME_STATE.isGameOver = true;
        }
    }
}




// Bucle de renderizado
// --------------------------------------------------------------------------------------------------

function renderBackground() {
    CANVAS_CTX.fillStyle = "#02248c";
    CANVAS_CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
}


function draw() {
    if (GAME_STATE.isGameOver === true) {
        CANVAS_CTX.drawImage(imageGameover, 0, 0, CANVAS.width, CANVAS.height);
        return;
    }

    renderBackground();
    for (const asteroid of GAME_STATE.asteroids) {
        CANVAS_CTX.drawImage(imageAsteroid, asteroid.posX, asteroid.posY, ASTEROID_SIZE, ASTEROID_SIZE);
    }
    CANVAS_CTX.drawImage(imageSpaceship, GAME_STATE.shipPosX, GAME_STATE.shipPosY, SHIP_SIZE, SHIP_SIZE);
}



function loop(timestamp) {
    if (GAME_STATE.isGameOver === true) { // Condición de guarda
        return;
    }

    const progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

// Entrada del usuario
// --------------------------------------------------------------------------------------------------

function setPressedKey(keyCode, isPressed) {
    if (keyCode === 68) {
        GAME_STATE.pressedKeys['right'] = isPressed;
    }
    if (keyCode === 65) {
        GAME_STATE.pressedKeys['left'] = isPressed;
    }
    if (keyCode === 87) {
        GAME_STATE.pressedKeys['up'] = isPressed;
    }
    if (keyCode === 83) {
        GAME_STATE.pressedKeys['down'] = isPressed;
    }
}

function onKeyDown(event) {
    console.log("Has pulsado la tecla con código: " + event.keyCode);
    setPressedKey(event.keyCode, true);
}

function onKeyUp(event) {
    console.log("Has soltado la tecla con código: " + event.keyCode);
    setPressedKey(event.keyCode, false);
}

// Asteroides y colisiones
// --------------------------------------------------------------------------------------------------

function generateAsteroid() {
    if (GAME_STATE.isGameOver) { // Condición de guarda
        return;
    }

    const randomVelocityX = Math.trunc(Math.random() * 100) - 50; // [-50, +50]
    const randomVelocityY = Math.trunc(Math.random() * 100) - 50; // [-50, +50]
    const newAsteroid = {
        "posX": CANVAS.width,
        "posY": CANVAS.height,
        "velX": randomVelocityX,
        "velY": randomVelocityY
    };
    GAME_STATE.asteroids.push(newAsteroid);
    console.log('Se ha generado un asteroide');
    console.log('velX=' + randomVelocityX);
    console.log('velY=' + randomVelocityY);

    // Está permitido que una función se invoque a sí misma despues de X milisegundos, usando setTimeout
    setTimeout(generateAsteroid, 8000);
}

function isCollisioning(asteroid) {
    const spaceshipMidX = GAME_STATE.shipPosX + (SHIP_SIZE / 2);
    const spaceshipMidY = GAME_STATE.shipPosY + (SHIP_SIZE / 2);
    return isPointInsideRectangle(spaceshipMidX, spaceshipMidY, asteroid.posX, asteroid.posY, ASTEROID_SIZE, ASTEROID_SIZE);
}


function isPointInsideRectangle(pointX, pointY, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    const rectangleLeftSide = rectangleX;
    const rectangleRightSide = rectangleX + rectangleWidth;
    const rectangleTopSide = rectangleY;
    const rectangleBottomSide = rectangleY + rectangleHeight;
    return (pointX > rectangleLeftSide) && (pointX < rectangleRightSide) && (pointY > rectangleTopSide) && (pointY < rectangleBottomSide);
}



// Código principal
// --------------------------------------------------------------------------------------------------


CANVAS.width = 640;
CANVAS.height = 480;
CANVAS.style.margin = "auto";
CANVAS.style.display = "block";

window.requestAnimationFrame(loop);


renderBackground();
setPressedKey();
updateSpaceship();
generateAsteroid();

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
