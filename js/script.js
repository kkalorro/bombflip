//////////
// Init //
//////////

// Select Left Playing Space
const selectLeftPlayspace = document.getElementById('left-playspace');
// Select all vertical hints
const selectVHint = document.getElementsByClassName('vertical-hint');
// Select all horizontal hints
const selectHHint = document.getElementsByClassName('horizontal-hint');
// The 2D array with all the Cards
const grid = create2DArray();


///////////////
// Functions //
///////////////

// Random Number Generator
function randNum(max) {
    return num = Math.floor((Math.random() * max));
}

// Create 2D Array
function create2DArray() {
    // Populate Array with values function
    function createArray(length) {
        const arr = [];
        for (let i = 0; i < length; i++) {
            // Hardcoded to 3 for balance purposes
            arr.push(randNum(4));
        }
        return arr;
    }

    // 2D array
    let TwoDArr = [];
    // Create 5 arrays (hardcoded number for gameplay design purposes)
    for (let i = 0; i < 5; i++) {
        // Populate each array with 5 values (hardcoded value for gameplay design purposes)
        TwoDArr.push(createArray(5));
    }
    return TwoDArr;
}

// Convert Arrays into HTML and display
function displayPlayspace(targ) {
    let html = '';

    // Go through every vertical array
    for (let i = 0; i < grid.length; i++) {
        // Go through every horizontal array
        for (let j = 0; j < grid[i].length; j++) {
            // Create a Card Span for each value in array
            html += `<span class="card">${grid[i][j]}</span>`;
        }
        // Create a Hint Span for each horizontal array
        html += '<span class="vertical-hint hint">8/8</span><br>';
    }

    // Create a Hint Span for each vertical array
    for (let i = 0; i < grid.length; i++) {
        html += '<span class="horizontal-hint hint">8/8</span>';
    }

    // Update Playspace with new HTML code
    selectLeftPlayspace.innerHTML = html;
}

// Count total Points and Bombs in an Array and place results in Target
function countTotal(arr, targ) {
    // Count Points in Array
    function countPoints(arr, targ) { 
        let totalPoints = 0;
        for (let i = 0; i < arr.length; i++) {
            totalPoints += arr[i];
        }
        // Output results to targ
        targ.innerHTML = `<span class="total-points">${totalPoints}</span>`;
    }

    // Count Points in Array
    function countBombs(arr, targ) { 
        let totalBombs = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
                totalBombs += 1;
            }
        }
        // Output results to targ
        targ.innerHTML += `<span class="total-bombs">/${totalBombs}<span>`;
    }

        countPoints(arr, targ);
        countBombs(arr, targ);
}

// For every selectVerticalHint, count all Points and Bombs in row
function getColumn(arr, col) {
    const column = []
    for (let i = 0; i < arr.length; i++) {
        column.push(arr[i][col]);
    }
    return column;
}

// Count Vertical Hints and display
function countVHints(hintArray) {
    for (let i = 0; i < hintArray.length; i++) {
        countTotal(grid[i], hintArray[i]);
    }
}

// Count Horizontal Hints and display
function countHHints(hintArray) {
    for (let i = 0; i < hintArray.length; i++) {
        countTotal(getColumn(grid, i), hintArray[i]);
    }
}

/////////
// Run //
/////////

// Create Bombflip grid
displayPlayspace(selectLeftPlayspace);
create2DArray();
countVHints(selectVHint);
countHHints(selectHHint);

///////////////
// Listeners //
///////////////

const selectCards = selectLeftPlayspace.getElementsByClassName('card');