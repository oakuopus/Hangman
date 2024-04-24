$(function() {
    var words = [
        "words", "trollis", "worldle", "prettier", 
        "canes", "awesome", "random", "zebra", "banana", 
        "computer", "elephant", "kangaroo", "sunshine", "victory", 
        "mystery", "adventure", "happiness", "laughter", "kindness", 
        "wonder", "puzzle", "whisper", "serenity", "harmony", 
        "blossom", "journey", "courage", "bravery", "strength", 
        "unicorn", "dragon", "creativity", "inspire", "imagine", 
        "explore", "discovery", "triumph", "success", "freedom", 
        "fortune", "spirit", "grace", "beauty", "passion", 
        "belief", "legend", "magic", "faith", "dream"
    ];    
    var guessedLetter = [], remainingGuesses = 5
    var chosenWord = words[Math.floor(Math.random()*words.length)];

    for(var i=0; i < chosenWord.length; i++) {
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }

    function updateGuesses(){
        $("#guess-container").empty()
        $("#guess-container").html("Guessed Letters:<br> " + guessedLetter.join(", "));
    }

    var image = document.getElementById("image")
    var wrongguess = 0

    function checkGuess(letter){
        if(chosenWord.indexOf(letter) === -1){
            remainingGuesses--
            $("#remaining-guesses").text(remainingGuesses)
            if(wrongguess === 0){
                image.src = "./2.png"
                wrongguess++
            }else if(wrongguess === 1){
                image.src = "./3.png"
                wrongguess++
            }else if(wrongguess === 2){
                image.src = "./4.png"
                wrongguess++
            }else if(wrongguess === 3){
                image.src = "./5.png"
                wrongguess++
            }else if(wrongguess === 4){
                image.src = "./6.png"
                wrongguess++
            }
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
            alert("You suck, the word was :" + chosenWord)
            resetGame()
            }
        }

    function resetGame(){
        guessedLetter = []
        remainingGuesses = 5
        $('#remaining-guesses').text(remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random() * words.length)]
        image.src = "./1.png"
        wrongguess = 0
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

    $("#remaining-guesses").text(remainingGuesses)
});