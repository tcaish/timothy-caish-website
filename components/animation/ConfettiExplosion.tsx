import React from 'react';
import Confetti from 'react-confetti';

type ConfettiExplosionProps = {
  height: number;
  onConfettiComplete?: () => void;
  width: number;
  x: number;
  y: number;
};

export default function ConfettiExplosion(props: ConfettiExplosionProps) {
  const confettiRef = React.useRef(null);

  return (
    <Confetti
      confettiSource={{
        h: props.height,
        w: props.width,
        x: props.x,
        y: props.y
      }}
      gravity={0.2}
      numberOfPieces={30}
      onConfettiComplete={props.onConfettiComplete}
      recycle={false}
      ref={confettiRef}
    />
  );
}
