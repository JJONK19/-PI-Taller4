const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getCursosAprobados(req, res) {
  const { registro } = req.body; 

  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [rows] = await connection.query(`
      SELECT cu.nombre AS nombre_curso
      FROM cursoAprobado ca
      JOIN curso cu ON ca.curso = cu.id
      JOIN usuario u ON ca.usuario = u.registro
      WHERE u.registro = ?;`, [registro]);

    connection.end();
    const cursos = rows.map((row) => row.nombre_curso);
    res.json({ cursos });
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = { getCursosAprobados };
