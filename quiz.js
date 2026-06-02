const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text:"Hyper Text Markup Language", correct:true},
            {text:"Hyper Text Machine Language", correct:false},
            {text:"Hyper Text Marking Language", correct:false},
            {text:"High Text Marking Language", correct:false},
        ]
    },
    {
        question: "Who is making the Web standards?",
        answers: [
            {text:"Microsoft", correct:false},
            {text:"The World Wide Web Consortium", correct:true},
            {text:"Mozilla", correct:false},
            {text:"Google", correct:false},
        ]
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            {text:"<h1>", correct:true},
            {text:"<head>", correct:false},
            {text:"<heading>", correct:false},
            {text:"<h6>", correct:false},
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: [
            {text:"<lb>", correct:false},
            {text:"<b>", correct:false},
            {text:"<br>", correct:true},
            {text:"<break>", correct:false},
        ]
    },
    {
        question: "Choose the correct HTML element to define important text",
        answers: [
            {text:"<b>", correct:false},
            {text:"<i>", correct:false},
            {text:"<important>", correct:false},
            {text:"<strong>", correct:true},
        ]
    },
    {
        question: "Choose the correct HTML element to define emphasized text",
        answers: [
            {text:"<italic>", correct:false},
            {text:"<i>", correct:false},
            {text:"<em>", correct:true},
            {text:"<emp>", correct:false},
        ]
    },
    {
        question: "Which character is used to indicate an end tag?",
        answers: [
            {text:"/", correct:true},
            {text:"^", correct:false},
            {text:"<", correct:false},
            {text:"*", correct:false},
        ]
    },
    {
        question: "Which of these elements are all <table> elements?",
        answers: [
            {text:"<table><tr><tt>", correct:false},
            {text:"<table><head><tfoot>", correct:false},
            {text:"<thead><body><tr>", correct:false},
            {text:"<table><tr><td>", correct:true},
        ]
    },
    {
        question: "How can you make a numbered list?",
        answers: [
            {text:"<dl>", correct:false},
            {text:"<ol>", correct:true},
            {text:"<ul>", correct:false},
            {text:"<list>", correct:false},
        ]
    },
    {
        question: "How can you make a bulleted list?",
        answers: [
            {text:"<dl>", correct:false},
            {text:"<ol>", correct:false},
            {text:"<ul>", correct:true},
            {text:"<list>", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbtn");
const nextButton = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();