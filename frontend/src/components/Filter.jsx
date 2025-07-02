import "../styles/style.css"; 
import { useState, useEffect } from "react";
import flechabajo from "../assets/bx-chevron-down.svg";

function Filter() {
    const [autores, setAutores] = useState([]);
    const [mostrarAutor, setMostarAutor] = useState(true);

    const [categorias, setCategorias] = useState([])
    const [mostrarCategoria, setMostarCategoria] = useState(true);

    const [mostrarPrecio, setMostarPrecio] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/autores")
            .then((res) => res.json())
            .then((data) => setAutores(data))
            .catch((err) => console.error("Error al cargar autores:", err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/api/categorias")
            .then((res) => res.json())
            .then((data) => setCategorias(data))
            .catch((err) => console.error("Error al cargar las categorias:", err))
    }, [])

    return(
        <>
        <aside className="filter">
            <h3 className="title__filter">filtros</h3>

            <div className="group__filter">
                <div className="container__filter">
                    <button className="header__filter" onClick={() => setMostarCategoria(!mostrarCategoria)}>
                        <span>Categoría</span>
                        <img className="icons__filter" src={flechabajo} alt="flecha abajo" />
                    </button>
                </div>

                {mostrarCategoria && (
                    <ul className="select__filter">
                        {categorias.map((a, index) => (
                            <li key={index}>
                                <button className="opcion__filter">{a.categoria}</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="group__filter">
                <div></div>
                <button className="header__filter" onClick={() => setMostarAutor(!mostrarAutor)}>Autor
                    <img className="icons__filter" src={flechabajo} alt="flecha abajo"/>
                </button>

                {mostrarAutor && (
                    <ul className="select__filter">
                        {autores.map((a, index) => (
                            <li key={index}>
                                <button className="opcion__filter">{a.autor}</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="group__filter">
                <label htmlFor="precio" className="header__filter">Precio máximo</label>
                <input type="range" id="precio" name="precio" min="0" max="600000" step="10000" className="select__filter" />
            </div>
        </aside>
    </>
    );
}

export default Filter;
