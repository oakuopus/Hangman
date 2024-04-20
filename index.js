$(function() {
    var words = ["youloser", "words", "trollis", "worldle", "prettier", "canes"]
    var guessedLetter = [], remainingGuesses = 6
    var chosenWord = words[Math.floor(Math.random()*words.length)];

    for(var i=0; i < chosenWord.length; i++) {
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }

    function updateGuesses(){
        $("#guess-container").empty()
        $("#guess-container").text("Guessed Letters: " + guessedLetter.join(","));
    }

    function checkGuess(letter){
        if(chosenWord.indexOf(letter) === -1){
            remainingGuesses--
            $("#remaining-guesses").text("Remaining Guesses: " + remainingGuesses)
        }else{
            $(".hidden-letter").each(function(index){
                if(chosenWord[index] === letter){
                    $(this).text(letter)
                }
            })
        }
        updateGuesses()
        checkGameStatus()
    }

    function checkGameStatus(){
        if($(".hidden-letter:contains('_')").length === 0){
            alert("Congratulations you Won")
            resetGame()
        }else if(remainingGuesses === 0){
            alert("You suck word was: " + chosenWord)
            resetGame()
            }
        }

    function resetGame(){
        guessedLetter = []
        remainingGuesses = 6
        $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random() * words.length)]
        for(var i=0; i < chosenWord.length; i++) {
            $('#word-container').append('<div class="hidden-letter">_</div>')
        }
        updateGuesses()
    }

    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase()
        if(letter.match(/[a-z]/) && guessedLetter.indexOf(letter) === -1){
            guessedLetter.push(letter)
            checkGuess(letter)
        }
    })

    $("#reset-button").click(function(){
        resetGame()
    })

    $("#remaining-guesses").text("Remaining Guesses: " + remainingGuesses)
});