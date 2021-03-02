const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

    // makes all divs start faceDown
    newDiv.classList.add('faceDown')

    // makes all divs have color attribute
    newDiv.setAttribute('color', color)
  }
}

// initialize
let card1 = ''
let card2 = ''
let score = 0
const restartButton = document.querySelector('button')
const scoreBoard = document.querySelector('#scoreNum')

restartButton.addEventListener("click", ()=>{window.location.reload()})


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target)  

//while there aren't more than 2 faceup nonmatched cards do the if event

  
  if ((event.target.getAttribute('status') !== 'matched') && (card2 === '')) {
    event.target.classList.toggle('faceDown')
  
    
    if (!card1) {
      card1 = event.target;
    } 
    else if (!card2) {
      card2 = event.target;
      if (card1.getAttribute('color') === card2.getAttribute('color') && (card1 !== card2)) {
        card1.classList.add('matched')
        card2.classList.add('matched')
        card1.setAttribute('status', 'matched')
        card2.setAttribute('status', 'matched')
        score += 2;
        scoreBoard.innerText = score;
        card1 = ''
        card2 = ''
      } 
      else if (card1.getAttribute('status') !== 'matched'){
        setTimeout(() => {
          card1.classList.toggle('faceDown')
          card2.classList.toggle('faceDown')
          card1 = ''
          card2 = ''
        }, 500)
      
      }
    } 
    else {
      card1 = ''
      card2 = ''
    }
  
  }

  
  // card selected tracker
  
  if (score === 10) {
  setTimeout(()=>{alert("You've Won!")}, 500)
}
}



// when the DOM loads
createDivsForColors(shuffledColors);
