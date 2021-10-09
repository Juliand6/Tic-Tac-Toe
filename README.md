# Tic-Tac-Toe
Name of team: TiKTaK

Members of Team:
- Julian D'alessandro Fernandes(juliand6@my.yorku.ca) Section B, Lab 4
- Jason Yang(yangjas4@my.yorku.ca) Section B, Lab 4

Title: Tic Tac Toe

# Description: 
In this project we will be building the classic game of Tic Tac Toe using HTML, CSS and Javascript. Tic Tac Toe is a simple game played on a three by three grid where each player's 
objective is to get three X’s or O’s lined up diagonally, in a row, or in a column. Our project will serve as a one player game, where the user will interact with 
the game by inputting a move followed by the server who will select a move by random until either the player wins, loses or creates a draw. If the user wins more than one game consecutively, the application will track the number of consecutive wins and record the final winstreak onto a leaderboard. There will also possibly be a player vs player option. 


This project will also have a few side functions aside from the main game of Tic Tac Toe. There will be a side function which allows users to select one of several background soundtracks to in the background. This widget will also allow users to pause the music, skip to next track, restart the track, or jump to previous track. Another side function present will be a weather dashboard which will tell users the weather outside based on the client's location. This will be done using a weather API. 

# Functional Requirements
**As a player I can select whether I want to play by myself (player vs computer) or with another player (player vs player)**
- User will see a navigation bar at the top of the page. On the navigation bar, users will see 2 options, singleplayer and multiplayer.
    - If a user left clicks singleplayer, they will be directed to the singleplayer program. 
    - If a user left clicks multiplayer, they will be directed to the multiplayer program. 

**As a player, I can play a game of Tic-Tac-Toe by myself against the server.**
- User will be assigned either playerX or playerO
    - The user is assigned a player randomly at the beginning of every game. 
    - The server is assigned a the opposite configuration as the user. (If user is playerX, server is playerO. If user is playerO, server is playerX)

- User will be presented with a 3 by 3 grid in the middle of the screen. 
    - Above the 3 by 3 grid right aligned to the grid, there will be a winstreak counter in the format "Winstreak: " + winStreakNumber
    - There will be a text left aligned above the grid stating whether it's playerX or playerO's turn to play. 

- When it's the user's turn, the user will be able to make a play on the grid. 
    - playerX will always have the first turn. playerO will always have the second turn. This is a recursive process and will loop until the game concludes. 
    - To input a move, the user will left click on a box in the grid. If the user is playerX then there will be a X in the box. If the user if playerO there will be an O in the box.
    - Squares that have either an X or O inside are marked as filled. Filled boxes are illegal moves. 
    - During the user's move, all legal moves (unfilled boxes) will have a dot in the center of the box to indicate a legal move. After a move is input, the turn is over.
    - When the turn is over, all dots will dissapear from the grid until it becomes the user's turn again.  
    - Users can only input moves when it's their turn. When it is not the user's turn, clicks inside the grid will not trigger anything. 
    -  

