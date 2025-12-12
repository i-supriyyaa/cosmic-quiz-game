const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Mercury", correct: false },
        ],
    },
    {
        question: "What is the largest planet in our Solar System?",
        answers: [
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Uranus", correct: false },
            { text: "Neptune", correct: false },
        ],
    },
    {
        question: "Which galaxy do we live in?",
        answers: [
            { text: "Andromeda Galaxy", correct: false },
            { text: "Sombrero Galaxy", correct: false },
            { text: "Whirlpool Galaxy", correct: false },
            { text: "Milky Way Galaxy", correct: true },
        ],
    },
    {
        question: "What is the name of the first artificial satellite launched into space?",
        answers: [
            { text: "Apollo 11", correct: false },
            { text: "Hubble", correct: false },
            { text: "Sputnik 1", correct: true },
            { text: "Voyager 1", correct: false },
        ],
    },
    {
        question: "Which planet has the most moons",
        answers: [
            { text: "Saturn", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Uranus", correct: false },
            { text: "Neptune", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
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

        // check if there are more questions or if the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a cosmic genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You are nearly a space expert!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! You're navigating the stars well - Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Steady progres - one more orbit and you'll improve!";
    } else {
        resultMessage.textContent = "Keep trying, cadet. The universe takes time to master!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}