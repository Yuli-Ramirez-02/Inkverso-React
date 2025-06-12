import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "../styles/style.css";

function Recover() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Correo:', email);
        console.log('Nueva Contraseña:', newPassword);
        console.log('Confirmar Contraseña:', confirmPassword);
    }
    
    return(
        <div className='background'>
            <div className='container'>
                <form className="container__form" onSubmit={handleSubmit}>
                    <h2>Reestablecer contraseña</h2>

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
                        <label htmlFor='confirmPassword'></label>
                        <input
                            type='confirmPassword'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={8}
                            autoComplete='current-password'
                            placeholder='Tu nueva contraseña'
                        />
                    </div>

                                        <div className='form'>
                        <label htmlFor='newPassword'></label>
                        <input
                            type='newPassword'
                            id='newPassword'
                            name='newPassword'
                            value={newPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={8}
                            autoComplete='current-password'
                            placeholder='Confirma la nueva contraseña'
                        />
                    </div>

                    <button type='submit' className='button__login'>Reestablecer</button>
                </form>

                <p>¿Ya tienes cuenta?<Link to="/Login" className='link__register'>Inicia Sesion</Link></p>
            </div>
        </div>
    );
}

export default Recover;