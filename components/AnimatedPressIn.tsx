import { motion } from 'framer-motion';

type AnimatedPressInProps = {
  children: React.ReactNode;
  maxHeight?: string;
};

/**
 * AnimatedPressIn is a component that scales down the children when pressed.
 */
export default function AnimatedPressIn(props: AnimatedPressInProps) {
  return (
    <motion.div
      style={{ maxHeight: props.maxHeight ?? 'unset' }}
      whileTap={{ scale: 0.8 }}
    >
      {props.children}
    </motion.div>
  );
}
