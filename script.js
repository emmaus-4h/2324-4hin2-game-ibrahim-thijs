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
