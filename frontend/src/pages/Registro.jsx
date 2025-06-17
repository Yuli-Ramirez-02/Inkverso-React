import React, { use, useState } from 'react';
import { Link } from 'react-router-dom'; // Para volver al inicio si lo necesitas
import '../styles/style.css';

function Register() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = (e) => {
    e.preventDefault();

        console.log('Nombre:', name);
        console.log('Apellido:', lastname);
        console.log('Dirección:', address);
        console.log('Correo:', email);
        console.log('Contraseña:', password);
        console.log('Confirmación Contraseña:', confirmPassword);
    }

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

                <p>¿Ya te registrate?<Link to="/Login" className='link__recover'>Inicia Sesion</Link></p>
            </div>
        </div>    
    );
}

export default Register;