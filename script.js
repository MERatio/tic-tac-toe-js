const dom = (() => {
  return {
    squares: document.querySelectorAll('.square'),
    newGame: document.querySelector('.new-game'),
    resetGame: document.querySelector('.reset-game'),
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

  return {
    populateSquare,
  };
})();

const game = (() => {
  let playerX;
  let playerY;
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
      }
    }
  };

  const _attachEvents = () => {
    dom.squares.forEach((domSquare) => {
      domSquare.addEventListener('click', _domSquareClick);
    });
    dom.newGame.addEventListener('click', () => init('newGame'));
    dom.resetGame.addEventListener('click', () => init('resetGame'));
  };

  const _declareWinner = (winner) => {
    if (winner === 'Draw') {
      alert(`It's a draw!`);
    } else {
      alert(`${winner.name} wins!`);
    }
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
      _declareWinner(winner);
    }
  };

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

  const init = (option) => {
    if (option === 'newGame') {
      _askPlayerInfo();
    }
    currentPlayer = playerX;
    winner = null;
    board.resetSquaresValues();
    display.populateSquare();
    _removeSquaresDisablePointerEvents();
    _attachEvents();
  };

  return {
    init,
  };
})();

const player = (name, option) => {
  return {
    name,
    option,
  };
};

window.addEventListener('DOMContentLoaded', () => game.init('newGame'));
