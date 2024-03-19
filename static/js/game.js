var tstartX = 0;
var tstartY = 0;
var tendX = 0;
var tendY = 0;
var ans;
var correct;

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
    console.log("Playing Chord");
    playChord(); // Call the playChord function when the button is clicked
});

document.querySelector('#submit').addEventListener('click', function() {
    // input sanitization
    console.log("Submitted");
    ans = textBox.value.replace(/\s+/g, "");
    console.log("Sanitized answer: " + ans);

    if (ans == correct) {
        textBox.style.border = "solid green 3px";
        document.querySelector('#next').textContent = "Next";
    } else {
        textBox.style.border = "solid red 3px";
    }
});

document.querySelector('#next').addEventListener('click', function() {
    nextQuestion();
})

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
    document.querySelector('#next').textContent = "Skip";
    console.log("Fetching question");

    // TODO fetch question and answer from flask
    fetch('/question_selector', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        correct = data.correct_ans.replace(/%23/g, '#');
        console.log(correct);
        updateAudioSource(data.file_path); // Setup the audio source
    })
    .catch(error => console.error('Error:', error));
};

function updateAudioSource(src) {
    // This variable should be accessible in the playChord function
    chordAudioSrc = src;
}

function playChord() {
    if (chordAudioSrc) {
        var audio = new Audio(chordAudioSrc);
        audio.play().catch(function(error) {
            console.error('Playback failed:', error);
        });
    } else {
        console.error('No audio source is set for playback.');
    }
}