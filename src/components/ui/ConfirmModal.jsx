import { X, AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ title, message, confirmLabel = 'CONFIRM', onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-[420px] mx-4 bg-surfaceLow border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-red-400 shrink-0" />
            <h2 className="font-display text-lg font-semibold">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="w-7 h-7 flex items-center justify-center border border-white/10 text-textSubtle hover:border-white/30 hover:text-textMain transition rounded"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-sm text-textSubtle mb-8 leading-relaxed">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-xs tracking-widest border border-white/10 text-textSubtle hover:border-white/30 transition rounded"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 text-xs tracking-widest bg-red-500/10 border border-red-400/40 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition rounded"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
