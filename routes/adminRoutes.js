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
  createDocPost,
  editDocPost,
  editDocView,
  deleteDoc
} = require('../controllers/adminController')

router.get('/', adminView)

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

module.exports = router;
