const words = ["anlam", "bilgi", "ders", "kod", "tarif", "kitap", "defter", "bilgisayar", "kalem", "mouse", "araba", "eğitim", "eğim", "fıstık", "kodlama"];
let currentWord = "";
let wordIndex = 0;
let correctAnswers = 0;
let selectedWords = [];
let timer;
let timeLeft = 60;
let difficulty = 5;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-game").addEventListener("click", startGame);
    document.getElementById("submit-answer").addEventListener("click", checkAnswer);
    document.getElementById("skip").addEventListener("click", giveHint);
    document.getElementById("finish").addEventListener("click", () => {
        window.location.href = "egitimler.html";
    });
});

function startGame() {
    difficulty = parseInt(document.getElementById("difficulty").value, 10);
    selectedWords = getRandomWords(words, difficulty);
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game").style.display = "block";
    timeLeft = 60;
    startTimer();
    nextWord();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function getRandomWords(wordArray, count) {
    const shuffled = wordArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function nextWord() {
    if (wordIndex < selectedWords.length) {
        currentWord = selectedWords[wordIndex];
        const shuffledWord = shuffleWord(currentWord);
        document.getElementById("shuffled-word-container").innerText = shuffledWord;
        document.getElementById("hint-word").innerText = "_ ".repeat(currentWord.length).trim();
        document.getElementById("answer").value = "";
        document.getElementById("result").innerText = "";
    } else {
        endGame();
    }
}

function checkAnswer() {
    const answer = document.getElementById("answer").value;
    if (answer.toLowerCase() === currentWord) {
        correctAnswers++;
        wordIndex++;
        nextWord();
    } else {
        document.getElementById("result").innerText = "Yanlış, tekrar deneyin!";
    }
}

function giveHint() {
    const currentWordArray = currentWord.split('');
    const currentHintArray = document.getElementById("hint-word").innerText.split(' ');
    let availableIndices = [];

    currentHintArray.forEach((char, index) => {
        if (char === "_") {
            availableIndices.push(index);
        }
    });

    if (availableIndices.length > 0) {
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        currentHintArray[randomIndex] = currentWordArray[randomIndex];
        document.getElementById("hint-word").innerText = currentHintArray.join(' ');
    }
}

function shuffleWord(word) {
    const shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffled !== word ? shuffled : shuffleWord(word);
}

function endGame() {
    clearInterval(timer);
    document.getElementById("finish").style.display = "block";
    document.getElementById("game").style.display = "none";
}
