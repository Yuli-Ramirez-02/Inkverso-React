import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/style.css"; 

function CartDropdown({ mostrarCarrito = false, setMostrarCarrito = () =>{}, mostrar = true, modoResumen = false }) {
    const navigate = useNavigate();
    const { cart, updateCantidad, removeFromCart, clearCart } = useCart(); 


    const total = cart.reduce((acc, item) => {
        const precio = item.oferta 
        ? parseFloat(item.precio_oferta) 
        : parseFloat(item.precio);
        const validPrecio = isNaN(precio) ? 0 : precio;
        return acc + validPrecio * (item.cantidad || 1);
    }, 0);

    // Función para manejar el botón "Vaciar"
    const handleClearCart = () => {
        clearCart(); 
        setMostrarCarrito(false);
    };

    const handleCheckout = () => {
        navigate("/pago");
        setMostrarCarrito(false);
    };

    if (!mostrarCarrito && !modoResumen) return null;


return (
        <div className={`carrito__resumen ${modoResumen ? 'resumen__columna' : ''}`}>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p> // Mensaje más descriptivo
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="carrito__item">
                            <img src={`/assets/libros/${item.id}.jpg`} alt={item.titulo} className="carrito__img" />
                            <div className="carrito__info">
                                <p className="carrito__titulo">{item.titulo}</p>
                                <p className="carrito__autor">{item.autor}</p>
                                <p className="carrito__precio">
                                    {item.oferta 
                                        ? `$${parseFloat(item.precio_oferta).toFixed(2)}`
                                        : `$${parseFloat(item.precio).toFixed(2)}`
                                    }                                                
                                </p>

                                <div className="carrito__cantidad">
                                    <button onClick={() =>
                                        updateCantidad(item.id, item.cantidad - 1, item.inventario)
                                    }> - </button>
                                    <span>{item.cantidad}</span>
                                    <button onClick={() =>
                                        updateCantidad(item.id, item.cantidad + 1, item.inventario)
                                    } disabled={item.cantidad >= item.inventario}> + </button>
                                </div>
                            </div>

                            <button className="carrito__eliminar" onClick={() => removeFromCart(item.id)}>
                                ✖
                            </button>
                        </div>
                    ))}

                    {/* Solo mostramos botones si NO es modo resumen */}
                    {!modoResumen && (
                        <div className="carrito__acciones">
                            <button onClick={() => navigate("/pago")} className="button__blue">Pagar</button>
                            <button onClick={clearCart} className="button__grey">Vaciar</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CartDropdown;