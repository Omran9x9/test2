const hanmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboarDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const palyAgainBtn = document.querySelector(".play-again");

let currentWord , correctletters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting all game variables UI elements
    correctletters =[]
    wrongGuessCount = 0;
    hanmanImage.src = `../project-1 -  Hangman Game/assest/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboarDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")
}

const getRandomWord = () => {
    // Selecting arandom word and hint from the wordList
    const{ word , hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);// if you want you can delet this code
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After 600ms of game coplete.. showing modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You found the word` : `The connect word was:`;
        gameModal.querySelector("img").src = `../project-1 -  Hangman Game/assest/${isVictory ? "victory" : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? "Congrats" : "Game Over"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show")
    } , 300);
}

const initGame = (button , clickedletter) => {
    //checing if clickedletter is exist on the currentword
    if(currentWord.includes(clickedletter)){
        //Shwing all correct letters on the word display
        [...currentWord].forEach((letter , index) => {
            if(letter === clickedletter){
                correctletters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hanmanImage.src = `../project-1 -  Hangman Game/assest/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets 
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctletters.length === currentWord.length) return gameOver(true);
} 

// Creating keyboar buttons and adding event listeners
for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboarDiv.appendChild(button);
    button.addEventListener("click" , e => initGame(e.target , String.fromCharCode(i)))
}

getRandomWord();
palyAgainBtn.addEventListener("click" , getRandomWord);