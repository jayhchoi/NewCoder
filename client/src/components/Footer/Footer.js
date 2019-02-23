import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white p-4 text-center fixed-bottom">
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
}

export default Footer;
