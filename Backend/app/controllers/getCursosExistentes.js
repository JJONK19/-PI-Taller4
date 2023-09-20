const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getCursosExistentes(req, res) {
  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [rows] = await connection.query(`
      SELECT CONCAT(c.nombre, ' - ', cu.nombre) AS curso_catedratico
      FROM catedratico c
      JOIN cursoImpartido ci ON c.id = ci.catedratico
      JOIN curso cu ON ci.curso = cu.id
    `);

    connection.end();
    const cursos = rows.map((row) => row.curso_catedratico);
    res.json({ cursos });
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = { getCursosExistentes };
