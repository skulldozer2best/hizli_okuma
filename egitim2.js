const words = ["JAVASCRIPT", "HTML", "CSS", "PROGRAM", "KOD", "WEB", "TARAYICI", "İNTERNET", "SUNUCU"];

let timerInterval;
let duration;
let foundCount = 0;
let foundWords = [];
let selectedWords = [];
let gridSize;
let container;
let upperWordsContainer;

function startGame() {
    console.log('Starting game...');
    gridSize = parseInt(document.getElementById('grid-size').value);
    const wordCount = parseInt(document.getElementById('word-count').value);
    const durationInput = parseInt(document.getElementById('duration').value);

    document.getElementById('timer').innerText = formatTime(durationInput);
    document.getElementById('found-count').innerText = '0';
    document.getElementById('words-to-find').innerText = '';

    clearInterval(timerInterval);
    duration = durationInput;
    foundCount = 0;
    foundWords = [];
    timerInterval = setInterval(() => {
        console.log('Timer interval:', duration);
        duration--;
        document.getElementById('timer').innerText = formatTime(duration);
        if (duration <= 0) {
            console.log('Game over!');
            clearInterval(timerInterval);
            alert('Süre doldu! Oyunu kaybettiniz.');
        }
    }, 1000);

    container = document.getElementById('game-container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;

    upperWordsContainer = document.getElementById('words-to-find');
    upperWordsContainer.innerHTML = '';

    const grid = createGrid(gridSize);
    console.log('Grid created:', grid);

    populateGridWithRandomLetters(grid);
    selectedWords = selectWords(wordCount, grid);
    console.log('Selected words:', selectedWords);
    placeWordsInGrid(grid, selectedWords);
    console.log('Grid populated:', grid);

    renderGrid(container, grid);
    console.log('Grid rendered:', container);

    renderUpperWords(selectedWords);

    container.addEventListener('click', function(event) {
        const cell = event.target;
        if (cell.classList.contains('cell') && !cell.classList.contains('found')) {
            const word = cell.dataset.word;
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const cells = document.querySelectorAll(`[data-word='${word}']`);
            cells.forEach(cell => cell.classList.add('found'));
            if (!foundWords.includes(word)) {
                foundWords.push(word);
                foundCount++;
                document.getElementById('found-count').innerText = foundCount;
                if (foundCount === selectedWords.length) {
                    clearInterval(timerInterval);
                    console.log('Game won!');
                    alert('Tebrikler! Tüm kelimeleri buldunuz.');
                }
            }
        }
    });
}

function formatTime(seconds) {
    console.log('Formatting time:', seconds);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function createGrid(size) {
    console.log('Creating grid...');
    const grid = [];
    for (let i = 0; i < size; i++) {
        grid.push(new Array(size).fill(''));
    }
    console.log('Grid created:', grid);
    return grid;
}

function populateGridWithRandomLetters(grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            grid[row][col] = generateRandomLetter();
        }
    }
}

function selectWords(count, grid) {
    console.log('Selecting words...');
    const selected = [];
    const availableWords = [...words];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const word = availableWords.splice(randomIndex, 1)[0];
        const { row, col } = findEmptyPosition(grid);
        placeWord(grid, word, row, col, Math.floor(Math.random() * 2));
        selected.push(word);
    }
    console.log('Selected words:', selected);
    return selected;
}

function findEmptyPosition(grid) {
    let row, col;
    do {
        row = Math.floor(Math.random() * grid.length);
        col = Math.floor(Math.random() * grid.length);
    } while (grid[row][col] !== '');
    return { row, col };
}

function placeWord(grid, word, row, col, direction) {
    if (direction === 0) { // Horizontal
        for (let i = 0; i < word.length; i++) {
            grid[row][col + i] = word[i];
        }
    } else { // Vertical
        for (let i = 0; i < word.length; i++) {
            grid[row + i][col] = word[i];
        }
    }
}

function renderGrid(container, grid) {
    console.log('Rendering grid...');
    container.innerHTML = '';
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const cell = document.createElement('div');
            cell.innerText = grid[row][col];
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            container.appendChild(cell);
        }
    }
}

function renderUpperWords(words) {
    upperWordsContainer.innerHTML = '';
    for (const word of words) {
        const span = document.createElement('span');
        span.innerText = word;
        span.classList.add('upper-word');
        span.addEventListener('click', function() {
            const targetWord = this.innerText;
            const cells = document.querySelectorAll(`[data-word='${targetWord}']`);
            cells.forEach(cell => cell.classList.add('found'));
        });
        upperWordsContainer.appendChild(span);
    }
}

function generateRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
}

document.getElementById('start-button').addEventListener('click', startGame);
