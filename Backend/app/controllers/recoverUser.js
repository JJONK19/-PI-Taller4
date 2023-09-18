const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const conn = require('../config/connection');

const recoverUser = async (req, res) => {
  const { registro, correo, password } = req.body;

  try {
    const connection = await mysql.createConnection(conn.config.connection);

    const [results] = await connection.execute('SELECT * FROM usuario WHERE registro = ? AND correo = ?', [registro, correo]);

    if (results.length === 0) {
      return res.status(200).json({ mensaje: '0' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateResults = await connection.execute('UPDATE usuario SET password = ? WHERE registro = ?', [hashedPassword, registro]);

    if (updateResults[0].affectedRows === 0) {
      return res.status(200).json({ mensaje: '0' });
    }
    //console.log('Contraseña cambiada exitosamente');
    return res.status(200).json({ mensaje: '1' });
  } catch (error) {
    //console.error('Error en la consulta SQL:', error);
    return res.status(200).json({ mensaje: '2' });
  }
};

module.exports = { recoverUser };
