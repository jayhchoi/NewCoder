import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} 뉴코더
    </footer>
  );
}

export default Footer;
