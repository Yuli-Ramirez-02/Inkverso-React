import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Para volver al inicio
import '../styles/style.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //Para evitar el comportamiento por defecto del formulario de recargar la pagina
    
        console.log('Usuario:', username);
        console.log('Contraseña:', password);
    }

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

                    <button type='submit' className='button__login'>Ingresar</button>
                </form>

                <p>¿Olvidaste tu contraseña?<Link to="/Recuperar" className='link__recover'>Recuperala</Link></p>
                <p>¿No tienes cuenta?<Link to="/Registro" className='link__register'> Registrate</Link></p>
            </div>
        </div>
    );
}

export default Login;