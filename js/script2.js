// Liste des chemins d'accès aux images
const images = [
  'assets/img/dice-1.png',
  'assets/img/dice-2.png',
  'assets/img/dice-3.png',
  'assets/img/dice-4.png',
  'assets/img/dice-5.png',
  'assets/img/dice-6.png'
];

// Constantes pour les éléments HTML
const player1 = {
  container: document.getElementById('player-1'),
  h1: document.getElementById('h1-player-1'),
  scorePanel: document.getElementById('score-panel-p1'),
  currentScore: document.getElementById('currentscore_p1'),
  total: document.getElementById('total-p1')
};

const player2 = {
  container: document.getElementById('player-2'),
  h1: document.getElementById('h1-player-2'),
  scorePanel: document.getElementById('score-panel-p2'),
  currentScore: document.getElementById('currentscore_p2'),
  total: document.getElementById('total-p2')
};

const commandPanel = document.getElementById('command-panel');
const dice = document.getElementById('dice');
const holdButton = document.getElementById('hold-button');
const rollDiceButton = document.getElementById('rolldice-button');
const newGameButton = document.getElementById('new-game');

let whoIsPlaying = player1;
let currentScore = 0;
let intervalId;

function newGame() {
  playSound('newgame.m4a');
  whoIsPlaying = player1;
  currentScore = 0;

  player2.container.classList.remove('container-player--activ');
  player1.container.classList.add('container-player--activ');
  commandPanel.classList.remove('container-conmmand__fond--activ');

  updateScoreDisplay(player1, 0);
  updateScoreDisplay(player2, 0);
}

function switchPlayer() {
  whoIsPlaying.container.classList.toggle('container-player--activ');
  whoIsPlaying.h1.classList.toggle('container-player__h1--activ');
  whoIsPlaying.scorePanel.classList.toggle('container-player__current-score-block--rotate');
  commandPanel.classList.toggle('container-conmmand__fond--activ');
}

function playSound(soundName) {
  const audio = new Audio(`assets/sound/${soundName}`);
  audio.play();
}

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

function displayRandomImage() {
  const randomImage = getRandomImage();
  const imageElement = document.getElementById('randomImage');
  imageElement.src = randomImage;
}

function startRolling() {
  playSound('des4.m4a');
  displayRandomImage();
  intervalId = setInterval(displayRandomImage, 100);
  dice.classList.toggle('container-commands__dice--rotate');
  setTimeout(stopRolling, 1000);
}

function stopRolling() {
  clearInterval(intervalId);
  dice.classList.toggle('container-commands__dice--rotate');
  const diceValue = images.indexOf(document.getElementById('randomImage').src) + 1;
  if (diceValue === 1) {
    playSound('loose.mp3');
    currentScore = 0;
    switchPlayer();
  } else {
    currentScore += diceValue;
    updateScoreDisplay(whoIsPlaying, currentScore);
  }
}

function holdScoreAndSwitch() {
  playSound('SFB-caisse2.mp3');
  switchPlayer();
  whoIsPlaying.total.textContent = parseInt(whoIsPlaying.total.textContent) + currentScore;
  updateScoreDisplay(whoIsPlaying, 0);
  currentScore = 0;

  if (whoIsPlaying.total.textContent >= 10) {
    alert(`${whoIsPlaying === player1 ? 'Player One' : 'Player Two'} Wins!`);
    newGame();
  }
}

function updateScoreDisplay(player, score) {
  player.currentScore.textContent = score;
}

// Event Listeners
newGameButton.addEventListener('click', newGame);
rollDiceButton.addEventListener('click', startRolling);
holdButton.addEventListener('click', holdScoreAndSwitch);
