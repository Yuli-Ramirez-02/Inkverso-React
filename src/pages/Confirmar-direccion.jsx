import React from 'react';
import { Link } from "react-router-dom";
import "../styles/style.css";

function ConfirmAddress() {

    return(
        <div className='background'>
            <div className='container'>
                    <h2>Confirmar Direccion</h2>
                    <p className='title__home'>Domicilio</p>

                    <div>Aca van las direcciones</div>
                    
                    <button type='submit' className='button__blue'>Confirmar</button>
                    <button type='submit' className='button__grey'>Enviar a otra direccion</button>

            </div>
        </div>
    );
}

export default ConfirmAddress;