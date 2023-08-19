var intro = document.getElementById("intro");
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var endgame = document.getElementById("game-over");
var highscore = document.getElementById("high-scores");
var score = 0;
var secondsLeft
var currentQuestionIndex

//array of questions and answers for code to run through
var questions = [
  {
    question: "question 1 goes here?",
    answers: [
      { text: "Answer 1-1", correct: false },
      { text: "Answer 1-2", correct: false },
      { text: "Answer 1-3", correct: true },
      { text: "Answer 1-4", correct: false },
    ],
  },
  {
    question: "question 2 goes here?",
    answers: [
      { text: "Answer 2-1", correct: false },
      { text: "Answer 2-2", correct: false },
      { text: "Answer 2-3", correct: false },
      { text: "Answer 2-4", correct: true },
    ],
  },
  {
    question: "question 3 goes here?",
    answers: [
      { text: "Answer 3-1", correct: true },
      { text: "Answer 3-2", correct: false },
      { text: "Answer 3-3", correct: false },
      { text: "Answer 3-4", correct: false },
    ],
  },
];

//start quiz fuction upon pushing start. starts timer function. and questions should display upon pushing
//start button and high score button should disappear here
start.addEventListener("click", startQuiz);
function startQuiz() {
    console.log("Starting quiz")
  start.style.display = "none";
  endgame.style.display = "none";
  highscore.style.display = "none";
  quiz.style.display = "block";
console.log("Showing correct elements")
  currentQuestionIndex = 0;
  score = 0;
  secondsLeft = 60;
  console.log(currentQuestionIndex)
  setTime();
  console.log("Done with set time")
  displayQuestion();
}

//display question function should run thru above noted questions. innerhtml set to empty so that buttons do not duplicate on screen
//questions and answers should progress till the quiz is completed
function displayQuestion() {
    console.log("Displaying questions")
  var questionEl = document.getElementById("question");
  var answersEl = document.getElementById("answers");
  answersEl.innerHTML = "";
  var currentQuestion = questions[currentQuestionIndex];
  var questionNum = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNum + currentQuestion.question;
//clear the box before if duplicates
  currentQuestion.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");

    //figure out what else you want to do to each button
    button.addEventListener("click", function(event){
      const newTarget =event.target;
      console.log(newTarget, "newTarget")
      checkAnswer(answer.correct, newTarget);});
    answersEl.appendChild(button);
  });
}

//checks if answer is correct. changes button to green if correct. red if wrong.
//score increases by 10 if correct. -15 seconds if incorrect
function checkAnswer(correct, button){
    console.log(button)
    console.dir(button)
    if(correct){
      score += 10;
      console.log(score)
      button.classList.add("correct");}
    else{
      secondsLeft -= 15;
      button.classList.add("inCorrect");
    }
    setTimeout(function(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
      displayQuestion()
    }  
    else {
      endQuiz();
    }
    },1000);}
//move to next question or not


function setTime() {
  var timeEl = document.querySelector(".timer");
  console.log(timeEl)
  timeInterval = setInterval(
    function () {
      secondsLeft --;

      timeEl.textContent = secondsLeft + " seconds remaining";

//You'll need to ehck if for more than it just being equal to 0 or if it's completed
//the current question index (i) must be less than legth of array of questions    
if (secondsLeft === 0) {
        clearInterval(timeInterval);
        endQuiz()
      }
    },
    1000);
  }

//end game function which should clear the quiz questions. stop the time interval, and populate the username submission form
//high scores button should reappear
function endQuiz(){
  quiz.style.display = "none";
  endgame.style.display = "block";
  var scoreDisplay = document.querySelector(".score");
  var nameInput = document.querySelector("#username");
  var submitButton = document.querySelector("#submit-score");
  nameInput.style.display = "block";
  submitButton.style.display = "block";
  highscore.style.display = "block";
  clearInterval(timeInterval);
  //creates a function to send username and score to local storage upon entering info. clears after user enters name.
  //insures that field is array
  submitButton.addEventListener("click", function () {
    var username = nameInput.value;
    if (username) {
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ name: username, score: score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
      nameInput.value = "";}});
  //first part should grab from local storage above


  //this part is still bugged, as leaderbaord should display in a list with name + score
  highscore.addEventListener("click", showLeaderboard);
  function showLeaderboard(){
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var highScoresList = document.getElementById("high-scores-list");
  //this part should turn it into a list
  highScores.forEach(function (entry) {
    var li = document.createElement("li");
    li.textContent = entry.name + entry.score;
    highScoresList.appendChild(li);
    highscore.style.display = "block";
  })};

      //displays users final score at end of game
  scoreDisplay.textContent = "Final score: " + score;
    console.log("ending quiz")}


