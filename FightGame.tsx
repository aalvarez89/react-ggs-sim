import * as React from 'react';
import './style.css';

export default function FightGame() {
  const FPS = 60;
  const Buffer = 20;
  const [currentFrame, setCurrentFrame] = React.useState(1);
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);

  // Buffer
  const [inputBuffer, setInputBuffer] = React.useState([]);

  // Stance States
  const [isJumping, setIsJumping] = React.useState(false);
  const [isHighJumping, setIsHighJumping] = React.useState(false);

  const [isAttacking, setIsAttacking] = React.useState(false);

  React.useEffect(() => {
    const runFpsEngine = setInterval(() => {
      // console.log(currentFrame);
      if (currentFrame === 60) {
        setSecondsElapsed(secondsElapsed + 1);
        setCurrentFrame(1);
      } else {
        setCurrentFrame((currentFrame) => currentFrame + 1);
      }
    }, 1000 / FPS);
    return () => clearInterval(runFpsEngine);
  }, [currentFrame]);

  const calcFrame = (currentFrame, moveFrames) => {
    moveFrames = moveFrames > 60 ? moveFrames - 60 : moveFrames;
    if (currentFrame + moveFrames > FPS) {
      return currentFrame + moveFrames - 60;
    } else {
      return currentFrame + moveFrames;
    }
  };

  const moveSet = {
    jump: { total: 41, prejump: 4, jump: 37 },
    highJump: { total: 55, highJump: 55 },
    slash: { total: 30, startup: 9, active: 2, recovery: 19 },
    jumpSlash: { total: 25, startup: 7, active: 4, recovery: 14 },
    tandemTop: { total: 71, startup: 12, active: 14, recovery: 45 },
  };

  const executeAction = (move) => {
    return new Promise((resolve, reject) => {
      // controller.signal.addEventListener("abort", () => {
      //   reject('rject');
      // });

      setTimeout(() => {
        resolve(calcFrame(currentFrame, move.total));
      }, (1000 / 60) * move.total);
    });
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    switch (key) {
      case 'w':
        setInputBuffer([...inputBuffer, '8']);

        // !isJumping
        //   ? console.log(key, 'jump action started', currentFrame)
        //   : console.log(key, 'high jump action started', currentFrame);
        // let action;

        if (isJumping && !isHighJumping) {
          setIsJumping(true);
          setIsHighJumping(true);

          console.log(key, 'high jump action started', currentFrame);
          // action = executeAction(moveSet.highJump);
          // // console.log(action);
          // console.log('high jump');
          setTimeout(() => {
            setIsJumping(false);
            setIsHighJumping(false);
            console.log(
              'high jump action finished',
              calcFrame(currentFrame, moveSet.highJump.total)
            );
          }, (1000 / 60) * moveSet.highJump.total);
          // action.then((frame) => {
          //   setIsJumping(false)
          //   setIsHighJumping(false);
          //   console.log('high jump action finished', frame);
          // });
        } else if (isHighJumping) {
          break;
        } else {
          setIsJumping(true);
          console.log(key, 'jump action started', currentFrame);
          // action = executeAction(moveSet.jump);
          setTimeout(() => {
            setIsJumping(isHighJumping ? true : false);
            console.log(
              'jump action finished',
              calcFrame(currentFrame, moveSet.jump.total)
            );
          }, (1000 / 60) * moveSet.jump.total);

          // action.then((frame) => {
          //   setIsJumping(isHighJumping ? true : false);
          //   console.log('jump action finished', frame);
          // });
        }

        break;

      case 'o':
        // !isJumping && !isHighJumping
        //   ? console.log(key, 'slash action started', currentFrame)
        //   : console.log(key, 'jump slash action started', currentFrame);
        // let action;

        if (isAttacking) {
          break;
        } else if (!isJumping && !isHighJumping) {
          setIsAttacking(true);

          if (inputBuffer[0] && inputBuffer.join('') === '214') {
            console.log('tandem top');
            setIsAttacking(false);
          } else {
            console.log(key, 'slash action started', currentFrame);
            setTimeout(() => {
              setIsAttacking(false);
              console.log(
                'slash action finished',
                calcFrame(currentFrame, moveSet.slash.total)
              );
            }, (1000 / 60) * moveSet.slash.total);
          }
        } else if (isJumping) {
          setIsAttacking(true);
          console.log(key, 'jump slash action started', currentFrame);
          setTimeout(() => {
            setIsAttacking(false);
            console.log(
              'jump slash action finished',
              calcFrame(currentFrame, moveSet.jumpSlash.total)
            );
          }, (1000 / 60) * moveSet.jumpSlash.total);
        }

        break;
      case 'd':
        setInputBuffer([...inputBuffer, '6']);
        break;
      case 's':
        setInputBuffer([...inputBuffer, '2']);
        setTimeout(() => {
          // setIsAttacking(false);
          // console.log(
          //   'slash action finished',
          //   calcFrame(currentFrame, moveSet.slash.total)
          // );
          setInputBuffer([]);
        }, (1000 / 60) * Buffer);
        break;
      case 'a':
        if (inputBuffer[inputBuffer.length - 1] === '2') {
          setInputBuffer([...inputBuffer, '1']);
        } else {
          setInputBuffer([...inputBuffer, '4']);
        }
        break;
    }

    // e.key === 'a' ? console.log(e.key, 'key pressed', currentFrame) : null;
  };

  const handleKeyUp = (e) => {
    const key = e.key;
    switch (key) {
      case 'w':
        // setInputBuffer([...inputBuffer, '8'])
        break;

      case 'o':
        break;
      case 'd':
        // setInputBuffer([...inputBuffer, '6'])
        break;
      case 's':
        if (inputBuffer[inputBuffer.length - 1] === '1') {
          setInputBuffer([...inputBuffer, '4']);
        }
        // setInputBuffer([...inputBuffer, '2'])
        break;
      case 'a':
        // if (inputBuffer[inputBuffer.length -1] === '3') {
        //   setInputBuffer([...inputBuffer, '4'])
        // }
        // else {
        //   // setInputBuffer([...inputBuffer, '4'])

        // }
        break;
    }

    // e.key === 'a' ? console.log(e.key, 'key pressed', currentFrame) : null;
  };

  return (
    <div
      // autofocus={true}
      tabIndex={0}
      // onKeyDown={(e) => handleKeyDown(e)}
    >
      <input
        autoFocus
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)}
      ></input>
      <div>{currentFrame}</div>
      <div>
        {isJumping || isHighJumping
          ? isHighJumping
            ? 'high Jump'
            : 'Jump'
          : 'Idle'}
      </div>
      {/* <div>{isHighJumping ? 'high Jump' : 'Idle'}</div> */}
      <div>{isAttacking ? 'Attack' : 'Idle'}</div>
      <div>{inputBuffer.join(' ')}</div>
    </div>
  );
}
