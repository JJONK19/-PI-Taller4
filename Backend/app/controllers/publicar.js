const conn = require('../config/connection');
const mysql = require('mysql2/promise');

const publicar = async (req, res) => {
  const { fecha, mensaje, usuario, curso, catedratico } = req.body;

  try {
    const connection = await mysql.createConnection(conn.config.connection);

    const [cursoResult] = await connection.query('SELECT id FROM curso WHERE nombre = ?', [curso]);
    if (cursoResult.length === 0) {
      return res.status(400).json({ mensaje: 'El curso no existe.' });
    }
    const cursoId = cursoResult[0].id;

    const [catedraticoResult] = await connection.query('SELECT id FROM catedratico WHERE nombre = ?', [catedratico]);
    if (catedraticoResult.length === 0) {
      return res.status(400).json({ mensaje: 'El catedrático no existe.' });
    }
    const catedraticoId = catedraticoResult[0].id;

    // Insertar la publicación con los IDs de curso y catedrático obtenidos
    const sql = 'INSERT INTO publicacion (fecha, mensaje, usuario, curso, catedratico) VALUES (?, ?, ?, ?, ?)';
    const [results] = await connection.execute(sql, [fecha, mensaje, usuario, cursoId, catedraticoId]);

    if (results.affectedRows === 1) {
      return res.status(200).json({ mensaje: '1' });
    } else {
      return res.status(200).json({ mensaje: '0' });
    }
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { publicar };



