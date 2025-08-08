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
    const { usuario } = useAuth(); // Obtienes el usuario del contexto
    const { addToCart } = useCart();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true); // Se activa el estado de carga
        const fetchBookAndReviews = async () => {
            try {
                // Carga del libro
                const bookRes = await fetch(`http://localhost:5000/api/libros/${id}`);
                const bookData = await bookRes.json();
                setLibro(bookData);

                // Carga de reseñas
                const reviewsRes = await fetch(`http://localhost:5000/api/resenas/${id}`);
                const reviewsData = await reviewsRes.json();
                setReseñas(reviewsData);
            } catch (err) {
                console.error("Error al cargar datos:", err);
            } finally {
                setIsLoading(false); // La carga ha terminado
            }
        };
        fetchBookAndReviews();
    }, [id]);

    const enviarReseña = async () => {

        if (!comentario || calificacion === 0) {
            return alert("Debes ingresar comentario y calificación");
        }
        
        try {
            const res = await fetch("http://localhost:5000/api/resenas", {
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
                const updatedRes = await fetch(`http://localhost:5000/api/resenas/${id}`);
                setReseñas(await updatedRes.json());
            } else {
                alert(data.error || "Error al enviar reseña");
            }
        } catch (error) {
            console.error("Error al enviar reseña:", error);
            alert("Error del servidor al enviar la reseña");
        }
    };

    if (isLoading || !libro) return <p style={{ textAlign: "center", marginTop: "3rem" }}>Cargando detalle del libro...</p>;
    
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
            {usuario ? (
                <>
                    <h4>Califica este libro</h4>
                    <div className="estrellas">
                        {[1, 2, 3, 4, 5].map(num => (
                            <span key={num}
                                style={{ cursor: "pointer", color: num <= calificacion ? "gold" : "gray" }}
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
                </>
            ) : (
                <p>Inicia sesión para dejar una reseña.</p>
            )}

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