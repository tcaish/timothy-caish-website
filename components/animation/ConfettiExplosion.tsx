import { MotionBox } from '@/components/animation/MotionBox';
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
    <MotionBox
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <Confetti
        confettiSource={{
          h: props.height,
          w: props.width,
          x: props.x,
          y: props.y
        }}
        gravity={0.2}
        height={window.innerHeight}
        numberOfPieces={30}
        onConfettiComplete={props.onConfettiComplete}
        recycle={false}
        ref={confettiRef}
        width={window.innerWidth}
      />
    </MotionBox>
  );
}
