# exercise-connect-four

 [DEMO](https://connect-four.now.sh)

## Vue CLI

This project has been scaffolded by Vue CLI. All typical commands are available.
Also see [Configuration Reference](https://cli.vuejs.org/config/).

## Assignment

### Objective

Create a single-page web application which allows the user to play the game ["Connect Four"](https://en.wikipedia.org/wiki/Connect_Four). One player should fight against a remote computer controlled opponent (CPU through API). This exercise should take somewhere between 2 and 4 hours. One is allowed, but certainly not required, to put more effort into the exercise.

The typical game looks like:

-   [x] Player can start a new game
-   [x] Player and computer take turns placing discs
-   [x] Winner is shown when game is finished

### Requirements

-   [x] UI application must be implemented using Vue.js
-   [x] UI must be user friendly
-   [x] Players cannot act during each others turns
-   [x] Opponent logic must run server side (please document how to start the server)
-   [x] Code must be supplied as git repository
-   [x] Computer player must at the very least return a random column

### Supplied

1. Jest for unit testing
1. TypeScript support
1. SASS support

### Server
Mirage is used for the oponent moves. Therefore there is no need to start the mockserver seperatly. The logic is kept to a MVP to meet the requirement. The logic can be found ```/src/server.js``` it provides the endpoint ```/api/moves``` which gives a response with an object with a random column number. Server responses can be checked in the console.


