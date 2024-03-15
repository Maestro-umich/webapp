const qTypes = ["sheetMusicPhotos", "MIDI"]

var tstartX = 0;
var tstartY = 0;
var tendX = 0;
var tendY = 0;
var ans;

var body = document.querySelector('body');
var textBox = document.querySelector("#answer")
var helpBox = document.querySelector('#help_box');

window.onload = nextQuestion();

body.addEventListener('touchstart', function(event) {
    tstartX = event.screenX;
    tstartY = event.screenY;
}, false);

body.addEventListener('touchend', function(event) {
    tendX = event.screenX;
    tendY = event.screenY;
    if (tendX < tstartX) {
        console.log("Swiped Left")
        nextQuestion();
    }
}, false);

// Double click to move to next question for computer testing
body.addEventListener('dblclick', function() {
    console.log("Double-clicked");
    nextQuestion();
});

document.querySelector('#play_again').addEventListener('click', function() {
    // TODO play chord
})

document.querySelector('#submit').addEventListener('click', function() {
    // input sanitization
    console.log("Submitted");
    ans = textBox.value.replace(/\s+/g, "");
    console.log("Sanitized answer: " + ans);

    // Sending sanitized answer to the Flask server
    fetch('/check_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: ans }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.correct) {
            textBox.style.border = "solid green 3px";
        } else {
            textBox.style.border = "solid red 3px";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    })
});

document.querySelector('#help').addEventListener('click', function() {
    helpBox.style.display = 'block';
})

document.querySelector('#exit_help').addEventListener('click', function() {
    helpBox.style.display = 'none';
})

function nextQuestion() {
    // reset + modify DOM
    textBox.style.border = "solid #00303b 1px";
    textBox.value = ""; // clear user input
};

/*
function genQuestion() {
    qType = qTypes[Math.floor(Math.random() * qTypes.length)]; // picks random question type
    chord = 'C#'; // TODO replace with randomly generated chord
    console.log(qType);

    const playButton = document.querySelector('#play_again');
    const question = document.querySelector('h2');
    const image = document.querySelector('#game_image img');

    switch(qType) {
        case "sheetMusicPhotos":
            //imgSrc = "../" + qType + "/" + chord + ".png"; // TODO fix file path
            //image.src = imgSrc;
            playButton.style.visibility = "hidden";
            question.textContent = "What chord is shown below?";
            break;
        case "MIDI":
            image.src = "../images/maestro.png";
            playButton.style.visibility = "visible";
            question.textContent = "What chord do you hear?";
            // TODO play chord
            break;
    }

    return chord; // returns chord to be stored as correct answer
} */
