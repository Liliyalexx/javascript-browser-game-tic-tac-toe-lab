
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
// Winning combinations
const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal (top-left to bottom-right)
    [2, 4, 6], // diagonal (top-right to bottom-left)
];
/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""]; // 9 empty spaces for squares
let turn = "🐶";  // User starts as a dog
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/
//Store cached element references
const squareEls = document.querySelectorAll(".sqr");
//console.log(squareEls)
const messageEl = document.getElementById("message");
//console.log(message);
const resetBtnEl = document.getElementById("reset");  // Cached reference for reset button
const boardEl = document.querySelector('.board');  // Cached board element

/*-------------------------------- Functions --------------------------------*/
//Create a function called init.
function init() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "🐶";
    winner = false;
    tie = false;
    //console.log("Game initialized");
    render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
 squareEls.forEach((sqr, index) => {
    sqr.textContent = board[index];

    //styling
    if (board[index] === "🐶") {
        sqr.style.color = "brown";
    } else if (board[index] === "🐱") {
        sqr.style.color = "blue";
    } else {
        sqr.style.backgroundColor = "lemonchiffon"; //light lemon color
    }
  });
}

function updateMessage() {
  if (winner) {
    messageEl.textContent = `${turn} wins!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `It's ${turn}'s turn`;
  }
}


// Handle clicks
function handleClick(event) {
const squareIndex = parseInt(event.target.id);
  if (board[squareIndex] || winner) return; // Prevent overwriting of clicked square
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
  //console.log(board);
}

function checkForWinner() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      //console.log('And Winner is ' + winner);
    }
  });
}

function checkForTie() {
  if (!board.includes('') && !winner) {
    tie = true;
    //console.log("This is tie " + tie);
  }
}

function switchPlayerTurn() {
    if (winner) return;
    turn = (turn === "🐶") ? "🐱" : "🐶";
    //console.log(`Turn switched to ${turn}`);
}
/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', function(event) {
    if (!event.target.classList.contains('sqr')) return;  
    handleClick(event);
});

resetBtnEl.addEventListener('click', init);  // Reset button listener

init();  // Call the init function when the app loads.
