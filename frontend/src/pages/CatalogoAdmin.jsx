import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import "../styles/style.css";

function CatalogoAdmin() {
    const [libros, setLibros] = useState([]);

    const fetchLibros = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/libros");
            const data = await res.json();
            setLibros(data.libros || []);
        } catch (error) {
            console.error("Error al obtener libros:", error);
        }
    };

    const eliminarLibro = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este libro?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/admin/libros/${id}`, {
                    method: "DELETE"
                });
                const data = await res.json();
                if (data.ok) {
                    alert("Libro eliminado");
                    fetchLibros();
                }
            } catch (error) {
                console.error("Error al eliminar libro:", error);
            }
        }
    };

    const editarLibro = (id) => {
        // Aquí puedes redirigir a un formulario de edición
        window.location.href = `/editar-libro/${id}`;
    };

    useEffect(() => {
        fetchLibros();
    }, []);

    return (
        <>
            <HeaderAdmin />
            <div className="catalogo-admin">
                <h3>Catálogo de Libros</h3>
                <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Autor</th>
                            <th>Categoría</th>
                            <th>Oferta</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.length > 0 ? (
                            libros.map((libro) => (
                                <tr key={libro.id}>
                                    <td>{libro.titulo}</td>
                                    <td>{libro.autor}</td>
                                    <td>{libro.categoria}</td>
                                    <td>{libro.oferta ? "Sí" : "No"}</td>
                                    <td>${libro.precio}</td>
                                    <td>
                                        <button 
                                            style={{ background: "red", color: "white", marginRight: "5px" }}
                                            onClick={() => eliminarLibro(libro.id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                            style={{ background: "orange", color: "white" }}
                                            onClick={() => editarLibro(libro.id)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No hay libros disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CatalogoAdmin;
