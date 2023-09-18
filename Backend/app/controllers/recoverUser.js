const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const conn = require('../config/connection')

const recoverUser = (req, res) => {
  const { registro, correo, password } = req.body
  
  let sql = 'SELECT * FROM usuario WHERE registro = ? AND correo = ?'

  connection.query(sql, [registro, correo], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err)
      return res.status(200).json({ mensaje: '0' })
    }

    if (results.length === 0) {
      return res.status(200).json({ mensaje: '0' })
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al hash de la contraseña:', err)
        return res.status(200).json({ mensaje: '2' })
      }

      sql = 'UPDATE usuario SET password = ? WHERE registro = ?'

      connection.query(sql, [hashedPassword, registro], (err, results) => {
        if (err) {
          console.error('Error en la consulta SQL:', err)
          return res.status(200).json({ mensaje: '0' })
        }

        if (results.affectedRows === 0) {
          return res.status(200).json({ mensaje: '0' })
        }

        console.log('Contraseña cambiada exitosamente')
        return res.status(200).json({ mensaje: '1' })
      })
    })
  })
}

module.exports = { recoverUser }
