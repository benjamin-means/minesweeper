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
  while (isMineTrueCount < 15) {
    for (var i = 0; i < board.cells.length; i++) {
      if (board.cells[i].isMine == false && isMineTrueCount < 15) {
        board.cells[i].isMine = Math.random() >= 0.5;
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

var board = createBoard(6);

// function createBoard() {
//   var board = {
//     cells: [
//       {
//         row: 0,
//         col: 0,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 0,
//         col: 1,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 0,
//         col: 2,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 1,
//         col: 0,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 1,
//         col: 1,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 1,
//         col: 2,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 2,
//         col: 0,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 2,
//         col: 1,
//         isMine: false,
//         hidden: true,
//       },
//       {
//         row: 2,
//         col: 2,
//         isMine: false,
//         hidden: true,
//       },
//     ],
//   };
//   var isMineTrueCount = 0;
//   while (isMineTrueCount < 5) {
//     for (var i = 0; i < board.cells.length; i++) {
//       if (board.cells[i].isMine == false && isMineTrueCount < 5) {
//         board.cells[i].isMine = Math.random() >= 0.5;
//         if (board.cells[i].isMine == true) {
//           isMineTrueCount++;
//         }
//       }
//       console.log(isMineTrueCount);
//       console.log(board.cells[i].isMine);
//     }
//   }

//   return board;
// }
// board.cells[i].isMine = Math.random() >= 0.5;

// var board = createBoard();

function startGame() {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
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
    if (surrounding[i].isMine == true) {
      count++;
    }
    return count;
  }
}
