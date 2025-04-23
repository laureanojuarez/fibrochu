const Footer = () => {
  console.log("Hello");

  return (
    <footer
      className="shadow-md text-foreground py-6 border-t border-primary text-sm"
      style={{
        background:
          "linear-gradient(to bottom, #0d0d0d, rgba(255, 102, 178, 0.12), #0d0d0d)",
      }}
    >
      <div className="text-center">
        <p className="font-bold text-primary">FIBROCHU</p>
        <p>&copy; 2025 Fibrochu. Todos los derechos reservados.</p>
        <p className="text-gray-light mt-1">Developed for @laureanojuarez_</p>
      </div>
    </footer>
  );
};

export default Footer;
