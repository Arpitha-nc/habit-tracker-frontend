import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ProgressBar({
  value = 0,
  max = 100,
  showLabel = true,
  className,
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="mb-1 text-xs text-gray-400">
          {Math.round(percentage)}%
        </div>
      )}

      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(0,229,255,0.8)]"
        />
      </div>
    </div>
  );
}
