document.addEventListener("DOMContentLoaded", startGame);

// Define your `board` object here!

// Game boards && reset button
// Make it so you can't lose on first click
// Add a reset game button
// Add a timer
// Add a flag count that decreases as you place them
// Add Difficulty levels

// function resetGame() {
//   console.log("clicking works");
//   var board = document.getElementById("gameBoard");
//   board.classList.remove("board");
//   board.classList.add("board");
//   startGame();
// }

function cells(row, col, isMine, isMarked, hidden) {
  return {
    // id: row + "" + col,
    row: row,
    col: col,
    isMine: isMine,
    isMarked: isMarked,
    hidden: hidden,
  };
}

function createBoard(boardSize) {
  var board = {};
  var myCell = [];
  for (var row = 0; row < boardSize; row++) {
    for (var col = 0; col < boardSize; col++) {
      myCell.push(cells(row, col, false, false, true));
    }
  }
  board.cells = myCell;
  // console.log(board);
  var isMineTrueCount = 0;
  while (isMineTrueCount < 5) {
    for (var i = 0; i < board.cells.length; i++) {
      var cell = board.cells[i];
      if (cell.isMine == false && isMineTrueCount < 5) {
        cell.isMine = Math.random() >= 0.7;
        if (cell.isMine == true) {
          isMineTrueCount++;
        }
      }
      // console.log(isMineTrueCount);
      // console.log(board.cells[i].isMine);
    }
  }
  return board;
}

var board = createBoard(4);

function startGame() {
  for (var i = 0; i < board.cells.length; i++) {
    var cell = board.cells[i];
    cell.surroundingMines = countSurroundingMines(cell);
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("click", checkForLoss);
  // document.getElementById("resetGame").addEventListener("click", resetGame);
  document.addEventListener("contextmenu", checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
}

// Function to check for loss
// Improved lost game function
function checkForLoss() {
  var e = event.target.classList;
  // e returns node list that needs to be converted to array before 'includes()' can be used.
  var classArray = Array.from(e);
  if (classArray.includes("mine")) {
    var lostSound = document.getElementById("loseSound");
    lostSound.play();
    setTimeout(function () {
      if (confirm("KA B00M!")) {
        window.location.reload();
      }
    }, 4000);
  }
  // Original lost game function
  // var e = event.target;
  // if (e.classList[2] == "mine") {
  //   console.log(event);
  //   console.log("Lost");
  //   var lostSound = document.getElementById("loseSound");
  //   lostSound.play();
  //   setTimeout(function () {
  //     if (confirm("KA B00M!")) {
  //       window.location.reload();
  //     }
  //   }, 4000);
  // }
}

function checkForWin() {
  for (var i = 0; i < board.cells.length; i++) {
    var cell = board.cells[i];

    if (cell.isMine == true && cell.isMarked != true) {
      return;
    }

    if (cell.isMine == false && cell.hidden == true) {
      return;
    }
  }
  {
    var winSound = document.getElementById("winSound");
    winSound.play();
    setTimeout(function () {
      if (confirm("You Win!")) {
        window.location.reload();
      }
    }, 4000);
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage("You win!");
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
// var surrounding = lib.getSurroundingCells(cell.row, cell.col);
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  for (var i = 0; i < surrounding.length; i++) {
    var cell = surrounding[i];
    if (cell.isMine == true) {
      count++;
    }
  }
  return count;
}
