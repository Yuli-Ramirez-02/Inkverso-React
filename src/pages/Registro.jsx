import React from 'react';
import { Link } from 'react-router-dom'; // Para volver al inicio si lo necesitas

function Register() {
    return (
        <div>
            <h1>Página de Ingreso de Usuario</h1>
            <p>Aquí irá tu formulario de registro.</p>
            <Link to="/">Volver al Inicio</Link>
        </div>
    );
}

export default Register;