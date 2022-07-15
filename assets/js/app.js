var timeLeft = 100;
var secondsEl = document.getElementById('timer-number');

document.getElementById("start-button").addEventListener("click", function () {
    var timeLeft = 100;

    var timer = setInterval(function function1(){
        document.getElementById("timer-number").innerHTML = timeLeft + " seconds remaining";

        timeLeft -= 1;
        if(timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("timer-text").innerHTML = "Time is up!"
        }
    }, 1000);
});

function startQuiz (){
    var element = document.getElementById("instructions");
    element.style.display = "none";

    //quizProgressBar();
    //countdown();
}