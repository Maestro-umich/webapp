var mode = new URLSearchParams(window.location.search).get('mode')
var ans;
var correct;

var body = document.querySelector('body');
var textBox = document.querySelector("#answer")
var helpBox = document.querySelector('#help_box');
var correct_ans = [];
var incorrect_ans = [];

var submit_count = 0;

window.onload = nextQuestion();

document.querySelector('#play_again').addEventListener('click', function() {
    console.log("Playing Chord");
    playChord(); // Call the playChord function when the button is clicked
});

document.querySelector('#play_c').addEventListener('click', function() {
    console.log("Playing C");
    playC();
})

document.querySelector('#submit').addEventListener('click', function() {
    // input sanitization
    console.log(submit_count);
    console.log("Submitted");
    ans = textBox.value.replace(/\s+/g, "");
    console.log("Sanitized answer: " + ans);

    if (ans == correct) {
        if(submit_count == 0){
            correct_ans.push(correct);
            localStorage.setItem('correctChords', JSON.stringify(correct_ans));
        }
        textBox.style.border = "solid green 3px";
        document.querySelector('#next').textContent = "Next";
    } 
    else {
        if(submit_count == 0){
            incorrect_ans.push(correct);
            localStorage.setItem('incorrectChords', JSON.stringify(incorrect_ans));
        }
        textBox.style.border = "solid red 3px";
    }

    submit_count += 1;

});

document.querySelector('#next').addEventListener('click', function() {
    submit_count = 0;
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
        console.log(data.file_path);
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

function playC() {
    var c_path = "static/MIDI/norm-level/01-CMajor-Aminor/Triad/Major/C.mp3";
    var cMajorChord = new Audio(c_path);
    cMajorChord.play().catch(function(error) {
        console.error('Playback failed:', error);
    });
}