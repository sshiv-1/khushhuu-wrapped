export default function ScallopDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-8 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 32"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="scallop" x="0" y="0" width="48" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 32 Q12 0 24 32 Q36 0 48 32" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="1200" height="32" fill="url(#scallop)" className="text-ivory" />
      </svg>
    </div>
  );
}