//DOM elements
const btnStart = document.querySelector("#start-btn");
const btnStop = document.querySelector("#stop-btn");
const pomodoro = document.querySelector("#pomodoro");

let roundCounter = 0;
let counter = 1000;

let pomodoroRotation;
let setRepetition;
let setEndPause;

btnStart.addEventListener("click", function(){
    //inputs
    const workingTime = parseInt(document.querySelector("#working-time").value)
    const pauseTime = parseInt(document.querySelector("#pause").value)
    const howManyRounds = parseInt(document.querySelector("#rounds").value)
    
    //some delay, allowing the full animation on btn
    setTimeout(() => btnStart.setAttribute("disabled", "disabled"), 500);

    //debug values
    // const workingTime = 10;
    // const pauseTime = 5;
    // const howManyRounds = 4;


    if(!isNaN(workingTime) && !isNaN(pauseTime) && !isNaN(howManyRounds)){
        pomodoroTimer(workingTime, pauseTime, howManyRounds);
    }
});

//FUNCTIONS

//main function, based on two int (the "working time" and the pause, both in minutes)
function pomodoroTimer(timer, pause, rounds){
    //sounds
    const pauseStart = new Audio('sound/ding.mp3');
    const timerStart = new Audio('sound/ping.mp3');
    const timerEnd = new Audio('sound/noice.mp3');
    const tick = new Audio('sound/tick.mp3');
    //variables
    const timerMilliSec = minuteToMilliSec(timer);
    const pauseMilliSec = minuteToMilliSec(pause);
    let ratio = 360 / timerMilliSec;

    //main part
    pomodoroRotation = setInterval(function(){
        let rotation = counter * ratio;
        tick.play();
        pomodoro.style.transform = `rotate(${rotation}deg)`;
        counter += 1000;
        if (counter === timerMilliSec + 1000 && roundCounter >= rounds){
            (`senza pausa ${roundCounter - 1}`)
            timerEnd.play();
            clearInterval(pomodoroRotation);
            btnStart.removeAttribute("disabled");
            counter = 1000;
            roundCounter = 0;
            pomodoro.removeAttribute("style");
        } else if (counter === timerMilliSec + 1000){
            setEndPause = setTimeout(function(){
                pomodoro.removeAttribute("style");
                timerStart.play();
            }, pauseMilliSec - 10) //10ms to counter the variable execution time 
            pauseStart.play();
            clearInterval(pomodoroRotation)
            counter = 1000;
            pomodoro.style.filter = "hue-rotate(90deg)"
        }
    }, 1000);

    roundCounter++;
    if (roundCounter < rounds) {
        setRepetition = setTimeout(pomodoroTimer, (timerMilliSec + pauseMilliSec), timer, pause, rounds);
    }
}

//lil function converting minutes in millisecs
function minuteToMilliSec(number){
    return (1000 * 60 * number);
}