const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getCursosPendientes(req, res) {
  const { registro } = req.body;

  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [rows] = await connection.query(`
      SELECT c.nombre
      FROM curso c
      WHERE c.id NOT IN (
        SELECT ca.curso
        FROM cursoAprobado ca
        WHERE ca.usuario = ?
      );`, [registro]);

    connection.end();

    const cursos = rows.map((row) => row.nombre);
    res.json({ cursos });
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = { getCursosPendientes };
