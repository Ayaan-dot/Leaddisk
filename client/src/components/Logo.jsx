export default function Logo({ size = "md", showText = true }) {
  const sizes = {
    sm: { box: "w-8 h-8", inner: 14 },
    md: { box: "w-9 h-9", inner: 16 },
    lg: { box: "w-10 h-10", inner: 18 },
  };

  const { box, inner } = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-3">
      <svg
        width={inner}
        height={inner}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={box}
      >
        {/* Pipeline circles representing connected workflow */}
        <circle cx="10" cy="10" r="6" fill="#10B981" opacity="0.85" />
        <circle cx="22" cy="10" r="5" fill="#0F766E" opacity="0.75" />
        <circle cx="16" cy="22" r="7" fill="#10B981" opacity="0.65" />
        <circle cx="22" cy="22" r="4" fill="#F59E0B" opacity="0.6" />
        {/* Connecting lines */}
        <line x1="14.5" y1="12.5" x2="18" y2="17" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="20" y1="14" x2="18" y2="17" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="18" y1="17" x2="20" y2="19" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">Lead</span>
          <span className="text-gray-900 dark:text-gray-100">Desk</span>
        </span>
      )}
    </div>
  );
}
