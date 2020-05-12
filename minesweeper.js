document.addEventListener("DOMContentLoaded", startGame);

// Define your `board` object here!

// Stretch material

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
      if (board.cells[i].isMine == false && isMineTrueCount < 5) {
        board.cells[i].isMine = Math.random() >= 0.7;
        if (board.cells[i].isMine == true) {
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
  document.addEventListener("contextmenu", checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == true && board.cells[i].isMarked != true) {
      return;
    }

    if (board.cells[i].isMine == false && board.cells[i].hidden == true) {
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
