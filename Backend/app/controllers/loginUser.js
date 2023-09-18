const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const conn = require('../config/connection');

const loginUser = async (req, res) => {
  const { registro, password } = req.body;
  const sql = 'SELECT * FROM usuario WHERE registro = ?';

  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const [results] = await connection.execute(sql, [registro]);

    if (results.length === 0) {
      return res.status(200).json({ mensaje: '0' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(200).json({ mensaje: '0' });
    }

    return res.status(200).json({ mensaje: '1' });
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    return res.status(200).json({ mensaje: '2' });
  }
};

module.exports = { loginUser };
