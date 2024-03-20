//DOM elements
const btnStart = document.querySelector("#start-btn");
const btnStop = document.querySelector("#stop-btn");
const pomodoro = document.querySelector("#pomodoro");

let roundCounter = 0;

btnStart.addEventListener("click", function(){
    pomodoroTimer(0.5, 0.2);
});


//FUNCTIONS

//main function, based on two int (the "working time" and the pause, both in minutes)
function pomodoroTimer(timer, pause){
    // some delay, allowing the full animation on btn
    setTimeout(() => btnStart.setAttribute("disabled", "disabled"), 500);
    //sounds
    const pauseStart = new Audio('sound/ding.mp3');
    const timerStart = new Audio('sound/ping.mp3');
    const timerEnd = new Audio('sound/noice.mp3');
    //variables
    const timerMilliSec = minuteToMilliSec(timer);
    const pauseMilliSec = minuteToMilliSec(pause);
    const rounds = 4;
    let counter = 1000;
    let ratio = 360 / timerMilliSec;

    //main part
    let pomodoroRotation = setInterval(function(){
        let rotation = counter * ratio;
        pomodoro.style.transform = `rotate(${rotation}deg)`;
        counter += 1000;
        if (rotation === 360 && roundCounter >= rounds){
            timerEnd.play();
            clearInterval(pomodoroRotation);
            btnStart.removeAttribute("disabled");
            counter = 1000;
            roundCounter = 0;
            pomodoro.removeAttribute("style");
        } else if (rotation === 360){
            pauseStart.play();
            clearInterval(pomodoroRotation)
            counter = 1000;
            pomodoro.style.filter = "hue-rotate(90deg)"
            setTimeout(function(){
                pomodoro.removeAttribute("style");
                timerStart.play();
            }, pauseMilliSec)
        }
    }, 1000);

    roundCounter++;
    if (roundCounter < rounds) {
        setTimeout(pomodoroTimer, (timerMilliSec + pauseMilliSec), timer, pause);
    }
}

//lil function converting minutes in millisecs
function minuteToMilliSec(number){
    return (1000 * 60 * number);
}