# top-project-tic-tac-toe

We’re making a Tic Tac Toe game you can play in your browser!

## Assignment
1. Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.

2. You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
    
    - Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

1. Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with `"X"`s and `"O"`s)

1. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
    
    1. Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

    1. If you’re having trouble, [Building a house from the inside out](https://www.ayweb.dev/blog/building-a-house-from-the-inside-out) is a great article that lays out a highly applicable example of how you might organize your code for this project.

1. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

1. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

1. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
    
    1. Start by just getting the computer to make a random legal move.
    
    1. Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it [here](https://en.wikipedia.org/wiki/Minimax), some googling will help you out with this one)
    
    1. If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!