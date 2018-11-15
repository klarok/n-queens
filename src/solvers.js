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

  // for (let r = 0; r < n; r++) {
  //   solution[r][r] = 1;
  // }

  let placeRook = function(rowIndex) {
    if (rowIndex >= n) { return true; }

    let row = solution[rowIndex];
    for (let c = 0; c < n; c++) {
      row[c] = 1;
      if (new Board(solution).hasAnyRooksConflicts()) {
        row[c] = 0;
      } else {
        let placedRookSuccessfully = placeRook(rowIndex + 1);
        if (placedRookSuccessfully) {
          return true;
        }
      }
    }
    return false;
  };

  placeRook(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;

  var solution = Array.from({length: n}, () => new Array(n).fill(0));
  let counts = {}; //Store already calculated solutions

  // let calculateRooks = function(n) {
  //   let count = 0;
  //   if (counts.hasOwnProperty(n)) { return counts[n]; } //Check if already calculated
  //   if (n < 2) { //If n is 1 or 0, just return
  //     counts[n] = n;
  //     return n; 
  //   } 

  //   for (let c = 0; c < n; c++) {
  //     count += calculateRooks(n - 1);
  //   }
  //   counts[n] = count; //Store calculated solution number

  //   return count;
  // }

  // solutionCount = calculateRooks(n);

  let placeRook = function(rowIndex) {
    if (counts.hasOwnProperty(n - rowIndex)) { //Check for solved sub-problems
      return counts[n - rowIndex];
    }

    let count = 0;
    if (rowIndex >= n) { //Placed a rook in every row; 1 solution found
      return 1;
    }
    let row = solution[rowIndex];
    for (let c = 0; c < n; c++) { //Check every column in current row
      row[c] = 1; //Try to place a rook
      if (new Board(solution).hasAnyRooksConflicts()) {
        row[c] = 0; //Reset and try next column
      } else {
        count += placeRook(rowIndex + 1); //Try to place next rook
        row[c] = 0; //Done placing next rook, reset and try next column
      }
    }
    if (rowIndex === 0) { //Wrapped up recursive calls, about to return final count
      counts[n] = count;
    }
    return count;
  }; //What about when things are done for a given n?

  solutionCount = placeRook(0);

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
