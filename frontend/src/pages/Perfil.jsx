import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Para volver al inicio si lo necesitas
import '../styles/style.css';

function Perfil() {
        const [name, setName] = useState('');
        const [lastname, setLastname] = useState('');
        const [address, setAddress] = useState('');
        const [email, setEmail] = useState('');
        const [mensajeExito, setMensajeExito] = useState(false);
        
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        // Obtener datos desde la base de datos
        useEffect(() => {
            if (!usuario?.email) return;

            fetch(`http://localhost:5000/api/usuario?email=${usuario.email}`)
                .then(res => res.json())
                .then(data => {
                    setName(data.nombre || '');
                    setLastname(data.apellido || '');
                    setAddress(data.direccion || '');
                    setEmail(data.email || '');
                })
                .catch(err => {
                    console.error("Error al obtener perfil:", err);
                });
        }, []);
            
    
        const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const res = await fetch("http://localhost:5000/api/usuario", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, nombre: name, apellido: lastname, direccion: address })
            });

            const data = await res.json();

            if (data.ok) {
                setMensajeExito("Perfil actualizado correctamente");
                
                // Actualizar localStorage
                localStorage.setItem("usuario", JSON.stringify({
                    ...usuario,
                    nombre: name,
                    apellido: lastname,
                    direccion: address
                }));
            } else {
                alert(data.error || "No se pudo actualizar");
            }

        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            alert("Error del servidor");
        }
        }
    
    return (
        <div className='background'>
            <div className='container'>
                <form className="container__form" onSubmit={handleSubmit}>
                    <h2>Mi Perfil</h2>
                    <img  className='img__profile' src='src/assets/bx-user-pin.svg'></img>


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
                            readOnly
                            required
                            autoComplete='email'
                            placeholder='Tu correo'
                            />
                    </div>

                    <button type='submit' className='button__blue'>Actualizar</button>
                    {mensajeExito && (
                    <div className="modal__overlay">
                        <div className="modal__content">
                            <button className="modal__close" onClick={() => setMensajeExito(false)}>✖</button>

                            <img src='/src/assets/bxs-check-circle.svg' className='icono_check'></img>
                            
                            <div className="modal__text">
                                <h3>Tu cuenta fue actualizada exitosamente.</h3>
                            </div>
                        </div>
                    </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Perfil;