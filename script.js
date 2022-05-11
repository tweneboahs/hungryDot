const titleContainer = document.getElementById("title");

//start game
const startGame = document.getElementById("start-game-div");
const startBtn = document.getElementById("start-btn");

//next level
const gameLevel = document.getElementById("level");
const nextLevel = document.getElementById("next-level-div");
const nextBtn = document.getElementById("next-btn");

//won game
const wonGame = document.getElementById("won-game-div");
const restartBtn = document.getElementById("restart-btn");

//lose game
const loseGame = document.getElementById("lose-game-div");
const tryAgainBtn = document.getElementById("try-again-btn");

//Above gameboard
const gameContainer = document.getElementById("game-container");

//in order to change time and levels
const setTime = document.getElementById('set-time');
const times = [3000, 30, 30];
const levels = ["LEVEL 2 - MEDIUM", "LEVEL 3 - HARD"];

//in order to change point score
const points = document.getElementById('points');
let pointScore = 0;

//get squares from divs in html
const squares = Array.from(document.querySelectorAll('.grid div'));


const numberForSquareColors = [
    [
        1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
        1,	3,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,
        1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	1,	5,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	2,	2,	2,	2,	2,	2,	0,	2,	2,	2,	2,	2,	2,	1,
        1,	2,	1,	1,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	1,	1,	1,	2,	1,	1,	2,	1,	1,	1,	1,	2,	1,
        1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	4,	1,
        1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1 
    ],
    [
        0,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,
        1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,
        1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,
        1,	2,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	2,	1,	2,	2,	2,	2,	2,	2,	2,	2,	2,	2,	1,
        1,	2,	1,	2,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	1,	2,	1,	2,	2,	2,	2,	1,	2,	2,	3,	1,	2,	1,
        1,	2,	1,	2,	1,	1,	1,	1,	2,	1,	2,	1,	1,	1,	2,	1,
        1,	3,	1,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	1,
        1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
        1,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	2,	4,	1,
        1,	2,	1,	1,	1,	1,	1,	2,	1,	1,	1,	1,	1,	1,	2,	1,
        1,	2,	2,	2,	2,	2,	2,	2,	1,	2,	2,	2,	2,	1,	2,	1,
        1,	1,	1,	1,	1,	2,	1,	1,	1,	2,	1,	1,	2,	2,	2,	1,
        1,	4,	2,	2,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,
        1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1 
    ],
    [
        2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
        2,	1,	1,	1,	1,	2,	1,	4,	2,	2,	2,	2,	2,	3,	1,	1,
        2,	1,	5,	2,	1,	2,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,
        2,	1,	1,	2,	1,	2,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,
        2,	2,	2,	2,	1,	2,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,
        1,	1,	1,	1,	1,	2,	1,	2,	1,	1,	2,	1,	1,	2,	1,	1,
        2,	2,	2,	2,	2,	2,	1,	2,	1,	2,	2,	2,	2,	2,	1,	1,
        2,	1,	1,	1,	2,	1,	1,	2,	1,	2,	1,	1,	2,	1,	1,	1,
        2,	2,	2,	1,	2,	2,	2,	2,	2,	2,	1,	1,	2,	2,	1,	1,
        1,	1,	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	2,	1,	1,	1,
        1,	1,	2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	2,	2,	2,	1,
        2,	2,	2,	1,	1,	1,	1,	2,	1,	2,	2,	2,	1,	1,	2,	1,
        2,	1,	2,	1,	1,	1,	1,	2,	1,	2,	1,	2,	2,	2,	2,	1,
        2,	1,	2,	2,	2,	2,	2,	2,	1,	2,	2,	1,	1,	1,	1,	1,
        4,	1,	1,	1,	1,	1,	1,	2,	1,	1,	2,	2,	2,	2,	1,	1,
        1,	1,	1,	1,	1,	1,	1,	2,	2,	2,	2,	1,	1,	0,	1,	1
    ]
];


let t=0;

startBtn.addEventListener("click", gameSetup);
nextBtn.addEventListener("click", gameSetup);
tryAgainBtn.addEventListener("click", gameSetup);
restartBtn.addEventListener("click", gameSetup);

function hideAllDivs(){
    //hide the gameboard container
    gameContainer.classList.add("hide");
    //hide the previous start game visuals that were at the begininng of the game
    startGame.classList.add("hide");
    startGame.classList.remove("start-game");
    titleContainer.classList.remove("hide");
    //hide the next level titles
    nextLevel.classList.add("hide");
    nextLevel.classList.remove("next-level");
    //hide lose game titles
    loseGame.classList.add("hide");
    loseGame.classList.remove("lose-game");
    //hide win game titles
    wonGame.classList.add("hide");
    wonGame.classList.remove("won-game");
    
}

function gameSetup(){

    gameContainer.classList.remove("hide");
    titleContainer.classList.add("hide");

    addGameBoard(t)
    let timeNow = times[t];
    setTime.innerHTML = timeNow;
    let idchangeTime = setInterval(changeTime, 1000);

    
    function changeTime() {
        if(pointScore>=500){
            if (t < times.length){
                //player moves to next level
                clearInterval(idchangeTime);
                hideAllDivs();
                nextLevel.classList.remove("hide");
                nextLevel.classList.add("next-level");
                gameLevel.innerHTML = levels[t-1];
                //reset the score back to zero
                pointScore = 0;
                points.innerHTML = 0;
                //delete the gameboard so that there are no classlists for the divs
                removeGameBoard();
            } else {
                //player wins the game
                clearInterval(idchangeTime);
                hideAllDivs();
                wonGame.classList.remove("hide");
                wonGame.classList.add("won-game");
                pointScore = 0;
                points.innerHTML = 0;
                removeGameBoard();
                t=0;
            }
                
        } else if( timeNow < 0){
            //player loses game
            clearInterval(idchangeTime);
            hideAllDivs();
            loseGame.classList.remove("hide");
            loseGame.classList.add("lose-game");
            pointScore = 0;
            points.innerHTML = 0;
            removeGameBoard();
            t=0;
        } else{
            setTime.innerHTML = timeNow;
            timeNow -= 1;
        }
    }
    
    
    t++;
}

// code to assign colors to divs

function addGameBoard(index) {
    for ( let i = 0; i < squares.length; i++ ){
        switch (numberForSquareColors[index][i]){
            case 0:
                squares[i].classList.add("square-dot");
                break;
            case 1:
                squares[i].classList.add("square-background");
                break;
            case 2:
                squares[i].classList.add("square-tier1");
                break;
            case 3:
                squares[i].classList.add("square-tier2");
                break;
            case 4:
                squares[i].classList.add("square-tier3");
                break;
            case 5:
                squares[i].classList.add("square-tier4");
                break;
        }
    }
}

function removeGameBoard(){
    for ( let i = 0; i < squares.length; i++ ){
        if (squares[i].classList.contains("square-dot")){
            squares[i].classList.remove("square-dot");
        } else if (squares[i].classList.contains("square-background")){
            squares[i].classList.remove("square-background");
        } else if (squares[i].classList.contains("square-tier1")){
            squares[i].classList.remove("square-tier1");
        } else if (squares[i].classList.contains("square-tier2")){
            squares[i].classList.remove("square-tier2");
        } else  if (squares[i].classList.contains("square-tier3")){
            squares[i].classList.remove("square-tier3");
        } else if (squares[i].classList.contains("square-tier4")){
            squares[i].classList.remove("square-tier4");
        } else if (squares[i].classList.contains("square-used")){
            squares[i].classList.remove("square-used");
        }
    }
}


// code to move the dot around
/*
Here are the keycodes for the arrows
    left = 37
    up = 38
    right = 39
    down = 40 
*/
let k=0;

document.addEventListener('keydown', (e) =>{

    for(let i=0; i < squares.length; i++){
        if (squares[i].classList.contains("square-dot")){
            k=i;
        }
    }

    switch (e.keyCode){
        case 37:
            //Left
            move(k, -1);
            break;
        case 38:
            //Up
            move(k, -16);
            break;
        case 39:
            //Right
            move(k, 1);
            break;
        case 40:
            //Down
            move(k, 16);
            break;
    }
})



function move(k, n){
    
    if(squares[k+n].classList.contains("square-tier1")){
        squares[k].classList.remove("square-dot");
        squares[k].classList.add("square-used");
        squares[k+n].classList.remove("square-tier1");
        squares[k+n].classList.add("square-dot");
        k= k+n;
        pointScore +=10;
    } else if (squares[k+n].classList.contains("square-tier2")){
        squares[k].classList.remove("square-dot");
        squares[k].classList.add("square-used");
        squares[k+n].classList.remove("square-tier2");
        squares[k+n].classList.add("square-dot");
        k= k+n;
        pointScore +=20;
    } else if (squares[k+n].classList.contains("square-tier3")){
        squares[k].classList.remove("square-dot");
        squares[k].classList.add("square-used");
        squares[k+n].classList.remove("square-tier3");
        squares[k+n].classList.add("square-dot");
        k= k+n;
        pointScore +=30;
    } else if (squares[k+n].classList.contains("square-tier4")){
        squares[k].classList.remove("square-dot");
        squares[k].classList.add("square-used");
        squares[k+n].classList.remove("square-tier4");
        squares[k+n].classList.add("square-dot");
        k= k+n;
        pointScore +=40;
    } else if (squares[k+n].classList.contains("square-used")){
        squares[k].classList.remove("square-dot");
        squares[k].classList.add("square-used");
        squares[k+n].classList.remove("square-used");
        squares[k+n].classList.add("square-dot");
        k= k+n;
    }
    points.innerHTML = pointScore;
}


