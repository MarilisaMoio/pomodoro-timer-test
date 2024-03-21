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
- Add the possibility to let the user choose the working time and pause duration 🚧;
    - Add basic validation ✅;
- Divide the main function in smaller ones, if possible;
- Add sort of a clock-face around the pomodoro, making more clear how much time is left.
