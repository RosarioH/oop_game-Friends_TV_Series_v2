/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js  to create a Game class with methods for starting and ending the game, 
 * handling interactions, getting a random phrase, checking for a win, and removing 
 * a life from the scoreboard.
 * */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
        * Creates phrases for use in game
        * @return {array} An array of phrases that could be used in the game
    */
    createPhrases() {
        const phrasesArray = [new Phrase("We were on a break"),
        new Phrase("Pivot"),
        new Phrase("Joey doesnt share food"),
        new Phrase("Oh my god"),
        new Phrase("He her lobster"),
        new Phrase("How you doing")];
        return phrasesArray;
    }

    /**
        * Selects random phrase from phrases property
        * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }

    /**
        * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {

        document.getElementById("overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button) {
        let key = this.activePhrase.checkLetter(button.textContent);
        button.disabled = true;

        if (!key) {
            button.classList = 'wrong';
            this.removeLife();
        } else {
            this.activePhrase.showMatchedLetter(button.textContent);
            button.classList = 'chosen';
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        }
    };

    /**
        * Checks for winning move
        * @return {boolean} True if game has been won, false if game wasn't won
    */
    checkForWin() {
        const displayHide = document.getElementsByClassName('hide');

        if (displayHide.length === 0) {
            return this.gameOver(true);
        } else {
            return false;
        }
    };

    /**
        * Increases the value of the missed property
        * Removes a life from the scoreboard
        * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        if (this.missed < 4) {
            const scoreboard = document.getElementById('scoreboard');
            const image = scoreboard.getElementsByTagName("img");
            let currentImage = image[this.missed];

            if (currentImage.src.includes('liveHeart.png')) {
                let lostHeart = currentImage.src.replace('liveHeart.png', 'lostHeart.png');
                currentImage.src = lostHeart;
            }
        } else {
            this.gameOver();
        }
        this.missed++
    };

    /**
        * Displays game over message
        * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        let gameMessage = document.getElementById('game-over-message');

        if (gameWon) {
            gameMessage.textContent = 'You won, way to go!';
            let overlay = document.getElementById('overlay');
            overlay.removeAttribute('style');
            overlay.setAttribute('class', 'win');
        } else {
            gameMessage.textContent = 'Sorry, better luck next time!';
            overlay.removeAttribute('style');
            overlay.setAttribute('class', 'lose');
        }

        // Reset the game board 
        const firstPhrase = document.getElementById('phrase').firstElementChild;
        firstPhrase.innerHTML = '';

        // Reset buttons on screen
        const keys = document.querySelectorAll('.keyrow button');

        keys.forEach(reset => {
            reset.className = 'key';
            reset.removeAttribute('disabled');
        });

        // Reset lives
        const lives = document.querySelectorAll('.tries img');

        lives.forEach( life => {
            life.setAttribute('src', 'images/liveHeart.png')
        })
    }
};