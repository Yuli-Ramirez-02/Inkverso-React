import "../styles/style.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import CartDropdown from "../components/CartDropdown";

function Pago() {
    const { cart, updateCantidad, removeFromCart } = useCart();
    const { usuario } = useAuth();
    const [metodoPago, setMetodoPago] = useState("contra-entrega");

    const subtotal = cart.reduce((acc, item) => {
        const precio = item.oferta ? item.precio_oferta : item.precio;
        return acc + precio * item.cantidad;
    }, 0);

    const impuesto = subtotal * 0.19;
    const domicilio = 5000;
    const total = subtotal + impuesto + domicilio;


    return(
        <>
        <div className="pago__contenedor">
            {/**Columna 1 */}
            <CartDropdown 
                mostrarCarrito={mostrarCarrito} 
                setMostrarCarrito={setMostrarCarrito}
            />
            
            {/** Columna 2 */}
            <div className="pago__columna datos">
                <h3>Datos para el domicilio</h3>
                <label>Nombre:</label>
                <input type="text" value={usuario?.nombre || ""} readOnly />

                <label>Correo:</label>
                <input type="email" value={usuario?.email || ""} readOnly />

                <label>Dirección:</label>
                <input type="text" value={usuario?.direccion || ""} placeholder="Tu dirección completa" />
            </div>

            {/** Columna 3 */}
            <div className="pago__columna metodo">
                <h3>Método de Pago</h3>
                <label>
                    <input type="radio" name="metodo" value="contra-entrega" checked={metodoPago === "contra-entrega"} onChange={(e) => setMetodoPago(e.target.value)} />
                    Contra Entrega
                </label>
                <label>
                    <input type="radio" name="metodo" value="datafono" checked={metodoPago === "datafono"} onChange={(e) => setMetodoPago(e.target.value)} />
                    Datáfono
                </label>
                <label>
                    <input type="radio" name="metodo" value="pse" checked={metodoPago === "pse"} onChange={(e) => setMetodoPago(e.target.value)} />
                    PSE
                </label>

                <div className="pago__totales">
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>IVA (19%): ${impuesto.toFixed(2)}</p>
                    <p>Domicilio: ${domicilio.toFixed(2)}</p>
                    <hr />
                    <h3>Total a pagar: ${total.toFixed(2)}</h3>
                </div>
            </div>
        </div>
        </>
    )
}

export default Pago;