document.getElementById('startButton').addEventListener('click', startGame);

const cardsArray = [
    { id: 1, image: 'https://integralmentemae.com/wp-content/uploads/2017/11/304092.jpg' },
    { id: 2, image: 'https://integralmentemae.com/wp-content/uploads/2023/08/desenho-animado-bluey-798x1024.jpeg' },
    { id: 3, image: 'https://integralmentemae.com/wp-content/uploads/2017/11/1174986_487858634643312_1696315206_n.jpg' },
    { id: 4, image: 'https://integralmentemae.com/wp-content/uploads/2017/11/1280x720-ikk.jpg' },
    { id: 5, image: 'https://integralmentemae.com/wp-content/uploads/2017/11/maxresdefault-2.jpg' },
    { id: 6, image: 'https://integralmentemae.com/wp-content/uploads/2017/11/maxresdefault-1.jpg' },
    { id: 7, image: 'https://integralmentemae.com/wp-content/uploads/2017/11/13716224_546429938900624_7224995925632728785_n1.jpg' },
    { id: 8, image: 'https://integralmentemae.com/wp-content/uploads/2017/11/111332525_1300x1733.jpg' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

function startGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    score = 0;
    updateScore();

    // Duplicar o array para formar pares
    const cards = [...cardsArray, ...cardsArray];
    shuffle(cards);

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        cardInner.appendChild(frontFace);

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        const image = new Image();
        image.src = card.image;
        backFace.appendChild(image);
        cardInner.appendChild(backFace);

        cardElement.appendChild(cardInner);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const firstId = firstCard.dataset.id;
    const secondId = secondCard.dataset.id;

    if (firstId === secondId) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    score += 10;
    updateScore();
    checkWin();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function updateScore() {
    document.getElementById('score').innerText = `Pontuação: ${score}`;
}

function checkWin() {
    const flippedCards = document.querySelectorAll('.card.flipped');
    if (flippedCards.length === cardsArray.length * 2) {
        alert(`Parabéns! Você completou o jogo com ${score} pontos.`);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
