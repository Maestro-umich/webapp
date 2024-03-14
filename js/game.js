const qTypes = ["sheetMusicPhotos", "MIDI"]

var tstartX = 0;
var tstartY = 0;
var tendX = 0;
var tendY = 0;
var ans;
var correct;

var body = document.querySelector('body');
var textBox = document.querySelector("#answer")

body.addEventListener('touchstart', function(event) {
    tstartX = event.screenX;
    tstartY = event.screenY;
}, false);

body.addEventListener('touchend', function(event) {
    tendX = event.screenX;
    tendY = event.screenY;
    handleSwipe();
}, false);

// Double click to move to next question for computer testing
body.addEventListener('dblclick', function() {
    console.log("Double-clicked");
    handleSwipe();
});

document.querySelector('#play_again').addEventListener('click', function() {
    // play chord
})

document.querySelector('#submit').addEventListener('click', function() {
    // input sanitization
    console.log("Submitted");
    ans = textBox.value;
    console.log("Unsanitized answer: " + ans);
    ans = ans.toLowerCase();
    ans = ans.replace(/\s+/g, "");
    //ans = ans.replace('#', "sharp");
    console.log("Sanitized answer: " + ans);

    // compare to correct + modify DOM accordingly
    if (ans == correct) {
        textBox.style.border = "solid green 3px"
    }
    else {
        textBox.style.border = "solid red 3px"
    }
});

function handleSwipe() {
    // TODO check if left swipe
    // reset + modify DOM
    textBox.style.border = "solid #00303b 1px";
    textBox.value = ""; // clear user input

    correct = genQuestion();
};

function genQuestion() {
    qType = qTypes[Math.floor(Math.random() * qTypes.length)];
    chord = 'C#'; // replace with randomly generated chord
    console.log(qType);

    const playButton = document.querySelector('#play_again');
    const question = document.querySelector('h2');
    const image = document.querySelector('#game_image img');

    switch(qType) {
        case "sheetMusicPhotos":
            //imgSrc = "../" + qType + "/" + chord + ".png"; // TODO replace file extension
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

    return chord;
}
