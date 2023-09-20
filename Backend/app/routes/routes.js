const express = require('express')
const router = express.Router()
const createModel = require('../controllers/create')
const { createUser } = require('../controllers/createUser')
const { loginUser } = require('../controllers/loginUser')
const { recoverUser } = require('../controllers/recoverUser')
const { getUser } = require('../controllers/getUser')

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
      res.status(200).json({
          body: { message: 'Error: Model not created. ', ID: "0"},
      })
    })
})

// Crear usuario
router.post('/create-user', createUser)

// Inicio de sesión
router.post('/login', loginUser)

//Cambiar contraseña
router.post('/recovery-password', recoverUser)

router.post('/getUserData', getUser)

module.exports = router