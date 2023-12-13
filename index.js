const starter = document.getElementById("gameStart");
const difficulty = document.querySelectorAll(".Difficulty_Select input");
const mainpage = document.querySelector(".mainpage");


// console.log(difficulty);
// console.log(starter);



starter.addEventListener("click", startGame);

function startGame(){

    //console.log(difficulty);

//    console.log(mainpage);

    let length = selectDifficulty()


    const grid = document.createElement("div");

    // for (i = 0; i< length; i ++){
    //     grid.appendChild(tile);
    // }

    for(let i = 0; i< 5;i++){
    grid.appendChild(createRow());
    }
    console.log(grid);


    mainpage.innerHTML = `<h3> GAME HAS STARTED</h3>
    <div class = "gridHolder">
    ${grid.innerHTML}
    </div>
    <input type="text" id="guess" required minlength="${length}" maxlength="${length}" size="10" />
    <button id = "submit">Guess</button>

    
    `
    // //console.log(grid);

    const guessButton = document.getElementById("submit");
    console.log(guessButton);
    const guessInput = document.getElementById("guess");

    guessButton.addEventListener("click",checkGuess);



    function checkGuess(){
        console.log(grid.childNodes[0].childNodes[1].innerHTML);
    }
    
}




selectDifficulty();


function selectDifficulty(){
    let output;
    for(let i = 0; i < difficulty.length; i ++){
        if (difficulty[i].checked){
            output = difficulty[i].value;
            //console.log(difficulty[i].value)
            
        }
    }
    return output;
}

function createTile(){
    const fragment = document.getElementById("tileTemplate");
    const tileClone = fragment.content.cloneNode(true);
    const body = tileClone.querySelector(".tile p");
    // console.log(tileClone);
    // console.log(body);

    return tileClone;
}


function createRow(){
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    for (i = 0; i <selectDifficulty();i++){
        row.appendChild(createTile())
    }
    return row;
}
