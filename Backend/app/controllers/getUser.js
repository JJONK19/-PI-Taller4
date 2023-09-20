const mysql = require('mysql2/promise');
const conn = require('../config/connection');

// Función para obtener la lista de usuarios
const getUser = async (req, res) => {
try {
    const connection = await mysql.createConnection(conn.config.connection);
    const { registro } = req.body;
    const sql = 'SELECT registro, nombres, apellidos, correo, creditos FROM usuario WHERE registro = ?'; // Ajusta el nombre de la tabla según tu base de datos
    const [results] = await connection.execute(sql, [registro]);

    if (results.length > 0) {
      // Si se encuentran usuarios, devolver la lista
    return res.status(200).json(results);
    } else {
      // Si no se encuentran usuarios, devolver un mensaje adecuado
    return res.status(200).json({ mensaje: 'No se encontraron usuarios.' });
    }
} catch (error) {
    console.error('Error en la consulta SQL:', error);
    return res.status(200).json({ mensaje: 'Error en el servidor.' });
}
};

module.exports = { getUser };