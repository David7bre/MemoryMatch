import { resetGame } from './populate-board.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementsByName('difficulty').forEach((radio) => {
    radio.addEventListener('change', () => {
      resetGame();
    });
  });

  document.querySelector('.reset-game-btn').addEventListener('click', () => {
    resetGame();
  });

  resetGame();
});
