export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`
    w-full
py-4
font-semibold
tracking-[0.3em]
bg-primary
text-black
transition-all
duration-200
hover:brightness-110
hover:shadow-[0_0_35px_rgba(129,236,255,0.9)]
    ${className}
  `}
      {...props}
    >
      {children}
    </button>
  );
}
