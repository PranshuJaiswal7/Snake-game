//Game constants
let idir = { x: 0, y: 0 };
const foodsound = new Audio("music/food.mp3");
const gameover = new Audio("music/gameover.mp3");
const movesound = new Audio("music/move.mp3");
const ksound = new Audio("music/bg.mp3");
let speed = 7;
let score = 0;
let lastpaint = 0;
let snakearr = [{ x: 12, y: 10 }]
let food = { x: 10, y: 5 }
//game function
function main(ctime) {

    window.requestAnimationFrame(main)
    if ((ctime - lastpaint) / 1000 < 1 / speed) {
        return;
    }
    lastpaint = ctime;
    gameEngine();

}


function isCollide(sarr) {
    //if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snakearr[0].x == snakearr[i].x && snakearr[0].y == snakearr[i].y)
            return true;
    }

    //if you bump into wall
    if (snakearr[0].x >= 19 || snakearr[0].x <= 0) {
        return true;
    }
    if (snakearr[0].y >= 19 || snakearr[0].y <= 0) {
        return true;
    }
    return false;

}

function gameEngine() {
    //Part 1 Updating the snake array
    if (isCollide(snakearr)) {
        gameover.play();
        // ksound.pause();
        idir = { x: 0, y: 0 }
        alert("Game Over! Press any key to play again!");
        el = document.documentElement
                , rfs =
                el.requestFullScreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                ;
            rfs.call(el);
        window.addEventListener('keydown', e => {
            el = document.documentElement
                , rfs =
                el.requestFullScreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                ;
            rfs.call(el);

        })

        window.addEventListener('click', e => {
            el = document.documentElement
                , rfs =
                el.requestFullScreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                ;
            rfs.call(el);

        })
         
        snakearr = [{ x: 12, y: 10 }]
        // ksound.play();
        score = 0;
        document.getElementById("score").innerHTML = "Score:" + score;
    }



    //if you have eaten the food regenerate the food and increment the score and snake size

    function checksnakefood() {
        for (let i = 0; i < snakearr.length; i++) {
            if (snakearr[i].x === food.x && snakearr[i].y === food.y) return false;
        }
        return true;
    }
    if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
        foodsound.play();
        score = score + 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High-Score:" + hiscoreval;
        }
        document.getElementById("score").innerHTML = "Score:" + score;
        snakearr.unshift({ x: snakearr[0].x + idir.x, y: snakearr[0].y + idir.y })
        let a = 1;
        let b = 18;
        while (!checksnakefood()) {
            food = { x: Math.floor(a + Math.random() * (b - a)), y: Math.floor(a + Math.random() * (b - a)) };
        }


    }


    //Moving the snake
    for (let i = snakearr.length - 1; i >= 1; i--) {
        snakearr[i] = { ...snakearr[i - 1] };
    }
    snakearr[0].x = snakearr[0].x + idir.x;
    snakearr[0].y = snakearr[0].y + idir.y;

    //Part 2 Display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);




    })

    //Display the food
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = food.y;
    snakeElement.style.gridColumnStart = food.x;
    snakeElement.classList.add('food');
    board.appendChild(snakeElement);



}


//Main logik
// ksound.play();
// ksound.loop=true;




//High Score
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High-Score: " + hiscore;
}



//Keyboard

document.getElementById("myButton").onclick = function () {
    document.getElementById("board").style.display = "grid";
    document.getElementById("myButton").style.display = "none";
    document.getElementById("game").style.display = "contents";
    document.getElementById("body").style.background = "rgb(29, 27, 27)"
    el = document.documentElement
        , rfs =
        el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        ;
    rfs.call(el);

}


// document.getElementById("music").onclick=function(){
//     document.getElementById("music").style.background="pink"

// }


window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    // ksound.play();
    idir = { x: 0, y: 1 };
    movesound.play();

    if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        // console.log("ArrowUp")
        idir.x = 0;
        idir.y = -1;
    }
    else if (e.key === "ArrowDown" || e.key.toLowerCase() == "s") {
        // console.log("ArrowDown")
        idir.x = 0;
        idir.y = 1;
    }
    else if (e.key === "ArrowLeft" || e.key.toLowerCase() == "a") {
        // console.log("ArrowLeft")
        idir.x = -1;
        idir.y = 0;
    }
    else if (e.key === "ArrowRight" || e.key.toLowerCase() == "d") {
        // console.log("ArrowRight")
        idir.x = 1;
        idir.y = 0;

    }






})




//Handle touch swipe
var touchStartX, touchStartY;

document.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    el = document.documentElement
    , rfs =
    el.requestFullScreen
    || el.webkitRequestFullScreen
    || el.mozRequestFullScreen
    ;
rfs.call(el);
});

document.addEventListener('touchmove', function (event) {
    var touchEndX = event.touches[0].clientX;
    var touchEndY = event.touches[0].clientY;

    var dx = touchEndX - touchStartX;
    var dy = touchEndY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            idir.x = 1;
            idir.y = 0;
        }
        else if (dx < 0) {
            idir.x = -1;
            idir.y = 0;
        }


    } else {
        if (dy > 0) {
            idir.y = 1;
            idir.x = 0;
        }
        else if (dy < 0) {
            idir.y = -1;
            idir.x = 0;
        }
    }

}
)








