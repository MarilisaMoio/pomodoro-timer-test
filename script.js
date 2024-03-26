//DOM elements
const btnStart = document.querySelector("#start-btn");
const btnStop = document.querySelector("#stop-btn");
const pomodoro = document.querySelector("#pomodoro");

let roundCounter = 0;
let counter = 1000;

let pomodoroRotation;
let setRepetition;
let setEndPause;

//sounds
const pauseStart = new Audio('sound/ding.mp3');
const timerStart = new Audio('sound/ping.mp3');
const timerEnd = new Audio('sound/noice.mp3');
const tick = new Audio('sound/tick.mp3');

btnStart.addEventListener("click", function(){
    //inputs
    // const workingTime = parseInt(document.querySelector("#working-time").value)
    // const pauseTime = parseInt(document.querySelector("#pause").value)
    // const howManyRounds = parseInt(document.querySelector("#rounds").value)

    //debug values
    const workingTime = 0.5;
    const pauseTime = 0.2;
    const howManyRounds = 4;

    if(!isNaN(workingTime) && !isNaN(pauseTime) && !isNaN(howManyRounds)){
        pomodoroTimer(workingTime, pauseTime, howManyRounds);
    }
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

    roundCounter++;

    console.log(`inizio round ${roundCounter}`)
    //console.time(`con pausa`)
    //console.time("senza pausa")
    console.time("forse fino alla fine?")

    //main part
    pomodoroRotation = setInterval(function(){
        let rotation = counter * ratio;
        tick.play();
        pomodoro.style.transform = `rotate(${rotation}deg)`;
        counter += 1000;
        if (counter === timerMilliSec + 1000 && roundCounter >= rounds){
            timerEnd.play();
            clearInterval(pomodoroRotation);
            btnStart.removeAttribute("disabled");
            pomodoro.removeAttribute("style");
            counter = 1000;
            roundCounter = 0;
            console.timeEnd("forse fino alla fine?")
            console.log(timerMilliSec, pauseMilliSec, timerMilliSec + pauseMilliSec)
        } else if (counter === timerMilliSec + 1000){
            setEndPause = setTimeout(function(){
                pomodoro.removeAttribute("style");
                timerStart.play();
                //console.timeEnd("con pausa")
            }, pauseMilliSec - 10) //10ms to counter the variable execution time 
            //console.timeEnd("senza pausa")
            console.log(counter)
            pauseStart.play();
            clearInterval(pomodoroRotation)
            counter = 1000;
            pomodoro.style.filter = "hue-rotate(90deg)"
        }
    }, 1000);
    
    if (roundCounter < rounds) {
        setRepetition = setTimeout(pomodoroTimer, (timerMilliSec + pauseMilliSec), timer, pause, rounds);
    }

}

//lil function converting minutes in millisecs
function minuteToMilliSec(number){
    return (1000 * 60 * number);
}

