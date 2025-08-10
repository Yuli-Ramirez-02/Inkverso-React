import "../styles/style.css"; 
import { Link, useLocation } from "react-router-dom";

function HeaderGlobal() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <header className="footer blue__bar">
            <div className="footer__content bar__content">
                <div className="footer__div div__content">
                    <Link to="/" className="title__inkverso">INKVERSO</Link>
                </div>

                <nav className="nav__content">
                    {path === "/Usuarios" ? (
                        <>
                            <Link to="/InicioAdmin" className="nav">Home</Link> <span className="nav">|</span>
                            <Link to="/CatalogoAdmin" className="nav">Catálogo</Link> <span className="nav">|</span>
                            <Link to="/cerrarsesion" className="nav">Cerrar Sesión</Link>
                        </>
                    ) : path === "/CatalogoAdmin" ? (
                        <>
                            <Link to="/InicioAdmin" className="nav">Home</Link> <span className="nav">|</span>
                            <Link to="/Usuarios" className="nav">Usuarios</Link> <span className="nav">|</span>
                            <Link to="/cerrarsesion" className="nav">Cerrar Sesión</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/Usuarios" className="nav">Usuarios</Link> <span className="nav">|</span>
                            <Link to="/CatalogoAdmin" className="nav">Catálogo</Link> <span className="nav">|</span>
                            <Link to="/cerrarsesion" className="nav">Cerrar Sesión</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default HeaderGlobal;