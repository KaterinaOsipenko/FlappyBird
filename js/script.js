
var cvs = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas'))

var ctx = cvs.getContext('2d');


// Создаём объекты класса Image
var bird = new Image();
var bg = new Image();
var fr = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

// Загружаем картинки
bird.src = "img/flappy_bird_bird.png"
bg.src = "img/flappy_bird_bg.png";
fr.src = 'img/bottom.png';
pipeUp.src = "img/tr.png";
pipeBottom.src = "img/tr2.png";

//Создаём объекты класса Audio
var fly = new Audio();
var score_audio = new Audio();

//Загружаем аудио
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// Переменная для отсупа между препятствиями 
var gap = 90;

//При нажатии на кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

//Создание блоков 
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

var score = 0;

// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

// Рисуем картинки в канвасе
function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipeUp.height + pipe[i].y + gap);
        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >=
                pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fr.height) {
            location.reload();
            fly.play();
        }

        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }

    }

    ctx.drawImage(fr, 0, cvs.height - fr.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score:" + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;


var tik = 0;
var interval = setInterval(function () {
    tik++;
    res.innerHTML = tik;
}, 1000);

window.addEventListener('blur', function () {
    clearInterval(interval);
}, false);

window.addEventListener('focus', function () {
    interval = setInterval(function () {
        tik++;
        res.innerHTML = tik;
    }, 1000);
}, false);