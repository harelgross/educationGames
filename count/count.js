let answers;
let correctAnswer;
let operand;
let maxAnswer;
let answered;

let sounds = [];

let items = [
    "ball",
    "duck",
    "banana",
    "train"
];

let answerBoxes = document.querySelectorAll(".answer");

let operandDisplay = document.querySelector("#operand");

init();

function init() {
    maxAnswer = 5;
    setEventListeners();
    initSounds();
    reset();
}

function reset() {
    answers = generateRandomAnswers();
    updateAnswerBoxes();
    correctAnswer = pickCorrectAnswer();
    answered = false;

    updateOpreandDisplay();
    $("#message").text("");
    $(".help").attr("disabled", false);
    $(".answer").css("background", "oldlace");
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

    $(function () {
        $('[rel="tooltip"]').tooltip();
      });
}

function initSounds() {
    sounds.correct = new Howl({
        src: ['../assets/sounds/correct.mp3']
      });
    sounds.wrong = new Howl({
        src: ['../assets/sounds/wrong.mp3']
      });  
    sounds.help = new Howl({
        src: ['../assets/sounds/help.mp3']
      });  
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

function updateAnswerBoxes() {
    let item = items[Math.floor(Math.random() * items.length)];
    for (let i = 0; i < answerBoxes.length; i++) {
        answerBoxes[i].innerHTML = "";
        $(answerBoxes[i]).data("answer", answers[i]);
        for (let j = 0; j < answers[i]; j++) {
            let image = `<img src="../assets/images/countItems/${item}.png">`;
            answerBoxes[i].insertAdjacentHTML('beforeend', image);
        }
        answerBoxes[i].style.display = "block";
    }
}

function updateOpreandDisplay() {
    operandDisplay.textContent = correctAnswer;
}

function checkAnswer() {
    if (answered) {
        return;
    }

    let answer = parseInt($(this).data("answer"));
    if (answer === correctAnswer) {
        $(this).css("background", "#218c74");
        $("#message").text("כל הכבוד!");
        sounds.correct.play();
        answered = true;
    }
    else {
        $(this).css("background", "#b33939");
        $("#message").text("נסו שוב!");
        sounds.wrong.play();
    }
};

function help() {
    let answerToRemove = Math.floor(Math.random() * answers.length);
    while (answers[answerToRemove] === correctAnswer) {
        answerToRemove = Math.floor(Math.random() * answers.length);
    }
    answerBoxes[answerToRemove].style.display = "none";
    $(this).attr("disabled", true);

    sounds.help.play();
};