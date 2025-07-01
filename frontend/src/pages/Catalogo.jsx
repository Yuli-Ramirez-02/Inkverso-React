import "../styles/style.css"
import Footer from "../components/Footer";

import { useState, useEffect } from "react";

function Catalogo() {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/libros")
        .then((res) => res.json())
        .then((data) => setLibros(data))
        .catch((err) => console.error('Error en los libros:', err));
    }, [])

    return (
        <>
        <div>
            <div className="blue__bar">
                    <div className="footer__content">
                        <div className="footer__div">
                            <h1 className="footer__inkverso">INKVERSO</h1>
                        </div>

                        <div className="icons">
                            <img className="icons__cart" src="src/assets/bx-cart.svg" alt="Logo Facebook" />
                        </div>
                    </div>
            </div>
        </div>

        <div>
            <aside>
                <h3>filtros</h3>

                <div>
                    <label>Categoría</label>
                    <select>
                        <option value=''>Todos</option>
                        <option value=''>Ficcion</option>
                        <option value=''>No Ficcion</option>
                        <option value=''>Infantil y Juvenil</option>
                        <option value=''>Referencia y consulta</option>
                        <option value=''>Artes y humanidades</option>
                        <option value=''>Educacion</option>
                        <option value=''>Entrenimiento</option>
                    </select>
                </div>

                <div>
                    <label>Autor</label>
                    <input type="text" placeholder="Buscar autor" />
                </div>

                <div>
                    <label>Precio máximo</label>
                    <input type="number" placeholder="Ej: 50000" />
                </div>
            </aside>
        </div>

        <Footer/>
        </>
    );
}

export default Catalogo;