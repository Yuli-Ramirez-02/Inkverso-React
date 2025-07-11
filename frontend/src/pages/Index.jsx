import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Index() {
    const navigate = useNavigate();

    //Funcion para el boton ingresar


    return(
        <>
    <Header/>

    <main className="main">
        <nav className="bar">
            <div className="search">
                <input className="search__bar" type="text" placeholder="¿Qué libro necesitas?" />
                <img className="search__icon" src="src/assets/lupa-azul.svg" alt="lupa" />
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
                    <img className="section__img--category" src="src/assets/ciencia ficcion.jpg" alt="imagen ficcion"></img>
                    <Link className="section__title" to="/Ficcion">Ficción</Link>
                </div>
                <div>
                    <img className="section__img--category" src="src/assets/no ficcion.jpg" alt="imagen no ficcion"></img>
                    <Link className="section__title" to="/NoFiccion">No Ficción</Link>
                </div>
                <div>
                    <img className="section__img--category" src="src/assets/juvenil o infantil.jpg" alt="imagen infantil"></img>
                    <Link className="section__title" to="/InfantilJuvenil">Infantil y Juvenil</Link>
                </div>
                <div>
                    <img className="section__img--category" src="src/assets/referencia o consulta.jpg" alt="imagen referencia"></img>
                    <Link className="section__title" to="/ReferenciaConsulta">Referencia y Consulta</Link>
                </div>
                <div>
                    <img className="section__img--category" src="src/assets/artes y humanidades.jpg" alt="imagen artes"></img>
                    <Link className="section__title" to="/ArtesHumanidades">Artes y Humanidades</Link>
                </div>
                <div>
                    <img className="section__img--category" src="src/assets/educacion.jpg" alt="imagen educacion"></img>
                    <Link className="section__title" to="/Educacion">Educación</Link>
                </div>
                <div>
                    <img className="section__img--category" src="src/assets/entretenimiento.jpg" alt="imagen entretenimiento"></img>
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

    <Footer/>        
    </>
    );
}

export default Index;

