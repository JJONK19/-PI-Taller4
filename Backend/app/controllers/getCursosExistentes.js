const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getCursos(req, res) {
  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [rows] = await connection.query('SELECT nombre FROM curso');
    connection.end();
    const cursos = rows.map((row) => row.nombre);
    
    if (!cursos || cursos.length === 0) {
      return res.json({ cursos: [] })
    }
    
    res.json({ cursos });
  } catch (error) {
    //console.error('Error al consultar la base de datos:', error);
    res.json({ cursos: [] });
  }
}

module.exports = { getCursos };