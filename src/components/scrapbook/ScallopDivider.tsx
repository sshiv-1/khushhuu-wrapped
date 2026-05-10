export default function ScallopDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-6 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="scallop" x="0" y="0" width="48" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 24 Q12 0 24 24 Q36 0 48 24" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="1200" height="24" fill="url(#scallop)" className="text-ivory" />
      </svg>
    </div>
  );
}