import * as React from 'react';
import './style.css';
import FightGame from './FightGame';

export default function App() {
  // const FPS = 60;
  // const [currentFrame, setCurrentFrame] = React.useState(1);
  // const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <button
        onClick={() => {
          setTimerIsRunning(!timerIsRunning ? true : false);
        }}
      >
        {timerIsRunning ? 'Stop' : 'Start'}
      </button>
      {timerIsRunning ? <FightGame /> : null}
    </div>
  );
}
