// Pig Game ----> Game Logic

let turn = 1

// VARIABLES ----->

const diceArray = ['dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6']

const player1 = document.querySelector('.player--1'),
    player2 = document.querySelector('.player--2'),
    dice = document.querySelector('.dice__img'),
    roll = document.querySelector('.dice__button--roll'),
    hold = document.querySelector('.dice__button--hold'),
    modalBtn = document.querySelector('.modal__btn')

let accumulatedPoints = 0


// PLAYER STATES

player1.classList.add('player--active')

// FUNCTIONS ---->

function updateScore(points) {
    document.querySelector(`.player--${turn} .player__score`).textContent = points.toString();
}

function resetScore() {
    document.querySelector(`.player--${turn} .player__score`).textContent = '0';
}

function updateCurrentPoints(points) {
    document.querySelector(`.player--${turn} .current__score`).textContent = points.toString();
    accumulatedPoints = 0
}

function changePlayer() {
    if (turn === 1) {
        player1.classList.remove('player--active')
        player2.classList.add('player--active')

        turn = 2;
    } else {
        player2.classList.remove('player--active')
        player1.classList.add('player--active')

        turn = 1;
    }
}

// BUTTONS ACTIONS ---->

roll.addEventListener('click', () => {

    const diceNumber = Math.floor(Math.random() * 5);
    dice.src = `assets/images/${diceArray[diceNumber]}.png`

    accumulatedPoints += (diceNumber + 1);

    if (diceNumber === 0) {
        resetScore()
        accumulatedPoints = 0
        changePlayer()
    } else {
        updateScore(accumulatedPoints)
    }
})

hold.addEventListener('click', () => {
    const points = document.querySelector(`.player--${turn} .current__score`).textContent

    accumulatedPoints += Number(points)

    if (accumulatedPoints < 20) {
        updateCurrentPoints(accumulatedPoints)
        changePlayer()
    } else {
        document.querySelector('.modal__title').textContent = `Player ${turn} Wins`
        document.querySelector('.modal').classList.remove('hidden')
        document.querySelector('.overlay').classList.remove('hidden')
    }
})

modalBtn.addEventListener('click', () => {
    accumulatedPoints = 0

    document.querySelector('.modal').classList.add('hidden')
    document.querySelector('.overlay').classList.add('hidden')

    document.querySelector(`.player--1 .player__score`).textContent = '0';
    document.querySelector(`.player--2 .player__score`).textContent = '0';

    document.querySelector(`.player--1 .current__score`).textContent = '0';
    document.querySelector(`.player--2 .current__score`).textContent = '0';

    if(turn === 2){
        changePlayer()
    }
})