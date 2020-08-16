const dom = (() => {
  return {
    squares: document.querySelectorAll('.square'),
  };
})();

const board = (() => {
  let squaresValues = Array(9).fill('');

  const _isSquareEmpty = (index) => squaresValues[index] === '';

  const getSquaresValues = () => squaresValues;

  let updateSquare = (index, player) => {
    if (_isSquareEmpty(index)) {
      squaresValues[index] = player;
      return true;
    }
  };

  return {
    getSquaresValues,
    updateSquare,
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
  let currentPlayer = 'X';
  let winner;

  const _changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
  };

  const _declareWinner = (winner) => {
    if (winner === 'Draw') {
      alert(`It's a draw!`);
    } else {
      alert(`${winner} is the winner!`);
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

  const init = () => {
    display.populateSquare();
    _attachEvents();
  };

  return {
    init,
  };
})();

game.init();
