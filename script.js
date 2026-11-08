import { questions } from "./questions.js";

const startBtn = document.querySelector(".quiz-start-btn");
const restartBtn = document.querySelector(".quiz-restart-btn");

const quizStartScreen = document.querySelector(".quiz-start-screen");
const quizQuestionScreen = document.querySelector(".quiz-question-screen");
const quizResultScreen = document.querySelector(".quiz-result-screen");

const quizQuestionContainer = document.querySelector(".quiz-question");
const currentQuestionSpan = document.querySelector(".current-question");
const totalQuestionsSpan = document.querySelector(".total-questions");
const scoreSpan = document.querySelector(".current-score");
const answersContainer = document.querySelector(".options-container");
const quizScoreEarned = document.querySelector(".quiz-score-earned");
const quizScoreTotal = document.querySelector(".quiz-score-total");
const quizResultMessage = document.querySelector(".quiz-result-message");

const progressBar = document.querySelector(".progress-bar");

let currentQuestionIndex = 0;
let currentScore = 0;
let answerDisabled = false;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  currentScore = 0;
  answerDisabled = false;

  quizStartScreen.style.display = "none";
  quizResultScreen.style.display = "none";
  quizQuestionScreen.style.display = "block";

  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  quizQuestionContainer.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  totalQuestionsSpan.textContent = questions.length;
  scoreSpan.textContent = currentScore;

  answersContainer.innerHTML = ``;
  answerDisabled = false;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;
    button.textContent = answer.answerText;

    button.addEventListener("click", selectAnswer);

    answersContainer.append(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;

  if (selectedButton.dataset.correct === "true") {
    selectedButton.classList.add("correct");
    currentScore++;
    scoreSpan.textContent = currentScore;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  currentQuestionIndex++;

  setTimeout(() => {
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  quizQuestionScreen.style.display = "none";
  quizResultScreen.style.display = "block";

  quizScoreEarned.textContent = currentScore;
  quizScoreTotal.textContent = questions.length;

  const percentage = (currentScore / questions.length) * 100 + "%";
  let message = ``;

  if (percentage === "100%") {
    message = "🏆 Perfect score! You're a genius!";
  } else if (percentage >= "80%") {
    message = "🎉 Excellent work! You really know your stuff!";
  } else if (percentage >= "60%") {
    message = "👏 Great job! Keep up the good work!";
  } else if (percentage >= "40%") {
    message = "😊 Good effort! A little more practice will help!";
  } else {
    message = "💪 Don't give up! Keep learning and try again!";
  }

  quizResultMessage.textContent = message;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  currentScore = 0;

  quizQuestionScreen.style.display = "none";
  quizResultScreen.style.display = "none";
  quizStartScreen.style.display = "block";
}
