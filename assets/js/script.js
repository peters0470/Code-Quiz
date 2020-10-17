var startButton = document.querySelector("#start-quiz");
var quizContainer = document.querySelector("#quiz-box");
var quizButton = document.querySelector(".btn");
var timer = document.querySelector("#timer");
var quizHeader = document.querySelector("#quiz-header");
var quizText = document.querySelector("#quiz-text");
var highScore = doument.querySelector("#high-score");
var listEl;
var buttonEl;
var timeStart = 75;
var questionsAnswer;
var questionsScore = 0;
var leaderBoard= []
var x = 0

var beginQuiz = function() {
    var startTime = setInterval(function(){
        if (timeRemaining <= 0 || x === 5) {
            clearInterval(startTime);
        } else {
            timer.textContent = timeRemaining;
        }
        timeRemaining--;
    }, 1000);
    firstQuestion();
}

var firstQuestion = function() {
    if (x ===5) {
        return startQuiz;
    }
    quizHeader.textContent = questions[x].title;
    quizText.textContent = '';
    startButton.remove();
    var listChoice = questions[x].choices;
    questionsAnswer = questions[x].alerts;
    for (var i = 0; i < 5; i++) {
        listEl = document.createElement("li");
        listEl.className = "btn-cont";
        listEl.setAttribute("id", [i]);
        quizContainer.appendChild(listEl);
        buttonEl = document.createElement("button");
        buttonEl.className = "btn-quizbtn";
        buttonEl.setAttribute("id", [i]);
        buttonEl.textContent = listChoice[i];
        listEl.appendChild(buttonEl);
    }
}

var questions = [
    {
        title: "Arrays in JavaScript can be used to store ______.",
        choices: {
            0: "numbers and strings",
            1: "other arrays",
            2: "booleans",
            3: "all of the above"
        },
        alerts: "all of the above"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: {
            0: "strings",
            1: "booleans",
            2: "alerts",
            3: "numbers"
        },
        alerts: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ______.",
        choices: {
            0: "quotes",
            1: "curly brackets",
            2: "parenthesis",
            3: "square brackets"
        },
        alerts: "parenthesis"
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        choices: {
            0: "commas",
            1: "curly brackets",
            2: "quotes",
            3: "parenthesis"
        },
        alerts: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: {
            0: "console.dir",
            1: "for loops",
            2: "terminal",
            3: "console.log"
        },
        alerts: "console.log"
    }
];

startButton.addEventListener("click", beginQuiz);
quizContainer.addEventListener("click",);