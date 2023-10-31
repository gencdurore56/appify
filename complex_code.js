/* complex_code.js */

// This code generates a random maze using a depth-first search algorithm
// The maze is then solved using A* search algorithm

// Helper function to create a random maze
function createMaze(rows, cols) {
  // Create an empty maze grid
  var maze = [];
  for (var i = 0; i < rows; i++) {
    maze[i] = [];
    for (var j = 0; j < cols; j++) {
      maze[i][j] = 1; // Wall
    }
  }

  // Generate the maze using depth-first search
  var stack = [];
  var startCol = Math.floor(Math.random() * cols);
  var startRow = Math.floor(Math.random() * rows);
  stack.push([startRow, startCol]);

  while (stack.length > 0) {
    var cell = stack.pop();
    var row = cell[0];
    var col = cell[1];
    maze[row][col] = 0; // Open path

    var neighbors = getNeighbors(row, col, rows, cols);
    shuffle(neighbors);

    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      var nRow = neighbor[0];
      var nCol = neighbor[1];

      if (maze[nRow][nCol] === 1) {
        maze[nRow][nCol] = 0; // Open path
        stack.push([nRow, nCol]);
      }
    }
  }

  return maze;
}

// Helper function to get the valid neighbors of a cell
function getNeighbors(row, col, rows, cols) {
  var neighbors = [];

  if (row > 1) neighbors.push([row - 2, col]);
  if (row < rows - 2) neighbors.push([row + 2, col]);
  if (col > 1) neighbors.push([row, col - 2]);
  if (col < cols - 2) neighbors.push([row, col + 2]);

  return neighbors;
}

// Helper function to shuffle an array in-place
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Generate and print the maze
var rows = 21;
var cols = 41;
var maze = createMaze(rows, cols);

for (var i = 0; i < rows; i++) {
  var rowStr = '';
  for (var j = 0; j < cols; j++) {
    rowStr += maze[i][j] === 1 ? '██' : '  '; // Wall or path
  }
  console.log(rowStr);
}

// Solving the maze using A* search algorithm
function astar(startRow, startCol, endRow, endCol) {
  // Define the heuristic distance function
  function heuristic(row, col) {
    return Math.abs(row - endRow) + Math.abs(col - endCol);
  }

  // Initialize the open and closed lists
  var openList = [];
  var closedList = [];

  // Create the start and end nodes
  var startNode = {
    row: startRow,
    col: startCol,
    g: 0,
    h: heuristic(startRow, startCol),
    f: 0 + heuristic(startRow, startCol),
    parent: null,
  };

  var endNode = {
    row: endRow,
    col: endCol,
  };

  // Add the start node to the open list
  openList.push(startNode);

  while (openList.length > 0) {
    // Find the node with the lowest cost
    var currentNode = openList[0];
    var currentIndex = 0;

    for (var i = 1; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
        currentIndex = i;
      }
    }

    // Move the current node from open list to closed list
    openList.splice(currentIndex, 1);
    closedList.push(currentNode);

    // Check if we have reached the end node
    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      var path = [];
      var current = currentNode;

      while (current != null) {
        path.unshift([current.row, current.col]);
        current = current.parent;
      }

      return path;
    }

    // Generate the neighbors of the current node
    var neighbors = getNeighbors(currentNode.row, currentNode.col, rows, cols);

    for (var j = 0; j < neighbors.length; j++) {
      var neighbor = neighbors[j];
      var nRow = neighbor[0];
      var nCol = neighbor[1];

      // Check if the neighbor is a wall or in the closed list
      if (maze[nRow][nCol] === 1 || closedList.some(function (node) {
          return node.row === nRow && node.col === nCol;
        })) {
        continue;
      }

      // Calculate the cost of moving to the neighbor
      var gScore = currentNode.g + 1;

      // Check if the neighbor is already in the open list
      var inOpenList = openList.some(function (node) {
        return node.row === nRow && node.col === nCol;
      });
      
      if (!inOpenList) {
        // Add the neighbor to the open list
        var newNode = {
          row: nRow,
          col: nCol,
          g: gScore,
          h: heuristic(nRow, nCol),
          f: gScore + heuristic(nRow, nCol),
          parent: currentNode,
        };
        
        openList.push(newNode);
      }
    }
  }

  // No path to the end node is found
  return null;
}

// Find and print the solution path
var startRow = 1;
var startCol = 1;
var endRow = rows - 2;
var endCol = cols - 2;
var solutionPath = astar(startRow, startCol, endRow, endCol);

if (solutionPath !== null) {
  for (var k = 0; k < solutionPath.length; k++) {
    var pathRow = solutionPath[k][0];
    var pathCol = solutionPath[k][1];
    maze[pathRow][pathCol] = 2; // Mark the path
  }
}

console.log('\nSolution:');
for (var i = 0; i < rows; i++) {
  var rowStr = '';
  for (var j = 0; j < cols; j++) {
    if (maze[i][j] === 1) {
      rowStr += '██'; // Wall
    } else if (maze[i][j] === 2) {
      rowStr += '**'; // Path
    } else {
      rowStr += '  '; // Space
    }
  }
  console.log(rowStr);
}

console.log('\nMaze solved!');
// End of code
