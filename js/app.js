/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js to create a new instance of the Game class and add event listeners for the start button and onscreen keyboard buttons.
 * */

let game;

document.getElementById('btn__reset').addEventListener('click', (e) => {
    game = new Game();
    game.startGame();
});

let letterButtons = document.querySelectorAll('.key');

for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener('click', (e) => {
        game.handleInteraction(e.target);
    });
}