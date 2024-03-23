import { motion } from 'framer-motion';

type AnimatedPressInProps = {
  children: React.ReactNode;
};

/**
 * AnimatedPressIn is a component that scales down the children when pressed.
 */
export default function AnimatedPressIn(props: AnimatedPressInProps) {
  return <motion.div whileTap={{ scale: 0.8 }}>{props.children}</motion.div>;
}
