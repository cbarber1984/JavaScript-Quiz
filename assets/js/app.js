const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainerElement = document.getElementById('question-container');
const instructions = document.getElementById('instructions');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')
var score = 0;

let shuffledQuestions, currentQuestionIndex



startButton.addEventListener('click', startGame);
function startGame(){
    startButton.classList.add('hide')
    shuffledQuestions = myQuestions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    instructions.classList.add('hide')
    setNextQuestion();
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
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
        score = score +1;
    }
    console.log('score = ' + score);
    if(currentQuestionIndex < myQuestions.length -1) {
        currentQuestionIndex = currentQuestionIndex + 1;
        setNextQuestion();
    } else {
        console.log("finished")
    }
    
    // setStatusClass(document.body, correct)
    // Array.from(answerButtonsElement.children).forEach(button => {
    //     setStatusClass(button,button.dataset.correct)
    // })
}

// function setStatusClass(element, correct) {
//     clearStatusClass(element)
//     if(correct) {
//         element.classList.add('correct')
//     } else {
//         element.classList.add('wrong')
//     }
// }

// function clearStatusClass(element){
//     element.classList.remove('correct')
//     element.classList.remove('wrong')
// }

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
        question: "Which tool can you use to ensure code quality?",
        answers: [
            {text: "Angular", correct: false},
            {text: "jQuery", correct: false},
            {text: "RequireJS", correct: false},
            {text: "ESLint", correct: true}
        ]
    }
];






// var timeLeft = 100;
// var secondsEl = document.getElementById('timer-number');



// const quizContainer = document.getElementById('quiz');
// const resultsContainer = document.getElementById('results');
// const submitButton = document.getElementById('submit');

// function buildQuiz(){
//     // variable to store the HTML output
//     const output = [];

//     // for each question...
//     myQuestions.forEach(
//         (currentQuestion, questionNumber) => {
//             // variable to store the list of possible answers
//             const answers =[];

//             // and for each available answer...
//             for(letter in currentQuestion.answers){
                
//                 // ...add an HTML radio button
//                 answers.push(
//                     `<label>
//                     <input type="button" name="question${questionNumber}" value="${currentQuestion.answers[letter]}"> 
//                     </label>`
//                 );
                    
//             }

//             // add this question and its answers to the output
//             output.push(
//                 `<div class="question"> ${currentQuestion.question} </div> 
//                 <div class="answers">${answers.join('')} </div>`
//             );
//         }
//     );

//     // finally combine our output list into one string of HTML and put it on the page
//     quizContainer.innerHTML = output.join('');
// }

// function showResults(){
//     console.log('show results');

//     // gather answer containers from our quiz
//     const answerContainers = quizContainer.querySelectorAll('.answers');

//     // keep track of user's answers
//     let numCorrect = 0;

//     // for each question...
//     myQuestions.forEach((currentQuestion, questionNumber) => {

//         // find selected answer
//         const answerContainer = answerContainers[questionNumber];
//         const selector = `input[name=question${questionNumber}]:checked`;
//     })
// }

// document.getElementById("start-button").addEventListener("click", function () {
//     var timeLeft = 100;

//     var timer = setInterval(function function1(){
//         document.getElementById("timer-number").innerHTML = timeLeft + " seconds remaining";

//         timeLeft -= 1;
//         if(timeLeft <= 0) {
//             clearInterval(timer);
//             document.getElementById("timer-text").innerHTML = "Time is up!"
//         }
//     }, 1000);
// });

// function startQuiz (){
//     var element = document.getElementById("instructions");
//     element.style.display = "none";

//     //quizProgressBar();
//     //countdown();
//     buildQuiz();
// }

// submitButton.addEventListener('click', showResults);