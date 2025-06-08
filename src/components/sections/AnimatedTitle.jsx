import { motion } from 'framer-motion';

export default function AnimatedTitle({ name }) {
  const letters = name.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const letter = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.h1
      className="text-4xl md:text-5xl font-bold text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={letter}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}