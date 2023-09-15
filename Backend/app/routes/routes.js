const express = require('express')
const router = express.Router()
const createModel = require('../controllers/create')

// Main route
router.get('/', (req, res) => {
  res.send('Server working')
})

// Crear el modelo de la base de datos
router.get('/crearmodelo', (req, res) => {
  createModel() 
    .then(() => {
      res.status(200).json({
          body: { message: 'Message: Model created successfully.' },
      })
    })
    .catch(error => {
      res.status(500).json({
          body: { message: 'Error: Model not created. ', error },
      })
    })
})

module.exports = router