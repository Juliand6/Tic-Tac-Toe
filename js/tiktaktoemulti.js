
var count = 0;//detects when the board is filled and no possible moves can be played
var url = "http://localhost:3000/post";
var winner = null;
var playerWinner = null;

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
    $.post(
        url+'?data='+JSON.stringify({
        'action':'newGameMulti'
        })
    );
    playerWinner = null;
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
    $("#turn").css("color", "white");
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
        $.post(
            url+'?data='+JSON.stringify({
            'action':'squareClickedMulti', 
            'squareRow':n, 
            'squareCol':m,
            'player':'x'
            }),
            response
        );
        $("#turn").text("Player O's Turn to move");
    } else if (count % 2 != 0 && squares[n][m] == 0) {
        squares[n][m] = 1;
        $("#square" + n + m).append("<p>O</p>");
        count++;
        $.post(
            url+'?data='+JSON.stringify({
            'action':'squareClickedMulti', 
            'squareRow':n, 
            'squareCol':m,
            'player':'o'
            }),
            response
        );
        $("#turn").text("Player X's Turn to move");
    }
}

function win(player) {
    $("#turn").css("color", "black");
    if (player == "x"){
        winner = "Player X";
    } else if (player == "o") {
        winner = "Player O";
    }
    setTimeout(endScreen, 250);
    console.log("win " + player);
}

function endScreen() {
    $(".grid").empty();
    var endScreenContainer = document.createElement("div");
    $(endScreenContainer).attr("id", "gameOver");
    $(endScreenContainer).append("<h1>GAME OVER</h1>");
    $(endScreenContainer).append("<p>"+winner+" Wins!</p>");
    $(".grid").append(endScreenContainer);
    var newButton = document.createElement("button");
    $(newButton).attr("id", "playAgain");
    $(newButton).attr("onclick", "initGame()");
    $(newButton).append("Play Again");
    $(endScreenContainer).append(newButton);
    $(".gameboard").css("margin-left", "0px");
}

function draw() {
    $("#turn").css("color", "black");
    $(".grid").empty();
    var endScreenContainer = document.createElement("div");
    $(endScreenContainer).attr("id", "gameOver");
    $(endScreenContainer).append("<h1>GAME OVER</h1>");
    $(endScreenContainer).append("<p>It's a Draw</p>");
    $(".grid").append(endScreenContainer);
    var newButton = document.createElement("button");
    $(newButton).attr("id", "playAgain");
    $(newButton).attr("onclick", "initGame()");
    $(newButton).append("Play Again");
    $(endScreenContainer).append(newButton);
    $(".gameboard").css("margin-left", "0px");
}

//Checks all the win conditions for the player and cpu exhaustively. 
function checkWinMulti() {
    if (playerWinner == "x"){
        win("x");
    } else if (playerWinner == "o"){
        win("o");
    } else if (count == 9) {
        setTimteout(draw, 250);
    } else {
        return;
    }
}

function response(data, status){
    var response = JSON.parse(data);
    console.log(data);
    if (response['action'] == "squareClickedMulti") {
        playerWinner = response['win'];
        console.log(playerWinner);
        checkWinMulti();
    }
}
