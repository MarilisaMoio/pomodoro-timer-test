# The spinning Pomodoro Timer, first personal project

>You spin me right 'round, baby, right 'round <br>
Like a record, baby, right 'round, 'round, 'round

### What does it do:

Basically, when the button "START" is pressed, it triggers a pomodoro timer based on the user input - working time, between 1 and 99 min; pause, between 1 and 99 min; rounds, between 1 and 9 -. In every working time, the pomodoro gradually spins, simulating a kitchen timer. The last round, instead of having both the working time and pause, will end directly after the working time. More explicitly, with n = rounds, we have n working times and n - 1 pauses.

If you want to see it in action, you can click [here](https://marilisamoio.github.io/pomodoro-timer-test/).

### Goals:
- Get a grasp of how `setInterval()` and `setTimeout()` works ✅ <sub><sup>(kind of)</sup></sub>;
- Create a basic Pomodoro Timer ✅;
- Use the pomdoro img as a Timer Traker, rotating every second ✅;
- Add sounds ✅;
- Add wiggly buttons ✅;
- Add some phrases in the DOM signaling when the pause starts, when it ends, the number of sets etc;
- Add a "pause" button;
- Add a counter in the DOM showing how much time is left;
- Add the possibility to let the user choose the working time and pause duration ✅;
    - Add basic validation ✅;
- Divide the main function in smaller ones, if possible;
- Add sort of a clock-face around the pomodoro, making more clear how much time is left.

### Flaws:
- The code itself: the function is pretty bulky and I'm not finding a way to break it down without scope issues. The only thing it came in my mind was nesting some minor functions in the main one, but I really don't understand if it's bad practice or not.
- Delays: thanks to `console.time()` and some subtraction between two `performance.now()` I've noticed that there's a delay in every "step" of the `setInterval()` and `setTimeout()`, realistically due to the necessary execution times. On sets with lower times it was a total of a bunch of milliseconds, but on a pomodoro with 4 sets of 10min-2min it would add up to over 1 second. Two important considerations are the facts that the delay is not a fixed number, with random spikes of even 80millisecs just for one set of working time, and that *sometimes* the esecution was faster that expected (like, on 30.000millisec, the effective time was 29.9987). For these reasons, and after trying some other solutions that didn't really help, I've came with this idea: on the `setTimeout()`, that has the role of ending the pause and restarting the new set, instead of using simply the time set by the user, it has `pauseMilliSec - delay - 5` to compensate a little bit; "delay" is the delay of the `setInterval()`, calculated with two `Date.now()` at the start and at the end, made always positive with a `Math.abs()` (so if there's a random "negative delay" it doesn't add the time), while - 5 is just an approximation of the `setTimeout()` itself delay. This way, I managed to have a total delay of 800ms on a standard pomodoro (4 sets, 25min-5min) - not ideal, but at least better that before!
