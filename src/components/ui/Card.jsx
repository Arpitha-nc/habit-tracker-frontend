import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Card({ children, className, hover = true }) {
  const baseStyles =
    'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg';

  return (
    <motion.div
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow: '0px 0px 25px rgba(0,229,255,0.15)',
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 200 }}
      className={clsx(baseStyles, 'p-6', className)}
    >
      {children}
    </motion.div>
  );
}
