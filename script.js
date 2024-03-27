//DOM elements
const btnStart = document.querySelector("#start-btn");
const btnStop = document.querySelector("#stop-btn");
const pomodoro = document.querySelector("#pomodoro");

//sounds
const pauseStart = new Audio('sound/ding.mp3');
const timerStart = new Audio('sound/ping.mp3');
const timerEnd = new Audio('sound/noice.mp3');
const tick = new Audio('sound/tick.mp3');

let roundCounter = 0;
let counter = 1000;

let pomodoroRotation;
let setEndPause;

btnStart.addEventListener("click", function(){
    //inputs
    const workingTime = parseInt(document.querySelector("#working-time").value)
    const pauseTime = parseInt(document.querySelector("#pause").value)
    const howManyRounds = parseInt(document.querySelector("#rounds").value)

    //debug values
    // const workingTime = 25;
    // const pauseTime = 5;
    // const howManyRounds = 4;

    if(!isNaN(workingTime) && !isNaN(pauseTime) && !isNaN(howManyRounds)){
        pomodoroTimer(workingTime, pauseTime, howManyRounds);
    }
});

btnStop.addEventListener("click", function(){
    clearInterval(pomodoroRotation);
    clearTimeout(setEndPause)
});

//FUNCTIONS

//main function, based on two int (the "working time" and the pause, both in minutes)
function pomodoroTimer(timer, pause, rounds){
    //some delay, allowing the full animation on btn
    setTimeout(() => btnStart.setAttribute("disabled", "disabled"), 500);

    //variables
    const timerMilliSec = minuteToMilliSec(timer);
    const pauseMilliSec = minuteToMilliSec(pause);
    let ratio = 360 / timerMilliSec;
    const timeReference = Date.now();

    //main part
    roundCounter++;

    pomodoroRotation = setInterval(function(){
        tick.play();
        let rotation = counter * ratio;
        pomodoro.style.transform = `rotate(${rotation}deg)`;
        counter += 1000;
        if (counter === timerMilliSec + 1000 && roundCounter >= rounds){
            timerEnd.play();
            clearInterval(pomodoroRotation);
            btnStart.removeAttribute("disabled");
            pomodoro.removeAttribute("style");
            counter = 1000;
            roundCounter = 0;
        } else if (counter === timerMilliSec + 1000){
            delay = Math.abs(Math.ceil(Date.now()) - timeReference - timerMilliSec);
            setEndPause = setTimeout(function(){
                pomodoro.removeAttribute("style");
                timerStart.play();
                console.timeEnd("Prova")
                pomodoroTimer(timer, pause, rounds)
            }, pauseMilliSec - delay - 5) // read the readme file for more info on why " - delay - 5"
            pauseStart.play();
            clearInterval(pomodoroRotation)
            counter = 1000;
            pomodoro.style.filter = "hue-rotate(90deg)"
        }
    }, 1000);
}

//lil function converting minutes in millisecs
function minuteToMilliSec(number){
    return (1000 * 60 * number);
}

