import "../styles/style.css"; 
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";


function HeaderBlue() {
    const { cart } = useCart();
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    const total = cart.reduce((acc, item) => {
        const precio = item.oferta ? item.precio_oferta : item.precio;
        return acc + precio * (item.cantidad || 1);
    }, 0);


    return(
        <>
        <div>
            <div className="blue__bar">
                    <div className="bar__content">
                        <div className="div__content">
                            <Link  to="/" className="title__inkverso">INKVERSO</Link>
                        </div>

                        <div className="icons">
                            <div className="cart__icon--wrapper">
                            <img className="icons__cart" src="src/assets/bx-cart.svg" alt="Logo Facebook" 
                            onClick={() => setMostrarCarrito(!mostrarCarrito)}/>
                            {cart.length > 0 && <span className="cart__count">{cart.length}</span>}
                            </div>
                        </div>
                    </div>
            </div>
        </div>

        {mostrarCarrito && (
            <div className="carrito__resumen">
                {cart.length === 0 ? (
                    <p>Item 0</p>
                ) : (
                    <>
                {cart.map((item) => (
                    <div key={item.id} className="carrito__item">
                        <img src={`/assets/libros/${item.id}.jpg`} alt={item.titulo} className="carrito__img"/>
                        
                        <div className="carrito__info">
                            <p className="carrito__titulo">{item.titulo}</p>
                            <p className="carrito__autor">{item.autor}</p>
                            {item.oferta ? (
                                <p className="carrito__precio">
                                    <span className="tachado">${item.precio}</span> ${item.precio_oferta}
                                </p>
                                ) : (
                                <p className="carrito__precio">${item.precio}</p>
                            )}

                            {/* Aquí irá el control de cantidad y la X para eliminar */}
                        </div>
                    </div>
                ))}

                    <p className="total"><strong>Total: ${total}</strong></p>
                    <div className="carrito__acciones">
                        <button className="button__blue">Pagar</button>
                        <button className="button__grey">Vaciar</button>
                    </div>
                    </>
                )}
            </div>
        )}
        </>
    );
}

export default HeaderBlue;