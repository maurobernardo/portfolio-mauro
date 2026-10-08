const mask = "url('/patterns/tech-grid.svg')";

/** Mapa-múndi em marca-d'água neutra. Mobile: tamanho fixo (não amplia em secções altas); desktop: cobre a secção. */
export default function SectionPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 bg-foreground opacity-[0.07] [-webkit-mask-size:1100px_auto] [mask-size:1100px_auto] lg:[-webkit-mask-size:cover] lg:[mask-size:cover] dark:opacity-[0.1]"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
