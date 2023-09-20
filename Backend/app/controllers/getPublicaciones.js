const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getPublicaciones(req, res) {
  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [rows] = await connection.query(`
      SELECT
        p.id,
        p.fecha,
        p.mensaje,
        p.usuario,
        c.nombre AS curso,
        ct.nombre AS catedratico
      FROM publicacion AS p
      INNER JOIN curso AS c ON p.curso = c.id
      INNER JOIN catedratico AS ct ON p.catedratico = ct.id
      ORDER BY p.fecha DESC
    `); 
    connection.end();
    
    const publicaciones = rows; 
    
    if (!publicaciones || publicaciones.length === 0) {
      return res.json([]);
    }
    
    res.json(publicaciones);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor', publicaciones: [] }); 
  }
}

module.exports = { getPublicaciones };

