const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getComentarios(req, res) {
    const postId = req.body.post;
    
    try {
      const connection = await mysql.createConnection(conn.config.connection);
      const [rows] = await connection.query(`
        SELECT
          c.id,
          c.fecha,
          c.mensaje,
          c.usuario
        FROM comentario AS c
        WHERE c.publicacion = ? 
        ORDER BY c.fecha, c.id DESC
      `, [postId]);
      connection.end();
      
      if (!rows || rows.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron comentarios para esta publicación' });
      }
      
      const comentarios = rows; 
      res.json(comentarios);
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error en el servidor' }); 
    }
  }
  
  module.exports = { getComentarios };
  