// Liste des chemins d'accès aux images
const images = [
  'assets/img/dice-1.png',
  'assets/img/dice-2.png',
  'assets/img/dice-3.png',
  'assets/img/dice-4.png',
  'assets/img/dice-5.png',
  'assets/img/dice-6.png'
];

let intervalId; // Pour stocker l'ID de l'intervalle
let randomIndex; // Pour stocker l'index actuel
let currentScore = 0; // Pour stocker le score total des lancés
let total_p1 = 0 // Pour stocker le score total du player 1
let total_p2 = 0 // Pour stocker le score total du player 2


// New Game

let whoIsPlaying = 'p1';
const newGameButton = document.getElementById('new-game');
function newGame() {
  const newGameSound = new Audio('assets/sound/newgame.m4a');
  newGameSound.play();
  whoIsPlaying = "p1";
  currentScore = 0
  player_2.classList.remove('container-player--activ');
  player_1.classList.add('container-player--activ');
  command_panel.classList.remove('container-conmmand__fond--activ');
  affTotalP1.innerHTML = '0';
  affTotalP2.innerHTML = '0';
  currentscore_p1.innerHTML = 0;
  currentscore_p2.innerHTML = 0;
  currentScore = 0;
}
newGameButton.addEventListener('click', newGame);

// Bascule graphique

const player_1 = document.getElementById('player-1');
const player_2 = document.getElementById('player-2');
const h1_player_1 = document.getElementById('h1-player-1');
const h1_player_2 = document.getElementById('h1-player-2');
const command_panel = document.getElementById('command-panel');

function graphicChange() {
  player_1.classList.toggle('container-player--activ');
  player_2.classList.toggle('container-player--activ');
  h1_player_1.classList.toggle('container-player__h1--activ');
  h1_player_2.classList.toggle('container-player__h1--activ');
  command_panel.classList.toggle('container-conmmand__fond--activ');
}

// Fonction pour afficher une image aléatoire
function afficherImageAleatoire() {
  randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  const imageElement = document.getElementById('randomImage');
  imageElement.src = randomImage;
}
// Démarrer le défilement des images
const dice = document.getElementById('dice');

function demarrerDefilement() {
  const desSound = new Audio('assets/sound/des4.m4a');
  desSound.play();
  afficherImageAleatoire(); // Affiche une image aléatoire dès le début
  intervalId = setInterval(afficherImageAleatoire, 100);
  dice.classList.toggle('container-commands__dice--rotate');
  setTimeout(arreterDefilement, 1000);
}

  // Arrêter le défilement des images
  function arreterDefilement() {
    clearInterval(intervalId);
    dice.classList.toggle('container-commands__dice--rotate');
    score = randomIndex + 1;
    calcCurrentScore();
  }

  // Shake Score Panel
  const scorePanelP1 = document.getElementById('score-panel-p1');
  const scorePanelP2 = document.getElementById('score-panel-p2');

  function scorePanelShake() {
    const holdSound = new Audio('assets/sound/SFB-caisse2.mp3');
    if (score != 1){
    holdSound.play();
    }
    if(whoIsPlaying === 'p1') {
      scorePanelP1.classList.toggle('container-player__current-score-block--rotate');
      setTimeout(function() {
      scorePanelP1.classList.toggle('container-player__current-score-block--rotate');
      }, 200);
    }
    else if(whoIsPlaying === 'p2'){
      scorePanelP2.classList.toggle('container-player__current-score-block--rotate');
      setTimeout(function() {
      scorePanelP2.classList.toggle('container-player__current-score-block--rotate');
      }, 200);
    }
 }

    // Stocker les points dans le total par joueur
  
  let affTotalP1 = document.getElementById('total-p1');
  let affTotalP2 = document.getElementById('total-p2');

  function holdScoreAndChange() {
    scorePanelShake();
    graphicChange();
    
    if (whoIsPlaying === 'p1') {
      total_p1 += currentScore;
      affTotalP1.innerHTML = total_p1;
      currentscore_p1.innerHTML = 0;
      currentScore = 0;
      whoIsPlaying = 'p2';
    }
    else if (whoIsPlaying === 'p2') {
      total_p2 += currentScore;
      affTotalP2.innerHTML = total_p2;
      currentscore_p2.innerHTML = 0;
      currentScore = 0;
      whoIsPlaying = 'p1';
    }
    setTimeout(whoIsWinner, 100);
  }
  
    // Associer les boutons aux fonctions
  const holdButton = document.getElementById('hold-button')
  holdButton.addEventListener('click', holdScoreAndChange);

  const rollDice = document.getElementById('rolldice-button');
  rollDice.addEventListener('click', demarrerDefilement);

// Calcul et Stockage du données
let currentscore_p1 = document.getElementById('currentscore_p1');
let currentscore_p2 = document.getElementById('currentscore_p2');

function calcCurrentScore() {
  const looseSound = new Audio('assets/sound/loose.mp3');
  if (score == 1){
    looseSound.play();
    currentScore = 0;
    holdScoreAndChange();
  }
  else {
    currentScore += score;
  }
  if(whoIsPlaying === 'p1'){
    currentscore_p1.innerHTML = currentScore;
  }
  else if(whoIsPlaying === 'p2'){
    currentscore_p2.innerHTML = currentScore;
  }
  else {
    console.log("Pas de joueur courant");
  }

}
// fin de la partie
function whoIsWinner(){
  if(total_p1 >= 100){
    alert('Player One Win !!!');
  }
  else if (total_p2 >= 100) {
    alert('Player Two Win !!!');
  }
}
