const gameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // This will be the method of getting the entire board
  const getBoard = () => board;

  // This method allows player to put their market on a specific cell
  // and updates the board
  const addMarker = () => {
    const gridCells = [...document.querySelectorAll(".grid-cell")];
    gridCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        getBoard();
        if (cell.textContent === "") {
          cell.textContent = gameController.getActivePlayer().playerMarker;
          const rowIndex = cell.getAttribute("row-index");
          const columnIndex = cell.getAttribute("column-index");
          board[rowIndex][columnIndex] =
          gameController.getActivePlayer().playerMarker;
          // console.table(board);
          displayController.renderBoard();
          gameController.isRoundWinner();
          gameController.switchPlayerTurn();
        } else {
          alert("You must select an empty cell to play!");
        }
      });
    });
  };
  return { getBoard, addMarker };
})();

const displayController = (function () {
  const board = gameBoard.getBoard();

  // UI selectors
  const selectGameDiv = document.querySelector(".container-game");

  const renderBoard = () => {
    // clear the board
    selectGameDiv.innerHTML = "";

    // get the current version of the board and player turn
    // const board = game.getBoard();
    // const activePlayer = game.getActivePlayer();

    // create grid cells with the current board
    if (
      gameController.getPlayers()[0].playerName !== "" &&
      gameController.getPlayers()[1].playerName !== ""
    ) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const gridCell = document.createElement("div");
          gridCell.classList.add("grid-cell", `row${i + 1}`, `column${j + 1}`);
          gridCell.setAttribute("row-index", `${[i]}`);
          gridCell.setAttribute("column-index", `${[j]}`);
          gridCell.textContent = board[i][j];

          if (board[i][j] === "x") {
            gridCell.classList.add("color-x");
          } else if (board[i][j] === "o") {
            gridCell.classList.add("color-o");
          } else {
          }

          selectGameDiv.appendChild(gridCell);
        }
      }
      gameBoard.addMarker();
    }
  };
  return { renderBoard };
})();

const gameController = (function () {
  const createPlayer = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    return { playerName, playerMarker };
  };

  // UI selectors
  const startBtn = document.querySelector("#startBtn");
  const restartBtn = document.querySelector("#restartBtn");
  const players = [];
  let activePlayer = [];

  // Players are created once the names are filled out and
  // "Start Game" button clicked on
  startBtn.addEventListener("click", () => {
    players.splice(0, 2);

    const player1Name = document.querySelector("#player1").value;
    const player1Marker = "x";
    const player2Name = document.querySelector("#player2").value;
    const player2Marker = "o";

    players.push(createPlayer(player1Name, player1Marker));
    players.push(createPlayer(player2Name, player2Marker));
    activePlayer = players[0];
    displayController.renderBoard();
  });

  restartBtn.addEventListener("click", () => {
    window.location.reload(true);
  });

  const getPlayers = () => players;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const isRoundWinner = () => {
    const board = gameBoard.getBoard();
    switch (true) {
      case board[0][0] + board[0][1] + board[0][2] === "xxx" || "ooo":
      case board[1][0] + board[1][1] + board[1][2] === "xxx" || "ooo":
      case board[2][0] + board[2][1] + board[2][2] === "xxx" || "ooo":
      case board[0][0] + board[1][0] + board[2][0] === "xxx" || "ooo":
      case board[0][1] + board[1][1] + board[2][1] === "xxx" || "ooo":
      case board[0][2] + board[1][2] + board[2][2] === "xxx" || "ooo":
      case board[0][0] + board[1][1] + board[2][2] === "xxx" || "ooo":
      case board[0][2] + board[1][1] + board[2][0] === "xxx" || "ooo":
        const selectGameDiv = document.querySelector(".container-game");
        const gridCells = [...document.querySelectorAll(".grid-cell")];
        gridCells.forEach((cell) => {
          cell.classList.add('inactive');
        });

        const roundWinner = document.createElement("div");
        roundWinner.classList.add('winner', );
        if (getActivePlayer().playerMarker === "x") {
          roundWinner.classList.add("color-x");
        } else {
          roundWinner.classList.add("color-o");
        }
        roundWinner.textContent = `${getActivePlayer().playerName} has won this round`
        selectGameDiv.appendChild(roundWinner);
        console.log(`${getActivePlayer().playerName} is WINNER!`);
        
        break;
    }
  };

  return { getPlayers, getActivePlayer, switchPlayerTurn, isRoundWinner };
})();
