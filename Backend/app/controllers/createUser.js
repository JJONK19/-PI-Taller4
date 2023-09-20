const conn = require('../config/connection');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { registro, nombres, apellidos, password, correo } = req.body;

  try {
    const connection = await mysql.createConnection(conn.config.connection);
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword)
    const sql = 'INSERT INTO usuario (registro, nombres, apellidos, password, correo) VALUES (?, ?, ?, ?, ?)';
    const [results] = await connection.execute(sql, [registro, nombres, apellidos, hashedPassword, correo]);

    if (results.affectedRows === 1) {
      //console.log('Usuario creado exitosamente');
      return res.status(200).json({ mensaje: '1' });
    } else {
      //console.error('Error: No se insertó el usuario');
      return res.status(200).json({ mensaje: '0' });
    }
  } catch (error) {
    //console.error('Error en la consulta SQL:', error);
    return res.status(200).json({ mensaje: '2' });
  }
};

module.exports = { createUser };


