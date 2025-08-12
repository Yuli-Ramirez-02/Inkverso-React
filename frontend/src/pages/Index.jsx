import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Index() {
    const [oferta, setOferta] = useState([]); // Siempre array
    const navigate = useNavigate();
    const ofertasRef = useRef(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/oferta")
            .then((res) => res.json())
            .then((data) => {
                if (data.ok && Array.isArray(data.ofertas)) {
                    setOferta(data.ofertas);
                } else {
                    setOferta([]);
                }
            })
            .catch(err => {
                console.error("Error cargando ofertas:", err);
                setOferta([]);
            });
    }, []);

    const scrollToOfertas = () => {
        if (ofertasRef.current) {
            ofertasRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Header onOfertasClick={scrollToOfertas}/>

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
                    <h2 className="categories__title">categorías</h2>
                    <div className="section">
                        <div>
                            <img className="section__img--category" src="src/assets/ciencia ficcion.jpg" alt="imagen ficcion" />
                            <Link className="section__title" to="/Ficcion">Ficción</Link>
                        </div>
                        <div>
                            <img className="section__img--category" src="src/assets/no ficcion.jpg" alt="imagen no ficcion" />
                            <Link className="section__title" to="/NoFiccion">No Ficción</Link>
                        </div>
                        <div>
                            <img className="section__img--category" src="src/assets/juvenil o infantil.jpg" alt="imagen infantil" />
                            <Link className="section__title" to="/InfantilJuvenil">Infantil y Juvenil</Link>
                        </div>
                        <div>
                            <img className="section__img--category" src="src/assets/referencia o consulta.jpg" alt="imagen referencia" />
                            <Link className="section__title" to="/ReferenciaConsulta">Referencia y Consulta</Link>
                        </div>
                        <div>
                            <img className="section__img--category" src="src/assets/artes y humanidades.jpg" alt="imagen artes" />
                            <Link className="section__title" to="/ArtesHumanidades">Artes y Humanidades</Link>
                        </div>
                        <div>
                            <img className="section__img--category" src="src/assets/educacion.jpg" alt="imagen educacion" />
                            <Link className="section__title" to="/Educacion">Educación</Link>
                        </div>
                        <div>
                            <img className="section__img--category" src="src/assets/entretenimiento.jpg" alt="imagen entretenimiento" />
                            <Link className="section__title" to="/Entretenimiento">Entretenimiento</Link>
                        </div>
                    </div>
                </section>

                <section ref={ofertasRef} className="offers">
                    <div className="offers__header">
                        <span className="offers__bar">-</span>
                        <h2>ofertas</h2>
                        <span className="offers__bar">-</span>
                    </div>

                    <div className="offers__list">
                        {Array.isArray(oferta) && oferta.length > 0 ? (
                            oferta.map((libro) => (
                                <div key={libro.id} className="libro__card">
                                    <img
                                        src={`/assets/libros/${libro.id}.jpg`}
                                        alt={libro.titulo}
                                        className="libro__img"
                                    />

                                    <div className="libro__info">
                                        <Link to={`/libro/${libro.id}`} className="libro__id">ID: {libro.id}</Link>
                                        <h3 className="libro__titulo">{libro.titulo}</h3>
                                        <p className="libro__autor">{libro.autor}</p>
                                        <p className="libro__precio">
                                            ${libro.precio_oferta}
                                        </p>

                                        <div className="libro__acciones">
                                            <div className="libro__formatos">
                                                <label>
                                                    <input type="radio" name={`formato-${libro.id}`} value="fisico" /> Físico
                                                </label>
                                                <label>
                                                    <input type="radio" name={`formato-${libro.id}`} value="virtual" /> Virtual
                                                </label>
                                            </div>
                                            <button className="libro__boton" onClick={() => addToCart(libro)}>
                                                Comprar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay ofertas disponibles en este momento.</p>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Index;
