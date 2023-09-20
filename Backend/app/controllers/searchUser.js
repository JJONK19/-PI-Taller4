const mysql = require('mysql2/promise');
const conn = require('../config/connection');

const searchUser = async (req, res) => {
  const { registro } = req.body;
  const sql = 'SELECT registro, CONCAT(nombres, " ",  apellidos) AS nombre FROM usuario WHERE registro LIKE ?';

  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [results] = await connection.execute(sql, [`%${registro}%`]);

    if (results.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    return res.status(200).json([]);
  }
};

module.exports = { searchUser };

