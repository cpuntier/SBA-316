const starter = document.getElementById("gameStart");
const difficulty = document.querySelectorAll(".Difficulty_Select input");

console.log(difficulty);
console.log(starter);



starter.addEventListener("click", startGame);

function startGame(){

    console.log(difficulty);
}


const state = {}