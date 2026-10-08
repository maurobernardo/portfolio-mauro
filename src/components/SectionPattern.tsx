const mask = "url('/patterns/tech-grid.svg')";

/** Mapa-múndi em marca-d'água neutra (tinta sobre papel), com Beira e Vilankulo assinalados. */
export default function SectionPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 bg-foreground opacity-[0.07] dark:opacity-[0.1]"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
      }}
    />
  );
}
