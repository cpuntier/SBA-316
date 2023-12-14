const starter = document.getElementById("gameStart");
const difficulty = document.querySelectorAll(".Difficulty_Select input");
const mainpage = document.querySelector(".mainpage");


// console.log(difficulty);
// console.log(starter);
const grid = document.createElement("div");
let count = 0;
let length = selectDifficulty()


let answer = "hello";
starter.addEventListener("click", startGame);

function startGame() {
    //console.log(difficulty);
    //    console.log(mainpage);


    for (let i = 0; i < 5; i++) {
        grid.appendChild(createRow());
    }


    updateMain();
    // mainpage.innerHTML = `<h3> GAME HAS STARTED</h3>
    // <div class = "gridHolder">
    // ${grid.innerHTML}
    // </div>
    // <input type="text" id="guess" required minlength="${length}" maxlength="${length}" size="10" />
    // <button id = "submit">Guess</button>

    // `

    // const guessButton = document.getElementById("submit");
    // console.log(guessButton);
    // const guessInput = document.getElementById("guess");

    // guessButton.addEventListener("click", gridHandler);





    // function checkGuess(){
    //     console.log(grid.childNodes[0]);
    // }



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

function updateMain() {
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


    function gridHandler() {
        updateGrid(guessInput.value.split(""));
    }


}


function updateGrid(guess) {
    let index = 0;
    let currentNode = grid.childNodes[count].childNodes[0];
    while (currentNode) {
        console.log("before update: ,", currentNode);
        if (currentNode) {
            if (currentNode.innerHTML) {
                console.log("Here?")
                currentNode.innerHTML = `<p>${guess[index]}</p>`;
                if(guess[index] == answer[index]){
                    currentNode.style.backgroundColor = "green";
                }else if(answer.indexOf(guess[index])){
                    currentNode.style.backgroundColor = 'yello';
                
                }
                index = index + 1;
            }
            currentNode = currentNode.nextSibling;
            console.log("after update:", currentNode);
        }
    }
    updateMain();
    count = count + 1;
}
