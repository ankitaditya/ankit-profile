export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8 no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {currentYear} Ankit Aditya. All rights reserved. Built with modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
