/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js to create a Phrase class to handle the creation of phrases.
 * */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
        * Display phrase on game board
    */
    addPhraseToDisplay() {
        const letters = this.phrase.split('');
        const ul = document.querySelector('#phrase ul');

        for (let i = 0; i < letters.length; i++) {
            let li = document.createElement('li');

            if (letters[i] === ' ') {
                li.setAttribute('class', `space ${letters[i]}`);
            } else {
                li.setAttribute('class', `hide letter ${letters[i]}`);
            }
            li.textContent = letters[i];
            ul.appendChild(li)
        }
        return letters
    };

/**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
*/
     checkLetter(letter) {
        return this.phrase.includes(letter);
    };

/**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
*/
    showMatchedLetter(letter) {
        const ul = document.getElementById('phrase').firstElementChild;

        for ( let i = 0; i < this.phrase.length; i++ ) {
            const phraseMatch = ul.getElementsByClassName(letter)[i];

            if (phraseMatch) {
                phraseMatch.classList = `show letter ${letter}`;
            }
        }
    };
};