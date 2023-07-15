var buttonColors = ["green", "red", "yellow", "blue"];
var randomColors = [];
var userClikedColors = [];
var level = 0;
var started = false;   //biar ngk ke trigger ketika pencet tombol



// Start Game
$(document).on("keydown", function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSquare();
        started = true;
    }

})


// Cek klik
$(".btn").on("click", function(){
    var userChosenColor = this.id;
    userClikedColors.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClikedColors.length - 1);

})



function nextSquare (){
    // Random number
    var randomNumber = Math.floor(Math.random()*buttonColors.length);

    var randomChosenColors = buttonColors[randomNumber];

    randomColors.push(randomChosenColors);
  
    // Efek blur
    $("#"+randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColors);

    level++;
    $("#level-title").text("Level " + level);

    //reset
    userClikedColors = [];

}



// Suara
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100)
}



function checkAnswer(currentLevel){
    if(randomColors[currentLevel] === userClikedColors[currentLevel]){
        console.log("Right");

        if(randomColors.length === userClikedColors.length){
            setTimeout(function(){
                nextSquare();
            }, 1000);
        }
    }

    else{
        console.log("Wrong");
        playSound("wrong");
        gameOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}


function gameOver(){
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
}


function startOver(){
    level = 0;
    randomColors = [];
    started = false;
}
