const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const conn = require('../config/connection')

const loginUser = async (req, res) => {
  const { registro, password } = req.body
  const sql = 'SELECT * FROM usuario WHERE username = ?'
  const connection = await mysql.createConnection(conn.config.connection);

  try {
    const [results] = await connection.execute(sql, [registro])

    if (results.length === 0) {
      return res.status(200).json({ mensaje: '0' })
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(200).json({ mensaje: '0' })
      }

      console.log('Inicio de sesión exitoso');
      return res.status(200).json({ mensaje: '1' })
    });
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    return res.status(200).json({ mensaje: '2' })
  } finally {
    connection.end()
  }
}

module.exports = { loginUser }
