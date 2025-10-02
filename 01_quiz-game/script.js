// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("questions-text");
const answerContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totleQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Percentage score message
const percentageMessage = [
  { score: 100, message: "Perfect! You're a genius!" },
  { score: 80, message: "Great job! You know your stuff!" },
  { score: 60, message: "Good effort! Keep leaning!" },
  { score: 40, message: "Not bad! Try again to improve!" },
];

// Quiz Start vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totleQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listener
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// main function
function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestions();
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}

// Sub-Question
function showQuestions() {
  // reset vars
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Calculate percentage
  const progressPercentage =
    (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercentage + "%";

  questionText.textContent = currentQuestion.question;

  // Create Element button
  answerContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answers-btn");

    // what is dataset?
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestions();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  const matched = percentageMessage.find((item) => percentage >= item.score);

  if (matched) {
    resultMessage.textContent = matched.message;
  } else {
    finalScoreSpan.textContent = 0;
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}
