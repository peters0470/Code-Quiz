var startButton = document.querySelector("#start-quiz");
var quizContainer = document.querySelector("#quiz-box");
var quizButton = document.querySelector(".btn");
var timer = document.querySelector("#timer");
var quizHeader = document.querySelector("#quiz-header");
var quizText = document.querySelector("#quiz-text");
var highScore = document.querySelector("#high-score");
var listEl;
var buttonEl;
var timeStart = 75;
var questionsAnswer;
var questionsScore = 0;
var leaderBoard = [];
var x = 0;

var beginQuiz = function() {
    var startTime = setInterval(function(){
        if (timeStart <= -1 || x === 5) {
            clearInterval(startTime);
            endGame();
        } else {
            timer.textContent = timeStart;
        }
        timeStart--;
    }, 1000);
    firstQuestion();
}

var firstQuestion = function() {
    if (x === 5) {
        return beginQuiz;
    }
    quizHeader.textContent = questions[x].title;
    quizText.textContent = '';
    startButton.remove();
    var listChoice = questions[x].choices;
    questionsAnswer = questions[x].alerts;
    for (var i = 0; i < 4; i++) {
        listEl = document.createElement("li");
        listEl.className = "btn-content";
        listEl.setAttribute("id", [i]);
        quizContainer.appendChild(listEl);
        buttonEl = document.createElement("button");
        buttonEl.className = "btn-quizbtn";
        buttonEl.setAttribute("id", [i]);
        buttonEl.textContent = listChoice[i];
        listEl.appendChild(buttonEl);
    }
}

var buttonHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".btn-quizbtn")) {
        if(targetEl.textContent === questionsAnswer) {
            questionsScore += 10;
            console.log(questionsScore);
        }
        else{
            timeStart -= 10;
            console.log(timeStart);
        };
        for (var i = 0; i < 4; i++) {
            var list = document.getElementById([i]);
            list.remove();
        }
        x++
        firstQuestion();
    }
    if (targetEl.matches(".btn-submit")) {
        submitInitials();
        
    }   

}

var endGame = function() {
    score = Math.max(0, timeStart + questionsScore);
    quizHeader.textContent = "Game Over";
    quizText.textContent = "Your Score:" + score;
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.className = "text-input";
    initials.setAttribute("placeholder", "Your initials");
    quizContainer.appendChild(initials);
    
    var submit = document.createElement("button");
    submit.className = "btn-submit";
    submit.setAttribute("id", "save-task");
    submit.setAttribute("type", "submit");
    submit.textContent = "Submit";
    quizContainer.appendChild(submit);
}

var submitInitials = function() {
    var submitInitials = document.querySelector(".text-input").value;
    var submitScore = score;
    var playerScore = {
        name: submitInitials,
        total: submitScore
    }
    leaderBoard.push(playerScore);
    localStorage.setItem("highScores", JSON.stringify(leaderBoard));
    
}

var getGame = function() {
    var savedScore = localStorage.getItem("highScores");
    if (!savedScore) {
        return false;
    }
    else{
        savedScore = JSON.parse(savedScore);
        for (var i = 0; i < savedScore.length; i++) {
            var leaderBoards = document.createElement("li");
            leaderBoards.className = "lbrd";
            leaderBoards.textContent = "HighScore!"
            highScore.appendChild(leaderBoards);
            var previousGame = document.createElement("li");
            previousGame.className = "prev-game";
            previousGame.textContent = savedScore[i].name + " - " + savedScore[i].total;
            highScore.appendChild(previousGame);
            
        }
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
quizContainer.addEventListener("click", buttonHandler);

getGame();
