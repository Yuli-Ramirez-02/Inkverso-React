import "../styles/style.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header({ onOfertasClick }) {
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();

    const handleIngresarClick = () => {
        navigate("/login");
    };

    const handleRegistrateClick = () => {
        navigate("/Registro");
    };

    const cerrarSesion = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">
        <img className="header__img" src="src/assets/Imagen de fondo grande.png" alt="imagen del fondo" />

        <div className="div">
            <h1 className="div__inkverso">INKVERSO</h1>
            <button className="div__offer" onClick={onOfertasClick}>OFERTAS</button>
        </div>

        <div className="entry">
            {!usuario ? (
            <>
                <button className="entry__button entry__button--register" onClick={handleRegistrateClick}>Registrate</button>
                <button className="entry__button entry__button--into" onClick={handleIngresarClick}>Ingresar</button>
            </>
            ) : (
            <button className="entry__button entry__button--into" onClick={cerrarSesion}>Cerrar sesión</button>
            )}
        </div>
        </header>
    );
}

export default Header;
