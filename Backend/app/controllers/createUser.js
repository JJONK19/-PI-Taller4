const conn = require('../config/connection')
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
  const { registro, nombres, apellidos, password, correo} = req.body
  const connection = await mysql.createConnection(conn.config.connection)

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error('Error: Error al hash de la contraseña:', err);
      return res.status(200).json({ mensaje: '2' })
    }

    const sql = 'INSERT INTO usuario (registro, nombres, apellidos, password, correo) VALUES (?, ?, ?, ?, ?)';

    try {
        await connection.query(sql, [registro, nombres, apellidos, hashedPassword, correo]);
        console.log('Mensaje: Usuario creado exitosamente');
        return res.status(200).json({ mensaje: '1' });
      } catch (error) {
        if (error instanceof mysql2.SqlError) {
          console.error('Error: Error en la consulta SQL:', error.message);
          return res.status(200).json({ mensaje: '0' });
        } else {
          console.error('Error: Error en Node.js:', error);
          return res.status(200).json({ mensaje: '2' });
        }
      } finally {
        connection.close();
      }
  })
}

module.exports = {createUser}

