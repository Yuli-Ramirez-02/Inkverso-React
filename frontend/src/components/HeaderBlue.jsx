import "../styles/style.css"; 
import { useState } from "react";
import { Link } from "react-router-dom";
import cartIcon from "../assets/bx-cart.svg";
import CartDropdown from "./CartDropdown";
import { useCart } from "../context/CartContext";

function HeaderBlue() {
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const {cart} = useCart();

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
                                <img
                                    className="icons__cart"
                                    src={cartIcon} 
                                    alt="Icono del Carrito"
                                    onClick={() => setMostrarCarrito(!mostrarCarrito)}
                                />
                                {cart.length > 0 && <span className="cart__count">{cart.length}</span>}
                            </div>

                            <CartDropdown 
                                mostrarCarrito={mostrarCarrito} 
                                setMostrarCarrito={setMostrarCarrito}
                            />
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}

export default HeaderBlue;