let bodyEl = document.querySelector('body');
let timerElement = document.getElementById('timer');

// Function to generate a random RGB color
function rgbColor() {
    let r = Math.ceil(Math.random() * 255);
    let g = Math.ceil(Math.random() * 255);
    let b = Math.ceil(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// Change background color every 10 seconds
setInterval(() => {
    bodyEl.style.backgroundColor = rgbColor();
}, 10000);

// Selecting elements from the DOM
const scoreElement = document.getElementById('score');
const questionElement = document.getElementById('question');
const form = document.querySelector('.form');
const input = document.getElementById('answerInput');
const feedbackElement = document.createElement('p');
let score = 0;
let currentQuestion = generateQuestion();
let timer;

// Display the initial question
displayQuestion();

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkAnswer();
});

// Function to generate a random multiplication question
function generateQuestion() {
    const num1 = Math.ceil(Math.random() * 10);
    const num2 = Math.ceil(Math.random() * 10);
    return {
        question: `What is ${num1} multiplied by ${num2}?`,
        answer: num1 * num2,
    };
}

// Function to display the current question
function displayQuestion() {
    questionElement.textContent = currentQuestion.question;
}

// Function to check the user's answer
function checkAnswer() {
    const userAnswer = parseInt(input.value, 10);

    if (!isNaN(userAnswer)) {
        if (userAnswer === currentQuestion.answer) {
            // Correct answer
            score++;
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            // Incorrect answer
            feedbackElement.textContent = `Incorrect! The correct answer is ${currentQuestion.answer}.`;
            feedbackElement.style.color = 'red';
        }

        // Display feedback
        form.appendChild(feedbackElement);

        // Update score
        scoreElement.textContent = `Score: ${score}`;

        // Generate a new question
        currentQuestion = generateQuestion();
        displayQuestion();

        // Clear input and feedback after a delay
        setTimeout(() => {
            input.value = '';
            feedbackElement.textContent = '';
        }, 2000);
    }
}

function startTimer() {
    let seconds = 10;
    timerElement.textContent = `Time: ${seconds}s`;
    timer = setInterval(() => {
        seconds--;
        timerElement.textContent = `Time: ${seconds}s`;
        if (seconds <= 0) {
            clearInterval(timer);
            seconds = 10;
        }
    }, 1000);
}

function startColorChangeTimer() {
    clearInterval(timer);
    startTimer();
}
