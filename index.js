//obtain document elements needed immediately

const starter = document.getElementById("gameStart");
const difficulty = document.querySelectorAll(".Difficulty_Select input");
const mainpage = document.querySelector(".mainpage");

const grid = document.createElement("div");
let count = 0; // represents number of guesses

starter.addEventListener("click", startGame); 
let answer = "";


function startGame() {

    //determining how long input guess should be
    let length = selectDifficulty();

    //choosing appropriate word bank based on difficulty chosen
    console.log(typeof (length));
    if (length === "5") {
        let randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
        answer = fiveLetterWords[randomIndex];
        console.log(randomIndex);

    } else if (length === "6") {
        let randomIndex = Math.floor(Math.random() * sixLetterWords.length);
        answer = sixLetterWords[randomIndex];
        console.log(randomIndex);

    } else if (length === "7") {
        let randomIndex = Math.floor(Math.random() * sevenLetterWords.length);
        answer = sevenLetterWords[randomIndex];
        console.log(randomIndex);

    }
    //console.log(difficulty);
    //    console.log(mainpage);


    ///creating grid based on difficulty
    for (let i = 0; i < 6; i++) {
        grid.appendChild(createRow(length));
    }

    //updating mainhtml to start game
    updateMain(answer.toUpperCase(), length, []);

}


//function written to get value of radio menu that was checked to choose difficulty
function selectDifficulty() {
    let output;
    for (let i = 0; i < difficulty.length; i++) {
        if (difficulty[i].checked) {
            output = difficulty[i].value;
            //console.log(difficulty[i].value)

        }
    }
    return output;
}


//uses template to create tiles used in grid.
function createTile() {
    const fragment = document.getElementById("tileTemplate");
    const tileClone = fragment.content.cloneNode(true);
    const body = tileClone.querySelector(".tile p");
    return tileClone;
}



//uses createTile to make "rows" for grid
//divs are created and individual "tiles" are appended as children.
function createRow(length) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    for (i = 0; i < length; i++) {
            row.appendChild(createTile());
    }
    return row;
}


//function that updates the maindiv's innerhtml
function updateMain(answer, length, guess = []) {

    //controls main flow of the game

    //    console.log(guess.join(""), answer);

    if (count === 6 && guess.join("") != answer) { // if out of guesses and not correct player loses
        //user has lost . stop the game and let them know the answer
        console.log(answer, guess, count);
        console.log("You Lose!");
        alert(`You Lose! The word was ${answer}`);
        mainpage.innerHTML = `<h3> GAME HAS ENDED</h3>
        <div class = "gridHolder">
        ${grid.innerHTML}
        </div>
        <h1>"You LOSE!"</h1>
        <h2>The answer was ${answer}</h2>
        <button id = "reload">Play Again? </button>
        `
        //button is added to allow the user to refresh the page.
        const reload = document.getElementById("reload");
        reload.addEventListener("click", reloadFunction);

        function reloadFunction(){
            window.location.reload();
        }


        return;
    }

    if (guess.join("") != answer) { // if not right guess, show appropriate grid with buttons where they need to be.
        //at this point the user is still playing the game
        mainpage.innerHTML = `<h3> GAME HAS STARTED</h3>
        <div class = "gridHolder">
        ${grid.innerHTML}
        </div>
        <input type="text" id="guess" required minlength="${length}" maxlength="${length}" size="10" />
        <button id = "submit">Guess</button>        
        `

        const guessButton = document.getElementById("submit");
        console.log(guessButton);
        const guessInput = document.getElementById("guess");
        guessButton.addEventListener("click", gridHandler);

        //creating warning dialog if user enters not long enough string
        let warningTimeout;
        const warningBox = document.createElement("div");
        warningBox.className = "warning";

        //function to display warning should string not be long enough
        //adopted from notes in slides.
        function displayWarning(msg) {
            warningBox.innerHTML = msg;
            if (document.body.contains(warningBox)) {
                clearTimeout(warningTimeout);
            } else {
                guessInput.parentNode.insertBefore(warningBox, guessInput.nextSibling);
            }

            warningTimeout = setTimeout(() => {
                warningBox.parentNode.removeChild(warningBox);
                warningTimeout = -1;
            }, 2000)

        }


        function gridHandler() {
            //handler used to display warning if guess isnt right length
            if (guessInput.value.length != length) {
                displayWarning(`Guess entered must be the same length as the difficulty chosen (${length})`)

            } else {
                updateGrid(answer.toUpperCase(), length, guessInput.value.toUpperCase().split(""));
            }
        }

    }
    else {
        //user has won. display message of winning
        console.log("You win!");
        alert("You win!")
        mainpage.innerHTML = `<h3> GAME HAS ENDED</h3>
    <div class = "gridHolder">
    ${grid.innerHTML}
    </div>
    <h1>"You Win!"</h1>
    `
        return;
    }
    return;

}


function updateGrid(answer, length, guess) {
    ///When the user guess navigate through nodes and update html values to present letters
    let index = 0;
    let currentNode = grid.childNodes[count].childNodes[0];
    while (currentNode) { // use while loop to traverse through nodes
        console.log("before update: ,", currentNode);
        if (currentNode) {
            if (currentNode.innerHTML) {
//                console.log("Here?")
                currentNode.innerHTML = `<p>${guess[index]}</p>`;//set guess in appropriate position
                if (guess[index] == answer[index]) {
                    currentNode.style.backgroundColor = "green"; // green if right
                } else if (answer.indexOf(guess[index]) >= 0) {
                    currentNode.style.backgroundColor = 'orange'; // orange is in word but wrong place

                }
                index = index + 1;
            }
            currentNode = currentNode.nextSibling;
            console.log("after update:", currentNode);
        }
    }
    count = count + 1; // update number of guesses 
    updateMain(answer.toUpperCase(), length, guess);
}


///BELOW ARE THE WORD BANKS USED FOR THE GAMES
const fiveLetterWords = [
    'apple', 'happy', 'world', 'table', 'dream',
    'music', 'drink', 'smile', 'peace', 'jumbo',
    'beach', 'queen', 'baker', 'watch', 'tiger',
    'cloud', 'grape', 'fence', 'ocean', 'shine',
    'funny', 'camel', 'candy', 'arrow', 'black',
    'horse', 'grain', 'pizza', 'chair', 'piano',
    'badge', 'jelly', 'funky', 'salty', 'sunny',
    'maple', 'globe', 'tramp', 'dance', 'wagon',
    'lunar', 'robot', 'flame', 'flash', 'green',
    'white', 'sugar', 'magic', 'zebra', 'laser',
    'swift', 'block', 'blaze', 'frost', 'stone',
    'blade', 'space', 'flint', 'haste', 'crown',
    'crisp', 'spark', 'dwarf', 'rover', 'wrist',
    'swirl', 'flock', 'prize', 'rider', 'chill',
    'creek', 'trace', 'pouch', 'rider', 'sleet',
    'scent', 'forge', 'flute', 'tramp', 'spear',
    'rider', 'peach', 'slide', 'charm', 'fairy',
    'grind', 'twist', 'sharp', 'fable', 'clash',
    'brave', 'fleet', 'honor', 'snack', 'sweep'
];


const sixLetterWords = [
    'banana', 'orange', 'camera', 'purple', 'friend',
    'rocket', 'summer', 'dragon', 'wonder', 'circle',
    'forest', 'guitar', 'winter', 'magnet', 'silver',
    'planet', 'cookie', 'flower', 'travel', 'soccer',
    'basket', 'puzzle', 'zipper', 'fluent', 'rabbit',
    'cloudy', 'keypad', 'garden', 'island', 'shadow',
    'purple', 'spring', 'silver', 'impact', 'whales',
    'hunter', 'future', 'cactus', 'pocket', 'yellow',
    'carpet', 'shadow', 'breeze', 'pickle', 'mirror',
    'sunset', 'ticket', 'candle', 'smooth', 'rocket',
    'remote', 'camera', 'silent', 'sizzle', 'minute',
    'random', 'people', 'bright', 'purple', 'bishop',
    'jacket', 'remote', 'sizzle', 'moment', 'yellow',
    'spirit', 'faster', 'purple', 'basket', 'orange',
    'rocket', 'rocket', 'puzzle', 'double', 'planet',
    'summer', 'spring', 'forest', 'purple', 'guitar',
    'whales', 'silver', 'mirror', 'soccer', 'flower',
    'moment', 'future', 'hunter', 'breeze', 'pickle',
    'minute', 'yellow', 'moment', 'rocket', 'ticket'
];


const sevenLetterWords = [
    'awesome', 'chicken', 'freedom', 'january', 'village',
    'genuine', 'capital', 'initial', 'country', 'explode',
    'journey', 'hydrate', 'justice', 'liberty', 'mission',
    'nominee', 'perfect', 'qualify', 'upgrade', 'weather',
    'declare', 'whisper', 'balance', 'cluster', 'diamond',
    'fashion', 'morning', 'neutral', 'popular',
    'quality', 'reserve', 'satisfy', 'against', 'biology',
    'element', 'healthy', 'journal', 'observe', 'reflect',
    'society', 'gravity', 'history', 'install', 'capture',
    'deliver', 'abandon', 'cluster', 'forever'
];  