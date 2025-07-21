import React, { use, useState } from 'react';
import { Link } from 'react-router-dom'; // Para volver al inicio
import { useAuth } from '../context/AuthContext';
import '../styles/style.css';

function Register() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [mensajeExito, setMensajeExito] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");        
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: name,
            apellido: lastname,
            direccion: address,
            email,
            password
        })
    });

    const data = await res.json();

    if (data.ok) {
        login({ email: email, autenticado: true }); // lo guarda en localStorage 
        setMensajeExito(true);
    } else {
        alert(data.error || "Error en el registro");
    }
    } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error en el servidor");
    }
    };


    return (
        <div className='background'>
            <div className='container'>
                <form className="container__form" onSubmit={handleSubmit}>
                    <h2>Registrate</h2>

                    <div className='form'>
                        <label htmlFor="name"></label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete='name'
                            placeholder='Tu nombre'
                            />
                    </div>

                    <div className='form'>
                        <label htmlFor="lastname"></label>
                        <input
                            type='text'
                            id='lastname'
                            name='lastname'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                            autoComplete='lastname'
                            placeholder='Tu apellido'
                            />
                    </div>

                    <div className='form'>
                        <label htmlFor="address"></label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            autoComplete='address'
                            placeholder='Tu direccion'
                            />
                    </div>

                    <div className='form'>
                        <label htmlFor="email"></label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete='email'
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
                            placeholder='Ingresa una contraseña'
                        />
                    </div>

                    <div className='form'>
                        <label htmlFor='confirmPassword'></label>
                        <input
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={8}
                            autoComplete='current-password'
                            placeholder='Confirma la contraseña'
                        />
                    </div>

                    <button type='submit' className='button__create button__blue'>Crear Cuenta</button>
                </form>

                {mensajeExito && (
                <div className="modal__overlay">
                    <div className="modal__content">
                        <button className="modal__close" onClick={() => setMensajeExito(false)}>✖</button>

                        <img src='/src/assets/bxs-check-circle.svg' className='icono_check'></img>
                        
                        <div className="modal__text">
                            <h3>Tu cuenta fue creada exitosamente.</h3>
                            <p>Revisa tu correo para verificar tu cuenta.</p>
                        </div>
                    </div>
                </div>
                )}

                <p>¿Ya te registrate?<Link to="/Login" className='link__recover'>Inicia Sesion</Link></p>
            </div>
        </div>    
    );
}

export default Register;