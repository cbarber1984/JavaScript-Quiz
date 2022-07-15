var timeLeft = 100;
var secondsEl = document.getElementById('timer-number');
var myQuestions = [
    {
        question: "Who invented JavaScript?",
        answers: {
            a: "Douglas Crockford",
            b: "Sheryl Sandberg",
            c: "Brendan Eich"
        },
        correctAnswer: "c"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
            a: "Node.js",
            b: "TypeScript",
            c: "npm"
        },
        correctAnswer: "c"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: {
            a: "Angular",
            b: "jQuery",
            c: "RequireJS",
            d: "ESLint"
        },
        correctAnswer: "d"
    }
];

var score = 0;

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // variable to store the list of possible answers
            const answers =[];

            // and for each available answer...
            for(letter in currentQuestion.answers){
                
                // ...add an HTML radio button
                answers.push(
                    `<label>
                    <input type="button" name="question${questionNumber}" value="${currentQuestion.answers[letter]}"> 
                    </label>`
                );
                    
            }

            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div> 
                <div class="answers">${answers.join('')} </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){
    console.log('show results');
}

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
    buildQuiz();
}

submitButton.addEventListener('click', showResults);