// Game values
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random()*(max-min+1)+min),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min & max
minNum.textContent = min;
maxNum.textContent = max;

// Gamewrapper event listner for play again
game.addEventListener('mousedown', (e) => {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})


// Listen for guess
guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum) {
        gameOver(true, `Congratulations ${winningNum} is correct!`, 'green');

    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `Game over, you lose. Correct number was ${winningNum}`);

        } else {
            // Game continues - answer wrong
            guessInput.style.borderColor = 'red';
            guessInput.value = "";
            setMessage(`Guess incorrect, ${guessesLeft} guesses left`, 'red');
        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play agian';
    guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
      