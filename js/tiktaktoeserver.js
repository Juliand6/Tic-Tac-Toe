
var n = null;
var m = null;
var count = null
var express = require('express');
var app = express();
var squares = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0]];
var winner = null;
var count = 0;

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);

    if (z['action'] == "squareClicked") {
        n = z['squareRow'];
        m = z['squareCol'];
        count = z['count']++;
        var player = z['player'];
        movePlayed(player);
        checkWinMulti();
        var jsontext = JSON.stringify({
            'action': 'squareClicked',
            'win': winner,
            'squareRow': n,
            'squareCol': m,
            'count': count
        });
        console.log(squares);
        console.log(winner);
        res.send(jsontext);
    } else if (z['action'] == "restartGame") {
        squares = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
        count = 0;
        winner = null;
    }
}).listen(3000);
console.log("Server is running!");

function movePlayed(move) {
    if (move == "x") {
        squares[n][m] = 1;
    } else if (move == "o") {
        squares[n][m] = -1;
    }
}

//Checks all the win conditions for the player and cpu exhaustively. 
function checkWinMulti() {
    for (let p = 0; p <= 2; p++) {
        var rowSum = 0;
        for (let g = 0; g <= 2; g++) {
            rowSum += squares[p][g];
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
            colSum += squares[g][p];
        }
        if (colSum == 3) {
            winner = "x";
        } else if (colSum == -3) {
            winner = "o";
        }
    }
    if (squares[0][0] + squares[1][1] + squares[2][2] == 3) {
        winner = "x";
    } else if (squares[0][0] + squares[1][1] + squares[2][2] == -3) {
        winner = "o";
    } else if (squares[2][0] + squares[1][1] + squares[0][2] == 3) {
        winner = "x";
    } else if (squares[2][0] + squares[1][1] + squares[0][2] == -3) {
        winner = "o";
    } else {
        return;
    }
}



