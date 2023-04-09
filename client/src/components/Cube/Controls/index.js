import React from 'react';
import classNames from 'classnames';
import buildArrow from './buildArrow';
import RotateArrows from './RotateArrows';
import Client from "../../../services/GameService"

export const movesStack = []
export default ({actions, disabled, controlsStatus, isMatch, user}) => {

  const recorder = (activationFunc, piece, forward) => {
    let neg_forward = !forward
    if (movesStack.length > 0) {
      let elm = movesStack[movesStack.length - 1]
      if (elm[1] === piece && elm[2] === forward) {
        movesStack.pop()
        return
      }
    }
    movesStack.push([activationFunc, piece, +neg_forward])
      if (isMatch) { // record to DB
          Client.applyMoveInMatch(user.email, [activationFunc, piece, +neg_forward])
      }
  };

  const Arrow = buildArrow(actions.spinSlice, recorder);

  return (
    <section className={classNames('Controls', {
      'disabled': disabled
    })}>
      {/* Spin Z forward */}
      <Arrow id={"a01"} slice={0} forward={true}
             style={{
        transform: 'translate(490px, 145px) rotate(-10deg)',
               opacity: controlsStatus ? undefined : 0
      }}
      />
      <Arrow id={"a11"} slice={1} forward={true}
             style={{
        transform: 'translate(430px, 90px) rotate(-10deg)',
               opacity: controlsStatus ? undefined : 0
      }}/>
      <Arrow id={"a21"} slice={2} forward={true}
             style={{
        transform: 'translate(370px, 40px) rotate(-10deg)',
               opacity: controlsStatus ? undefined : 0
      }}/>
      {/* Spin Z backward */}
      <Arrow id={"a00"} slice={0} forward={false}
             style={{
        transform: 'translate(10px, 500px) rotate(130deg)',
               opacity: controlsStatus ? undefined : 0
      }}/>
      <Arrow id={"a10"} slice={1} forward={false}
             style={{
        transform: 'translate(-40px, 420px) rotate(130deg)',
               opacity: controlsStatus ? undefined : 0
      }}/>
      <Arrow id={"a20"} slice={2} forward={false}
             style={{
        transform: 'translate(-80px, 350px) rotate(130deg)',
               opacity: controlsStatus ? undefined : 0
      }}/>

      {/* Spin X forward */}
      <Arrow id={"a31"} slice={3} forward={true}
             style={{
        transform: 'translate(150px, 545px) rotate(100deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>
      <Arrow id={"a41"} slice={4} forward={true}
             style={{
        transform: 'translate(230px, 535px) rotate(100deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>
      <Arrow id={"a51"} slice={5} forward={true}
             style={{
        transform: 'translate(330px, 515px) rotate(100deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>

      {/* Spin X backward */}
      <Arrow id={"a30"} slice={3} forward={false}
             style={{
        transform: 'translate(50px, -10px) rotate(240deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>
      <Arrow id={"a40"} slice={4} forward={false}
             style={{
        transform: 'translate(140px, -5px) rotate(240deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1

      }}/>
      <Arrow id={"a50"} slice={5} forward={false}
             style={{
        transform: 'translate(230px, 0px) rotate(240deg)',
               opacity: controlsStatus ? undefined : 0
      }}/>
      {/* Spin Y forward */}
      <Arrow id={"a61"} slice={6} forward={true}
             style={{
        transform: 'translate(500px, 260px)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>
      <Arrow id={"a71"} slice={7} forward={true}
             style={{
        transform: 'translate(480px, 340px)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>
      <Arrow id={"a81"} slice={8} forward={true}
             style={{
        transform: 'translate(460px, 420px)',
               opacity: controlsStatus ? undefined : 0
      }}/>
      {/* Spin Y backward */}
      <Arrow id={"a60"} slice={6} forward={false}
             style={{
        transform: 'translate(-40px, 30px) rotate(220deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>
      <Arrow id={"a70"} slice={7} forward={false}
             style={{
        transform: 'translate(-60px, 130px) rotate(220deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1
      }}/>
      <Arrow id={"a80"} slice={8} forward={false}
             style={{
        transform: 'translate(-80px, 230px) rotate(220deg)',
               opacity: controlsStatus ? undefined : 0
               //opacity: 1

      }}/>
      <div style={{position: 'absolute', top: '15px', left: '-140px', transform: 'scale(1.05)',
          opacity: controlsStatus ? undefined : 0}}>
        <RotateArrows rotate={actions.rotateCube} recorder={recorder}/>
      </div>
    </section>
  );
};
