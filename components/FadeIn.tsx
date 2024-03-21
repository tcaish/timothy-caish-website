import { motion } from 'framer-motion';

type FadeInProps = {
  children: React.ReactNode;
  duration?: number;
};

export default function FadeIn(props: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: props.duration ?? 1 }}
    >
      {props.children}
    </motion.div>
  );
}
