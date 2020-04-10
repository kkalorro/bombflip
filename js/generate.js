//////////
// Init //
//////////

// Game is Active
let gameover = true;

// Total Points
let score = 0;

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
// Array to contain all Answer objects
const grid = [];
// Array containing all Row Hints
const rowHints = [];
// Array containing all Column Hints
const colHints = [];
// Array containing IDs of Hints
const hints = [];

///////////////
// Functions //
///////////////

// Generate random number between 0 and max
function randNum(max) {
    return Math.floor(Math.random() * max);
}

// Clean array
function cleanArray(array) {
    array.splice(0, array.length);
}

// setEntryById(array, 5, 'points', rowHints[0][0])
// Go through an array, search for an ID and set new entry type with new entry value
function setEntryById(array, searchFor, newEntryType, newEntryValue) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === searchFor) {
            array[i][newEntryType] = newEntryValue;
        }
    }
}

// Go through an array, search for an ID and return value for Key
function getKeyValueByID(array, checkID, key) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == checkID) {
            return array[i][key];
        }
    }
}

// Go through an array, search for an ID and return object value
function getValueById(array, searchFor) {
    return getKeyValueByID(array, searchFor, 'value');
}

// Go through an array, search for an ID and return points
function getPointsById(array, searchFor) {
    return getKeyValueByID(array, searchFor, 'points');
}

// Go through an array, search for an ID and return bombs
function getBombsById(array, searchFor) {
    return getKeyValueByID(array, searchFor, 'bombs');
}

// Go through an array, search for a XY coordinate and return object value
function getValueByCoodinates(array, searchForX, searchForY) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x === searchForX && array[i].y === searchForY) {
            return array[i].value;
        }
    }
}

// Creates the database holding all grid object information including coordinates
function populategrid(array) {
    // Reset grid just in case this we're restarting a game
    cleanArray(array);
    // Calculated size of whole grid and hint spaces
    const total = Math.pow(gridSize, 2) + (gridSize * 2);
    // Helper variable to help identify the last column and last row
    let hintCount = 0;
    let x = 0;
    let y = 0;
    // let hintPoints = 0;
    // let hintBombs = 0;
    for (let i = 0; i < total; i++) {
        // Give Answer a Unique ID
        const answer = {id: i};
        idCount++;
        // If last column identify as Hint
        if (hintCount === gridSize) {
            answer.hint = true;
            // answer.points = hintPoints;
            // hintPoints = 0;
            // answer.bombs = hintBombs;
            // hintBombs = 0;
            // Reset helper variable
            hintCount = 0;
            answer.x = x;
            answer.y = y;
            x = 0;
            y++;
        // Else if last row identify as Hint
        } else if (i + gridSize >= total) {
            answer.hint = true;
            // Reset helper variable
            hintCount = 0;
            answer.x = x;
            answer.y = y;
            x = 0;
            y++;
        // Else designate a number from 0-3 (0 = Bomb, 1-3 = Points)
        } else {
            answer.value = randNum(4);
            // If value is 0 then count up hintBombs
            // if (answer.value === 0) {
            //     hintBombs++;
            // // Else add value to hintPoints
            // } else {
            //     hintPoints += answer.value;
            // }
            hintCount++;
            answer.x = x;
            answer.y = y;
            x++;
        }
        array.push(answer);
    }
    // Reset Hints
    getHints(grid, rowHints, colHints, gridSize);
}

// Calculate hints

// y=0: [00 01 02 03 04]
// y=1: [05 06 07 08 09]
// y=2: [10 11 12 13 14]
// y=3: [15 16 17 18 19]
// y=4: [20 21 22 23 24]
// Key variables: array = grid, rows = rowHints, cols = colHints, maxSize = gridSize
function getHints(array, rows, cols, maxSize) {
    const maxY = maxSize;
    const maxX = maxSize;
    cleanArray(rows);
    cleanArray(cols);
    // Row Hints
    for (let y = 0; y < maxY; y++) {
        let points = 0;
        let bombs = 0;
        for (let x = 0; x < maxX; x++) {
            const value = getValueByCoodinates(array, x, y);
            // If XY is a valid entry
            if (value != null) {
                // If value is not 0 count up Points
                if (value != 0) {
                    points += value;
                // Else count up Bombs
                } else {
                    bombs++;
                }
            }
        }
        // Print Points and Bombs
        rows.push([points, bombs]);
    }
     
    // Column Hints
    for (let x = 0; x < maxX; x++) {
        let points = 0;
        let bombs = 0;
        for (let y = 0; y < maxY; y++) {
            const value = getValueByCoodinates(array, x, y);
            // If XY is a valid entry
            if (value != null) {
                // If value is not 0 count up Points
                if (value != 0) {
                    points += value;
                // Else count up Bombs
                } else {
                    bombs++;
                }
            }
        }
        // Print Points and Bombs
        cols.push([points, bombs]);
    }
    getHintIDs(grid, hints);
}

// Get IDs of hints
function getHintIDs(input, output) {
    cleanArray(output);
    for (let i = 0; i < input.length; i++) {
        if (getKeyValueByID(input, i, 'hint')) {
            output.push(i);
        }
    }
}

// Edit Grid with Point and Bomb Hints
// tr 00 01 02 03 04 05 /tr
// tr 06 07 08 09 10 11 /tr
// tr 12 13 14 15 16 17 /tr
// tr 18 19 20 21 22 23 /tr
// tr 24 25 26 27 28 29 /tr
// tr 30 31 32 33 34    /tr
// 5, 11, 17, 23, 29 (0 to 6)
// 30, 31, 32, 33, 34 (30 >=)
// Get array of hints
function displayHints() {
    // for every item in the hints array
    for (let i = 0; i < rowHints.length; i++ ) {
        setEntryById(grid, hints[i], 'points', rowHints[i][0]);
        setEntryById(grid, hints[i], 'bombs', rowHints[i][1]);
    }
    const colLen = colHints.length;
    for (let i = 0; i < colLen; i++ ) {
        setEntryById(grid, hints[i + colLen], 'points', colHints[i][0]);
        setEntryById(grid, hints[i + colLen], 'bombs', colHints[i][1]);
    }
}

function resetScore(target) {
    score = 0;
    target.textContent = score;
}

// Go through an array and count bombs (zero values)
function resetBombCount(array) {
    let bombCount = 0;
    for (let i = 0; i < array.length; i++) {
        if (getValueById(array, i) === 0 ) {
            bombCount++;
        };
    }
    selectBombCount.textContent = bombCount;
}

// Convert grid into HTML and display
function displayAnswer(array) {
// X) Display grid in HTML
    // tr 00 01 02 03 04 05 /tr
    // tr 06 07 08 09 10 11 /tr
    // tr 12 13 14 15 16 17 /tr
    // tr 18 19 20 21 22 23 /tr
    // tr 24 25 26 27 28 29 /tr
    // tr 30 31 32 33 34    /tr
    // Make sure all cards and hints are identified
    // Make sure everything is within table cells
    // Make sure there's a new row after every gridSize+1
// Key globals: array (argument), gridSize (5)

    displayHints();

    // Reset HTML
    let html = '';
    // Helper variable to help identify the last answer in the row
    let rowLength = 0;

    // For every object in array
    for (let i = 0; i < array.length; i++) {
        // For Hint Tracking
        let rowHint = 0;
        let colHint = 0;

        // If at the start of row (rowLength is 0) add tr
        if (rowLength === 0) {
            html += '<tr>'
        }
        // If not at end of row or not last row add span card then count up rowLength
        // rowLength is not gridSize and loop + gridSize is not bigger than array length
        if (rowLength !== gridSize && i + gridSize < array.length) {
            html += `<td><span id="id${array[i].id}" class="card">?</span></td>`;
            rowLength++;
        // Else If at end of row add span hint /tr and reset rowLength
        } else if (rowLength === gridSize) {
            html += `<td><span id="id${array[i].id}" class="hint">${getKeyValueByID(array, i, 'points')}/${getKeyValueByID(array, i, 'bombs')}</span></td></tr>`;
            rowLength = 0;
        // Else If last row add span hint then count up rowLength
        // Last row is: loop + gridSize equal or bigger than array length
        } else if (i + gridSize >= array.length) {
            html += `<td><span id="id${array[i].id}" class="hint">${getKeyValueByID(array, i, 'points')}/${getKeyValueByID(array, i, 'bombs')}</span></td>`;
            rowLength++;
        }
    };
    selectPlayspace.innerHTML = html;
}

// All the runtime functions to retry a game
function startGame() {
    gameover = false;
    resetScore(selectScore);
    populategrid(grid);
    resetBombCount(grid);
    displayAnswer(grid);
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
            const revealedValue = getValueById(grid, targ.id.split('id')[1]);
            console.log(revealedValue);
            targ.textContent = revealedValue;
            // If revealed card is a bomb (zero) then color card red then end game
            if (revealedValue === 0) {
                targ.classList.add('revealed-bomb');
                alert('Gameover!');
                gameover = true;
            // else if revealed card is not a bomb then award points
            } else {
                targ.classList.add('revealed-points');
                score += revealedValue
                selectScore.textContent = score;
            }
            
        }
    }
});

selectRestart.addEventListener('click', (e) => {
    startGame();
});