/* in this version of tiktaktoesingle, I try to keep the entire game board state stored on the serverside and 
as a result the serverside will manage checking win, the cpu's move, and assigning the player. 
The goal of this project was to have all three of these functions implemented properly, however 
they don't fully work as intended so rather than submitting the buggy version I decided to include
it here with the working version of single.js with a few less serverside functions connected to the actual html*/

//UNUSED FILE


var player = null;
var cpu = null;
var winstreak = 0;
var count = 0;
//1 represents x, -1 represents o, 0 represents unoccupied
var turn = false;
var squares = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0]];
var gameOver = false;
var url = "http://localhost:3000/post";//make sure the server is on before playing!!


//triggered by start game button
function startGame() {

    //fades out the titlescreen and clears the contents to make room for the gameboard
    $(".titleScreen").fadeOut(1500, function () {
        initGame();
    });
}


//Initialization of a new game
function initGame() {
    $.post(
        url + '?data=' + JSON.stringify({
            'action': 'newGameSingle'
        })
    );
    squares = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];
    count = 0;
    turn = false;
    gameOver = false;
    $(".grid").empty();
    assignPlayer();
    count = 0;
    var newMsg = document.createElement("div");
    $(newMsg).attr("class", "tileIndicator");
    if (player == "o") {
        $(newMsg).append(" <h1> You are <span>O</span>s!</h1>");

    } else {
        $(newMsg).append(" <h1> You are <span>X</span>s!</h1>");
    }
    $(newMsg).hide().appendTo(".grid").fadeIn(1000).delay(300).fadeOut(1000, function () {
        $(".grid").empty();
        if (player == "o") {
            $("#turn").text("CPU's Turn");
        } else if (player == "x") {
            $("#turn").text("Your Turn");
        }
        $("#turn").css("color", "white");
        createGameboard();
        if (turn == false) {
            setTimeout(cpuMove, 2500);
            count++;
        }
    });
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
    $("#winstreak").text("Winstreak: " + winstreak);
}


//onclick event handler for individual squares on the gameboard
function squareClicked(n, m) {
    if (turn == false) {
        return;
    } else if (squares[n][m] == 0) {
        if (player == "x") {
            $("#square" + n + m).append("<p>X</p>");
            squares[n][m] = 1;
            turn = false;
            count++;
            $.post(
                url + '?data=' + JSON.stringify({
                    'action': 'playerMove',
                    'playerMoveRow': n,
                    'playerMoveColumn': m
                })
            );
            checkWin();
            if (gameOver == true) {
                return;
            } else {
                $("#turn").text("CPU's Turn");
                setTimeout(cpuMove, 2500);
            }
        } else if (player == "o") {
            $("#square" + n + m).append("<p>O</p>");
            squares[n][m] = -1;
            turn = false;
            count++;
            $.post(
                url + '?data=' + JSON.stringify({
                    'action': 'playerMove',
                    'playerMoveRow': n,
                    'playerMoveColumn': m
                })
            );
            checkWin();
            if (gameOver == true) {
                return;
            } else {
                $("#turn").text("CPU's Turn");
                setTimeout(cpuMove, 2500);
            }
        }
    }
}


//calls the server to assign the player x or o randomly
function assignPlayer() {
    $.post(
        url + '?data=' + JSON.stringify({
            'action': 'assignPlayer'
        }),
        response
    );
}

//picks a random move for the cpu and switches back to the player's turn after
function cpuMove() {
    if (count == 10) {
        notWin();
    } else if (turn == false) {
        $.post(
            url + '?data=' + JSON.stringify({
                'action': 'cpuMove',
            }),
            response
        );
    }
}

function notWin() {
    gameOver = true;
    alert("GameOver! Please enter your name:")
}

function win() {
    gameOver = true;
    $("#winstreak").empty();
    $("#turn").css("color", "black");
    winstreak++;
    initGame();
}

//Checks all the win conditions for the player and cpu exhaustively. 
//Calls the appropriate function if either the cpu or the player wins.
function checkWin() {
    if (count == 10) {
        notWin();
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


//event handler for server side response
function response(data, status) {
    var response = JSON.parse(data);
    console.log(data);
    if (response['action'] == "assignPlayer") {
        playerRandom = response['playerRandom'];
        if (playerRandom == 0) {
            player = "x";
            cpu = "o";
            turn = true;

        } else {
            player = "o";
            cpu = "x";
            turn = false;
        }
        return;
    }
    if (response['action'] == "cpuMove") {
        var cpuMoveRow = response['cpuMoveRow'];
        var cpuMoveColumn = response['cpuMoveColumn'];
        if (cpu == "x") {
            $("#square" + cpuMoveRow + cpuMoveColumn).append("<p>X</p>");
            squares[cpuMoveRow][cpuMoveColumn] = 1;
            turn = true;
            count++;
            checkWin();
            $("#turn").text("Your Turn");
        } else if (cpu == "o") {
            $("#square" + cpuMoveRow + cpuMoveColumn).append("<p>O</p>");
            squares[cpuMoveRow][cpuMoveColumn] = -1;
            turn = true;
            count++;
            checkWin();
            $("#turn").text("Your Turn");
        }
    }
}
