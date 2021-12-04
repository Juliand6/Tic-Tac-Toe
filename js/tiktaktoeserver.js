
var n = null;
var m = null;
var count = 0;
var express = require('express');
var app = express();
var squaresMulti = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0]];
var winner = "none";


app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);

    //event handler for starting a new multiplayer game
    if (z['action'] == "newGameMulti") {
        squaresMulti = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
        winner = "none";
    } 
    
    //event handler for clicking a square in multiplayer
    else if (z['action'] == "squareClickedMulti") {
        n = z['squareRow'];
        m = z['squareCol'];
        var player = z['player'];
        movePlayedMulti(player);
        checkWinMulti();
        var jsontext = JSON.stringify({
            'action': 'squareClickedMulti',
            'win': winner,
        });
        console.log(squaresMulti);
        console.log(winner);
        res.send(jsontext);
    }




}).listen(3000);
console.log("Server is running!");


//places the player's move on the squares matrix
function movePlayedMulti(move) {
    if (move == "x") {
        squaresMulti[n][m] = 1;
    } else if (move == "o") {
        squaresMulti[n][m] = -1;
    }
    count++;
}


//Checks all the win conditions exhaustively 
function checkWinMulti() {
    for (let p = 0; p <= 2; p++) {
        var rowSum = 0;
        for (let g = 0; g <= 2; g++) {
            rowSum += squaresMulti[p][g];
        }
        if (rowSum == 3) {
            winner = "x";
        } else if (rowSum == -3) {
            winner = "o";
        }
    }
    for (let p = 0; p <= 2; p++) {
        var colSum = 0;
        for (let g = 0; g <= 2; g++) {
            colSum += squaresMulti[g][p];
        }
        if (colSum == 3) {
            winner = "x";
        } else if (colSum == -3) {
            winner = "o";
        }
    }
    if (squaresMulti[0][0] + squaresMulti[1][1] + squaresMulti[2][2] == 3) {
        winner = "x";
    } else if (squaresMulti[0][0] + squaresMulti[1][1] + squaresMulti[2][2] == -3) {
        winner = "o";
    } else if (squaresMulti[2][0] + squaresMulti[1][1] + squaresMulti[0][2] == 3) {
        winner = "x";
    } else if (squaresMulti[2][0] + squaresMulti[1][1] + squaresMulti[0][2] == -3) {
        winner = "o";
    } else {
        return;
    }
}

