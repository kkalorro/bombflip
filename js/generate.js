//////////
// Init //
//////////

// Select Left Playing Space
const selectLeftPlayspace = document.getElementById('left-playspace');

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
// 30 31 32 33 34 XX
const answers = [];

///////////////
// Functions //
///////////////

function randNum(max) {
    return Math.floor(Math.random() * max);
}

function populateAnswers() {
    // Calculated size of whole grid and hint spaces
    const total = Math.pow(gridSize, 2) + (gridSize * 2);
    // Helper variable to help identify the last column and last row
    let hintCount = 0;
    for (let i = 0; i < total; i++) {
        // Give Answer a Unique ID
        const answer = {id: i};
        idCount += 1;
        // Identify last column or row to use as Hints
        if (hintCount === gridSize  || i + gridSize >= total) {
            answer.hint = true;
            // Reset helper variable
            hintCount = 0;
        } else {
            // Designate a number from 0-3 (0 = Bomb, 1-3 = Points)
            answer.value = randNum(4);
            hintCount += 1;
        }
        
        answers.push(answer);
    }
}

// Convert Answers into HTML and display
function displayAnswer(arr) {
    let html = '';
    // Helper variable to help identify the last answer in the row
    let rowLength = 0;

    // Go through every object in the array
    for (let i = 0; i < arr.length; i++) {
        console.log(`count: ${i}, id: ${arr[i].id}, sum: ${i + gridSize}, arrLength: ${arr.length}, rowlength: ${rowLength}, gridsize: ${gridSize}`);
        // else if i + gridSize < arr.length
        if (i + gridSize >= arr.length) {
            console.log('test');
            // print hint to html
            html += `<span class="hint">${arr[i].hint}</span>`;
            // reset rowLength
            rowLength = 0;
        // if it's not the end of the row
        } else if (rowLength !== gridSize) {
            // if answer obj in array has id matching i
            if (arr[i].id === i) {
                // print value to html
                html += `<span class="card">${arr[i].value}</span>`;
                // Count up rowLength
                rowLength += 1;
            // end if
            }
        // else
        } else { 
            // print hint to html
            html += `<span class="hint">${arr[i].hint}</span><br>`;
            // reset rowLength
            rowLength = 0;
        // end if
        }
    // end for
    }
    selectLeftPlayspace.innerHTML = html;
}

        // // Display a horizontal row
        // html += `<span class="answer">${}</span>`;

        // for (let j = 0; j < arr[i].length; j++) {
        //     // Create a Card Span for each value in array
        //     html += `<span class="card">${grid[i][j]}</span>`;
        // }
        // // Create a Hint Span for each horizontal array
        // html += '<span class="vertical-hint hint">8/8</span><br>';

    // // Create a Hint Span for each vertical array
    // for (let i = 0; i < arr.length; i++) {
    //     html += '<span class="horizontal-hint hint">8/8</span>';
    // }

    // Update Playspace with new HTML code
    

/////////
// Run //
/////////
populateAnswers();
displayAnswer(answers);
// console.log(answers);