//DOM elements
const btnStart = document.querySelector("#start-btn");
const btnStop = document.querySelector("#stop-btn");
const btnReset = document.querySelector("#reset-btn");

const workingTimeInput = document.querySelector("#working-time");
const pauseInput = document.querySelector("#pause");
const roundsInput = document.querySelector("#rounds");

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

//state needed to resume a stopped break
let phase = "work"; // "work" | "pause"
let pauseEnd = 0;
let pauseRemaining = 0;

btnStart.addEventListener("click", function(){
    //disbale inputs while the timer is running
    workingTimeInput.setAttribute("disabled", "disabled");
    pauseInput.setAttribute("disabled", "disabled");
    roundsInput.setAttribute("disabled", "disabled");

    //inputs
    const workingTime = parseInt(workingTimeInput.value);
    const pauseTime = parseInt(pauseInput.value);
    const howManyRounds = parseInt(roundsInput.value);

    //debug values
    // const workingTime = 25;
    // const pauseTime = 5;
    // const howManyRounds = 4;

    if(!isNaN(workingTime) && !isNaN(pauseTime) && !isNaN(howManyRounds)){
        if (phase === "pause"){
            //resume the break from where it was stopped
            startPause(workingTime, pauseTime, howManyRounds, pauseRemaining);
        } else {
            pomodoroTimer(workingTime, pauseTime, howManyRounds);
        }
    } else {
        workingTimeInput.removeAttribute("disabled");
        pauseInput.removeAttribute("disabled");
        roundsInput.removeAttribute("disabled");
    }
});

btnStop.addEventListener("click", function(){
    //some delay, allowing the full animation on btn
    setTimeout(() => btnStop.setAttribute("disabled", "disabled"), 500);

    clearInterval(pomodoroRotation);
    clearTimeout(setEndPause)
    if (phase === "pause"){
        pauseRemaining = Math.max(pauseEnd - Date.now(), 0);
    }
    btnStart.removeAttribute("disabled");
});

btnReset.addEventListener("click", function(){
    clearInterval(pomodoroRotation);
    clearTimeout(setEndPause)
    btnStart.removeAttribute("disabled");
    btnStop.removeAttribute("disabled");
    
    pomodoro.removeAttribute("style");
    counter = 1000;
    roundCounter = 0;
    phase = "work";
    pauseRemaining = 0;

    workingTimeInput.removeAttribute("disabled");
    pauseInput.removeAttribute("disabled");
    roundsInput.removeAttribute("disabled");
});

//FUNCTIONS

//main function, based on two int (the "working time" and the pause, both in minutes)
function pomodoroTimer(timer, pause, rounds){
    //some delay, allowing the full animation on btn
    setTimeout(() => btnStart.setAttribute("disabled", "disabled"), 500);
    btnStop.removeAttribute("disabled");

    //variables
    const timerMilliSec = minuteToMilliSec(timer);
    const pauseMilliSec = minuteToMilliSec(pause);
    let ratio = 360 / timerMilliSec;
    //if resuming a stopped round, shift the reference back by the time already elapsed
    const timeReference = Date.now() - (counter - 1000);

    //main part
    //count a new round only when starting fresh, not when resuming after stop
    if (counter === 1000) roundCounter++;

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
            const delay = Math.abs(Math.ceil(Date.now()) - timeReference - timerMilliSec);
            pauseStart.play();
            clearInterval(pomodoroRotation)
            counter = 1000;
            startPause(timer, pause, rounds, pauseMilliSec - delay - 5) // read the readme file for more info on why " - delay - 5"
        }
    }, 1000);
}

//starts (or resumes) the break, lasting "duration" millisecs
function startPause(timer, pause, rounds, duration){
    setTimeout(() => btnStart.setAttribute("disabled", "disabled"), 500);

    phase = "pause";
    pauseEnd = Date.now() + duration;
    pomodoro.style.filter = "hue-rotate(90deg)";

    setEndPause = setTimeout(function(){
        phase = "work";
        pomodoro.removeAttribute("style");
        timerStart.play();
        pomodoroTimer(timer, pause, rounds)
    }, duration)
}

//lil function converting minutes in millisecs
function minuteToMilliSec(number){
    return (1000 * 60 * number);
}

