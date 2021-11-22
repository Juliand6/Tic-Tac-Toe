/* tic tac toe needs the following functions
a function the handles player change
a function that handles when a spot is clicked
a function that determines wether the game ended in a win loss or draw
a function that resets the game
*/
let active = true;

let player = "X";

var showStatus = document.getElementById("turn");

//empty board
let board = ["", "", "", "", "", "", "", "", ""];

//messages that will be displayed
const winner = () => `Player ${player} Wins!`;
const draw = () => 'Draw';
const playerTurn = () => `It is ${player}'s Turn`;

outputObj.innerHTML = outputObj.innerHTML + playerTurn();

//all outcomes that result in a win
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



function results() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
if (roundWon == true) {
    showStatus.innerHTML = winner();
        active = false;
        return;
    }

if (!board.includes("")) {
    showStatus.innerHTML = draw();
}
}

//switches from X to O and vice versa
function playerSwitch() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    showStatus.innerHTML = playerTurn();
}

//restarts the game and returns everything to its original state
function playAgain() {
    active = true;
    player = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
               showStatus.innerHTML = playerTurn();
}





