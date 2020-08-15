const dom = (() => {
  return {
    squares: document.querySelectorAll('.square'),
  };
})();

const board = (() => {
  let squaresValues = Array(9).fill('');

  const _isSquareEmpty = (index) => squaresValues[index] === '';

  let updateSquare = (index, player) => {
    if (_isSquareEmpty(index)) {
      squaresValues[index] = player;
      display.populateSquare();
      return true;
    }
  };

  return {
    squaresValues,
    updateSquare,
  };
})();

const display = (() => {
  const populateSquare = () => {
    let squaresValues = board.squaresValues;
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

  const _changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const _domSquareClick = (e) => {
    let domSquaresArr = [...dom.squares];
    let squareIndex = domSquaresArr.indexOf(e.target);
    if (board.updateSquare(squareIndex, currentPlayer)) {
      _changeCurrentPlayer();
    }
  };

  const _attachEvents = () => {
    dom.squares.forEach((domSquare) => {
      domSquare.addEventListener('click', _domSquareClick);
    });
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
