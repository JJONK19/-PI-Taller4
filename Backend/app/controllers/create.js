const conn = require('../config/connection')
const fs = require('fs')
const mysql = require('mysql2/promise')

async function createModel() {
    // Leer el archivo
    const sql = fs.readFileSync('app/sql/script.sql', 'utf8');

    // Dividir el contenido del archivo SQL
    const queries = sql.split(';').filter(query => query.trim() !== '');

    // Ejecutar las consultas una por una
    for (const query of queries) {
        await conn.closableQuery(query, []);
    }

    // Llenar la tabla de catedráticos, cursos y detalle de cursos
    const connection = await mysql.createConnection(conn.config.connection);
    let lines = "";

    const catedraticosData = fs.readFileSync('app/data/catedraticos.csv', 'utf8');
    lines = catedraticosData.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length === 0) {
            continue;
        }

        const fields = line.split(',');
        const nombre = fields[0].trim();

        const query = `INSERT INTO catedratico (nombre) VALUES (?)`;
        await conn.unclosableQuery(connection, query, [nombre]);
    }

    const cursosData = fs.readFileSync('app/data/cursos.csv', 'utf8');
    lines = cursosData.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length === 0) {
            continue;
        }

        const fields = line.split(',');
        const creditos = parseInt(fields[1].trim());
        const nombre = fields[0].trim();

        const query = `INSERT INTO curso (nombre, creditos) VALUES (?, ?)`;
        await conn.unclosableQuery(connection, query, [nombre, creditos]);
    }

    const seccionesData = fs.readFileSync('app/data/secciones.csv', 'utf8');
    lines = seccionesData.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length === 0) {
            continue;
        }

        const fields = line.split(',');
        const curso = parseInt(fields[0].trim());
        const seccion = fields[1].trim();
        const catedratico = parseInt(fields[2].trim());

        const query = `INSERT INTO cursoImpartido (curso, catedratico, seccion) VALUES (?, ?, ?)`;
        await conn.unclosableQuery(connection, query, [curso, catedratico, seccion]);
    }
}

module.exports = createModel;
