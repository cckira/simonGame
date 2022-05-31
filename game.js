var userClickedPattern = [];
var gameOver = true;
var gamePattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];


$(document).keypress(function() {
  if (gameOver) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameOver = false;
  }
});

$(".btn").click(function(e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(e.target.id);
    console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      gameO();
      console.log("wrong");
    }
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeOut(60).fadeIn(60).addClass("pressed");
    setTimeout(function() {
      $('.' + randomChosenColour).removeClass("pressed");
    }, 100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
$("#" + currentColor).addClass("pressed");
setTimeout(function() {
  $('.' + currentColor).removeClass("pressed");
}, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gameO(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over 🥶, Press Any Key to Restart")
  startOver();
;}

function startOver(){
  userClickedPattern = [];
  gameOver = true;
  gamePattern = [];
  level = 0;
};
