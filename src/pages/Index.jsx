import { Link } from "react-router-dom";
import "../styles/style.css";


function Index() {
    return(
        <>
        <header className="header">
        <img className="header__img" src="/assets/Imagen de fondo grande.png" alt="imagen del fondo" />

        <div className="div">
            <h1 className="div__inkverso">INKVERSO</h1>
            <button className="div__offer">OFERTAS</button>
        </div>

        <div className="entry">
            <button className="entry__button entry__button--register">Registrate</button>
            <button className="entry__button entry__button--into">Ingresar</button>
        </div>
    </header>

    <main className="main">
        <nav className="bar">
            <div className="search">
                <input className="search__bar" type="text" placeholder="¿Qué libro necesitas?" />
                <img className="search__icon" src="/assets/lupa-azul.svg" alt="lupa" />
            </div>

            <div className="link">
                <Link className="link__catalog" to="/catalogo">Catálogo</Link>
                <span className="link__separator">|</span>
                <Link className="link__profile" to="/perfil">Perfil</Link>
            </div>
        </nav>

        <section className="categories">
            <h2>CATEGORÍAS</h2>
            <div><Link to="">Ficción</Link></div>
            <div><Link to="">No Ficción</Link></div>
            <div><Link to="">Infantil y Juvenil</Link></div>
            <div><Link to="">Referencia y Consulta</Link></div>
            <div><Link to="">Artes y Humanidades</Link></div>
            <div><Link to="">Educación</Link></div>
            <div><Link to="">Entretenimiento</Link></div>
        </section>

        <section className="offers">
            <span className="offers__bar">-------------------</span>
            <h2>OFERTAS</h2>
            <span className="offers__bar">-------------------</span>
        </section>
    </main>

    <footer className="footer">
        <div className="footer__content">
            <div className="footer__div">
                <h1 className="footer__inkverso">INKVERSO</h1>
            </div>

            <div className="icons">
                <img className="icons__facebook" src="/assets/logo-facebook.svg" alt="Logo Facebook" />
                <img className="icons__instagram" src="/assets/logo-instagram.svg" alt="Logo Instagram" />
                <img className="icons__twitter" src="/assets/logo-twitter.svg" alt="Logo Twitter" />
            </div>
        </div>
    </footer>
        </>
    );
}

export default Index;

