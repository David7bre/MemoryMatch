var difficulty = {
  easy: 8,
  medium: 12,
  hard: 16,
};

var cardFaces = {
  0: '🍎',
  1: '🍌',
  2: '🍇',
  3: '🍓',
  4: '🍍',
  5: '🥝',
  6: '🍉',
  7: '🍒',
  8: '🍑',
};

const music = new Audio('./src/songs/background-music.mp3');
music.volume = 0.5;
music.loop = true;

var totalMatches = 0;
var totalClicks = 0;
var seconds = null;
var timer = null;

var numberOfClicks = 0;
var firstCard = null;
var secondCard = null;

function populateBoard() {
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

  var cards = new Set();

  while (cards.size < numberOfCards) {
    var random = Math.floor(Math.random() * numberOfCards);
    cards.add(random);
  }

  cards = Array.from(cards).map((num) => Math.floor(num / 2));

  for (var i = 0; i < numberOfCards; i++) {
    let card = document.createElement('div');
    card.classList.add('card', 'closed');
    card.textContent = cardFaces[cards[i]];
    gridContainer.appendChild(card);
    card.addEventListener('click', (e) => clickCard(e, numberOfCards / 2));
  }
}

function clickCard(e, numberOfPairs) {
  if (seconds === null) startGame();

  let card = e.currentTarget;
  if (numberOfClicks === 2 || !card.classList.contains('closed')) return;

  document.querySelector('.clicks-display-span').textContent = totalClicks;

  card.classList.toggle('closed');
  numberOfClicks++;

  if (numberOfClicks === 1) firstCard = card;
  else if (numberOfClicks === 2) {
    secondCard = card;

    setTimeout(() => {
      if (firstCard.textContent === secondCard.textContent) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        totalMatches++;
        document.querySelector('.pairs-display-span').textContent = totalMatches;
        if (totalMatches === numberOfPairs) stopGame();
      } else {
        firstCard.classList.toggle('closed');
        secondCard.classList.toggle('closed');
      }
      firstCard = null;
      secondCard = null;
      numberOfClicks = 0;
      totalClicks++;
    }, 2000);
  }
}

function startGame() {
  seconds = 0;
  var timerDisplay = document.querySelector('.time-display-span');

  music.currentTime = 0;
  music.play();

  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `${Math.floor(seconds / 60) < 10 ? '0' : ''}${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  }, 1000);
}

function stopGame() {
  clearInterval(timer);
  music.pause();

  document.getElementById('grid-container').classList.add('hidden');
  document.querySelector('.reset-game-container').classList.remove('hidden');
}

export function resetGame() {
  seconds = null;
  totalMatches = 0;
  totalClicks = 0;

  if (timer) clearInterval(timer);
  if (music) music.pause();

  document.querySelector('.pairs-display-span').textContent = totalMatches;
  document.querySelector('.clicks-display-span').textContent = totalClicks;
  document.querySelector('.time-display-span').textContent = '00:00';

  document.getElementById('grid-container').classList.remove('hidden');
  document.querySelector('.reset-game-container').classList.add('hidden');

  populateBoard();
}
