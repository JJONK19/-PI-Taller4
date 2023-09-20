const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getPublicaciones(req, res) {
  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [rows] = await connection.query('SELECT * FROM publicacion'); 
    connection.end();
    const publicaciones = rows; 
    
    if (!publicaciones || publicaciones.length === 0) {
      return res.json({ publicaciones: [] });
    }
    
    res.json({ publicaciones });
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor', publicaciones: [] }); 
  }
}

module.exports = { getPublicaciones };
