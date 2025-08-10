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
    const {nombre, apellido, direccion, email, password } = req.body
    const rol = 0

    try {
        console.log("Recibiendo datos:", req.body);

        //Verificar que el correo no exista
        const [usuarios] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if(usuarios.length > 0) {
            return res.status(400).json({ok: false, error: "Correo ya existente"})
        }

        //Usuario verificado = 0
        await db.query("INSERT INTO usuarios (nombre, apellido, direccion, email, password, rol, verificado) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombre, apellido, direccion, email, password, rol, 0]
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

//Obtener usuario por email
app.get("/api/usuario", async (req, res) => {
    const { email } = req.query;

    try {
        const [rows] = await db.query("SELECT id_user, nombre, apellido, direccion, email FROM usuarios WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ ok: false, error: "Error del servidor" });
    }
});

//Actualizar usuario
app.put("/api/usuario", async (req, res) => {
    const { email, nombre, apellido, direccion } = req.body;

    try {
        await db.query(
            "UPDATE usuarios SET nombre = ?, apellido = ?, direccion = ? WHERE email = ?",
            [nombre, apellido, direccion, email]
        );

        res.json({ ok: true, mensaje: "Usuario actualizado" });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ ok: false, error: "Error del servidor" });
    }
});

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

//Recuperar contraseña
app.post("/api/recover", async (req, res) => {
    const { email, nuevaPassword } = req.body;

    try {
        // Verificar si el usuario existe
        const [usuarios] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (usuarios.length === 0) {
            return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
        }

        // Actualizar contraseña
        await db.query("UPDATE usuarios SET password = ? WHERE email = ?", [nuevaPassword, email]);

        res.json({ ok: true, mensaje: "Contraseña actualizada" });
    } catch (error) {
        console.error("Error al restablecer contraseña:", error);
        res.status(500).json({ ok: false, error: "Error del servidor" });
    }
});


//Ruta para iniciar sesion
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [usuarios] = await db.query(
        "SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND password = ?",
        [email, password]
        );

        if(usuarios.length === 0) {
            return res.status(401).json({ ok:false, mensaje: "Credenciales invalidas"});
        }

        const usuario = usuarios[0];
        if(usuario.verificado === 0) {
            return res.status(403).json({ ok: false, mensaje: "Verifica tu correo antes de iniciar sesion"});
        }

        console.log(usuario)
        
        res.json({ 
            ok: true, 
            usuario: { 
                id: usuario.id, 
                nombre: usuario.nombre, 
                email: usuario.email,
                rol: usuario.rol 
            } 
        });
    } catch (err) {
        console.error("Error en login", err);
        res.status(500).json({ ok: false, mensaje: "Error en el servidor" });
    }
});

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

// Obtener reseñas por libro
app.get("/api/resenas/:libroId", async (req, res) => {
    const { libroId } = req.params;

    try {
        const [reseñas] = await db.query(`
            SELECT r.calificacion, r.comentario, r.fecha_creacion, u.nombre
            FROM reseñas r
            JOIN usuarios u ON r.id_user = u.id
            WHERE r.libro_id = ?
            ORDER BY r.fecha_creacion DESC
        `, [libroId]);

        res.json(reseñas);
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Agregar una reseña nueva
app.post("/api/resenas", async (req, res) => {
    const { id_user, libro_id, calificacion, comentario } = req.body;

    try {
        await db.query(`
            INSERT INTO reseñas (id_user, libro_id, calificacion, comentario, fecha_creacion)
            VALUES (?, ?, ?, ?, NOW())
        `, [id_user, libro_id, calificacion, comentario]);

        res.json({ ok: true, mensaje: "Reseña agregada con éxito" });
    } catch (error) {
        console.error("Error al agregar reseña:", error);
        res.status(500).json({ error: "Error al guardar la reseña" });
    }
});

// Total de libros vendidos físicos y virtuales
app.get("/api/admin/ventas/tipo", async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT tipo, SUM(cantidad) as total
            FROM ventas
            GROUP BY tipo
        `); // tipo: 'físico' o 'virtual'
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener ventas por tipo" });
    }
});

// Total de usuarios registrados
app.get("/api/admin/usuarios/total", async (req, res) => {
    try {
        const [result] = await db.query("SELECT COUNT(*) AS total FROM usuarios");
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al contar usuarios" });
    }
});

// Libros más vendidos por categoría
app.get("/api/admin/ventas/categorias", async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT l.categoria, SUM(v.cantidad) AS total_vendidos
            FROM ventas v
            JOIN libros l ON v.id_libro = l.id
            GROUP BY l.categoria
        `);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener ventas por categoría" });
    }
});

// Ruta para obtener usuarios activos (rol 0) con su estado de pedido
app.get("/api/admin/usuarios", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                u.id AS id_user,
                u.nombre,
                u.estado,
                COALESCE(
                    CASE 
                        WHEN v.estado_pedido = 'pago' THEN 'Pago'
                        WHEN v.estado_pedido = 'compro' THEN 'Compró'
                        WHEN v.estado_pedido = 'pendiente' THEN 'Pendiente'
                        ELSE 'No aplica'
                    END, 'No aplica'
                ) AS pedido
            FROM usuarios u
            LEFT JOIN ventas v ON u.id = v.id_user
            WHERE u.rol = 0
            GROUP BY u.id, u.nombre, u.estado, v.estado_pedido
        `);

        res.json({ ok: true, usuarios: rows });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ ok: false, error: "Error en el servidor" });
    }
});

// Desactivar usuario por ID
app.put("/api/admin/usuarios/desactivar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("UPDATE usuarios SET estado = 0 WHERE id = ?", [id]);
        res.json({ ok: true, mensaje: "Usuario desactivado" });
    } catch (error) {
        console.error("Error al desactivar usuario:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor Express escuchando desde el puerto ${PORT}`);
    console.log(`Base de datos conectada: ${process.env.DB_DATABASE}`);
})


