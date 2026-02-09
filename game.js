
let gameseq=[];
let userseq=[];

let started=false;
let level=0;

let btns=["red", "green", "blue", "purple"];

let h3=document.querySelector('h3');

document.addEventListener('keypress', function(){

    if(started==false){
        console.log("Game Started");
        started=true;

        levelUp();
    }
});


function levelUp(){
    userseq=[];    // reset the user sequence for the next level
    level++;
    h3.innerText=`Level ${level}`;    // update the level in h3 text

    
    let randidx=Math.floor(Math.random()*3);
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);             // add the random color to the game sequence
    gameFlash(randbtn);                // randomly flash a button

}

function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    }, 300)
}

function userFlash(btn){
    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 300)
}

function checkAnswer(idx){

    if(userseq[idx]===gameseq[idx]){   // check if the user color matches the game color at the current index
        if(userseq.length===gameseq.length){   // if the user has completed the current level
            
            setTimeout(function(){
                levelUp();
            }, 1000);                        // move to the next level after a short delay
        }
    }else{
       
        h3.innerHTML=`Game Over! Your score was ${level}.<br> Press any key to restart.`;

        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="rgb(199, 239, 231)";
        }, 150);
        reset();
    }
}

function btnpress(){
    let btn=this;
    userFlash(btn);

    usercolor=btn.getAttribute('id');
    userseq.push(usercolor);             // add the user color to the user sequence

    checkAnswer(userseq.length-1);   // check the user's answer at the current index

}

let allbtns=document.querySelectorAll('.btn');

for(btn of allbtns){
    btn.addEventListener('click', btnpress);
}

function reset(){
    gameseq=[];
    userseq=[];
    started=false;
    level=0;
    
}