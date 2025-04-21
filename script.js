const gameBoard = document.getElementById('gameBoard');
const attemptsCounter = document.getElementById('attemptsCounter'); // Elemento del marcador

// Definir las parejas correctas
const cardPairs = {
    "Rata": "Plancha",
    "Plancha": "Rata",
    "Gallo": "Miel",
    "Miel": "Gallo",
    "Cerdo": "Pasteles",
    "Pasteles": "Cerdo",
    "Golondrina": "Árbol",
    "Árbol": "Golondrina",
    "Conejo": "Gafas",
    "Gafas": "Conejo",
    "Lobo": "Diente dorado",
    "Diente dorado": "Lobo"
};

// Mezclar las cartas pero mantener los números en orden
const cardNames = Object.keys(cardPairs);
const orderedNumbers = Array.from({ length: cardNames.length }, (_, i) => i + 1);
const shuffledCards = [...cardNames].sort(() => Math.random() - 0.5);

// Generar HTML para las cartas
shuffledCards.forEach((cardName, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">${orderedNumbers[index]}</div>
            <div class="card-back">${cardName}</div>
        </div>
    `;
    gameBoard.appendChild(card);

    card.addEventListener('click', () => flipCard(card, cardName));
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 0;

function flipCard(card, value) {
    if (lockBoard || card.classList.contains('flip')) return;

    card.classList.add('flip');

    if (!firstCard) {
        firstCard = { card, value };
    } else {
        secondCard = { card, value };
        lockBoard = true;
        attempts++;
        attemptsCounter.textContent = attempts; // Actualizar el marcador
        checkForMatch();
    }
}

function checkForMatch() {
    if (cardPairs[firstCard.value] === secondCard.value) {
        matches++;
        disableCards();
        if (matches === cardNames.length / 2) {
            setTimeout(() => {
                alert("¡RETO CONSEGUIDO!");
                location.reload(); // Recargar la página después de aceptar el mensaje
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.card.removeEventListener('click', flipCard);
    secondCard.card.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.card.classList.remove('flip');
        secondCard.card.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
