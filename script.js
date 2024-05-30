2// maakt een container met de hokjes daarin
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

let seenApple = false;
function update() {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      if (colorArray[i][j][0] == 1) {
        if (colorArray[i][j][1] == snakeLength) {
          if (richting == 0) {
            if (i == 15) {
              gameover = true;
            } else {
              snakeLength++;
              colorArray[i+1][j] = [1,snakeLength];
              seenApple = true;
            }
          } else if (i == 1) {
            if (j == 0) {
              gameover = true;
            } else {
              snakeLength++;
              colorArray[i][j+1] = [1,snakeLength];
              seenApple = true;
            } 
          } else if (i == 2) {
            if (i == 0) {
              gameover = true;
            } else {
              snakeLength++
              colorArray[i-1][j] = [1,snakeLength];
              seenApple = true;
            }
          } else if (i == 3) {
            if (j == 15) {
              gameover = true;
            } else {
              snakeLength++;
              colorArray[i][j-1] = [1,snakeLength];
              seenApple = true;
            }
          } 
           headPosition = [j, i];
                  }

                  if ((richting == 0 && colorArray[headPosition[1]][headPosition[0]][0] == 2) || seenApple == true) continue;
                  if ((richting == 1 && colorArray[headPosition[1]][headPosition[0]][0] == 2) || seenApple == true) continue;
                  if ((richting == 2 && colorArray[headPosition[1]][headPosition[0]][0] == 2) || seenApple == true) continue;
                  if ((richting == 3 && colorArray[headPosition[1]][headPosition[0]][0] == 2) || seenApple == true) continue;

                  colorArray[i][j][1]--;
                  if (colorArray[i][j] == 0) {
                    colorArray[i][j][0] = 0;
                  }
                } else if (colorArray[i][j][0] == 0) {
                  let randint = Math.floor(Math.random() * (256-snakeLength + 1));
                  if (randint == 0 && (appleSpawned == false)) {
                    colorArray[i][j][0] = 2;
                    appleSpawned = true;
                  }
                }
              }
            }
          }

          document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowUp') {
              richting = 0;
            } else if (event.key === 'ArrowDown') {
              richting = 2;
            } else if (event.key === 'ArrowLeft') {
              richting = 3;
            } else if (event.key === 'ArrowRight') {
              richting = 1;
            }
          });

          function updateGridContainer() {
            for (let row = 0; row < colorArray.length; row++) {
              for (let col = 0; col < colorArray[row].length; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                if (colorArray[row][col][0] === 0) {
                  square.style.backgroundColor = 'black';
                } else if (colorArray[row][col][0] === 1) {
                  square.style.backgroundColor = 'green';
                } else {
                  square.style.backgroundColor = 'red';
                }
                gridContainer.appendChild(square);
              }
            }
          }

          setInterval(function() {
            update();
            updateGridContainer();

          }, 1000); // 1000 milliseconds = 1 second