const router  = require('express').Router()
// const passport = require('../config/passport')

const {
  adminView,
  consultoriosView,
  createConsulPost,
  editConsulPost,
  editConsulView,
  deleteCons,
  doctoresView,
  editDocPost,
  editDocView,
  deleteDoc,
  citasView,
  createCitasPost,
  editCitasView,
  editCitasPost,
  deleteCita
} = require('../controllers/adminController')


//CRUD de Consultorios
router.get('/consultorios', consultoriosView)
router.post('/consultorios/create', createConsulPost)
router.get('/consultorios/edit/:id', editConsulView)
router.post('/consultorios/edit/:id', editConsulPost)
router.get('/consultorios/delete/:id', deleteCons)
//CRUD de Doctores
router.get('/doctores', doctoresView)
router.get('/doctores/edit/:id', editDocView)
router.post('/doctores/edit/:id', editDocPost)
router.get('/doctores/delete/:id', deleteDoc)
//CRUD de Citas
router.get('/', adminView)
router.post('/citas/create', createCitasPost)
router.get('/citas/edit/:id', editCitasView)
router.post('/citas/edit/:id', editCitasPost)
router.get('/citas/delete/:id', deleteCita)

module.exports = router;
