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
  setTimeout(arreterDefilement, 2000);
}

  // Arrêter le défilement des images
  function arreterDefilement() {
    clearInterval(intervalId);
    dice.classList.remove("container-commands__dice--rotate");
  }

// Associer les boutons aux fonctions
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", demarrerDefilement);