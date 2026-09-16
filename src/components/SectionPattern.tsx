export default function SectionPattern() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.14] dark:hidden"
        style={{
          backgroundImage: "url('/patterns/tech-grid.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-[0.20] dark:block"
        style={{
          backgroundImage: "url('/patterns/tech-grid.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      />
    </>
  );
}
