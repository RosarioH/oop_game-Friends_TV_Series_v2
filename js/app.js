/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js to create a new instance of the Game class and add event listeners for the start button and onscreen keyboard buttons.
 * */

let game;
const letterButtons = document.querySelectorAll('.key');
const startGame = document.getElementById('btn__reset');

window.addEventListener("keypress", (e) => {
    const keyPressed = e.key.toLowerCase();
    const isLetter = (keyPressed >= "a" && keyPressed <= "z");
    if (!isLetter) {
        alert('Sorry only letters');
    }

    letterButtons.forEach(letter => {
        if (keyPressed === letter.textContent) {
            game.handleInteraction(letter);
        }
    })
});

startGame.addEventListener('click', (e) => {
    game = new Game();
    game.startGame();
});

letterButtons.forEach(letter => {
    letter.addEventListener('click', (e) => {
        game.handleInteraction(e.target);
    })
});