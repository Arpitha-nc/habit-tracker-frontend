import { useState } from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  className,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <div className="w-full space-y-2">
      {label && <label className="text-sm text-gray-400">{label}</label>}

      <div
        className={clsx(
          'flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md',
          'focus-within:border-primary focus-within:shadow-[0_0_10px_rgba(0,229,255,0.5)]',
          className,
        )}
      >
        {Icon && <Icon size={18} className="text-gray-400" />}

        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
          {...props}
        />

        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={18} className="text-gray-400" />
            ) : (
              <Eye size={18} className="text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
