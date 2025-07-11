import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import librosRoutes from './routes/libros.js'
import { createPool } from 'mysql2';

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware de Express ---
app.use(cors());
app.use(express.json());


app.use('/api/libros', librosRoutes);

//Token
app.post("/api/register", async (req, res) => {
    const {nombre, apellido, email, password } = req.body
    const rol = 0

    try {
        console.log("Recibiendo datos:", req.body);

        //Verificar que el correo no exista
        const [usuarios] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if(usuarios.length > 0) {
            return res.status(400).json({ok: false, error: "Correo ya existente"})
        }

        //Usuario verificado = 0
        await db.query("INSERT INTO usuarios (nombre, apellido, email, password, rol, verificado) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellido, email, password, rol, 0]
        );

        console.log("Usuario registrado en DB");

        //Token
        const payload = { email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "10m"});
        console.log("Token generado:", token);


        //Correo con token
        const link = `http://localhost:5173/verificar?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yaramirez2002@gmail.com",
                pass: "lzgd pqqa pjdr icbz"
            }
        });
        
        await transporter.sendMail({
        from: "INKVERSO <tucorreo@gmail.com>",
        to: email,
        subject: "Verifica tu cuenta",
        html: `
            <h3>Hola ${nombre}</h3>
            <p>Haz clic en el siguiente enlace para verificar tu cuenta (expira en 10 minutos):</p>
            <a href="${link}">${link}</a>
        `
        });
        console.log("Correo enviado a:", email);


        res.json({ok: true, mensaje: "Registro exitoso. Verifica tu correo"});

    } catch(err) {
        console.error("Error en registro con JWT:", err);
        res.status(500).json({ok: false, error: "Error en el servidor"})
    }
})

//Verificar
app.get('/verificar', async (req, res) => {
    const token = req.query.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email

        //Marcar como verificado
        await db.query("UPDATE usuarios SET verificado = 1 WHERE email = ?", [email]);

        res.json({ ok: true, email });

    } catch(err) {
        res.status(400).send("Token inválido o expirado");
    }
});

//Ruta para iniciar sesion
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [usuarios] = await db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password]);

        if(usuarios.length === 0) {
            return res.status(401).json({ ok:false, mensaje: "Credenciales invalidas"});
        }

        const usuario = usuarios[0];
        if(usuario.verificado === 0) {
            return res.status(403).json({ ok: false, mensaje: "Verifica tu correo antes de iniciar sesion"});
        }

        res.json({ ok: true, usuario: { id: usuario.id_user, nombre: usuario.nombre, email: usuario.email } })
    } catch (err) {
        console.error("Error en login", err);
        res.status(500).json({ ok: false, mensaje: "Error en el servisor" });
    }
})



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

//Ruta para obtener libros
app.get("/api/libros", async (req, res) => {
    try {
        const [libros] = await pool.query(`
            SELECT l.id, l.titulo, l.autor, l.precio, l.oferta, l.precio_oferta, l.categoria, l.descripcion, l.cantidad
            FROM libros l
            JOIN inventario i ON l.id = i.id_libro
            WHERE i.cantidad > 0
            `)
        res.json(libros);
    } catch(error) {
        console.error("Error al obtener libros:", error);
        res.status(500).json({error: "Error al obtener los libros"})
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando desde el puerto ${PORT}`);
    console.log(`Base de datos conectada: ${process.env.DB_DATABASE}`);
})


