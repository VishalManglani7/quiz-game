var intro = document.getElementById("intro");
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");

var secondsLeft
var currentQuestionIndex
var score

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
      { text: "Answer 2-3", correct: true },
      { text: "Answer 2-4", correct: false },
    ],
  },
];

start.addEventListener("click", startQuiz);
function startQuiz() {
    console.log("Starting quiz")
  start.style.display = "none";
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

function displayQuestion() {
    console.log("Displaying questions")
  var questionEl = document.getElementById("question");
  var answersEl = document.getElementById("answers");
  var currentQuestion = questions[currentQuestionIndex];
  var questionNum = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNum + currentQuestion.question;
//clear the box before if duplicates
  currentQuestion.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    //figure out what else you want to do to each button
    button.addEventListener("click", checkAnswer)
    answersEl.appendChild(button);
  });
}

function checkAnswer(event){
    console.log(event.target)
    console.dir(event.target)
//how to check if it's correct



//move to next question or not


}

function setTime() {
  var timeEl = document.querySelector(".timer");
console.log(timeEl)
  var timeInterval = setInterval(
    function () {
      secondsLeft --;

      timeEl.textContent = secondsLeft + "seconds remaining";

//You'll need to ehck if for more than it just being equal to 0 or if it's completed
//the current question index (i) must be less than legth of array of questions    
if (secondsLeft === 0) {
        clearInterval(timeInterval);
        endQuiz()
      }
    },
    1000
  );
}

function endQuiz(){
    console.log("ending quiz")
}