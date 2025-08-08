import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ["#0088FE", "#FF8042"];

function DashboardAdmin() {
    const [ventasTipo, setVentasTipo] = useState([]);
    const [usuariosTotales, setUsuariosTotales] = useState(0);
    const [ventasPorCategoria, setVentasPorCategoria] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await fetch("http://localhost:5000/api/admin/ventas/tipo");
            setVentasTipo(await res1.json());

            const res2 = await fetch("http://localhost:5000/api/admin/usuarios/total");
            setUsuariosTotales((await res2.json()).total);

            const res3 = await fetch("http://localhost:5000/api/admin/ventas/categorias");
            setVentasPorCategoria(await res3.json());
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-admin">
            <h2>Panel de Administración</h2>

            <section>
                <h3>Libros vendidos (Físico vs Virtual)</h3>
                <PieChart width={300} height={300}>
                    <Pie data={ventasTipo} dataKey="total" nameKey="tipo" cx="50%" cy="50%" outerRadius={80}>
                        {ventasTipo.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </section>

            <section>
                <h3>Total de usuarios registrados: {usuariosTotales}</h3>
            </section>

            <section>
                <h3>Libros más vendidos por categoría</h3>
                <BarChart width={500} height={300} data={ventasPorCategoria}>
                    <XAxis dataKey="categoria" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_vendidos" fill="#82ca9d" />
                </BarChart>
            </section>
        </div>
    );
}

export default DashboardAdmin;
