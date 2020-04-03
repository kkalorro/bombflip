// Random Number Generator
function randNum(max) {
    return num = Math.floor((Math.random() * max));
}

// Create Array Function
function createArray(length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        // Hard-coded to 7 for gameplay balance purposes
        arr.push(randNum(5));
    }

    return arr;
}

// Vertical array
const verticalArr = createArray(5);
console.log(verticalArr);

// 2D array
let TwoDArr = [];
// For every vertical row in the 2D array
for (let i = 0; i < verticalArr.length; i++) {
    // Do a horizontal array
    TwoDArr.push(createArray(5));
}
console.log(TwoDArr);

// Display array with spans in #left-playspace
const selectLeftPlayspace = document.getElementById('left-playspace');
let html = '';

// Go through every vertical array
for (let i = 0; i < TwoDArr.length; i++) {
    // Go through every horizontal array
    for (let j = 0; j < TwoDArr[i].length; j++) {
        // console.log(TwoDArr[i][j]);
        html += `<span class="flip">${TwoDArr[i][j]}</span>`;
    }
    html += '<span class="vertical-hint hint">8/8</span><br>';
}

for (let i = 0; i < 5; i++) {
    html += '<span class="horizontal-hint hint">8/8</span>';
}

selectLeftPlayspace.innerHTML = html;

// Calculate totals in each row
const row = TwoDArr[0];
const vHint = [];

// Count Points
let totalPoints = 0;
for (let i = 0; i < row.length; i++) {
    totalPoints += row[i];
}
console.log(`totalPoints = ${totalPoints}`);

// Count Bombs
let totalBombs = 0;
for (let i = 0; i < row.length; i++) {
    if (row[i] === 0) {
        totalBombs += 1;
    }
}
console.log(`totalBombs = ${totalBombs}`);

// Calculate totals in each column


// Build arrays for vertical hint
const selectVHint = document.getElementsByClassName('vertical-hint');


for (let i = 0; i < selectVHint.length; i++) {
    // vHint.push(selectVHint[i].textContent);
}

console.log(vHint);

// Build arrays for horizontal hint
const selectHHint = document.getElementsByClassName('horizontal-hint');
const hHint = [];

for (let i = 0; i < selectHHint.length; i++) {
    hHint.push(selectHHint[i].textContent);
}

console.log(hHint);