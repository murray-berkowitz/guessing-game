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
        $('.notification h1').text('Congratulations!');
        $('.notification').addClass('fade victory');
        $('#main').addClass('alerted');
        setTimeout(function(){
            $('.notification').removeClass('fade victory');
            $('#main').removeClass('alerted');
        },2500);
        $('.enter, .hint').addClass('disable');
        return 'You Win!';
    }
    else { 
        if(this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('.attempt-'+this.pastGuesses.length+' h1').text(this.playersGuess);
            var difference = this.difference();
            if(this.pastGuesses.length === 4){
                $('.notification h1').text('You suck.');
                $('.notification').addClass('fade lose');
                $('#main').addClass('alerted');
                setTimeout(function(){
                    $('.notification').removeClass('fade lose');
                    $('#main').removeClass('alerted');
                },2500);
                $('.enter, .hint').addClass('disable');
                return 'You Lose.';
            }
            if(difference < 10){
                $('.notification h1').text('SCORCHING HOT!');
                $('.notification').addClass('fade burning');
                $('#main').addClass('alerted');
                setTimeout(function(){
                    $('.notification').removeClass('fade burning');
                    $('#main').removeClass('alerted');
                },2500);
                return "You're burning up!"
            }
            else if(difference < 25) {
                $('.notification h1').text('Heating up...');
                $('.notification').addClass('fade heating');
                $('#main').addClass('alerted');
                setTimeout(function(){
                    $('.notification').removeClass('fade heating');
                    $('#main').removeClass('alerted');
                },2500);
                return "You're lukewarm."
            }
            else if(difference < 50){
                $('.notification h1').text("It's a tad chilly in here...");
                $('.notification').addClass('fade cool');
                $('#main').addClass('alerted');
                setTimeout(function(){
                    $('.notification').removeClass('fade cool');
                    $('#main').removeClass('alerted');
                },2500);
                return "You're a bit chilly."
            }
            else{
                $('.notification h1').text('Colder than the Rockies');
                $('.notification').addClass('fade freezing');
                $('#main').addClass('alerted');
                setTimeout(function(){
                    $('.notification').removeClass('fade freezing');
                    $('#main').removeClass('alerted');
                },2500);
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
    console.log(this.playersGuess);
    return this.checkGuess();
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint = function(){
    var hints = [this.winningNumber, generateWinningNumber(),generateWinningNumber()];
    return shuffle(hints);
}

function initializeGuess(game){
    var input = $('#guess').val();
    $('#guess').val("");
    var result = game.playersGuessSubmission(parseInt(input));
    console.log(result);
}

$(document).ready(function(){
    var game = newGame();
    $('.enter').click(function(e){
        initializeGuess(game);
    })
    $('#guess').keypress(function(e){
        if (e.which == 13){
            initializeGuess(game);
        }
    })
    $('.reset').click(function(e){
        game = newGame();
         $('.enter, .hint').removeClass('disable');
        $('*[class^="attempt-"] h1').text('--');
    })
})