var difficulty = {
  easy: 8,
  medium: 12,
  hard: 16,
};

export function populateBoard() {
  var selectedDiff;
  document.getElementsByName('difficulty').forEach((radio) => {
    if (radio.checked) {
      selectedDiff = radio.value;
    }
  });

  var numberOfCards = difficulty[selectedDiff];
  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateRows = `repeat(${numberOfCards / 4}, 1fr)`;

  for (var i = 1; i <= numberOfCards; i++) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('card-back');
    card.setAttribute('data-card', `card${i}`);
    gridContainer.appendChild(card);
  }
}

function generatePairs() {}
