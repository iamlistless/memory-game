// Create a variable that refers to the card container div.
const cardContainer = document.querySelector('.cardContainer')

// Create another constant that refers to an array of colors. These are CSS compatible colors. This array only creates one instance of each color.
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];

// To create an array of duplicate colors, we will use the spread operator.
// colorsPickList is a new array containing two of the colors array
const colorsPickList = [...colors,...colors];

// Create a reference to the number of card boxes we have.
const cardCount = colorsPickList.length;

// Game state

// Number of cards that have been revealed.
let revealedCount = 0;

// The active card refers to the card that the user clicked on and will be looking for the next card. Will refer to the div itself.
let activeCard = null;

// Waiting for the two unmatched cards to turnover again. When the cards are revealed and waiting to restart, it is true.
let awaitingEndOfMove = false;

// Create a function to build the card. The function will build a new card element and return it to the for loop below.
// We will pass through a color.
function buildcard (color) {
    // Create a div using JavaScript.
    const element = document.createElement("div");

    // Add a class to the element being created.
    element.classList.add("card");
    // Set an attribute to the element in order to record miscellaneous information for the game.
    element.setAttribute("data-color", color);
    // Set an attribute to the element that marks it as not revealed.
    element.setAttribute("data-revealed", "false");

    // Create a method to using addEventListener to reveal the cards.
    element.addEventListener("click", () => {
        // We want to establish conditions to prevent unwanted actions.

        // We want to prevent revealed cards from being selected or being applied as selected cards again by creating a constant within this function. 
        const revealed = element.getAttribute("data-revealed")


        // We do not want to allow the player to choose other cards after revealing two cards.
        // The following condition will exit us out of the function. 
        if (awaitingEndOfMove
            // We also do not want the player to be able to select revealed cards. 
            || revealed === "true"
            // And we do not want the player to be able to select the active card.
            || element === activeCard
            ) {
            return;
        }
        // When clicked, add background color equal to the color that is passede through the function.
        element.style.backgroundColor = color;

        // If there is no active card, then the active card equals the element, which is determined by the initial color selected.
        if (!activeCard) {
            activeCard = element;
            return;
        }

        // Create condition for matching colors using the data attribute we created.
        const colorToMatch = activeCard.getAttribute("data-color");

        if (colorToMatch === color) {
            // Flag the active card and element as revealed.
            activeCard.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            // Reset variables.
            awaitingEndOfMove = false;
            activeCard = null;
            // We will also add to the score.
            revealedCount += 2;

            // Delay alert so that all cards are shown before the message appears.
            setTimeout(() => {
                if (revealedCount === cardCount) {
                    alert("You have decent memory. Refresh page to play again.");
                }}, 100);
                
            return;
        }
        
        // Prevent any further cards after the second selection from being clicked on.
        awaitingEndOfMove = true;

        // Set a timeout period to clear the selected cards and reset the variables: activeCard and awaitingEndOfMove.
        setTimeout(() => {
            // Clear cards.
            element.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;

            // Reset variables.
            awaitingEndOfMove = false;
            activeCard = null;
        }, 500);
    });

    return element;
}

// Select colors at random using a for loop.
for (let i = 0; i < cardCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPickList.length);
    const color = colorsPickList[randomIndex];
    const card = buildcard(color);
    // Ensure that only two of the same colors are chosen from the colorsPickList
    colorsPickList.splice(randomIndex, 1);
    cardContainer.appendChild(card);
}

