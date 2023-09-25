// Create a variable that refers to the grid container div.
const gridContainer = document.querySelector('.gridContainer')

// Create another constant that refers to an array of colors. These are CSS compatible colors. This array only creates one instance of each color.
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];

// To create an array of duplicate colors, we will use the spread operator.
// colorsPickList is a new array containing two of the colors array
const colorsPickList = [...colors,...colors];

// Create a reference to the number of grid boxes we have.
const gridboxCount = colorsPickList.length;

// Game state

// Number of gridboxes that have been revealed.
let revealedCount = 0;

// The active gridbox refers to the gridbox that the user clicked on and will be looking for the next gridbox. Will refer to the div itself.
let activeGridbox = null;

// Waiting for the two unmatched gridboxes to turnover again. When the gridboxes are revealed and waiting to restart, it is true.
let awaitingEndofMove = false;

console.log(colorsPickList);
