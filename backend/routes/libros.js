import express from 'express';
const router = express.Router();

import db from '../config/db.js';

//-----------RUTAS CRUD PARA LIBROS------------

//Obtener todos los libros
router.get('/', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM libros');
        res.json(rows);
    } catch (err) {
        console.error('❌ ERROR AL OBTENER LIBROS:');
        console.error('Mensaje de error:', err.message);
        console.error('Código de error MySQL:', err.code);
        console.error('Detalles del error (stack):', err.stack);
        res.status(500).json({ message: 'Error interno del servidor al obtener libros' });
    }
});

//Obtener un libro por el ID
router.get('/:id', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM libros WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('❌ ERROR AL OBTENER LIBRO POR ID:');
        console.error('Mensaje de error:', err.message);
        console.error('Código de error MySQL:', err.code);
        console.error('Detalles del error (stack):', err.stack);
        res.status(500).json({ message: 'Error interno'})
    }
})

//Añadir un nuevo libro
router.post('/', async(req,res) => {
    // Desestructuramos los datos que vienen en el cuerpo de la petición (JSON)
    const {titulo, autor, precio, oferta, precio_oferta, descripcion } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO libros(titulo, autor, precio, oferta, precio_oferta, descripcion) VALUES (?,?,?,?,?,?)',
            [titulo, autor, precio, oferta, precio_oferta, descripcion],
        )
        res.status(201).json({id: result.insertId, message:'Libro añadido correctamente'});
    } catch (err) { 
        console.error('❌ ERROR AL AÑADIR LIBRO:');
        console.error('Mensaje de error:', err.message);
        console.error('Código de error MySQL:', err.code);
        console.error('Detalles del error (stack):', err.stack);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//Actualizar libro
router.put('/:id', async(req, res) => {
    const { titulo, autor, precio, oferta, precio_oferta, descripcion } = req.body;
    const libroId = req.params.id;

    try {
        const [result] = await db.query(
            'UPDATE libros SET titulo = ?, autor = ?, precio = ?, oferta = ?, precio_oferta = ?, descripcion = ? WHERE id = ?',
        );
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Libro no encontrado para actualizar' });
        }
        res.json({message:'Libro actualizado correctamente'})
    } catch (err) {
        console.error('❌ ERROR AL ACTUALIZAR LIBRO:');
        console.error('Mensaje de error:', err.message);
        console.error('Código de error MySQL:', err.code);
        console.error('Detalles del error (stack):', err.stack);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//Eliminar libro
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM libros WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) { // Si no se eliminó ninguna fila, el libro no existía
            return res.status(404).json({ message: 'Libro no encontrado para eliminar' });
        }
        res.json({ message: 'Libro eliminado exitosamente' });
    } catch (err) {
        console.error('❌ ERROR AL ELIMINAR LIBRO:');
        console.error('Mensaje de error:', err.message);
        console.error('Código de error MySQL:', err.code);
        console.error('Detalles del error (stack):', err.stack);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router;
