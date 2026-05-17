const wordDisplay= document.querySelector(".worddisplay")
const keyboardDiv= document.querySelector(".keyboard");



let currentWord;

const getRandomWord= () =>{
    const { word,hint}= wordlist[Math.floor(Math.random()* wordlist.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-msg b").innerText= hint;
    wordDisplay.innerHTML= word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame= (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        console.log(clickedLetter, "is exists on the word");
    } else{
        console.log(clickedLetter, "is not exists on the word");
    }
}


for( let i=97; i <= 122 ; i++){
    const button= document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame (e.target, String.fromCharCode(i)));
}



getRandomWord();