const express = require('express')
const router = express.Router()
const createModel = require('../controllers/create')
const { createUser } = require('../controllers/createUser')
const { loginUser } = require('../controllers/loginUser')
const { recoverUser } = require('../controllers/recoverUser')
const { getUser } = require('../controllers/getUser')
const { getCatedraticos } = require('../controllers/getCatedraticos')
const { getCursos } = require('../controllers/getCursos')
const { getPublicaciones } = require('../controllers/getPublicaciones')
const { getCursosExistentes } = require('../controllers/getCursosExistentes')
const { publicar } = require('../controllers/publicar')
const { getPublicacion } = require('../controllers/getPublicacion')
const { getComentarios } = require('../controllers/getComentarios')
const { addComentario } = require('../controllers/addComentario')
const { searchPublicacionCurso } = require('../controllers/searchPublicacionCurso')
const { searchPublicacionCatedratico } = require('../controllers/searchPublicacionCatedratico')
const { searchUser } = require('../controllers/searchUser')
const { getCursosAprobados } = require('../controllers/getCursosAprobados')
const { getCursosPendientes } = require('../controllers/getCursosPendientes')
const { addCursoAprobado } = require('../controllers/addCursoAprobado')

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

//Obtener Cursos
router.get('/getCursos', getCursos)

//Obtener Catedraticos
router.get('/getCatedraticos', getCatedraticos)

//Obtener Publicaciones
router.get('/getPublicaciones', getPublicaciones)

//Obtener Cursos
router.get('/getCursosExistentes', getCursosExistentes)

//Publicar
router.post('/publicar', publicar)

//Obtener Comentarios
router.post('/getComentarios', getComentarios)

//Obtener Post
router.post('/getPublicacion', getPublicacion)

//Obtener Post
router.post('/addComentario', addComentario)

//Buscar publicacion por curso
router.post('/searchPublicacionCurso', searchPublicacionCurso)

//Buscar publicacion por curso
router.post('/searchPublicacionCatedratico', searchPublicacionCatedratico)

//Buscar usaurio
router.post('/searchUser', searchUser)

//Get Cursos Aprobados
router.post('/getCursosAprobados', getCursosAprobados)

//Get Cursos Pendientes
router.post('/getCursosPendientes', getCursosPendientes)

//Add Curso Aprobado
router.post('/addCursoAprobado', addCursoAprobado)

module.exports = router

