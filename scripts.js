function generateWinningNumber(){
    return Math.floor((Math.random()*100)+1);
}

//REVIEW SHUFFLE METHODOLOGY
//Sort of operates like a backwards for loop,
//counting backwards through array and swapping
//current random element with the last ele in the array,
//and then only shuffle the remainder of the array
function shuffle(array){
    var m = array.length, temp, i;

  // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        temp = array[m];
        array[m] = array[i];
        array[i] = temp;
    }
    return array;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber; 
}
Game.prototype.checkGuess = function(){
    if(this.playersGuess===this.winningNumber){
        return 'You Win!';
    }
    else { 
        if(this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            var difference = this.difference();
            if(this.pastGuesses.length === 5){
                return 'You Lose.';
            }
            if(difference < 10){
                return "You're burning up!"
            }
            else if(difference < 25) {
                return "You're lukewarm."
            }
            else if(difference < 50){
                return "You're a bit chilly."
            }
            else{
               return "You're ice cold!" 
            }
        }
    }

}

Game.prototype.playersGuessSubmission = function(num){
    if(num > 100 || num < 1 || typeof num != 'number'){
        throw "That is an invalid guess."
    }
    this.playersGuess = num;
    return this.checkGuess();
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint = function(){
    var hints = [this.winningNumber, generateWinningNumber(),generateWinningNumber()];
    return shuffle(hints);
}