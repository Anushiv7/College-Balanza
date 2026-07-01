/**
 * College Balanza brand mark.
 * A minimal gold monogram — a balanced scale formed by two "C" and "B"
 * counter-forms. Scales cleanly from 16px (favicon) to hero size.
 */
export function BrandLogo({
  className = "",
  size = 28,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="College Balanza"
      >
        <defs>
          <linearGradient id="cb-gold" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E7C558" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9A7B20" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="10" stroke="url(#cb-gold)" strokeWidth="1.25" fill="#0d0d0d" />
        {/* Balance beam */}
        <rect x="8" y="19" width="24" height="1.6" rx="0.8" fill="url(#cb-gold)" />
        {/* Center pillar */}
        <rect x="19.2" y="10" width="1.6" height="20" rx="0.8" fill="url(#cb-gold)" />
        {/* Left pan */}
        <path d="M8 20 L12 26 L4 26 Z" fill="url(#cb-gold)" opacity="0.9" />
        {/* Right pan */}
        <path d="M32 20 L36 26 L28 26 Z" fill="url(#cb-gold)" opacity="0.9" />
        {/* Base */}
        <rect x="15" y="30" width="10" height="1.6" rx="0.8" fill="url(#cb-gold)" />
      </svg>
      {showWordmark && (
        <span className="text-[15px] tracking-tight font-medium text-white">
          College <span className="text-[color:var(--cb-gold)]">Balanza</span>
        </span>
      )}
    </span>
  );
}

export default BrandLogo;
