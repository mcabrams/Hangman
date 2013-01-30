(function(){
	"use strict";

	var possibleWords = ["TACO", "RIGHTEOUS", "TAKE THE A TRAIN", "DJ LOOSE FIT", "TESTING THIS OUT"];
	var revWord = "",
		word = "",
		len,
		guesses = [],
		wrongs,
		remain;

	function guessLetter(e) {

		var guess = U.$('guess').value.toUpperCase();

		/* Check if warning exists, if it does, remove it */

		if (U.$('warning')){
			U.$('guessForm').removeChild(U.$('warning'));
		}

		/* Make sure guess is a single character */
		if (guess.length === 1) {

			/* Set assumption that guess is new */
			var newGuess = true;

			/* Check assumption that guess is new, if it isn't set newGuess to false */
			for (var i = 0; i < guesses.length; i++) {
				if (guesses[i] === guess) {
					newGuess = false;
					break;
				}
			}

			/* If guess is new, update revealed word and add letter to guesses*/
			if (newGuess) {

				guesses.push(guess);

				/*Assume letter is not in word*/

				var inWord = false;
				
				for (var j = 0; j < len; j++) {
					if (guess === word[j]) {
						revWord = revWord.substring(0, j) + guess + revWord.substring(j + 1, len);
						inWord = true;
					}
				}

				/* Update HTML to reflect new revealed word and new guess*/
				U.setText('revWord', revWord);

				/* If letter wasn't in word(s), update wrong guesses by adding 1, and reduce guesses remaining by 1 */
				if (!inWord) {
					wrongs += 1;
					remain -= 1;
					U.setText('wrongs', wrongs);
					U.setText('remain', remain);
				}


				/* Update letters guessed, and display */
				var guessesText = "";

				for (var k = 0; k < guesses.length; k++) {
					guessesText += " " + guesses[k];
				}

				U.setText('guesses', guessesText);

				/* Check to see if game is over, handle accordingly */
				if (remain === 0) {
					warnUser('Sorry, game\'s over pal!');
					U.setText('gameover', ' GAME\'S OVER.');
					U.$('submit').disabled = true;
				}
			}
			/* Else, guess is repeat, warn user */
			else {
				warnUser("You already guessed " + guess);
			}
		} else {
			warnUser("Please guess 1 letter");
		}

		if (e) {
			U.preventDef(e);
		}
	}

	function warnUser(message) {
		var warning = document.createElement('label');
		warning.id = "warning";

		if (warning.textContent !== undefined) {
			warning.textContent = message;
		}
		else {
			warning.innerText = message;
		}

		U.$('guessForm').insertBefore(warning, U.$('submit'));

	}

	function newGame(e){

		/* Grab random word */
		word = possibleWords[Math.floor( Math.random() * ( possibleWords.length ) )],
		len = word.length;

		revWord = "";

		/* Generate revealed word, you know: ___ ____ __ */
		for (var i=0; i < len; i++) {
			if (word[i] !== " ") {
				revWord += "_";
			}
			else {
				revWord += " ";
			}
		}

		/* Show ____ _____ __ in HTML */
		U.setText('revWord', revWord);

		/* Set and display wrong guesses and remaining guesses to 0 and 6, respectively */
		wrongs = 0;
		remain = 6;
		U.setText('wrongs', wrongs);
		U.setText('remain', remain);

		/* Set submit to enabled */
		U.$('submit').disabled = false;

		if (e) {
			U.preventDef(e);
		}
	}

	window.onload = function(){

		newGame();
		U.addEvent(U.$('guessForm'), "submit", guessLetter);
		U.addEvent(U.$('newGame'), "click", newGame);

	};
})();