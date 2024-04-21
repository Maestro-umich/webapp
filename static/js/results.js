//Populating ul list
function retrieveCorrectResults() {
    var correctChords = localStorage.getItem('correctChords');
    var correctArray = correctChords ? JSON.parse(correctChords) : [];
    return correctArray;
}

function retrieveIncorrectResults() {
    var incorrectChords = localStorage.getItem('incorrectChords');
    var incorrectArray = incorrectChords ? JSON.parse(incorrectChords) : [];
    return incorrectArray;
}

var correctScoreArray = retrieveCorrectResults();
var incorrectScoreArray = retrieveIncorrectResults();
// Find the ul element in which you want to insert the list items
let correct_ul = document.getElementById('correctAns');
let incorrect_ul = document.getElementById('incorrectAns');

// Function to populate a given UL with items from an array
function populateList(ulElement, items) {
    items.forEach(function(item) {
        let li = document.createElement('li');
        li.textContent = item;
        ulElement.appendChild(li);
    });
}

// Populate the ULs with the correct and incorrect answers
populateList(correct_ul, correctScoreArray);
populateList(incorrect_ul, incorrectScoreArray);


//Handling redirection to practicing incorrect function in app.py if there are incorrect answers
//Otherwise defaults to redircting to practicing all chords
document.querySelector('#practiceIncorrect').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor click behavior
    var href = this.href; // Store the href value

    // Retrieve stored results from local storage
    var incorrectPaths = localStorage.getItem('incorrectPaths'); // Replace 'resultsKey' with your actual key
    if (incorrectPaths) {
        var jsonData = JSON.parse(incorrectPaths);

        // Send the results back to the Flask backend using Fetch API
        fetch('/practice_incorrect', { // Replace with your actual Flask route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(function(response) {
            return response.json(); // If response is JSON
        })
        .then(function(data) {
            console.log('Success:', data);
            // Redirect to game.html after successful data submission
            //TODO:: change to incorrect game
            window.location.href = href; // Use the stored href value
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
    } else {
        // If no results in local storage, navigate anyway or handle accordingly
        //TODO:: check if this works
        var baseUrl = window.location.protocol + '//' + window.location.host;
        var gameUrl = baseUrl + '/game?mode=focus'; // '/game' is the endpoint for your game route

        // Redirect to constructed URL
        window.location.href = gameUrl;
    }
});




