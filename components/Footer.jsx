const Footer = () => {
  return (
    <footer
      className="shadow-md text-foreground py-6 border-t border-primary text-sm"
      style={{
        background:
          "linear-gradient(to bottom, #0d0d0d, rgba(255, 102, 178, 0.12), #0d0d0d)",
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent absolute -top-3 left-1/2 transform -translate-x-1/2"></div>
          <p className="font-bold text-primary">FIBROCHU</p>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent absolute -bottom-3 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <p>&copy; 2025 Fibrochu. Todos los derechos reservados.</p>
        <p className="text-gray-light mt-1">Developed for @laureanojuarez_</p>
      </div>
    </footer>
  );
};

export default Footer;
