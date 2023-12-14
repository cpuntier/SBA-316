const starter = document.getElementById("gameStart");
const difficulty = document.querySelectorAll(".Difficulty_Select input");
const mainpage = document.querySelector(".mainpage");


const grid = document.createElement("div");
let count = 0;

starter.addEventListener("click", startGame);
let answer = "";
function startGame() {
    let length = selectDifficulty();
    let randomIndex = Math.floor(Math.random() * length);

    console.log(typeof (length));
    if (length === "5") {
        answer = fiveLetterWords[randomIndex];
    } else if (length === "6") {
        answer = sixLetterWords[randomIndex];
    } else if (length === "7") {
        answer = sevenLetterWords[randomIndex];
    }
    //console.log(difficulty);
    //    console.log(mainpage);


    for (let i = 0; i < 5; i++) {
        grid.appendChild(createRow());
    }
    console.log(randomIndex);
    console.log("this is answer,", answer);

    updateMain(answer.toUpperCase(), length, []);

}





selectDifficulty();


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

function createTile(text = "") {
    const fragment = document.getElementById("tileTemplate");
    const tileClone = fragment.content.cloneNode(true);
    const body = tileClone.querySelector(".tile p");
    // console.log(tileClone);
    // console.log(body);
    body.innerHTML = text;

    return tileClone;
}


function createRow(array = []) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    for (i = 0; i < selectDifficulty(); i++) {
        if (array.length) {
            row.appendChild(createTile())
        } else {
            row.appendChild(createTile(array[i]));
        }
    }
    return row;
}

function updateMain(answer, length, guess = []) {

    console.log(guess.join(""), answer);
    if (count === 5 && guess.join("") != answer) {
        console.log(answer, guess, count);
        console.log("You Lose!");
        alert(`You Lose! The word was ${answer}`);
        mainpage.innerHTML = `<h3> GAME HAS ENDED</h3>
        <div class = "gridHolder">
        ${grid.innerHTML}
        </div>
        <h1>"You LOSE!"</h1>
        <h2>The answer was ${answer}</h2>
        `}

    if (guess.join("") != answer) {
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

        let warningTimeout;
        const warningBox = document.createElement("div");
        warningBox.className = "warning";

        function displayWarning(msg){
            warningBox.innerHTML = msg;
            if(document.body.contains(warningBox)){
                clearTimeout(warningTimeout);
            }else{
                guessInput.parentNode.insertBefore(warningBox,guessInput.nextSibling);
            }

            warningTimeout = setTimeout(() => {
                warningBox.parentNode.removeChild(warningBox);
                warningTimeout = -1;
            },2000)

        }



        function gridHandler() {

            if (guessInput.value.length != length) {
                displayWarning(`Guess entered must be the same length as the difficulty chosen (${length})`)

            } else {
                updateGrid(answer.toUpperCase(), length, guessInput.value.toUpperCase().split(""));
            }
        }

    }
    else {
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
    let index = 0;
    let currentNode = grid.childNodes[count].childNodes[0];
    while (currentNode) {
        console.log("before update: ,", currentNode);
        if (currentNode) {
            if (currentNode.innerHTML) {
                console.log("Here?")
                currentNode.innerHTML = `<p>${guess[index]}</p>`;
                if (guess[index] == answer[index]) {
                    currentNode.style.backgroundColor = "green";
                } else if (answer.indexOf(guess[index]) >= 0) {
                    currentNode.style.backgroundColor = 'orange';

                }
                index = index + 1;
            }
            currentNode = currentNode.nextSibling;
            console.log("after update:", currentNode);
        }
    }
    count = count + 1;
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
    'fashion', 'morning', 'neutral', 'organize', 'popular',
    'quality', 'reserve', 'satisfy', 'against', 'biology',
    'element', 'healthy', 'journal', 'observe', 'reflect',
    'society', 'gravity', 'history', 'install', 'capture',
    'deliver', 'abandon', 'cluster', 'forever'
];  