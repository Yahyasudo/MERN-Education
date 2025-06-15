import React from 'react';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaLinkedin  } from "react-icons/fa";
import './footer.css';


const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>&copy; 2025 Your E-Learning plateform. All right reserved.<br/>
               made with ❤️ by <a href="">yahya benkhi & reda ouazir & yassir naboussi </a>
            </p>
        </div>
        <div className="social-links">
            <a href="https://www.facebook.com/"><FaFacebookSquare /></a>
            <a href="https://www.twitter.com/" ><FaTwitterSquare /></a>
            <a href="https://www.instagram.com/"><FaInstagramSquare /></a>
            <a href="https://www.linkedin.com/"><FaLinkedin /></a>
        </div>
    </footer>
  );
}

export default Footer;
