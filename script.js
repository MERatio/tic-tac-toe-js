const dom = (() => {
  return {
    squares: document.querySelectorAll('.square'),
  };
})();

const board = (() => {
  let squaresValues = ['X', '0', 'X', '0', 'X', '0', 'X', '0', 'X'];

  const getsquaresValues = () => squaresValues;

  return {
    getsquaresValues,
  };
})();

const display = (() => {
  const populateSquare = () => {
    let squaresValues = board.getsquaresValues();
    let domSquares = dom.squares;
    for (let i = 0; i < 9; i++) {
      domSquares[i].innerHTML = squaresValues[i];
    }
  };

  return {
    populateSquare,
  };
})();

display.populateSquare();
