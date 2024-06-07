const gameContainer = document.querySelector('.game-container');
const startGameButton = document.querySelector('#start-game');

startGameButton.addEventListener('click', startGame);

function startGame() {
    startGameButton.style.display = 'none';
    const grid = [];
    for (let i = 0; i < 4; i++) {
        grid.push ([]);
        for (let j = 0; j < 4; j++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = '${i}-${j}';
            grid[i].push(card);
            gameContainer.appendChild(card)
        }
    }
}

grid.forEach((row) => {
    row.forEach((card) => {
      card.addEventListener('click', flipCard);
    });
  });

// Function to flip a card
function flipCard(event) {
    const card = event.target;
    card.classList.toggle('flipped');
    console.log(`Card ${card.dataset.index} flipped!`);
  }