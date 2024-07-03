var colors=["green","red","yellow","blue"];

var gamePattern=[];
var selectedPattern=[];

var started=false;
var level=0;

$(document).keypress(function()
{
    if(!started)
    {
        $("h1").text("Level "+level);
        started=true;
        nextSequence();
    }
});

$(".btn").click(function()
{
    //console.log("Hi");
    var pressedColor=this.id;
    selectedPattern.push(pressedColor);
    //console.log(selectedPattern);
    playAudio(pressedColor);
    $("#"+pressedColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+pressedColor).removeClass("pressed");
    },100);

    checkSequence(selectedPattern.length-1);
});

function nextSequence()
{
    selectedPattern = [];
    level++;
    $("h1").text("Level "+level);

    var randomNum=Math.floor(Math.random()*4);
    var randomColor = colors[randomNum];
    //console.log(randomColor);

    gamePattern.push(randomColor);
    $("."+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playAudio(randomColor);
}

function playAudio(randomColor)
{
    var audio=new Audio(randomColor+".mp3");
    audio.play();
}

function checkSequence(currLevel)
{
    if(selectedPattern[currLevel]===gamePattern[currLevel])
    {
        if(selectedPattern.length===gamePattern.length){
            console.log("Right");
            setTimeout(function(){
                nextSequence();},1000);
        }
    }
    else
    {
        playAudio("wrong");
        $("body").addClass("game-over");
        $("h1").text("Press any key to restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          startOver();
    }
}


    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
      }



