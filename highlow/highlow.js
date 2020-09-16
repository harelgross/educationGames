let maxOperand;
let correctAnswer, pickedAnswer;
let operand1, operand2;
let sounds = {};

let draggableData = {
    disabled: false,
    containment: $("#overallContainer"),
    cursor: 'move',
    helper: 'clone'
};

function reset() {
    updateDraggables(true);
    getRandomNumbers();
    updateDisplay();
    $("#message").text(" ");

    $("#answerDrop").addClass("py-5 py-md-5");
    $("#answerDrop").removeClass("py-2 py-md-2");

    $(".help").attr("disabled", false);;
    $(".reset").text("אפשר תרגיל אחר?");

    $(".draggable").css("visibility", "visible");
    $(".draggable").removeClass("hidden");

    $("#answerDrop").html("");
    $("#answerDrop").removeClass("bg-success");
    $("#answerDrop").removeClass("bg-danger");

}

function init() {
    maxOperand = 10;
    initSounds();
    setEventListeners();
    reset();
}


function initSounds() {
    sounds.correct = new Howl({
        src: ['assets/sounds/correct.mp3']
      });
    sounds.wrong = new Howl({
        src: ['assets/sounds/wrong.mp3']
      });  
};

function setEventListeners() {
    $(".draggable").draggable( {
            containment: $("#overallContainer"),
            cursor: 'move',
            helper: 'clone'
        }
    );

    $("#answerDrop").droppable( {
            drop: updateAnswer
        }
    );

    $(".reset").click(reset);
    $(".help").click(help);
};


function getRandomNumbers() {
    operand1 = Math.floor(Math.random() * maxOperand) + 1;
    operand2 = Math.floor(Math.random() * maxOperand) + 1;
    if (operand1 === operand2) {
        correctAnswer = "=";
    }
    else if (operand1 > operand2) {
        correctAnswer = ">";
    }
    else {
        correctAnswer = "<";
    }
};

function updateDisplay() {
    $("#operand1").text(operand1);
    $("#operand2").text(operand2);
};

function updateAnswer(event, item) {
    answer = item.draggable;
    $(this).html($(answer).html());
    $(".draggable").each(function() {
        if (!$(this).hasClass("hidden")) {
            $(this).css("visibility", "visible");
        }
    });

    $(answer).css("visibility", "hidden");
    
    pickedAnswer = $(answer).attr("id");
    checkAnswer();
};

function checkAnswer() {
    $("#answerDrop").removeClass("bg-success");
    $("#answerDrop").removeClass("bg-danger");
    $("#answerDrop").removeClass("py-5 py-md-5");
    $("#answerDrop").addClass("py-2 py-md-2");

    if (pickedAnswer === correctAnswer) {
        sounds.correct.play();
        $("#answerDrop").addClass("bg-success");
        $("#message").text("כל הכבוד!");
        $(".reset").text("עוד פעם?");

        updateDraggables(false);
    }
    else {
        sounds.wrong.play();
        $("#answerDrop").addClass("bg-danger");
        $("#message").text("נסו שוב!");
    }
}

function help() {
    let draggables = $(".draggable");
    let answerToRemove = Math.floor(Math.random() * draggables.length);
    console.log(draggables[0].id);
    if (draggables[answerToRemove].id !== correctAnswer) {
        draggables[answerToRemove].style.visibility = "hidden";
        draggables[answerToRemove].classList.add("hidden");

    }
    else {
        help();
    }
};

function updateDraggables(value) {
    if (value) {
        $(".draggable").draggable(draggableData);
    }
    else {
        $(".draggable").draggable({disabled: true });
    }

}

init();