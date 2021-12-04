
var count = 0;
//1 represents x, -1 represents o, 0 represents unoccupied
var squares = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0]];

//triggered by start game button
function startGame() {

    //fades out the titlescreen and clears the contents to make room for the gameboard
    $(".titleScreen").fadeOut(1500, function () {
        initGame();
    });
}


//Initialization of a new game
function initGame() {
    count = 0;
    squares = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];
    $(".grid").empty();
    createGameboard();
}


//creates and appends the gameboard to .grid
function createGameboard() {
    $(".gameboard").css("margin-left", "200px");
    var newContainer = document.createElement("div");
    $(newContainer).attr("id", "container");
    $(".grid").append(newContainer);
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            var newSquare = document.createElement("div");
            $(newSquare).attr("class", "gridSquares");
            $(newSquare).attr("id", "square" + i + j);
            $(newSquare).attr("onclick", "squareClicked(" + i + ", " + j + ")");
            $(newContainer).append(newSquare);
        }
    }
    $("#turn").text("Player X's Turn to move");
}


//onclick event handler for individual squares on the gameboard
function squareClicked(n, m) {
    if (count % 2 == 0 && squares[n][m] == 0) {
        squares[n][m] = 1;
        $("#square" + n + m).append("<p>X</p>");
        count++;
        $("#turn").text("Player O's Turn to move");
        checkWin();
    } else if (count % 2 != 0 && squares[n][m] == 0) {
        squares[n][m] = -1;
        $("#square" + n + m).append("<p>O</p>");
        count++;
        $("#turn").text("Player X's Turn to move");
        checkWin();
    }
}

function win() {
    $("#turn").css("color", "black");
    count = 0;

}

function draw() {

}

//Checks all the win conditions for the player and cpu exhaustively. 
//Calls the appropriate function if either the cpu or the player wins.
function checkWin() {
    if (count == 9) {
        draw();
    } else {
        for (let p = 0; p <= 2; p++) {
            var rowSum = 0;
            for (let g = 0; g <= 2; g++) {
                rowSum += squares[p][g];
            }
            if (rowSum == 3) {
                if (player == "x") {
                    win();
                } else if (player == "o") {
                    notWin();
                }
            } else if (rowSum == -3) {
                if (player == "x") {
                    notWin();
                } else if (player == "o") {
                    win()
                }
            }
        }
        for (let p = 0; p <= 2; p++) {
            var colSum = 0;
            for (let g = 0; g <= 2; g++) {
                colSum += squares[g][p];
            }
            if (colSum == 3) {
                if (player == "x") {
                    win();
                } else if (player == "o") {
                    notWin();
                }
            } else if (colSum == -3) {
                if (player == "x") {
                    notWin();
                } else if (player == "o") {
                    win();
                }
            }
        }
        if (squares[0][0] + squares[1][1] + squares[2][2] == 3) {
            if (player == "x") {
                win();
            } else if (player == "o") {
                notWin();
            }
        } else if (squares[0][0] + squares[1][1] + squares[2][2] == -3) {
            if (player == "x") {
                notWin();
            } else if (player == "o") {
                win();
            }
        } else if (squares[2][0] + squares[1][1] + squares[0][2] == 3) {
            if (player == "x") {
                win();
            } else if (player == "o") {
                notWin();
            }
        } else if (squares[2][0] + squares[1][1] + squares[0][2] == -3) {
            if (player == "x") {
                notWin();
            } else if (player == "o") {
                win();
            }
        } else {
            return;
        }
    }
}


