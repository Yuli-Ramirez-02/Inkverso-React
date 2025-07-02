import "../styles/style.css"; 
import facebookIcon from "../assets/logo-facebook.svg";
import instagramIcon from "../assets/logo-instagram.svg";
import twitterIcon from "../assets/logo-twitter.svg";


function Footer() {
    return (
        <footer className="footer blue__bar">
            <div className="footer__content bar__content">
                <div className="footer__div div__content">
                    <h1 className="title__inkverso">INKVERSO</h1>
                </div>

                <div className="icons">
                    <img className="icons__facebook" src={facebookIcon} alt="Logo Facebook" />
                    <img className="icons__instagram" src={instagramIcon} alt="Logo Instagram" />
                    <img className="icons__twitter" src={twitterIcon} alt="Logo Twitter" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
