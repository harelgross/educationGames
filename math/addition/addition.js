let answers;
let correctAnswer;
let operand1, operand2;
let maxAnswer;
let sounds = {};
let answered;

let answerBoxes = document.querySelectorAll(".answer");

let operand1Display = document.querySelector("#operand1");
let operand2Display = document.querySelector("#operand2");


function init() {
    maxAnswer = 10;
    setEventListeners();
    initSounds();
    reset();
}

function initSounds() {
    sounds.correct = new Howl({
        src: ['../../assets/sounds/correct.mp3']
      });
    sounds.wrong = new Howl({
        src: ['../../assets/sounds/wrong.mp3']
      });  
    sounds.help = new Howl({
        src: ['../../assets/sounds/help.mp3']
      });  
};

function reset() {
    answers = generateRandomAnswers();
    for (let i = 0; i < answerBoxes.length; i++) {
        answerBoxes[i].textContent = answers[i];
        answerBoxes[i].style.display = "block";
        answerBoxes[i].style.backgroundColor = "gray";
    }
    correctAnswer = pickCorrectAnswer();
    pickOperands();
    updateOpreandDisplay();
    $("#message").text("");
    $(".help").attr("disabled", false);;
    $(".reset").text("אפשר תרגיל אחר?");

    answered = false;
}


function setEventListeners() {
    $(".answer").click(checkAnswer);
    
    $(".reset").click(reset);

    $(".help").click(help);

    $(".mode").click(function() {
        $(".mode").removeClass("selected");
        $(this).addClass("selected");
        maxAnswer = $(this).data("max-answer");
        reset();
    });
}

function checkAnswer() {
    if (answered) {
        return;
    }

    let answer = parseInt($(this).text());
    if (answer === correctAnswer) {
        $(this).css("background", "#218c74");
        $("#message").text("כל הכבוד!");
        $(".reset").text("עוד פעם?");
        sounds.correct.play();
        answered = true;
    }
    else {
        $(this).css("background", "#b33939");
        $("#message").text("נסו שוב!");
        sounds.wrong.play();
    }
}


function help() {
    let answerToRemove = Math.floor(Math.random() * answers.length);
    while (answers[answerToRemove] === correctAnswer) {
        answerToRemove = Math.floor(Math.random() * answers.length);
    }
    answerBoxes[answerToRemove].style.display = "none";
    $(this).attr("disabled", true);
    sounds.help.play();
};

function generateRandomAnswers() {
    let answers = [];
    while (answers.length < 4) {
        let answer = Math.floor(Math.random() * maxAnswer) + 1;
        if (!answers.includes(answer)) {
            answers.push(answer);
        }
    }
    return answers;
}

function pickCorrectAnswer() {
    return answers[Math.floor(Math.random() * answers.length)];
}

function pickOperands() {
    operand1 = Math.floor(Math.random() * correctAnswer);
    operand2 = correctAnswer - operand1;
}

function updateOpreandDisplay() {
    operand1Display.textContent = operand1;
    operand2Display.textContent = operand2;

}

init();
