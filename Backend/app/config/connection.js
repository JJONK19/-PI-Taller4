require('dotenv').config()

const mysql = require('mysql2/promise')

const config = { 
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }
}

//Elimina la conexion al finalizar la query
async function closableQuery(query, params) {
    let connection
        
    try{
        connection = await mysql.createConnection(config.connection)
        const [results,] = await connection.execute(query, params)
        await connection.end()
        connection.destroy()
        return results

    } catch(error) {
        console.error('Error: ', error.message)
        if(connection){
            await connection.end()
            console.log('Mesage: Connection closed succesfully')
        }
    }
}

//Mantiene la conexion luego de ejecutar. Util para las tablas temporales.
async function unclosableQuery(connection, query, params) {
    try{
        const [results,] = await connection.execute(query, params)
        return results

    } catch(error) {
        console.error('Error: ', error.message)
        if(connection){
            await connection.end()
            console.log('Mesage: Connection closed succesfully')
        }
    }
}

module.exports = {config, closableQuery, unclosableQuery};
