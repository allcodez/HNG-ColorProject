const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1', '#33FFF6'];
let targetColor = '';
let score = 0;

const colorBox = document.getElementById('colorBox');
const colorOption = document.getElementById('colorOption');
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

function startNewGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameStatus.textContent = '';
    gsap.fromTo(colorBox, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    generateNewColor();
}

function generateNewColor() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    colorOption.innerHTML = '';

    colors.forEach(color => {
        const btn = document.createElement('div');
        btn.className = 'color-option';
        btn.style.backgroundColor = color;
        btn.setAttribute('data-testid', 'colorOption');
        btn.addEventListener('click', () => handleGuess(color));
        colorOption.appendChild(btn);
    });
}

function handleGuess(color) {
    if (color === targetColor) {
        score++;
        gameStatus.textContent = 'Correct! 🎉';

        gsap.timeline()
            .to(colorBox, { rotation: 360, duration: 1, ease: 'power2.inOut', onComplete: generateNewColor })
            .fromTo(colorBox, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });

        gsap.fromTo(gameStatus, { scale: 0 }, { scale: 1.2, duration: 0.5, ease: 'bounce' });
    } else {
        gameStatus.textContent = 'Wrong! Try again.';
        gsap.fromTo(gameStatus, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        gsap.fromTo(colorBox, { x: -10 }, { x: 10, yoyo: true, repeat: 5, duration: 0.05 });
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

newGameButton.addEventListener('click', startNewGame);

startNewGame();
