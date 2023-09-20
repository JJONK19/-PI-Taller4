const conn = require('../config/connection');
const mysql = require('mysql2/promise');

const addComentario = async (req, res) => {
  const { fecha, mensaje, usuario, post } = req.body; 

  try {
    const connection = await mysql.createConnection(conn.config.connection);
    
    const sql = 'INSERT INTO comentario (fecha, mensaje, usuario, publicacion) VALUES (?, ?, ?, ?)';
    const [results] = await connection.execute(sql, [fecha, mensaje, usuario, post]);

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

module.exports = { addComentario };



