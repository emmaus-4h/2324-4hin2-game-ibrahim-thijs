// maakt een container met de hokjes daarin
const gridContainer = document.getElementById('grid');

// de lengte van slang
let snakeLength = 5;
let richting = 0;
let gameover = false;
let appleSpawned = false;

let headPosition = [8, snakeLength];


//  laat begin van de slang zien waneer het niet klopt word het vakje zwart en anders zwart 
const colorArray = [];
for (let i = 0; i < 16; i++) {
  colorArray[i] = [];
  for (let j = 0; j < 16; j++) {
    if (i == 8 && (snakeLength - j >= 0)) {
      colorArray[i][j] = [1,j+1];
    }
    else {
      colorArray[i][j] = [2];
      colorArray[i][j][0] = 0;
    }
  }
}

let=seenApple =false;
function update () {
for 
}


