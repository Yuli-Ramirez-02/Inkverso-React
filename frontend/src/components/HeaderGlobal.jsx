import "../styles/style.css"; 
import { Link } from "react-router-dom";


function HeaderGlobal() {
    return (
        <footer className="footer blue__bar">
            <div className="footer__content bar__content">
                <div className="footer__div div__content">
                    <Link  to="/" className="title__inkverso">INKVERSO</Link>
                </div>
            </div>
        </footer>
    );
}

export default HeaderGlobal;
