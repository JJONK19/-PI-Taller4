const conn = require('../config/connection');
const mysql = require('mysql2/promise');

const addCursoAprobado = async (req, res) => {
  const { curso, registro } = req.body;

  try {
    const connection = await mysql.createConnection(conn.config.connection);
    
    const [cursoInfo] = await connection.execute(
      'SELECT id, creditos FROM curso WHERE nombre = ?',
      [curso]
    );

    if (cursoInfo.length === 0) {
      return res.status(200).json({ mensaje: '0' });
    }

    const cursoId = cursoInfo[0].id;
    const cursoCreditos = cursoInfo[0].creditos;

    const [insertResult] = await connection.execute(
      'INSERT INTO cursoAprobado (usuario, curso) VALUES (?, ?)',
      [registro, cursoId]
    );

    if (insertResult.affectedRows !== 1) {
      return res.status(200).json({ mensaje: '2' }); 
    }

    await connection.execute(
      'UPDATE usuario SET creditos = creditos + ? WHERE registro = ?',
      [cursoCreditos, registro]
    );

    return res.status(200).json({ mensaje: '1' });
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    return res.status(200).json({ mensaje: '2' });
  }
};

module.exports = { addCursoAprobado };
