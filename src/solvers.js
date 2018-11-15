/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = Array.from({length: n}, () => new Array(n).fill(0));

  for (let r = 0; r < n; r++) {
    solution[r][r] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = n;
  
  for (let i = 1; i < n; i++) {
    solutionCount = solutionCount * i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = Array.from({length: n}, () => new Array(n).fill(0));

  let placeQueen = function(rowIndex) { //Attempts to place queen on given row
    //Base Case: there's no more rows left; implies all queens have been placed
    let row = solution[rowIndex];
    if (rowIndex >= n) { return true; }

    for (let c = 0; c < n; c++) { //Try every possible column in that row
      row[c] = 1; //Place queen
      if (hasConflicts()) { //If new queen conflicts with something
        row[c] = 0; //Reset and try next column
      } else { //Attempt to place a queen on the next row
        let placedQueenSuccessfully = placeQueen(rowIndex + 1);
        if (placedQueenSuccessfully) { return true; }
        row[c] = 0; //If did not place queen successfully, reset and try next column
      }
    }
    return false;

  }

  let hasConflicts = function() {
    let b = new Board(solution);
    return (b.hasAnyQueensConflicts());
  }

  placeQueen(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solution = Array.from({length: n}, () => new Array(n).fill(0));

  let placeQueen = function(rowIndex) { //Attempts to place queen on given row
    //Base Case: there's no more rows left; implies all queens have been placed
    let row = solution[rowIndex];
    if (rowIndex >= n) { 
      solutionCount++;
      return true; 
    }

    for (let c = 0; c < n; c++) { //Try every possible column in that row
      row[c] = 1; //Place queen
      if (hasConflicts()) { //If new queen conflicts with something
        row[c] = 0; //Reset and try next column
      } else { //Attempt to place a queen on the next row
        let placedQueenSuccessfully = placeQueen(rowIndex + 1);
        //if (placedQueenSuccessfully) { return true; }
        row[c] = 0; //Regardless of solution found or not, reset and try next column
      }
    }
    return false;

  }

  let hasConflicts = function() {
    let b = new Board(solution);
    return (b.hasAnyQueensConflicts());
  }

  placeQueen(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
