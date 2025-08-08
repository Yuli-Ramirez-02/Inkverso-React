import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // --- Solución: Inicializar el estado directamente con localStorage ---
    const [usuario, setUsuario] = useState(() => {
        try {
            const almacenado = localStorage.getItem("usuario");
            return almacenado ? JSON.parse(almacenado) : null;
        } catch (e) {
            console.error("Error al cargar el usuario desde localStorage", e);
            return null;
        }
    });

    // --- Usa useEffect solo para sincronizar el estado con localStorage ---
    useEffect(() => {
        if (usuario) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
        } else {
            localStorage.removeItem("usuario");
        }
    }, [usuario]); // Este useEffect solo se ejecuta cuando 'usuario' cambia

    const login = (userData) => {
        setUsuario(userData);
        localStorage.setItem("usuario", JSON.stringify(userData));
    };

    const logout = () => {
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);