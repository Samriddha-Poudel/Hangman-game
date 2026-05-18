const hangmanImage=document.querySelector(".hangman-container img");
const wordDisplay= document.querySelector(".worddisplay");
const guessestxt=document.querySelector(".guess-txt b");
const keyboardDiv= document.querySelector(".keyboard");
const gameModal= document.querySelector(".game-mdl");
const playAgainBtn = document.querySelector(".play-agn")







let currentWord, correctLetters, wrongGuessCount;
const maxGuesses=6;



const resetGame = () =>{
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src =`hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
    guessestxt.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord= () =>{
    const { word,hint}= wordlist[Math.floor(Math.random()* wordlist.length)];
    currentWord = word;
    
    document.querySelector(".hint-msg b").innerText= hint;
    resetGame();
    
}

const gameOver = (isVictory) => {
    setTimeout(()=> {
        const modalText= isVictory ? "You found the word:" : "The correct word was :";
        gameModal.querySelector("img").src =`hangman-game-images/images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : ' Game Over !'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
gameModal.classList.add("show");
    }, 300);
}


const initGame= (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else{
    wrongGuessCount++;
    hangmanImage.src = `hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled= true;
guessestxt.innerText = `${wrongGuessCount} / ${maxGuesses}`;


if(wrongGuessCount === maxGuesses) return gameOver(false);
if([...new Set(currentWord)].every( letter => correctLetters.includes(letter))) return gameOver(true);
}


for( let i=97; i <= 122 ; i++){
    const button= document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame (e.target, String.fromCharCode(i)));
}



getRandomWord();


playAgainBtn.addEventListener("click", getRandomWord);