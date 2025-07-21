import "../styles/style.css"; 
import { Link } from "react-router-dom";
import facebookIcon from "../assets/logo-facebook.svg";
import instagramIcon from "../assets/logo-instagram.svg";
import twitterIcon from "../assets/logo-twitter.svg";


function Footer() {
    return (
        <footer className="footer blue__bar">
            <div className="footer__content bar__content">
                <div className="footer__div div__content">
                    <Link  to="/" className="title__inkverso">INKVERSO</Link>
                </div>

                <div className="icons">
                    <img className="icons__cart" src={facebookIcon} alt="Logo Facebook" />
                    <img className="icons__cart" src={instagramIcon} alt="Logo Instagram" />
                    <img className="icons__cart" src={twitterIcon} alt="Logo Twitter" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
