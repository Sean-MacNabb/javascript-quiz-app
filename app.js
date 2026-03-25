const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const scoreContainer = document.getElementById("score-container");
const quizContainer = document.getElementById("quiz-container");

const scoreElement = document.getElementById("score");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button"); 

const quizData = [
   {question: "Which array method adds an element to the end of an array?", options: [".push()", ".pop()", ".shift()", ".unshift()"], answer: 0},
   {question: "What is the proper syntax for the ternary operator?", options: ["condition ? false : true", "true : false ? condition", "false : true ? condition", "condition ? true : false"], answer: 3},
   {question: "Which word isn't a way to declare something in JavaScript?", options: ["var", "let", "def", "const"], answer: 2},
   {question: "Which isn't a programming language we've used yet?", options: ["CSS", "Python", "HTML", "JavaScript"], answer: 1}
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
   let currentQuestion = quizData[currentQuestionIndex];
   questionContainer.innerText = currentQuestion.question;

   optionsContainer.innerHTML = "";

   currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-button");
      button.addEventListener('click', () => selectOption(index));
      optionsContainer.appendChild(button);
   })
}

function selectOption(index) {
   let currentQuestion = quizData[currentQuestionIndex];
   let buttons = optionsContainer.querySelectorAll('.option-button');

   if (currentQuestion.answer === index) {
      buttons[index].style.backgroundColor = "#2e7d32";
      score++;
   } else {
      buttons[index].style.backgroundColor = "#c62828";
   }

   buttons.forEach(button => {
      button.disabled = true;
   })
}

startButton.addEventListener('click', () => {
   startButton.style.display = "none";
   quizContainer.classList.remove("hidden");
   loadQuestion();
})

nextButton.addEventListener('click', () => {
   currentQuestionIndex++;
   
   if (currentQuestionIndex >= quizData.length) {
      questionContainer.style.display = "none"; 
      optionsContainer.style.display = "none";
      nextButton.style.display = "none";
      scoreContainer.style.display = "flex";
      scoreElement.textContent = `${(score / quizData.length) * 100}% (${score} out of ${quizData.length})`;
   } else {
      loadQuestion();
   }
})

restartButton.addEventListener('click', () => {
   currentQuestionIndex = 0;
   score = 0;
   questionContainer.style.display = "flex";
   optionsContainer.style.display = "flex";
   nextButton.style.display = "flex";
   scoreContainer.style.display = "none";
   loadQuestion();
})