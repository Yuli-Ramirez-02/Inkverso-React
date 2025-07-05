import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Verificar() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) return;

        fetch(`http://localhost:5000/verificar?token=${token}`)
        .then(res => res.json())
        .then(data => {
            
            if (data.ok) {
            // Guardar en localStorage que está autenticado
            localStorage.setItem("usuario", JSON.stringify({ email: data.email, autenticado: true }));

            // Redirigir al catálogo
            navigate("/catalogo");
            } else {
            alert("Token inválido o expirado");
            navigate("/"); // redirigir al home
            }
        })
        .catch(err => {
            console.error("Error al verificar:", err);
            navigate("/");
        });

    }, []);

    return (
        <div className="background">
        <div className="container">
            <h2>Verificando cuenta...</h2>
        </div>
        </div>
    );
}

export default Verificar;
