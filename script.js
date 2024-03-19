const btnStart = document.querySelector("#start-btn");
const btnStop = document.querySelector("#stop-btn");
const pomodoro = document.querySelector("#pomodoro");

btnStart.addEventListener("click", function(){
    const timerMinutes = 1
    let counter = 0;
    let ratio = 360 / (1000 * 60 * timerMinutes);
    let pomodoroRotation = setInterval(function(){
        console.log(counter);
        counter += 1000;
        let rotation = counter * ratio;
        pomodoro.style.transform = `rotate(${rotation}deg)`;
        console.log(pomodoro)
        if (counter === 3000){
            clearInterval(pomodoroRotation)
        }
    }, 1000);
})

