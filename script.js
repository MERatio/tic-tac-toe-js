const dom = (() => {
  return {
    squares: document.querySelectorAll('.square'),
    newGame: document.getElementById('newGame'),
    resetGame: document.getElementById('resetGame'),
    playerXName: document.getElementById('playerXName'),
    playerXScore: document.getElementById('playerXScore'),
    playerOName: document.getElementById('playerOName'),
    playerOScore: document.getElementById('playerOScore'),
    currentPlayer: document.getElementById('currentPlayer'),
  };
})();

const board = (() => {
  let squaresValues;

  const _isSquareEmpty = (index) => squaresValues[index] === '';

  const getSquaresValues = () => squaresValues;

  const updateSquare = (index, player) => {
    if (_isSquareEmpty(index)) {
      squaresValues[index] = player.option;
      return true;
    }
  };

  const resetSquaresValues = () => (squaresValues = Array(9).fill(''));

  return {
    getSquaresValues,
    updateSquare,
    resetSquaresValues,
  };
})();

const display = (() => {
  const populateSquare = () => {
    let squaresValues = board.getSquaresValues();
    let domSquares = dom.squares;
    for (let i = 0; i < 9; i++) {
      domSquares[i].innerHTML = squaresValues[i];
    }
  };

  const setPlayerName = (playerXName, playerOName) => {
    dom.playerXName.innerHTML = playerXName;
    dom.playerOName.innerHTML = playerOName;
  };

  const setPlayerScore = (playerXScore, playerOScore) => {
    dom.playerXScore.innerHTML = playerXScore;
    dom.playerOScore.innerHTML = playerOScore;
  };

  const setCurrentPlayer = (player) => {
    dom.currentPlayer.innerHTML = `${player.name}(${player.option}) turn`;
  };

  const removeCurrentPlayerContent = () => {
    dom.currentPlayer.innerHTML = '';
  };

  return {
    populateSquare,
    setPlayerName,
    setPlayerScore,
    setCurrentPlayer,
    removeCurrentPlayerContent,
  };
})();

const game = (() => {
  let playerX;
  let playerO;
  let currentPlayer;
  let winner;

  const _changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const _domSquareClick = (e) => {
    let domSquaresArr = [...dom.squares];
    let squareIndex = domSquaresArr.indexOf(e.target);
    if (board.updateSquare(squareIndex, currentPlayer)) {
      display.populateSquare();
      _disableSquare(squareIndex);
      _checkWinner();
      if (!winner) {
        _changeCurrentPlayer();
        display.setCurrentPlayer(currentPlayer);
      }
    }
  };

  const _attachEvents = () => {
    dom.squares.forEach((domSquare) => {
      domSquare.addEventListener('click', _domSquareClick);
    });
    dom.newGame.addEventListener('click', _newGame);
    dom.resetGame.addEventListener('click', _resetGame);
  };

  const _declareWinner = (winner) => {
    let text;
    if (winner === 'Draw') {
      text = `It's a draw!`;
    } else {
      text = `${winner.name} wins!`;
    }
    setTimeout(() => {
      alert(text);
    }, 10);
  };

  const _isDraw = () => {
    return board
      .getSquaresValues()
      .every((squareValue) => Boolean(squareValue));
  };

  const _isCompleteLine = () => {
    let squaresValues = board.getSquaresValues();
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      let [a, b, c] = line;
      if (
        squaresValues[a] &&
        squaresValues[a] === squaresValues[b] &&
        squaresValues[a] === squaresValues[c]
      ) {
        return true;
      }
    }
  };

  const _checkWinner = () => {
    if (_isCompleteLine()) {
      winner = currentPlayer;
    } else if (_isDraw()) {
      winner = 'Draw';
    }
    if (winner) {
      _disableAllSquare();
      display.removeCurrentPlayerContent();
      _addPlayerPoint(winner);
      display.setPlayerScore(playerX.score, playerO.score);
      _declareWinner(winner);
    }
  };

  const _addPlayerPoint = (winner) => (winner.score += 1);

  const _disableSquare = (index) => {
    let domSquare = dom.squares[index];
    domSquare.classList.add('disable-pointer-events');
    domSquare.removeEventListener('click', _domSquareClick);
  };

  const _disableAllSquare = () => {
    for (let i = 0; i < 9; i++) {
      _disableSquare(i);
    }
  };

  const _removeSquaresDisablePointerEvents = () => {
    for (let domSquare of dom.squares) {
      domSquare.classList.remove('disable-pointer-events');
    }
  };

  const _promptPlayerName = (option) => {
    let playerName;
    do {
      playerName = prompt(`Player ${option} name?`, '');
    } while (
      playerName === null ||
      playerName.length < 1 ||
      playerName.startsWith(' ')
    );
    return playerName;
  };

  const _askPlayerInfo = () => {
    let playerXName = _promptPlayerName('X');
    let playerOName = _promptPlayerName('O');
    playerX = player(playerXName, 'X');
    playerO = player(playerOName, 'O');
  };

  const _newGame = () => init('newGame');

  const _resetGame = () => init('resetGame');

  const init = (option) => {
    winner = null;
    board.resetSquaresValues();
    display.populateSquare();
    _removeSquaresDisablePointerEvents();
    _attachEvents();
    if (option === 'newGame') {
      display.setPlayerName('', '');
      display.setPlayerScore(0, 0);
      display.removeCurrentPlayerContent();
      _askPlayerInfo();
      display.setPlayerName(playerX.name, playerO.name);
    }
    currentPlayer = playerX;
    display.setCurrentPlayer(currentPlayer);
  };

  return {
    init,
  };
})();

const player = (name, option) => {
  return {
    name,
    option,
    score: 0,
  };
};

window.addEventListener('DOMContentLoaded', () => game.init('newGame'));
