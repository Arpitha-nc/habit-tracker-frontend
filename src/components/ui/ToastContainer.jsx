import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const TOAST_STYLES = {
  error: {
    border: 'border-red-400/30',
    bg: 'bg-red-400/10',
    icon: AlertTriangle,
    iconColor: 'text-red-400',
    textColor: 'text-red-300',
  },
  success: {
    border: 'border-secondary/30',
    bg: 'bg-secondary/10',
    icon: CheckCircle,
    iconColor: 'text-secondary',
    textColor: 'text-textMain',
  },
  info: {
    border: 'border-primary/30',
    bg: 'bg-primary/10',
    icon: Info,
    iconColor: 'text-primary',
    textColor: 'text-textMain',
  },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = TOAST_STYLES[toast.type] ?? TOAST_STYLES.error;
          const Icon = style.icon;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg border ${style.border} ${style.bg} backdrop-blur-md shadow-xl min-w-[280px] max-w-[360px]`}
            >
              <Icon size={15} className={`${style.iconColor} mt-0.5 shrink-0`} />
              <p className={`text-xs leading-relaxed flex-1 ${style.textColor}`}>{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-textSubtle hover:text-textMain transition shrink-0"
              >
                <X size={13} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
