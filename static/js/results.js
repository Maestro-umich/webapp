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




