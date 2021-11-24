var player = null;
var cpu = null;

function startGame() {

    //fades out the titlescreen and clears the contents to make room for the gameboard
    $(".titleScreen").fadeOut(1500, function () {
        $(".grid").empty();
    });
    assignPlayer();
    var newMsg = document.createElement("div");
    $(newMsg).attr("class", "tileIndicator");
    if (player == "o") {
        $(newMsg).append(" <h1> You are Os!</h1>");
        console.log(newMsg);
    } else {
        $(newMsg).append(" <h1> You are Xs!</h1>");
        console.log(newMsg);
    }
    $(newMsg).hide().appendTo(".grid").fadeIn(1000).delay(1000).fadeOut(1000);
    //assigns player either Xs or Os and indicates which they've been assigned through a popup 
    //which can be closed by clicking anywhere on the screen


    //creates the gameboard
    /*var newBox = document.createElement("button");
    var boxContainer = document.createElement("div");
    $(boxContainer).attr("id", "boxContainer");

    for (var i = 0; i <= 9; i++) {
        $(newBox).attr("onclick", "");
    }
    //$(".grid").*/
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
    console.log(player);
    console.log(playerRandom);
}