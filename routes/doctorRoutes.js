const router  = require('express').Router()
// const passport = require('../config/passport')

const {
  doctorView,
  createCitasPost,
  editCitasView,
  editCitasPost,
  deleteCita,
  doctorViewPost
} = require('../controllers/doctorController')

//CRUD de Citas
router.get('/', doctorView)
router.post('/', doctorViewPost)
router.post('/citas/create', createCitasPost)
router.get('/citas/edit/:id', editCitasView)
router.post('/citas/edit/:id', editCitasPost)
router.get('/citas/delete/:id', deleteCita)

module.exports = router;