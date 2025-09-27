import React from 'react';
import "../Styles/Footer.css"


function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>&copy; {currentYear} themoviedb. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;