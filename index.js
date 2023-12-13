const starter = document.getElementById("gameStart");
const difficulty = document.querySelectorAll(".Difficulty_Select input");
const mainpage = document.querySelector(".mainpage");


// console.log(difficulty);
// console.log(starter);



starter.addEventListener("click", startGame);

function startGame() {
    let count = 0;
    //console.log(difficulty);
    //    console.log(mainpage);

    let length = selectDifficulty()
    const grid = document.createElement("div");

    for (let i = 0; i < 5; i++) {
        grid.appendChild(createRow());
    }
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

    guessButton.addEventListener("click", updateGrid);



    function updateGrid() {

        let currentNode = grid.childNodes[count].childNodes[0]
        while (currentNode) {
            if (currentNode) {
                console.log(currentNode.nextSibling);
                currentNode = currentNode.nextSibling;
                if (currentNode.innerHTML) {
                    console.log("Here?")
                    currentNode.innerHTML = `<p>Change</p>`
                }
            }
        }
        updateGrid();

        // for(let i = 0;i < grid.childNodes[count].childNodes.length;i++){
        //     console.log(currentNode[i].innerHTML);
        //     if(currentNode[i].innerHTML){
        //         currentNode[i].innerHTML = `<p>${guessInput.value[i]}</p>`
        //     }
        // }
        //updateMain()
    }


    // function checkGuess(){
    //     console.log(grid.childNodes[0]);
    // }


    function updateMain() {
        mainpage.innerHTML = `<h3> GAME HAS STARTED</h3>
        <div class = "gridHolder">
        ${grid.innerHTML}
        </div>
        <input type="text" id="guess" required minlength="${length}" maxlength="${length}" size="10" />
        <button id = "submit">Guess</button>
    
        
        `

    }


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
