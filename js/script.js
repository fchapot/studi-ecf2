// Liste des chemins d'accès aux images
const images = [
  "assets/img/dice-1.png",
  "assets/img/dice-2.png",
  "assets/img/dice-3.png",
  "assets/img/dice-4.png",
  "assets/img/dice-5.png",
  "assets/img/dice-6.png"
];

let intervalId; // Pour stocker l'ID de l'intervalle
let randomIndex; // Pour stocker l'index actuel
let score = 0;
let currentScore = 0; // Pour stocker le score total 
let total_p1 = 0
let total_p2 = 0

// Fonction pour afficher une image aléatoire
function afficherImageAleatoire() {
  randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  const imageElement = document.getElementById("randomImage");
  imageElement.src = randomImage;
}
// Démarrer le défilement des images

var dice = document.getElementById("dice");

function demarrerDefilement() {
  afficherImageAleatoire(); // Affiche une image aléatoire dès le début
  intervalId = setInterval(afficherImageAleatoire, 100);
  dice.classList.add("container-commands__dice--rotate");
  setTimeout(arreterDefilement, 1000);
}

  // Arrêter le défilement des images
  function arreterDefilement() {
    clearInterval(intervalId);
    dice.classList.remove("container-commands__dice--rotate");
    score = randomIndex + 1;
    calcCurrentScore();
  }

  // Stocker les points dans le total par joueur 

  function holdScore() {
    total_p1 += currentScore;
    let affTotalP1 = document.getElementById("total-p1");
    affTotalP1.innerHTML = total_p1;
    currentscore_p1.innerHTML = 0;
  }

  // Toggle Player 

  function toggleClass(element, className) {
    if (element.classList.contains(className)) {
      // La classe est présente, donc la retirer
      element.classList.remove(className);
    } else {
      // La classe n'est pas présente, donc l'ajouter
      element.classList.add(className);
    }
    //var element = document.querySelector('.container-conmmand__fond ');
    
    /* // Vérifier si l'élément existe
    if (element.style.left = '-50%') {
        element.style.left = '50%';
    } else if (element.style.left = '50%') {
      element.style.left = '-50%';
    } */
  }
  
  const player_1 = document.getElementById("player-1")
  const player_2 = document.getElementById("player-2")
  const command_panel = document.getElementById("command-panel")
  
  const holdButton = document.getElementById("hold-button")
  holdButton.addEventListener("click", holdScore);

  // Au clic sur le bouton, la classe "activ" sera ajoutée ou retirée
holdButton.addEventListener('click', function() {
  toggleClass(player_1, 'container-player--activ');
  toggleClass(player_2, 'container-player--activ');
  toggleClass(command_panel, 'container-conmmand__fond--activ');
});


  // Associer les boutons aux fonctions
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", demarrerDefilement);


// Calcul et Stockage du données
let currentscore_p1 = document.getElementById("currentscore_p1");

function calcCurrentScore() {
  if (score == 1){
    currentScore = 0
  }
  else {
    currentScore += score;
  }
  currentscore_p1.innerHTML = currentScore;
}

