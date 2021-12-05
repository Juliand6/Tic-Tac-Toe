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
var url = "http://localhost:3000/post";
var cpuMoveRow = null;
var cpuMoveColumn = null;
var winner = null;

//triggered by start game button
function startGame() {

    //fades out the titlescreen and clears the contents to make room for the gameboard
    $(".titleScreen").fadeOut(1500, function () {
        initGame();
    });
}


//Initialization of a new game
function initGame() {
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
                    'action': 'squareClickedSingle',
                    'squareRowSingle': n,
                    'squareColSingle': m,
                }),
                response
            );
            if (gameOver == true) {
                return;
            } else {
                $("#turn").text("CPU's Turn");
                setTimeout(cpuMove, 2500);
            }
        } else if (player == "o") {
            $("#square" + n + m).append("<p>O</p>");
            squares[n][m] = 1;
            turn = false;
            count++;
            $.post(
                url + '?data=' + JSON.stringify({
                    'action': 'squareClickedSingle',
                    'squareRowSingle': n,
                    'squareColSingle': m,
                }),
                response
            );
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
        if (cpu == "x") {
            $("#square" + cpuMoveRow + cpuMoveColumn).append("<p>X</p>");
            squares[cpuMoveRow][cpuMoveColumn] = 1;
            turn = true;
            count++;
            $("#turn").text("Your Turn");
        } else if (cpu == "o") {
            $("#square" + cpuMoveRow + cpuMoveColumn).append("<p>O</p>");
            squares[cpuMoveRow][cpuMoveColumn] = 1;
            turn = true;
            count++;
            $("#turn").text("Your Turn");
        }
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
    } else if (winner = true) {
        win();
    } else if (winner = false) {
        notWin();
    } else {
        return;
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
    if (response['action'] == ["squareClickedSingle"]) {
        winner = response['playerWin'];
        checkWin();
        return;
    }
    if (response['action'] == ["cpuMove"]) {
        cpuMoveRow = response["cpuMoveRow"];
        cpuMoveColumn = response["cpuMoveColumn"];
        winner = response['playerWin'];
        checkWin();
        return;
    }
}



