// Pomysł na grę: Symulator Baristy - Przygotowywanie Kawy

// Pomocne zmienne globalne
const canvas = document.getElementById('coffeeCanvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('menu');
const gameOverScreen = document.getElementById('game-over');
const successMessage = document.getElementById('success-message');

// Parametry kawy i mleka
let selectedMilk = null;
let milkFoamLevel = 0;
let targetCoffee = null;

// Dostępne rodzaje kaw i mleka
const coffeeTypes = [
    { name: 'Latte', espresso: 1, milk: 3, foam: 1 },
    { name: 'Cappuccino', espresso: 1, milk: 2, foam: 2 },
    { name: 'Flat White', espresso: 1, milk: 3, foam: 0.5 },
    { name: 'Macchiato', espresso: 1, milk: 1, foam: 1 }
];

const milkTypes = [
    { name: 'Normalne', foamable: true },
    { name: 'Bezlaktowe', foamable: true },
    { name: 'Sojowe', foamable: true },
    { name: 'Migdałowe', foamable: false }
];

// Sterowanie grą i logika
function startGame() {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    resetGame();
    generateCoffeeOrder();
    gameLoop();
}

function resetGame() {
    selectedMilk = null;
    milkFoamLevel = 0;
    targetCoffee = null;
    gameOverScreen.style.display = 'none';
    canvas.style.display = 'block';
}

function generateCoffeeOrder() {
    targetCoffee = coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)];
    alert(`Klient zamówił: ${targetCoffee.name}`);
}

// Wybór mleka
function selectMilk(milkIndex) {
    selectedMilk = milkTypes[milkIndex];
    alert(`Wybrano mleko: ${selectedMilk.name}`);
}

// Spienianie mleka
function frothMilk() {
    if (!selectedMilk) {
        alert('Najpierw wybierz mleko!');
        return;
    }
    if (!selectedMilk.foamable) {
        alert('To mleko nie nadaje się do spieniania!');
        return;
    }
    milkFoamLevel = Math.random() * 2 + 0.5; // Losowa wartość spienienia
    alert(`Poziom spienienia mleka: ${milkFoamLevel.toFixed(1)}`);
}

// Przygotowanie kawy
function prepareCoffee() {
    if (!selectedMilk) {
        alert('Najpierw wybierz mleko!');
        return;
    }
    if (!targetCoffee) {
        alert('Brak zamówienia do przygotowania.');
        return;
    }
    const isMilkAmountCorrect = milkFoamLevel >= targetCoffee.foam - 0.5 && milkFoamLevel <= targetCoffee.foam + 0.5;
    if (isMilkAmountCorrect) {
        successMessage.innerText = `Kawa ${targetCoffee.name} została poprawnie przygotowana!`;
        gameOverScreen.style.display = 'block';
    } else {
        alert('Niestety, kawa nie spełnia oczekiwań klienta. Spróbuj ponownie.');
    }
}

// Rysowanie i logika gry
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Symulator Baristy', 20, 40);
    if (selectedMilk) {
        ctx.fillText(`Wybrane mleko: ${selectedMilk.name}`, 20, 80);
    }
    if (targetCoffee) {
        ctx.fillText(`Zamówienie: ${targetCoffee.name}`, 20, 120);
    }
    ctx.fillText(`Poziom spienienia mleka: ${milkFoamLevel.toFixed(1)}`, 20, 160);
}

function gameLoop() {
    drawGame();
    requestAnimationFrame(gameLoop);
}

// HTML elementy
const milkSelectionButtons = milkTypes.map((milk, index) => {
    const button = document.createElement('button');
    button.innerText = milk.name;
    button.onclick = () => selectMilk(index);
    document.body.appendChild(button);
    return button;
});

const frothButton = document.createElement('button');
frothButton.innerText = 'Spień mleko';
frothButton.onclick = frothMilk;
document.body.appendChild(frothButton);

const prepareCoffeeButton = document.createElement('button');
prepareCoffeeButton.innerText = 'Przygotuj kawę';
prepareCoffeeButton.onclick = prepareCoffee;
document.body.appendChild(prepareCoffeeButton);

const startButton = document.createElement('button');
startButton.innerText = 'Rozpocznij grę';
startButton.onclick = startGame;
document.body.appendChild(startButton);
