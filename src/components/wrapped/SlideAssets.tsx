/**
 * Renders a full-bleed background image overlay at low opacity.
 * Uses an absolute-positioned div with mix-blend-mode so text stays readable.
 */
export function SlideBg({ src, opacity = 0.1 }: { src: string; opacity?: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('${src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
