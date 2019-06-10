/*
    guess number tween min max
    get certain amount of guesses
    notify of num guesses remaining
    notify of correct answer if lose
    let player choose play again
*/

// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

console.log(winningNum);

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again
game.addEventListener('mousedown', e => {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen guess
guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    if (guess === winningNum) {
        gameOver(true, `${winningNum} is right! You win!`);
    } else {
        guessesLeft -= 1;
        console.log(guessesLeft);

        if (guessesLeft === 0) {
            // you lose
            gameOver(
                false,
                `You lose, no more guesses for you! Number was ${winningNum}`
            );
        } else {
            // game continues - answer wrong
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`Wrong!  Guess again! ${guessesLeft} guesses left!`);
        }
    }
});

function gameOver(won, msg) {
    let color;

    won === true ? (color = 'green') : (color = 'red');

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

    // since class was added after page loads we need to add listener
    // to a parent and searhc for target we want
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
