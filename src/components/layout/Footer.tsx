export const Footer = () => {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 md:h-20 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Digital Goods. All rights reserved.</p>
        <nav aria-label="Footer" className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <a href="/checkout" className="hover:text-foreground">Checkout</a>
          <a href="https://developers.billgang.com" target="_blank" rel="noreferrer" className="hover:text-foreground">Billgang API</a>
        </nav>
      </div>
    </footer>
  );
};
