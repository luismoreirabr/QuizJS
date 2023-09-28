const questions = [
    {
      question: "Qual código exibe uma mensagem de alerta na tela?",
      choices: ["console.log('');", "alert('');", "prompt('');", "error('');"],
      answer: "alert('');",
    },
    {
      question: "Quando foi lançada a versão do JavaScript ES6?",
      choices: ["2011", "2015", "2016", "2020"],
      answer: "2015",
    },
    {
      question: "Quando o JavaScript foi criado?",
      choices: ["2012", "1995", "1992", "2001"],
      answer: "1995",
    },
    {
      question: "Em quantos dias o JavaScript foi criado?",
      choices: ["13 dias", "6 dias", "31 dias", "10 dias"],
      answer: "10 dias",
    },
    {
      question: "Quem é o criador do JavaScript?",
      choices: ["Brendan Eich", "Mark Zuckerberg", "Tim Berners-Lee", "Jordan Walke"],
      answer: "Brendan Eich",
    },
  ];
  
  const questionElement = document.getElementById("question");
  const choiceElements = Array.from(document.getElementsByClassName("choice"));
  const nextButton = document.getElementById("next");
  const scoreElement = document.getElementById("score");
  const wrongElement = document.getElementById("wrong");
  
  let currentQuestion = 0;
  let score = 0;
  let wrong = 0;
  let answerChosen = false;
  
  function loadQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionElement.innerText = currentQuestionData.question;
  
    const choices = shuffleArray(currentQuestionData.choices);
    for (let i = 0; i < choiceElements.length; i++) {
      choiceElements[i].innerText = choices[i];
    }
    answerChosen = false; // reset flag when loading new question
  }
  
  function checkAnswer(e) {
    if (answerChosen) return; // prevent multiple answers
    answerChosen = true;
  
    if (e.target.innerText === questions[currentQuestion].answer) {
      score++;
      scoreElement.innerText = "Pontuação: " + score;
      alert("Correto!");
    } else {
      wrong++;
      wrongElement.innerText = "Erros: " + wrong;
      alert(
        "Errado! A resposta correta é " + questions[currentQuestion].answer + "."
      );
    }
  }
  
  choiceElements.forEach((element) => {
    element.addEventListener("click", checkAnswer);
  });
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    scoreElement.innerText = "Pontuação: 0";
    wrongElement.innerText = "Erros: 0";
    loadQuestion();
  }
  
  nextButton.addEventListener("click", () => {
    if (!answerChosen) {
      alert("Por favor, escolha uma resposta antes de prosseguir.");
      return;
    }
  
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      alert(
        "Fim do Quiz! Você acertou " +
          score +
          " de " +
          questions.length +
          " perguntas."
      );
      restartQuiz();
    }
  });
  
  function shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  loadQuestion();