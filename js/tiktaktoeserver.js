var express = require('express');
var app = express();

//-------multiplayer variables--------------------------------------------------------
var n = null;
var m = null;

//1 represents x, 0 represents unoccupied, -1 represents o
var squaresMulti = [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]];
var winner = "none";


//-------singleplayer variables-------------------------------------------------------------
var playerRandom = null;

//0 represents unoccupied, 1 represents occupied
/*var squaresSingle = [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]];*/
//var singleWinner = "none";       >  function that these are implemented in
//var playerSingle = null;            didn't work D;                
//var q = null;                                                    
//var p = null;                                                    
//var cpuMoveRow = null;
//var cpuMoveColumn = null;




app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);

    //--------------EVENT HANDLERS FOR MULTIPLAYER-----------------------------------------------
    //event handler for starting a new multiplayer game
    if (z['action'] == "newGameMulti") {
        squaresMulti = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
        winner = "none";
    }

    //event handler for clicking a square in multiplayer
    if (z['action'] == "squareClickedMulti") {
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

    //-----------EVENT HANDLERS FOR SINGLEPLAYER----------------------------------------------------
    //event handler for starting a new singleplayer game
    if (z['action'] == "newGameSingle") {
        squaresSingle = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
        console.log(squaresSingle);
        cpuMoveRow = null;
        cpuMoveColumn = null;
        q = null;
        p = null;
        console.log(cpuMoveRow, cpuMoveColumn);
    }

    //event handler for assigning the player either x or o 
    if (z['action'] == "assignPlayer") {
        assignPlayer();
        var jsontext = JSON.stringify({
            'action': 'assignPlayer',
            'playerRandom': playerRandom,
        });
        console.log(playerRandom);
        res.send(jsontext);
    }

    //doesn't work D: (supposed to be for checking for wins after player makes a move: more details in tiktaktoesingletest.js)
    /*if (z['action'] == 'squareClickedSingle') {
        q = z['squareRowSingle'];
        p = z['squareColSingle'];
        movePlayedSinglePlayer(playerSingle);
        checkWinSingle();
        var jsontext = JSON.stringify({
            'action': 'squareClickedSingle',
            'playerWin': singleWinner
        })
        console.log(squaresSingle);
        console.log(singleWinner);
        res.send(jsontext);
    }*/

    //event handler for when the cpu has to pick a move DOESNT WORK FOR SOME REASON ASOIDEGWOJIEGWOIJ IDK WHYYYYYY (see tiktaktoesinglewierdBUGGED.js)
    /*if (z['action'] == 'cpuMove') {
        cpuMove();
        //checkWinSingle();
        var jsontext = JSON.stringify({
            'action': 'cpuMove',
            'cpuMoveRow': cpuMoveRow,
            'cpuMoveColumn': cpuMoveColumn,
        })
        console.log(cpuMoveRow, cpuMoveColumn);
        res.send(jsontext);
    }

    if (z['action'] == 'playerMove') {
        p = z['playerMoveRow'];
        q = z['playerMoveColumn'];
        squaresSingle[p][q] = 1; 
        console.log(squaresSingle);
    }*/

}).listen(3000);
console.log("Server is running!");


//------------------------------------MULTIPLAYER FUNCTIONS:---------------------------------------------------

//places the player's move on the squares matrix for multiplayer
function movePlayedMulti(move) {
    if (move == "x") {
        squaresMulti[n][m] = 1;
    } else if (move == "o") {
        squaresMulti[n][m] = -1;
    }
}



//Checks all the win conditions exhaustively for multiplayer
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




//----------------------------------SINGLEPLAYER FUNCTIONS--------------------------------------:

//picks either x or o randomly for the player
function assignPlayer() {
    playerRandom = Math.floor(Math.random() * 2);
}

//cpu picks a random move on the board that's currently unoccupied. DOESN'T WORK SEE tiktaktoesingleweirdBUGGED.js
/*function cpuMove() {
    do {
        cpuMoveRow = Math.floor(Math.random() * 3);
        cpuMoveColumn = Math.floor(Math.random() * 3);
    } while (squaresSingle[cpuMoveRow][cpuMoveColumn] != 0);
    squaresSingle[cpuMoveRow][cpuMoveColumn] = 1;
    return;
}*/

//doesn't work/not implemented D; (supposed to be for checking win in singleplayer: more details in tiktaktoesingletest.js)
/*function checkWinSingle() {
    for (let p = 0; p <= 2; p++) {
        var rowSum = 0;
        for (let g = 0; g <= 2; g++) {
            rowSum += squaresSingle[p][g];
        }
        if (rowSum == 3) {
            if (playerSingle == "x") {
                singleWinner = true;
            } else if (playerSingle == "o") {
                singleWinner = false;
            }
        } else if (rowSum == -3) {
            if (playerSingle == "x") {
                singleWinner = false;
            } else if (playerSingle == "o") {
                singleWinner = true;
            }
        }
    }
    for (let p = 0; p <= 2; p++) {
        var colSum = 0;
        for (let g = 0; g <= 2; g++) {
            colSum += squaresSingle[g][p];
        }
        if (colSum == 3) {
            if (playerSingle == "x") {
                singleWinner = true;
            } else if (playerSingle == "o") {
                singleWinner = false;
            }
        } else if (colSum == -3) {
            if (playerSingle == "x") {
                singleWinner = false;
            } else if (playerSingle == "o") {
                singleWinner = true;
            }
        }
    }
    if (squaresSingle[0][0] + squaresSingle[1][1] + squaresSingle[2][2] == 3) {
        if (playerSingle == "x") {
            singleWinner = true;
        } else if (playerSingle == "o") {
            singleWinner = false;
        }
    } else if (squaresSingle[0][0] + squaresSingle[1][1] + squaresSingle[2][2] == -3) {
        if (playerSingle == "x") {
            singleWinner = false;
        } else if (playerSingle == "o") {
            singleWinner = true;
        }
    } else if (squaresSingle[2][0] + squaresSingle[1][1] + squaresSingle[0][2] == 3) {
        if (playerSingle == "x") {
            singleWinner = true;
        } else if (playerSingle == "o") {
            singleWinner = false;
        }
    } else if (squaresSingle[2][0] + squaresSingle[1][1] + squaresSingle[0][2] == -3) {
        if (playerSingle == "x") {
            singleWinner = false;
        } else if (playerSingle == "o") {
            singleWinner = true;
        }
    } else {
        singleWinner = "none";
    }
}*/