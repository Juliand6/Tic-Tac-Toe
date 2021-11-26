var player = null;
var cpu = null;
var winstreak = 0;

//triggered by start game button
function startGame() {

    //fades out the titlescreen and clears the contents to make room for the gameboard
    $(".titleScreen").fadeOut(1500, function () {
        initGame();
        createGameBoard();
    });
}

//restarts game
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
        return;
    });
}

//creates and appends the gameboard to .grid
function createGameboard() {
    var newBox = document.createElement("button");
    var boxContainer = document.createElement("div");
    $(boxContainer).attr("id", "boxContainer");

    for (var i = 0; i <= 9; i++) {
        $(newBox).attr("onclick", "");
    }
    //$(".grid").*/
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

