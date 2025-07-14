import {createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (libro, cantidad = 1) => {
        setCart(prev => {
            const existente = prev.find(item => item.id === libro.id);
            if(existente) {
                return prev.map(item => 
                    item.id === libro.id
                        ?{...item, cantidad: Math.min(item.cantidad + cantidad, libro.inventario)}
                        : item
                );
            }
            return [...prev, {...libro, cantidad}];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateCantidad = (id, cantidad, inventario) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ?{...item,cantidad: Math.min(Math.max(cantidad, 1), inventario)}
                    :item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCantidad }}>
            {children}
        </CartContext.Provider>        
    );
}

export function useCart() {
    return useContext(CartContext);
}