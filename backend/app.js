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


app.listen(PORT, () => {
    console.log(`Servidor Express escuchando desde el puerto ${PORT}`);
    console.log(`Base de datos conectada: ${process.env.DB_DATABASE}`);
})

