// script.js
const wordList = document.getElementById('wordList');
const letterList = document.getElementById('letterList');
const words = ['apple', 'banana', 'cherry', 'date']; // 4 sample words
const letters = 'abcdefghijklmnopqrstuvwxyz'; // all letters

// Initialize game
let selectedWord = '';
let selectedLetters = '';

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function updateWordList() {
    wordList.innerHTML = '';
    words.forEach((word) => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordElement.textContent = word;
        wordList.appendChild(wordElement);
    });
}

function updateLetterList() {
    letterList.innerHTML = '';
    const shuffledLetters = shuffle(letters.split(''));
    shuffledLetters.forEach((letter) => {
        const letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.textContent = letter;
        letterList.appendChild(letterElement);
    });
}

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    selectedLetters = '';
    updateWordList();
    updateLetterList();
}

startGame();

// Event listeners for word and letter selection
wordList.addEventListener('click', (e) => {
    const wordElement = e.target;
    if (wordElement.classList.contains('word')) {
        const word = wordElement.textContent;
        if (selectedWord === word) {
            selectedWord = '';
            wordElement.classList.remove('selected');
        } else {
            selectedWord = word;
            wordElement.classList.add('selected');
        }
    }
});

letterList.addEventListener('click', (e) => {
    const letterElement = e.target;
    if (letterElement.classList.contains('letter')) {
        const letter = letterElement.textContent;
        if (selectedLetters.includes(letter)) {
            selectedLetters = selectedLetters.replace(letter, '');
            letterElement.classList.remove('selected');
        } else {
            selectedLetters += letter;
            letterElement.classList.add('selected');
        }
    }
});
