import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "../styles/style.css";

function ModifyAddress() {
    const [department, setDepartment] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [addressee, setAddressee] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();

        console.log('Departamento:', department);
        console.log('Ciudad:', city);
        console.log('Direccion:', address);
        console.log('Barrio:', district);
        console.log('Destinario:', addressee);
        console.log('Comentario:', comment);
    }

    return(
        <div className='background'>
            <div className='container'>
                <form className="container__form" onSubmit={handleSubmit}>
                    <h2>Modificar direccion</h2>

                    <div className='form'>
                        <label htmlFor="department">Departamento:</label>
                        <input
                            type='text'
                            id='department'
                            name='department'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            autoComplete='department'
                        />
                    </div>

                    <div className='form'>
                        <label htmlFor='city'>Ciudad:</label>
                        <input
                            type='text'
                            id='city'
                            name='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            autoComplete='city'
                        />
                    </div>

                    <div className='form'>
                        <label htmlFor='address'>Dirrecion:</label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            autoComplete='address'
                        />
                    </div>

                    <div className='form'>
                        <label htmlFor='district'>Barrio:</label>
                        <input
                            type='text'
                            id='district'
                            name='district'
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                            autoComplete='district'
                        />
                    </div>

                    <div className='form'>
                        <label htmlFor='addressee'>Destinatario:</label>
                        <input
                            type='text'
                            id='addressee'
                            name='addressee'
                            value={addressee}
                            onChange={(e) => setAddressee(e.target.value)}
                            required
                            autoComplete='addressee'
                        />
                    </div>

                    <div className='form'>
                        <label htmlFor='addressee'>Comentario:</label>
                        <input
                            type='textarea'
                            id='comment'
                            name='comment'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            autoComplete='comment'
                        />
                    </div>

                    <button type='submit' className='button__add button__blue'>Añadir</button>
                </form>

            </div>
        </div>
    );
}

export default ModifyAddress;