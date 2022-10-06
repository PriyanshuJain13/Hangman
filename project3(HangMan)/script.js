const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("btn");
const popup = document.getElementById("popup");
const notification = document.getElementById("notification");
const finalMsg = document.getElementById("final-msg");
const finalParts = document.querySelectorAll(".figure-part");

const words = [
    "application",
    "interface",
    "wizard",
    "mouse",
    "window",
    "laptop",
    "strength",
    "stretch",
    "stronghold",
    "whisky",
    "guardian",
    "lucky",
    "smartphone",
    "computer",
    "robotics",
    "kitchen",
    "zombies",
    "haunted",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

//display word function
function displayWord()
{
wordEl.innerHTML = `
${selectedWord
    .split("")
    .map(
        (letter) => 
        `<span class = "letter">${correctLetters.includes(letter) 
            ? letter 
            : ""
    }</span>`
    )
 
 .join("")}
`;

const innerWord = wordEl.innerText.replace(/\n/g,"");

if(innerWord === selectedWord)
{
    if(wrongLetters.length < 3)
    {
        finalMsg.innerText = "Adbhut Avishvasniye!!!!";
    }else{

        finalMsg.innerText = "Hn Hn tukke me jeet gya :|";
    }
    popup.style.display = "flex";
}

}

//Wrong letter function
function upadateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong Letter</p>":""}
    ${wrongLetters.map(
        (letter) => `<span>${letter}</span>`
        )}
    `;

    //displaying body parts with each wrong word
    finalParts.forEach((part,index)=>{
        const errors = wrongLetters.length;
        if(index<errors){
            part.style.display = "block";
        }else{
            part.style.display = "none";
        }
    });

    //if you lost
    if(wrongLetters.length === finalParts.length){
        finalMsg.innerHTML = `Haar gya be tu ;) <h5>Correct Word: ${selectedWord}</h5>`;
        popup.style.display = "flex";
    }
}

// showNotification
function showNotification(){
    notification.classList.add("show");
    setTimeout(()=>{
        notification.classList.remove("show");

    },2000);
}

//Key letter press
window.addEventListener("keydown",(e)=>{
    if(e.keyCode>=65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                upadateWrongLettersEl();
            }else{
                showNotification();
            }
        }
    }

});

//play again button
playAgainBtn.addEventListener("click",()=>{
    document.location.reload();
})

displayWord();