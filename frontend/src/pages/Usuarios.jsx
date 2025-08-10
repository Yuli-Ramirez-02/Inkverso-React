import "../styles/style.css"; 
import HeaderAdmin from "../components/HeaderAdmin";
import { useEffect, useState } from "react";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/usuarios");
            const data = await res.json();
            setUsuarios(data.usuarios || []);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const desactivarUsuario = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/admin/usuarios/desactivar/${id}`, {
                    method: "PUT"
                });
                const data = await res.json();
                if (data.ok) {
                    alert("Usuario desactivado correctamente");
                    fetchUsuarios(); // Recargar tabla
                }
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
            }
        }
    };

    return (
        <>
            <HeaderAdmin/>
            <div className="usuarios-admin">
                <h3>Gestión de Usuarios</h3>
                <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Estado</th>
                            <th>Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(usuarios) && usuarios.length > 0 ? (
                            usuarios.map((u) => (
                                <tr key={u.id_user}>
                                    <td>{u.nombre}</td>
                                    <td>
                                        {u.estado === 1 ? (
                                            <button 
                                                onClick={() => desactivarUsuario(u.id_user)}
                                                className="boton__eliminar"
                                            >
                                                Eliminar
                                            </button>
                                        ) : (
                                            "Inactivo"
                                        )}
                                    </td>
                                    <td>{u.pedido}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No hay usuarios</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Usuarios;