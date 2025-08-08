import React, {useState} from 'react';
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom'; // Para volver al inicio
import '../styles/style.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-type" : "application/json" },
            body: JSON.stringify({ email: username, password})
        });

        const data = await res.json();

        if (data.ok) {
            console.log("Usuario autenticado:", data.usuario);
            login({ ...data.usuario, autenticado: true });

            console.log(data.usuario.rol)

            //Lógica de redirección basada en el rol
            if (data.usuario.rol === 0) {
                navigate("/");
            } else {
                navigate("/inicioAdmin");
            }

        } else {
            alert(data.mensaje || "Credenciales inválidas");
        }
    } catch (error) {
        console.error("Error en login:", error);
        alert("Error en el servidor");
    }
};

    return (
        <div className='background'>
            <div className='container'>
                <form className="container__form" onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>

                    <div className='form'>
                        <label htmlFor="username"></label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete='username'
                            placeholder='Tu correo'
                            />
                    </div>

                    <div className='form'>
                        <label htmlFor='password'></label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            autoComplete='current-password'
                            placeholder='Tu contraseña'
                        />
                    </div>

                    <button type='submit' className='button__login button__blue'>Ingresar</button>
                </form>

                <p>¿Olvidaste tu contraseña?<Link to="/Recuperar" className='link__recover'>Recuperala</Link></p>
                <p>¿No tienes cuenta?<Link to="/Registro" className='link__register'> Registrate</Link></p>
            </div>
        </div>
    );
}

export default Login;