var mode = new URLSearchParams(window.location.search).get('mode')
var ans;
var correct;

var body = document.querySelector('body');
var textBox = document.querySelector("#answer")
var helpBox = document.querySelector('#help_box');
var ansBox = document.querySelector('#ans_box');
var correct_ans = [];
var incorrect_ans = [];
var incorrect_paths = [];

window.onload = nextQuestion();

document.querySelector('#play_again').addEventListener('click', function() {
    playChord(); // Call the playChord function when the button is clicked
});

document.querySelector('#play_c').addEventListener('click', function() {
    playC();
})

document.querySelector('#submit').addEventListener('click', function() {
    // input sanitization
    ans = textBox.value.replace(/\s+/g, "");
    if (ans == correct) {
        //consider removing wrong if correct
        textBox.style.border = "solid green 3px";
        document.querySelector('#next').textContent = "Next";
    } 
    else {
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

document.querySelector('#show_ans').addEventListener('click', function() {
    ansBox.style.display = 'block';
    ansBox.querySelector('h3').textContent = correct;
})

document.querySelector('#exit_ans').addEventListener('click', function() {
    ansBox.style.display = 'none';
})

function nextQuestion() {
    // reset + modify DOM
    textBox.style.border = "solid #00303b 1px";
    textBox.value = ""; // clear user input
    document.querySelector('#next').textContent = "Skip";
    console.log("Fetching question");

    // TODO fetch question and answer from flask, CHANGE THE FUNC
    fetch('/wrong_question_selector', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        correct = data.correct_ans.replace(/%23/g, '#');
        updateAudioSource(data.file_path); // Setup the audio source
        console.log(correct);
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

function playC() {
    var c_path = "static/MIDI/norm-level/01-CMajor-Aminor/Triad/Major/C.mp3";
    var cMajorChord = new Audio(c_path);
    cMajorChord.play().catch(function(error) {
        console.error('Playback failed:', error);
    });
}