const wordDisplay= document.querySelector(".worddisplay")
const guessestxt=document.querySelector(".guess-txt b")
const keyboardDiv= document.querySelector(".keyboard");



let currentWord, wrongGuessCount =0;
const maxGuesses=6;

const getRandomWord= () =>{
    const { word,hint}= wordlist[Math.floor(Math.random()* wordlist.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-msg b").innerText= hint;
    wordDisplay.innerHTML= word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame= (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else{
    wrongGuessCount++;
    }
guessestxt.innerText = `${wrongGuessCount} / ${maxGuesses}`;
}


for( let i=97; i <= 122 ; i++){
    const button= document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame (e.target, String.fromCharCode(i)));
}



getRandomWord();