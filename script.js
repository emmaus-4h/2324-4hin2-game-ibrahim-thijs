// laat titel van de game zien



// maakt het spelgebied en defniieert het //
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game afstellingen
const box = 20;
const canvasSize = 400;
const rows = canvasSize / box;
const columns = canvasSize / box;

// Variabelen voor het spel om later beter mee te kunnen werken
let snake;
let voedsel;
let score;
let spelGestart = false;
let direction;
let gameInterval;

// zorgt ervoor dat het spel start en zet spawnplek van de slang en voedsel 
function startSpel() {
    snake = [{ x: 9 * box, y: 9 * box }];
    voedsel = {
        x: Math.floor(Math.random() * columns) * box,
        y: Math.floor(Math.random() * rows) * box
    };
    score = 0;
    direction = 'RIGHT';
    spelGestart = true;
    gameInterval = setInterval(draw, 100);
}
// zorgt dat het spel eindigt  en geeft melding met je highscore
function eindigSpel() {
    clearInterval(gameInterval);
    spelGestart = false;
    alert('Helaas! game over! je score was: ' + score);
    drawBeginScherm();
}

// Teken het gedeelte van de spel
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Teket het "eten" van de slang//
    ctx.fillStyle = 'darkred';
    ctx.fillRect(voedsel.x, voedsel.y, box, box);

    // zorgt dat de slang kan bewegen
    let kop = { ...snake[0] };
    if (direction === 'LEFT') kop.x -= box;
    if (direction === 'UP') kop.y -= box;
    if (direction === 'RIGHT') kop.x += box;
    if (direction === 'DOWN') kop.y += box;

    // kijkt of de slang het voedsel eet
    if (kop.x === voedsel.x && kop.y === voedsel.y) {
        score++;
        voedsel = {
            x: Math.floor(Math.random() * columns) * box,
            y: Math.floor(Math.random() * rows) * box
        };
    } else {
        snake.pop();
    }

        // zorgt dat de slang een nieuwe blok erbij krijgt 
        snake.unshift(kop);

        // kijkt of de slang niet met zichzelf botst
        if (kop.x < 0 || kop.x >= canvas.width || kop.y < 0 || kop.y >= canvas.height || botsing(kop, snake)) {
            eindigSpel();
            return;
        }

        // Tekent de  slang
        ctx.fillStyle = 'lightgreen';
        for (let deel of snake) {
            ctx.fillRect(deel.x, deel.y, box, box);
        }

        // zorgt ervoor dat de score erbij bij komt
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }

    // Controleer of de slang niet met zichzelf botst//
    function botsing(kop, slang) {
        for (let i = 1; i < slang.length; i++) {
            if (kop.x === slang[i].x && kop.y === slang[i].y) {
                return true;
            }
        }
        return false;
    }

    // Teken het beginscherm
    function drawBeginScherm() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Druk op Spatie om te starten', 20, canvas.height / 2);
    }

    // zorgt ervoor dat waneer je op de knoppen drukt er iets gebereud
    document.addEventListener('keydown', function(event) {
        if (!spelGestart && (event.code === 'Space' || event.code === 'ArrowUp')) {
            startSpel();
        } else {
            if (event.keyCode === 37 && direction !== 'RIGHT') {
                direction = 'LEFT';
            } else if (event.keyCode === 38 && direction !== 'DOWN') {
                direction = 'UP';
            } else if (event.keyCode === 39 && direction !== 'LEFT') {
                direction = 'RIGHT';
            } else if (event.keyCode === 40 && direction !== 'UP') {
                direction = 'DOWN';
            }
        }
    });

    // zorg=t dat het spel sarte als de pgina word geladen 
    window.onload = function() {
        drawBeginScherm();
    };