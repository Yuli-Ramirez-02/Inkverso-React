import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/style.css";
import HeaderGlobal from "../components/HeaderGlobal";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function DetalleLibro() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [reseñas, setReseñas] = useState([]);
    const [comentario, setComentario] = useState('')
    const [calificacion, setCalificacion] = useState(0);
    const {usuario} = useAuth();
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`http://localhost:5000/api/libros/${id}`)
            .then(res => res.json())
            .then(data => setLibro(data))
            .catch(err => console.error("Error al cargar el libro:", err));

        fetch(`http://localhost:5000/api/reseñas?libro_id=${id}`)
            .then(res => res.json())
            .then(data => setReseñas(data))
            .catch(err => console.error("Error al obtener las reseñas:", err))
    }, [id]);

    const enviarReseña = async () => {
        if (!comentario || calificacion === 0) {
            return alert("Debes ingresar comentario y calificación");
        }

        const res = await fetch("http://localhost:5000/api/reseñas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_user: usuario.id,
                libro_id: id,
                calificacion,
                comentario
            })
        });

        const data = await res.json();
        if (data.ok) {
            setComentario("");
            setCalificacion(0);
            // recargar reseñas
            const updated = await fetch(`http://localhost:5000/api/reseñas/${id}`);
            setReseñas(await updated.json());
        } else {
            alert(data.error || "Error al enviar reseña");
        }
    };

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

        <div className="detalle__reseñas">
            <h4>Califica este libro</h4>
            <div className="estrellas">
                {[1,2,3,4,5].map(num => (
                    <span key={num}
                            style={{cursor: "pointer", color: num <= calificacion ? "gold" : "gray"}}
                            onClick={() => setCalificacion(num)}>
                        ★
                    </span>
                ))}
            </div>

            <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu comentario"
                rows={3}
            />

            <button onClick={enviarReseña} className="button__blue">Agregar Comentario</button>

            <h4>Comentarios</h4>
                {reseñas.length === 0 ? (
                    <p>No hay reseñas aún.</p>
                ) : (
                reseñas.map((r, index) => (
                    <div key={index} className="reseña">
                        <p><strong>{r.nombre}</strong> ({r.calificacion} ★)</p>
                        <p>{r.comentario}</p>
                        <small>{new Date(r.fecha_creacion).toLocaleDateString()}</small>
                    </div>
                ))
                )}
        </div>
        
        <Footer />
        </>
    );
}

export default DetalleLibro;
