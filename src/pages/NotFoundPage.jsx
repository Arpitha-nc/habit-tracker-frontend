import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface text-textMain flex flex-col items-center justify-center">
      <div className="scanline" />
      <p className="text-[10px] tracking-widest text-textSubtle mb-4">ERROR_404</p>
      <h1 className="font-display text-6xl font-bold text-primary mb-2">404</h1>
      <p className="text-lg text-textSubtle mb-8 tracking-wide">ROUTE_NOT_FOUND</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 text-xs tracking-widest border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition rounded"
      >
        RETURN_TO_BASE →
      </button>
    </div>
  );
}
