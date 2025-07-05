import "../styles/style.css"
import { useEffect, useState } from "react";
import { useLocation } from 'react-dom'


function Catalog() {
    const [libros, setLibros] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const estaAutenticado = usuario?.autenticado;

    useEffect(() => {
        fetch("http://localhost:5000/api/libros")
            .then(res => res.json())
            .then(data => setLibros(data))
            .catch(err => console.error("Error al cargar libros:", err));
    }, []);

    return(
        <>
        <div className="catalogo">
            {libros.map((libro) => (
                <div key={libro.id} className="libro__card">
                    <img
                        src={`/assets/libros/${libro.id}.jpg`}
                        alt={libro.titulo}
                        className="libro__img"
                    />

                    <div className="libro__info">
                        <p className="libro__id">ID: {libro.id}</p>
                        <h3 className="libro__titulo">{libro.titulo}</h3>
                        <p className="libro__autor">{libro.autor}</p>
                        {libro.oferta ? (
                        <p className="libro__precio">
                            <span className="tachado">${libro.precio}</span> ${libro.precio_oferta}
                        </p>
                        ) : (
                        <p className="libro__precio">${libro.precio}</p>
                        )}

                        <div className="libro__acciones">
                        <div className="libro__formatos">
                            <label>
                            <input type="radio" name={`formato-${libro.id}`} value="fisico" /> Físico
                            </label>
                            <label>
                            <input type="radio" name={`formato-${libro.id}`} value="virtual" /> Virtual
                            </label>
                        </div>
                        <button className="libro__boton">Comprar</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default Catalog;