import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const almacenado = localStorage.getItem("usuario");
        if (almacenado) {
        setUsuario(JSON.parse(almacenado));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("usuario", JSON.stringify(userData));
        setUsuario(userData);
    };

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
