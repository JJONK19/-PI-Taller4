const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getPublicacion(req, res) {
    const postId = req.body.post; 
    
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
        WHERE p.id = ? 
      `, [postId]);
      connection.end();
      
      if (!rows || rows.length === 0) {
        return res.status(404).json({ mensaje: 'Publicación no encontrada' });
      }
      
      const publicacion = rows[0]; 
      res.json(publicacion);
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error en el servidor' }); 
    }
  }
  
  module.exports = { getPublicacion };
  