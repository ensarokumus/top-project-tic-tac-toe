const gameBoard = (function () {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  // This will be the method of getting the entire board
  const getBoard = () => board;

  // This method will clear the board
  const clearBoard = () => {
    board.splice(0,3);
    board.push(['', '', ''], ['', '', ''], ['', '', '']);
  }

  // This method allows player to put their market on a specific cell
  // and updates the board
  const addMarker = () => {
    const gridCells = [...document.querySelectorAll('.grid-cell')];
    gridCells.forEach((cell) => {
      cell.addEventListener('click', () => {
        getBoard();
        if (cell.textContent === '') {
          cell.textContent = displayController.getActivePlayer().playerMarker;
          const rowIndex = cell.getAttribute('row-index');
          const columnIndex = cell.getAttribute('column-index');
          board[rowIndex][columnIndex] =
          displayController.getActivePlayer().playerMarker;
          displayController.renderBoard();
          gameController.isRoundWinner();
          gameController.isTie();
          displayController.switchPlayerTurn();
        } else {
          alert('You must select an empty cell to play!');
        }
      });
    });
  };
  return { getBoard, clearBoard, addMarker };
})();

const displayController = (function () {
  const board = gameBoard.getBoard();

  // UI selectors
  const selectGameDiv = document.querySelector('.container-game');
  const winDivSelect = document.querySelector('.winDiv');
  const gridCells = [...document.querySelectorAll('.grid-cell')];
  const startBtn = document.querySelector('#startBtn');
  const restartBtn = document.querySelector('#restartBtn');
  const continueBtn = document.querySelector('#continueBtn');
  const pOneNameBoard = document.querySelector('#player1');
  const pTwoNameBoard = document.querySelector('#player2');
  const selectXScoreboard = document.querySelector('.scoreboard-x');
  const selectOScoreboard = document.querySelector('.scoreboard-o');

  // Rendering the board from by going over the board object
  const renderBoard = () => {
    // Clear the board
    selectGameDiv.innerHTML = '';

    // Create grid cells with the current board
    if (
      players[0].playerName !== '' &&
      players[1].playerName !== ''
    ) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const gridCell = document.createElement('div');
          gridCell.classList.add('grid-cell', `row${i + 1}`, `column${j + 1}`);
          gridCell.setAttribute('row-index', `${[i]}`);
          gridCell.setAttribute('column-index', `${[j]}`);
          gridCell.textContent = board[i][j];

          if (board[i][j] === 'x') {
            gridCell.classList.add('color-x');
          } else if (board[i][j] === 'o') {
            gridCell.classList.add('color-o');
          } else {
          }

          selectGameDiv.appendChild(gridCell);
        }
      }
      gameBoard.addMarker();
    }
  };
  
  // Players are created once the names are filled out and
  // 'Start Game' button clicked on
  const startGame = () => {
    startBtn.classList.add('inactive');
    selectOScoreboard.classList.toggle('inactive');
    players.splice(0, 2);

    const player1Name = document.querySelector('#player1').value;
    const player1Marker = 'x';
    const player2Name = document.querySelector('#player2').value;
    const player2Marker = 'o';

    players.push(createPlayer(player1Name, player1Marker));
    players.push(createPlayer(player2Name, player2Marker));
    activePlayer = players[0];
    renderBoard();
  };
  
  startBtn.addEventListener('click', startGame);

  // 'Start game' button also fire createPlayer factory function 
  const players = [];
  const createPlayer = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    return { playerName, playerMarker };
  };
  const getPlayers = () => players;

  // The active player should be tracked, and turns should be switched
  let activePlayer = [];
  const getActivePlayer = () => activePlayer;
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === displayController.getPlayers()[0] ? displayController.getPlayers()[1] : displayController.getPlayers()[0];
    selectXScoreboard.classList.toggle('inactive');
    selectOScoreboard.classList.toggle('inactive');
  };


  // 'Restart game?' button should reset the page
  const refreshPage = () => {
    players.splice(0, 3);
    gameBoard.clearBoard();
    selectGameDiv.textContent = '';
    startBtn.classList.remove('inactive');
    gameController.resetScoreBoard();
    pOneNameBoard.value = '';
    pTwoNameBoard.value = '';
    selectXScoreboard.classList.remove('inactive');
    selectOScoreboard.classList.remove('inactive');
  };

  restartBtn.addEventListener('click', refreshPage);

  return { getActivePlayer, switchPlayerTurn, renderBoard, getPlayers };
})();

const gameController = (function () {
  // UI Selectors
  const selectGameDiv = document.querySelector('.container-game');
  const xScoreboard = document.querySelector('.score-x');
  const oScoreboard = document.querySelector('.score-o');

  let xScore = 0;
  let oScore = 0;

  const resetScoreBoard = () => {
    xScore = 0;
    oScore = 0;
    xScoreboard.textContent = '-';
    oScoreboard.textContent = '-';
  };

  const isRoundWinner = () => {
    const board = gameBoard.getBoard();
    
    switch (true) {  
      case board[0][0] + board[0][1] + board[0][2] === 'xxx':
      case board[1][0] + board[1][1] + board[1][2] === 'xxx':
      case board[2][0] + board[2][1] + board[2][2] === 'xxx':
      case board[0][0] + board[1][0] + board[2][0] === 'xxx':
      case board[0][1] + board[1][1] + board[2][1] === 'xxx':
      case board[0][2] + board[1][2] + board[2][2] === 'xxx':
      case board[0][0] + board[1][1] + board[2][2] === 'xxx':
      case board[0][2] + board[1][1] + board[2][0] === 'xxx':
      case board[0][0] + board[0][1] + board[0][2] === 'ooo':
      case board[1][0] + board[1][1] + board[1][2] === 'ooo':
      case board[2][0] + board[2][1] + board[2][2] === 'ooo':
      case board[0][0] + board[1][0] + board[2][0] === 'ooo':
      case board[0][1] + board[1][1] + board[2][1] === 'ooo':
      case board[0][2] + board[1][2] + board[2][2] === 'ooo':
      case board[0][0] + board[1][1] + board[2][2] === 'ooo':
      case board[0][2] + board[1][1] + board[2][0] === 'ooo':
        // Inactivate the game board
        const gridCells = [...document.querySelectorAll('.grid-cell')];  
        gridCells.forEach((cell) => {
          cell.classList.add('inactive');
        });

        // Add round results screen
        const winDiv = document.createElement('div');
        winDiv.classList.add('winDiv');
        selectGameDiv.appendChild(winDiv);
        const winDivSelect = document.querySelector('.winDiv');

        const winnerPlayer = document.createElement('p');
        winnerPlayer.classList.add('winner-player', );

        if (displayController.getActivePlayer().playerMarker === 'x') {
          winnerPlayer.classList.add('color-x');
        } else {
          winnerPlayer.classList.add('color-o');
        }
        winnerPlayer.textContent = `${displayController.getActivePlayer().playerName}`
        winDivSelect.appendChild(winnerPlayer);

        if (displayController.getActivePlayer().playerMarker === 'x') {
          xScore += 1;
          xScoreboard.textContent = xScore;
        } else {
          oScore += 1;
          oScoreboard.textContent = oScore;
        }
        
        if (xScore === 5 || oScore === 5) {
          const winRound = document.createElement('p');
          winRound.classList.add('winner-round', );
          winRound.textContent = 'has won THE GAME!';
          winDivSelect.appendChild(winRound);
          break;
        } else {
          const winRound = document.createElement('p');
          winRound.classList.add('winner-round', );
          winRound.textContent = 'has won this round!';
          winDivSelect.appendChild(winRound);
    
          const continueGame = document.createElement('button');
          continueGame.setAttribute('id', 'continueBtn');
          continueGame.textContent = 'Continue to next round';
          winDivSelect.appendChild(continueGame);
        
          // Continue button after a round finishes
          const continueRound = () => {
            selectGameDiv.removeChild(winDivSelect);
            gridCells.forEach((cell) => {
              cell.classList.remove('inactive');
            });
            gameBoard.clearBoard();
            displayController.renderBoard();
          };
          continueBtn.addEventListener('click', continueRound);
          break;
        }
      }
  };

  const isTie = () => {
    const board = gameBoard.getBoard();
    const boardOutput = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boardOutput.push(board[i][j]);
      }
    }
  
    if (boardOutput.join('').length === boardOutput.length) {
      // Inactivate the game board
      const gridCells = [...document.querySelectorAll('.grid-cell')];  
      gridCells.forEach((cell) => {
        cell.classList.add('inactive');
      });

      // Add round results screen
      const winDiv = document.createElement('div');
      winDiv.classList.add('winDiv');
      selectGameDiv.appendChild(winDiv);
      const winDivSelect = document.querySelector('.winDiv');

      const tieRound = document.createElement('p');
      tieRound.classList.add('winner-round', );
      tieRound.textContent = 'It\'s a tie!';
      winDivSelect.appendChild(tieRound);
      
      const continueGame = document.createElement('button');
      continueGame.setAttribute('id', 'continueBtn');
      continueGame.textContent = 'Continue to next round';
      winDivSelect.appendChild(continueGame);
    
      // Continue button after a round finishes
      const continueRound = () => {
        selectGameDiv.removeChild(winDivSelect);
        gridCells.forEach((cell) => {
          cell.classList.remove('inactive');
        });
        gameBoard.clearBoard();
        displayController.renderBoard();
      };
      continueBtn.addEventListener('click', continueRound);
    }
  };

  return { isRoundWinner, isTie, resetScoreBoard };
})();