import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const baseStyles =
    'flex items-center justify-center rounded-xl font-medium transition-all';

  const variants = {
    primary:
      'bg-primary text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.6)]',

    secondary:
      'bg-secondary text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]',

    outline: 'border border-white/20 text-white hover:bg-white/10',

    ghost: 'text-gray-300 hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
