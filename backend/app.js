import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();


import librosRoutes from './routes/libros.js'

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware de Express ---
app.use(cors());
app.use(express.json());


app.use('/api/libros', librosRoutes);

//Ruta para obtener autores
app.get("/api/autores", async (req, res) => {
    try {
        const [results] = await db.query("SELECT DISTINCT autor FROM libros");
        res.json(results);
    } catch (error){
        console.error("Error al consultar los autores:", error);
        res.status(500).json({error: "Error en la base de datos"})
    }
});

//Ruta para obtener categorias
app.get("/api/categorias", async (req, res) => {
    try {
        const [results] = await db.query("SELECT DISTINCT categoria FROM libros");
        res.json(results);
    } catch (error) {
        console.error("Error al consultar las categorias:", error);
        res.status(500).json({error: "Error en la base de datos"})
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando desde el puerto ${PORT}`);
    console.log(`Base de datos conectada: ${process.env.DB_DATABASE}`);
})


