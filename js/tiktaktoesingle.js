var player = null;
var cpu = null;
var winstreak = 0;
var squares = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var turn = true;

//triggered by start game button
function startGame() {

    //fades out the titlescreen and clears the contents to make room for the gameboard
    $(".titleScreen").fadeOut(1500, function () {
        initGame();
    });
}

//start new game
function initGame() {
    winstreak = 0;
    $(".grid").empty();
    assignPlayer();
    var newMsg = document.createElement("div");
    $(newMsg).attr("class", "tileIndicator");
    if (player == "o") {
        $(newMsg).append(" <h1> You are <span>O</span>s!</h1>");

    } else {
        $(newMsg).append(" <h1> You are <span>X</span>s!</h1>");
    }
    $(newMsg).hide().appendTo(".grid").fadeIn(1000).delay(300).fadeOut(1000, function () {
        $(".grid").empty();
        createGameboard();
    });
}

//creates and appends the gameboard to .grid
function createGameboard() {
    var newContainer = document.createElement("div");
    $(newContainer).attr("id", "container");
    $(".grid").append(newContainer);
    for (var i = 0; i <= 8; i++) {
        var newSquare = document.createElement("div");
        $(newSquare).attr("class", "gridSquares");
        $(newSquare).attr("id", "square" + i);
        $(newSquare).attr("onclick", "squareClicked(" + i + ")");
        $(newContainer).append(newSquare);
    }
}


//onclick event handler for individual squares on the gameboard
function squareClicked(n) {
    if (turn == false) {
        return;
    } else if (squares[n] == 0) {
        var squareText = document.createElement("p");
        if (player == "x") {
            $(squareText).append("<p>X</p>");
            squares[n]=1;
        } else if (player == "o") {
            $(squareText).append("<p>O</p>");
            squares[n]=2;
        }
        $("#square"+n).append(squareText);
    }
}


//assigns player and cpu as x or o randomly
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

