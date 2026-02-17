import { populateBoard } from './populate-board.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementsByName('difficulty').forEach((radio) => {
    radio.addEventListener('change', () => {
      populateBoard();
    });
  });

  populateBoard();
});
