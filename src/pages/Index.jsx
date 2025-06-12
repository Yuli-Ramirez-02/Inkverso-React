import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";


function Index() {
    const navigate = useNavigate();

    //Funcion para el boton ingresar
    const handleIngresarClick = () => {
        //Logica
        navigate('/login');
    }

    //Funcion para el boton registrate
    const handleRegistrateClick = () => {
        //Logica
        navigate('/registro')
    }

    return(
        <>
        <header className="header">
        <img className="header__img" src="/assets/Imagen de fondo grande.png" alt="imagen del fondo" />

        <div className="div">
            <h1 className="div__inkverso">INKVERSO</h1>
            <button className="div__offer">OFERTAS</button>
        </div>

        <div className="entry">
            <button className="entry__button entry__button--register" onClick={handleRegistrateClick}>Registrate</button>
            <button className="entry__button entry__button--into" onClick={handleIngresarClick}>Ingresar</button>
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
            <h2 className="categories__title">categorias</h2>
            <div className="section">
                <div>
                    <img className="section__img--category" src="/assets/ciencia ficcion.jpg" alt="imagen ficcion"></img>
                    <Link className="section__title" to="/Ficcion">Ficción</Link>
                </div>
                <div>
                    <img className="section__img--category" src="/assets/no ficcion.jpg" alt="imagen no ficcion"></img>
                    <Link className="section__title" to="/NoFiccion">No Ficción</Link>
                </div>
                <div>
                    <img className="section__img--category" src="/assets/juvenil o infantil.jpg" alt="imagen infantil"></img>
                    <Link className="section__title" to="/InfantilJuvenil">Infantil y Juvenil</Link>
                </div>
                <div>
                    <img className="section__img--category" src="/assets/referencia o consulta.jpg" alt="imagen referencia"></img>
                    <Link className="section__title" to="/ReferenciaConsulta">Referencia y Consulta</Link>
                </div>
                <div>
                    <img className="section__img--category" src="/assets/artes y humanidades.jpg" alt="imagen artes"></img>
                    <Link className="section__title" to="/ArtesHumanidades">Artes y Humanidades</Link>
                </div>
                <div>
                    <img className="section__img--category" src="/assets/educacion.jpg" alt="imagen educacion"></img>
                    <Link className="section__title" to="/Educacion">Educación</Link>
                </div>
                <div>
                    <img className="section__img--category" src="/assets/entretenimiento.jpg" alt="imagen entretenimiento"></img>
                    <Link className="section__title" to="/Entretenimiento">Entretenimiento</Link>
                </div>
            </div>
        </section>

        <section className="offers">
            <span className="offers__bar">-------------------</span>
            <h2>ofertas</h2>
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

