// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz';

// Get array from letters
let lettersArray = Array.from(letters);

// Select letters container
let lettersContainer = document.querySelector(".letters");

// Object of words + categories
const words = {
    programming: ["javascript", "python", "ruby", "java", "cpp", "php", "swift"],
    movies: ["inception", "interstellar", "parasite", "titanic", "matrix", "avatar"],
    people: ["albert einstein", "hitchcock", "alexander", "cleopatra", "mahatma gandhi"],
    countries: ["syria", "palestine", "yemen", "egypt", "bahrain", "qatar"]
};

let allKeys = Object.keys(words);
let randomPropNumber, randomPropName, randomPropValue, randomValueNumber, randomValue;

let wrongAttempts = 0;
const maxAttempts = 6; // Updated to 6 to match the hangman steps

let currentWord = [];
let guessedWord = [];

// Select elements
let categorySpan = document.querySelector(".category span");
let lettersGuessContainer = document.querySelector(".letters-guess");
let hangmanDraw = document.querySelector(".hangman-draw");

// Initialize game
function initGame() {
    // Empty letters container
    lettersContainer.innerHTML = '';

    // Generate letters
    lettersArray.forEach(letter => {
        let span = document.createElement("span");
        let theLetter = document.createTextNode(letter);
        span.appendChild(theLetter);
        span.className = 'letter-box';
        lettersContainer.appendChild(span);
    });

    // Choose random word
    randomPropNumber = Math.floor(Math.random() * allKeys.length);
    randomPropName = allKeys[randomPropNumber];
    randomPropValue = words[randomPropName];
    randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
    randomValue = randomPropValue[randomValueNumber];

    // Set category
    categorySpan.innerHTML = randomPropName;

    // Convert chosen word to array and create guessed word array
    currentWord = Array.from(randomValue);
    guessedWord = Array(currentWord.length).fill('_');

    // Create guess spans
    lettersGuessContainer.innerHTML = '';
    guessedWord.forEach(letter => {
        let emptySpan = document.createElement("span");
        if (letter === ' ') emptySpan.className = 'with-space';
        lettersGuessContainer.appendChild(emptySpan);
    });

    // Reset wrong attempts and hangman draw
    wrongAttempts = 0;
    hangmanDraw.className = 'hangman-draw';
}

// Handle clicking on letters
document.addEventListener('click', (e) => {
    if (e.target.className === 'letter-box') {
        let clickedLetter = e.target.innerHTML.toLowerCase();
        e.target.classList.add("clicked");

        if (currentWord.includes(clickedLetter)) {
            // Correct guess
            currentWord.forEach((letter, index) => {
                if (letter === clickedLetter) {
                    guessedWord[index] = clickedLetter;
                }
            });
            updateGuessedWord();
        } else {
            // Wrong guess
            wrongAttempts++;
            hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts === maxAttempts) {
                endGame(false);
            }
        }

        // Check if word is complete
        if (!guessedWord.includes('_')) {
            endGame(true);
        }
    }
});

// Update guessed word display
function updateGuessedWord() {
    lettersGuessContainer.innerHTML = '';
    guessedWord.forEach(letter => {
        let span = document.createElement("span");
        let letterNode = document.createTextNode(letter);
        span.appendChild(letterNode);
        if (letter === ' ') span.className = 'with-space';
        lettersGuessContainer.appendChild(span);
    });
}

// End game function
// End game function using SweetAlert2
function endGame(isWinner) {
    lettersContainer.classList.add("finished");

    let message = isWinner 
        ? `Congratulations! You guessed the word: ${randomValue}`
        : `Game Over. The word was: ${randomValue}`;

    Swal.fire({
        title: isWinner ? "Congratulations!" : "Game Over!",
        text: message,
        icon: isWinner ? "success" : "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Play Again"
    }).then((result) => {
        if (result.isConfirmed) {
            restartGame();
        }
    });
}


// Restart game function
// Restart game function
function restartGame() {
    // Remove popup
    Swal.close();

    // Reset game state
    lettersContainer.classList.remove("finished");
    hangmanDraw.className = 'hangman-draw';

    // Clear guessed word and letters containers
    lettersGuessContainer.innerHTML = '';
    lettersContainer.innerHTML = '';

    // Reset variables
    currentWord = [];
    guessedWord = [];
    wrongAttempts = 0;

    // Initialize game
    initGame();
}


// Initialize the game when the script loads
initGame();
