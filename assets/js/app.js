const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const resetButton = document.getElementById('reset-scores');
const questionContainerElement = document.getElementById('question-container');
const instructions = document.getElementById('instructions');
const questionElement = document.getElementById('question');
const results = document.getElementById('results');
const answerButtonsElement = document.getElementById('answer-buttons')
const highScoresElement = document.getElementById('high-scores');
var score = 0;
const displayScore = document.getElementById('final-score');
const playerScore = [];
var previousReponse = "";
const responseCorrect = document.getElementById('feedback-correct');
const responseInorrect = document.getElementById('feedback-incorrect');
var timeLeft = 100;
var quizTimer;
const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';
const highScoreString = localStorage.getItem(HIGH_SCORES);
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);

function startGame(){
    startButton.classList.add('hide')
    shuffledQuestions = myQuestions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    instructions.classList.add('hide')
    
    startTimer();
    setNextQuestion();
}

function resetScore(){
    localStorage.clear();
    showHighScore();
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    if(previousReponse === "correct") {
        document.getElementById('feedback-correct').classList.remove('hide')
        responseInorrect.classList.add('hide')
    } else if(previousReponse === "incorrect") {
        responseCorrect.classList.add('hide')
        responseInorrect.classList.remove('hide')
    }
}

function showQuestion(myQuestions) {
    questionElement.innerText = myQuestions.question
    myQuestions.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    console.log(selectedButton);
    if(correct) {        
        score = score + 1;
        previousReponse = "correct"
        console.log(previousReponse);
    } else {
        previousReponse = "incorrect";
        timeLeft = timeLeft - 10;
    }
    console.log('score = ' + score + ' playerScore.length = ' + playerScore.length);
    if(currentQuestionIndex < myQuestions.length -1) {
        currentQuestionIndex = currentQuestionIndex + 1;
        setNextQuestion();
    } else {
        questionContainerElement.classList.add('hide');
        results.classList.remove('hide');
        displayScore.innerHTML = score;
        timeLeft = 0;
        console.log("finished")
    }
    
    // setStatusClass(document.body, correct)
    // Array.from(answerButtonsElement.children).forEach(button => {
    //     setStatusClass(button,button.dataset.correct)
    // })
}

function saveScore(score, highScores){
    let playerInitials = document.getElementById("playerInitials").value;
    const name = playerInitials;
    console.log(`playerScore = ` + playerScore.length);
    const scoreToSave = playerScore.length;
    // const newScore = {scoreToSave, name}
    const newScore = {score, name}

    // add score to list
    highScores.push(newScore);

    // sort the list
    highScores.sort((a, b) => b.score - a.score);

    // select new list
    highScores.splice(NO_OF_HIGH_SCORES);

    // save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));

    // hide quiz result section & display high scores
    results.classList.add('hide');
    highScoresElement.classList.remove('hide');

}

function checkHighScore(){
    console.log(`checkHighScore score = ` + score);
    const highScores = JSON.parse(highScoreString) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
    console.log(`checkHighScore highScores = ` + highScores);
    console.log(`lowestScore = ` + lowestScore);

    if(score > lowestScore) {
        saveScore(score, highScores);
        showHighScore();
    } else {
        showHighScore();
    }

    console.log(`checkHighScore end highScores = ` + highScores);

}

function quizComplete(){
    checkHighScore(account.score);

}

function showHighScore(){
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const highScoreList = document.getElementById(HIGH_SCORES);
    let str = JSON.stringify(highScores);
    console.log(`showHighScore highScores = ` + str);
    
    highScoreList.innerHTML = highScores.map((score) => `<li>${score.name} - Score: ${score.score}</li>`).join('');
    // let newArray = highScores.map((score) => `<li>${score.score} - ${score.name}</li>`).join('');
    // console.log('newArray = ' + newArray);

    let str2 = JSON.stringify(highScoreList);
    console.log(`highScoreList = ` + str2);

}

function linkToHighScore(){
    instructions.classList.add('hide');
    highScoresElement.classList.remove('hide');
    showHighScore();
}

function reload(){
    location.reload();
}


var myQuestions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            {text: "Douglas Crockford", correct: false},
            {text: "Sheryl Sandberg", correct: false},
            {text: "Brendan Eich", correct: true},
            {text: "Cesar Martinez", correct: false}
        ]
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            {text: "Node.js", correct: false},
            {text: "TypeScript", correct: false},
            {text: "npm", correct: true},
            {text: "MongoDB", correct: false}
        ]
        
       
    },
     {
        question: "Which operator returns true if the two compared values are not equal?",
        answers: [
            {text: "<>", correct: false},
            {text: "~", correct: false},
            {text: "==!", correct: false},
            {text: "!==", correct: true}
        ]
        
       
    },
    {
        question: "How is a forEach statement different from a for statement?",
        answers: [
             {text: "Only a for statement uses a callback function.", correct: false},
            {text: "A forEach statement is generic, but a for statement can be used only with an array.", correct: false},
            {text: "Only a forEach statement lets you specify your own iterator.", correct: false},
            {text: "A for statement is generic, but a forEach statement can be used only with an array.", correct: true}
        ]
        
       
    },
        {
        question: "Which statement is the correct way to create a variable called rate and assign it the value 100?",
        answers: [
             {text: "`let rate = 100", correct: true},
            {text: "let 100 = rate", correct: false},
            {text: "100 = let rate", correct: false},
            {text: "rate = 100", correct: false}
        ]
        
       
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            {text: "Angular", correct: false},
            {text: "jQuery", correct: false},
            {text: "RequireJS", correct: false},
            {text: "ESLint", correct: true}
        ]
    }
];

function startTimer(){
    var timer = setInterval(function function1(){
                document.getElementById("timer-text").innerHTML = "You have " + timeLeft + " seconds remaining";
                timeLeft -= 1;                
                console.log(`time left = ` + timeLeft);
                if(timeLeft <= 0) {
                    clearInterval(timer);
                    document.getElementById("timer-text").innerHTML = "The quiz is complete!"
                    timeLeft = 100;
                }
            }, 1000);
};
