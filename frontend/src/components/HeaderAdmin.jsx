// src/components/HeaderAdmin.jsx
import "../styles/style.css"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HeaderAdmin() {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const { logout } = useAuth();

    const cerrarSesion = () => {
        logout();
        navigate("/"); // Te manda al inicio
    };

    return (
        <header className="footer blue__bar">
            <div className="footer__content bar__content">
                <div className="footer__div div__content">
                    <Link to="/InicioAdmin" className="title__inkverso">INKVERSO</Link>
                </div>

                <nav className="nav__content">
                    {path === "/Usuarios" ? (
                        <>
                            <Link to="/InicioAdmin" className="nav">Home</Link> <span className="nav">|</span>
                            <Link to="/CatalogoAdmin" className="nav">Catálogo</Link> <span className="nav">|</span>
                            <button onClick={cerrarSesion} className="nav" style={{ background: "none", border: "none", cursor: "pointer" }}>Cerrar Sesión</button>
                        </>
                    ) : path === "/CatalogoAdmin" ? (
                        <>
                            <Link to="/InicioAdmin" className="nav">Home</Link> <span className="nav">|</span>
                            <Link to="/Usuarios" className="nav">Usuarios</Link> <span className="nav">|</span>
                            <button onClick={cerrarSesion} className="nav" style={{ background: "none", border: "none", cursor: "pointer" }}>Cerrar Sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/Usuarios" className="nav">Usuarios</Link> <span className="nav">|</span>
                            <Link to="/CatalogoAdmin" className="nav">Catálogo</Link> <span className="nav">|</span>
                            <button onClick={cerrarSesion} className="nav" style={{ background: "none", border: "none", cursor: "pointer" }}>Cerrar Sesión</button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default HeaderAdmin;
