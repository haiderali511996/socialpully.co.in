'use client';

export default function ScrollToTopButton({ children, style, className }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, ...style }}
      className={className}
    >
      {children}
    </button>
  );
}