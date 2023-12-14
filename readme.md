# SBA 316 The Document Object Model

This assignment was used to gauge my understanding of the Document Object Model and my capability to implement its features in a practical matter.

In this assignment I was able to
 
 - Use DOM properties, methods, and techniques to create a web application that provides a dynamic user experience.
 - Use BOM properties, methods, and techniques to facilitate creation of a dynamic web application.
 - Demonstrate proficiency with event-driven programming and DOM events.
 - Implement basic form validation using any combination of built-in HTML validation attributes and DOM-event-driven JavaScript validation.

# Task
The task was to create a single page web application of my choice. I decided to create a wordle like game. The user must guess a word of lengths 5,6,7 depending on the users choice. They have 6 oppurtunities to guess the randomly selected word. When they take their guess they will be given feedback based on their answer. If the tile turns green that letter is in the appropriate space. If the tile turns orange that letter exists in the word. If there is no change in the color from gray that letter does not exist in the target word.


---
# HTML
The initial HTML is simply made to obtain the users difficulty choice. Three radio menus are used in order to choose the difficulty. A button is then used to submit that information. The html is then modified in the js file to start the game.

---
# Script

Below I will detail the functions made and how they work. 

#### startGame()
This event triggers when the submit button is clicked. The inner HTML is changed to match that of the grid system that allows for  word guessing. This function makes use of the updateMain() and createRow() functions.


#### updateMain(answer, length, guess = [])
This function triggers whenever the main div html needs to be updated. It takes in the randomly selected answer, the length of the word and the current guess as an array of characters. The array will default to an empty array if there is no made guess yet. This controls the main flow of the game. Everytime a guess is made the grid is updated appropriately based on the user's guess. 


#### createRow(length)
This function makes use of the create tile function. It takes in the length parameter. This parameter tells if how long the row should be, representing the number of letters the target word has. 

### createTile()
Used by createRow(). Uses the template in the html in order to create tiles for the grid.

### selectDifficulty()
Called when startGame() is ran. This grabs the value of the radio menus and selects the one which was checked to determine the length of the word and guesses needed.

---
# General Flow
The game is designed to be fully responsive to the users actions. A difficulty is chosen first. Once that is done they are allowed to make whatever guess they want. Each guess made changes the grid to provide the right feedback. The game ends when they run out of guesses or the guess the word properly.

# Potential Future Updates
- Could update color changes when dealing with words that have duplicate letters.
- Update the ui to make it more appealing.
- Validate guess to make sure that dictionary words are being given. Right now any combination of 5 characters is accepted.
- Allow only a-z characters to be submitted as guesses.


