var count = 1;
var player = null;
var cpu = null;
//0 is active, 1 is inactiveX, 2 is inactiveO
var squares = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//turn = 1 is Os, turn = 0 is Xs
var turn = 0;
var cpuSelection = null;
var win = false; 


window.onload = function () {
    createGameBoard();
    initGame();
}

function initGame() {
    assignPlayer();
    alert("you are player " + player);
    if (cpu == "x") {
        cpuSelection = Math.floor(Math.random() * 9);
        $(".square" + cpuSelection).append("<h1>X</h1>");
        squares[cpuSelection] = 1;
        count++;
    }
    console.log(turn);

}

function createGameBoard() {

    for (var i = 0; i <= 8; i++) {
        var newButton = document.createElement("button");
        $(newButton).attr("class", "square" + i);
        $(newButton).attr("onclick", "squareClicked(" + i + ")");
        $(".gameboard").append(newButton);
    }
}


function assignPlayer() {
    var playerRandom = Math.floor(Math.random() * 2);
    if (playerRandom == 0) {
        player = "x";
        cpu = "o";
    } else {
        player = "o";
        cpu = "x";
    }
}

function squareClicked(n) {
    evaluateTurn();
    if (squares[n] == 0) {
        if (player == "o" && turn == 1) {
            $(".square" + n).append("<h1>O</h1>");
            squares[n] = 2;
        } else if (player == "x" && turn == 0) {
            $(".square" + n).append("<h1>X</h1>");
            squares[n] = 1;
        }
    }
    count++
    console.log(turn);
    win = evaluateWin();
    cpuTurn();
    if (win == true) {
    }
}

function cpuTurn() {
    if (cpu == "x" && count<10 && win==false) {
        do {
            cpuSelection = Math.floor(Math.random() * 9);
        } while (squares[cpuSelection] != 0);
        $(".square" + cpuSelection).delay(3000).append("<h1>X</h1>");
        squares[cpuSelection] = 1;
    } else if (cpu == "o" && count<10 && win==false) {
        do {
            cpuSelection = Math.floor(Math.random() * 9);
        } while (squares[cpuSelection] != 0);
        $(".square" + cpuSelection).delay(3000).append("<h1>O</h1>");
        squares[cpuSelection] = 2;
    }
    count++;
}

function evaluateTurn() {
    if (count % 2 == 0) {
        turn = 1;
    } else {
        turn = 0;
    }
}

function evaluateWin() {

}