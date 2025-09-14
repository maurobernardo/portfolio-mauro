export default function Footer() {
  return (
    <footer className="border-t border-border py-8 lg:py-12 bg-background/80">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
        <p className="order-2 md:order-1">&copy; {new Date().getFullYear()} Mauro Zibane. Todos os direitos reservados.</p>
        <nav className="order-1 md:order-2 flex gap-4">
          <a className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-px hover:shadow-sm hover:shadow-primary/20 rounded-md px-2 py-1" href="#projetos">Projectos</a>
          <a className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-px hover:shadow-sm hover:shadow-primary/20 rounded-md px-2 py-1" href="#contato">Conctato</a>
        </nav>
      </div>
    </footer>
  );
}


