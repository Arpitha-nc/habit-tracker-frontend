import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Input({ label, icon: Icon, type = 'text', ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-2">
      <label className="text-[10px] tracking-[0.3em] text-primary/90">
        {label}
      </label>

      <div
        className="
flex items-center gap-3
border border-primary/60
bg-surfaceHigh
px-4 py-3
rounded-sm
transition
focus-within:border-primary
focus-within:shadow-[0_0_12px_rgba(129,236,255,0.7)]
"
      >
        {Icon && <Icon size={18} className="text-primary" />}

        <input
          type={isPassword && !show ? 'password' : 'text'}
          className="
            flex-1
            bg-transparent
            outline-none
            text-textMain
            placeholder:text-textSubtle
          "
          {...props}
        />

        {isPassword && (
          <button type="button" onClick={() => setShow(!show)}>
            {show ? (
              <EyeOff size={18} className="text-textSubtle" />
            ) : (
              <Eye size={18} className="text-textSubtle" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
