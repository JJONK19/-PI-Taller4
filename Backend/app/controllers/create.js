const conn = require('../config/connection')
const fs = require('fs')

async function createModel(){
    //Leer el archivo
    const sql = fs.readFileSync('app/sql/script.sql', 'utf8')
    
     // Dividir el contenido del archivo SQL
     const queries = sql.split(';').filter(query => query.trim() !== '');
        
     // Ejecutar las consultas una por una
     for (const query of queries) {
        await conn.closableQuery(query, []);
     }
}

module.exports = createModel