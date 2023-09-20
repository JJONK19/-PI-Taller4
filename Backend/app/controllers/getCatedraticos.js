const mysql = require('mysql2/promise');
const conn = require('../config/connection');

async function getCatedraticos(req, res) {
  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [rows] = await connection.query('SELECT nombre FROM catedratico');
    connection.end();
    const catedraticos = rows.map((row) => row.nombre);

    if (!catedraticos || catedraticos.length === 0) {
        return res.json({ catedraticos: [] })
    }

    res.json({ catedraticos });
  } catch (error) {
    //console.error('Error al consultar la base de datos:', error);
    res.json({ catedraticos: [] });
  }
}

module.exports = { getCatedraticos };
