import "../styles/style.css"; 
import { Link } from "react-router-dom";


function HeaderGlobal() {

    return (
        <header className="footer blue__bar">
            <div className="footer__content bar__content">
                <div className="footer__div div__content">
                    <Link  to="/" className="title__inkverso">INKVERSO</Link>
                </div>

                <nav className="nav__content">
                    <Link to="/Usuarios" className="nav">Usuarios</Link> <span className="nav">|</span>
                    <Link to="/CatalogoAdmin" className="nav">Catalogo</Link> <span className="nav">|</span>
                    <Link to="/cerrarsesion" className="nav">Cerrar Sesion</Link>
                </nav>
                
            </div>
        </header>
    );
}

export default HeaderGlobal;
