// 1. Check click Answer

//////////
// Init //
//////////

// Game is Active
let gameover = true;

// Points
let points = 0;

// Select Left Playing Space
const selectPlayspace = document.getElementById('playspace');
// Select Restart Button
const selectRestart = document.getElementById('restart');
// Select Score
const selectScore = document.getElementById('score');
// Select Bombs Guessed
const selectBombsGuessed = document.getElementById('bombs-guessed');
// Select Bombs Total
const selectBombCount = document.getElementById('bomb-count');

// Unique ID Counter
let idCount = 0;

// The size of the grid's dimension
const gridSize = 5;

// Grid
// 00 01 02 03 04 05
// 06 07 08 09 10 11
// 12 13 14 15 16 17
// 18 19 20 21 22 23
// 24 25 26 27 28 29
// 30 31 32 33 34
const answers = [];

///////////////
// Functions //
///////////////

function randNum(max) {
    return Math.floor(Math.random() * max);
}

function resetScore() {
    points = 0;
    selectScore.textContent = points;
}

function populateAnswers() {
    // Reset Answers just in case this we're restarting a game
    answers.splice(0, answers.length)
    // Calculated size of whole grid and hint spaces
    const total = Math.pow(gridSize, 2) + (gridSize * 2);
    // Helper variable to help identify the last column and last row
    let hintCount = 0;
    for (let i = 0; i < total; i++) {
        // Give Answer a Unique ID
        const answer = {id: i};
        idCount++;
        // Identify last column or row to use as Hints
        if (hintCount === gridSize  || i + gridSize >= total) {
            answer.hint = true;
            // Reset helper variable
            hintCount = 0;
        } else {
            // Designate a number from 0-3 (0 = Bomb, 1-3 = Points)
            answer.value = randNum(4);
            hintCount++;
        }
        answers.push(answer);
    }
}

function getValue(array, searchFor) {
    // Look through array
    for (let i = 0; i < array.length; i++) {
        // If i matches searchFor
        if (array[i].id == searchFor) {
        // return Value
            return array[i].value;
        // End If
        }
    // End look
    }
}

// Go through an array and count bombs (zero values)
function resetBombCount(array) {
    // Bomb count
    let bombCount = 0;
    for (let i = 0; i < array.length; i++) {
        if (getValue(array, i) === 0 ) {
            bombCount++;
        };
    }
    selectBombCount.textContent = bombCount;
}

// Convert Answers into HTML and display
function displayAnswer(arr) {
// Display grid
    // Make sure all cards and hints are identified
    // Make sure everything is within table cells
    // Make sure there's a new row after every gridSize+1
// Build 2d array of cards
// Go:
// tr 00 01 02 03 04 /tr
// tr 05 06 07 08 09 /tr
// tr 10 11 12 13 14 /tr
// tr 15 16 17 18 19 /tr
// tr 20 21 22 23 24 /tr
// tr 26 27 28 29 30 /tr   
    
// Display grid to HTML
// Key globals: arr (argument), gridSize (5)

    // Reset HTML
    let html = '';
    // Helper variable to help identify the last answer in the row
    let rowLength = 0;

    // For every object in array
    for (let i = 0; i < arr.length; i++) {
        // If at the start of row add tr
        // Start of row is rowLength of 0
        if (rowLength === 0) {
            html += '<tr>'
        }
        // If not at end of row or not last row add span card then count up rowLength
        // rowLength is not gridSize and loop + gridSize is not bigger than array length
        if (rowLength !== gridSize && i + gridSize < answers.length) {
            html += `<td><span id="id${arr[i].id}" class="card">?</span></td>`;
            rowLength++;
        // Else If at end of row add span hint /tr and reset rowLength
        } else if (rowLength === gridSize) {
            html += `<td><span id="id${arr[i].id}" class="hint">88/88</span></td></tr>`;
            rowLength = 0;
        // Else If last row add span hint then count up rowLength
        // Last row is: loop + gridSize equal or bigger than array length
        } else if (i + gridSize >= arr.length) {
            html += `<td><span id="id${arr[i].id}" class="hint">END</span></td>`;
            rowLength++;
        }
    // End for
    };
    console.log(html);
    
    // // Go through every object in the array
    // for (let i = 0; i < arr.length; i++) {
    //     html += '<tr>';
    //     // console.log(`count: ${i}, id: ${arr[i].id}, sum: ${i + gridSize}, arrLength: ${arr.length}, rowlength: ${rowLength}, gridsize: ${gridSize}`);
    //     // else if i + gridSize < arr.length
    //     if (i + gridSize >= arr.length) {
    //         // print hint to html
    //         html += `<span id="id${arr[i].id}" class="hint">88/88</span></tr>`;
    //         // reset rowLength
    //         rowLength = 0;
    //     // if it's not the end of the row
    //     } else if (rowLength !== gridSize) {
    //         // if answer obj in array has id matching i
    //         if (arr[i].id === i) {
    //             // Create Card in HTML
    //             html += `<span id="id${arr[i].id}" class="card">?</span>`;
    //             // Count up rowLength
    //             rowLength++;
    //         // end if
    //         }
    //     // else
    //     } else { 
    //         // print hint to html
    //         html += `<span id="id${arr[i].id}" class="hint">88/88</span><br>`;
    //         // reset rowLength
    //         rowLength = 0;
    //     // end if
    //     }   
    // // end for
    // }
    selectPlayspace.innerHTML = html;
}

// All the runtime functions to retry a game
function startGame() {
    gameover = false;
    resetScore();
    populateAnswers();
    resetBombCount(answers);
    displayAnswer(answers);
}

/////////
// Run //
/////////
startGame();

///////////////
// Listeners //
///////////////

selectPlayspace.addEventListener('click', (e) => {
    if (!gameover) {
        const targ = e.target;
        if (targ.className === 'card') {
            const revealedValue = getValue(answers, targ.id.split('id')[1]);
            targ.textContent = revealedValue;
            // If revealed card is a bomb (zero) then color card red then end game
            if (revealedValue === 0) {
                targ.classList.add('revealed-bomb');
                alert('Gameover!');
                gameover = true;
            // else if revealed card is not a bomb then award points
            } else {
                targ.classList.add('revealed-points');
                points += revealedValue
                selectScore.textContent = points;
            }
            
        }
    }
});

selectRestart.addEventListener('click', (e) => {
    startGame();
});