import "../styles/style.css";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

function InicioAdmin() {
    const [ventasTipo, setVentasTipo] = useState([]);
    const [usuariosTotal, setUsuariosTotal] = useState(null); // cambiamos 0 a null
    const [ventasCategoria, setVentasCategoria] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tipoRes = await fetch("http://localhost:5000/api/admin/ventas/tipo");
                const tipoData = await tipoRes.json();
                console.log("Ventas por tipo:", tipoData);
                setVentasTipo(tipoData);

                const usuariosRes = await fetch("http://localhost:5000/api/admin/usuarios/total");
                const usuariosData = await usuariosRes.json();
                console.log("Usuarios total:", usuariosData);
                setUsuariosTotal(usuariosData.total);

                const catRes = await fetch("http://localhost:5000/api/admin/ventas/categorias");
                const catData = await catRes.json();
                console.log("Ventas por categoría:", catData);
                setVentasCategoria(
                    catData.map(item => ({
                        ...item,
                        total_vendidos: parseInt(item.total_vendidos)
                    }))
                );


            } catch (error) {
                console.error("Error al cargar datos del admin:", error);
            }
        };

        fetchData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="inicio-admin">
            <HeaderAdmin />
            <main className="admin-dashboard">
                <h3>Bienvenido, Administrador</h3>

                {/* Gráfico de barras de ventas por tipo */}
                {ventasTipo.length > 0 && (
                    <section className="grafico">
                        <h3>Ventas por tipo</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ventasTipo}>
                                <XAxis dataKey="tipo" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </section>
                )}

                {/* Conteo de usuarios registrados */}
                {usuariosTotal !== null && (
                    <section className="grafico">
                        <h3>Total de usuarios registrados</h3>
                        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{usuariosTotal}</p>
                    </section>
                )}

                {/* Gráfico de pastel de ventas por categoría */}
                {ventasCategoria.length > 0 && (
                    <section className="grafico">
                    <h3>Libros más vendidos por categoría</h3>
                    <PieChart width={400} height={300}>
                        <Pie
                        data={ventasCategoria}
                        dataKey="total_vendidos"
                        nameKey="categoria"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                        >
                        {ventasCategoria.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default InicioAdmin;
