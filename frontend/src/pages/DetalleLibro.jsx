import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/style.css";
import HeaderGlobal from "../components/HeaderGlobal";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function DetalleLibro() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`http://localhost:5000/api/libros/${id}`)
            .then(res => res.json())
            .then(data => setLibro(data))
            .catch(err => console.error("Error al cargar el libro:", err));
    }, [id]);

    if (!libro) return <p style={{ textAlign: "center", marginTop: "3rem" }}>Cargando detalle del libro...</p>;

    const precio = libro.oferta ? libro.precio_oferta : libro.precio;

    return (
        <>
        <HeaderGlobal />

        <div className="detalle__contenedor">
            <div className="detalle__img">
                <p className="detalle__id">ID: {libro.id}</p>
                <img src={`/assets/libros/${libro.id}.jpg`} alt={libro.titulo} />
            </div>

            <div className="detalle__info">
                <div className="detalle__precio-comprar">
                    <h2 className="detalle__precio">${precio}</h2>
                    <button className="button__blue" onClick={() => addToCart(libro)}>Comprar</button>
                </div>
                <div className="detalle__resumen">
                    <h2>{libro.titulo}</h2>
                    <h3 className="detalle__autor">{libro.autor}</h3>
                    <p className="detalle__descripcion">{libro.descripcion}</p>
                </div>
            </div>
        </div>

        <Footer />
        </>
    );
}

export default DetalleLibro;
