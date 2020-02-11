const router  = require('express').Router()
// const passport = require('../config/passport')

const {
  adminView,
  consultoriosView,
  createPost,
  doctoresView,
  doctorPost,
  
} = require('../controllers/adminController')

router.get('/', adminView)

router.get('/consultorios', consultoriosView)

router.post('/create', createPost)

router.get('/doctores', doctoresView)
router.post('/doctor/:id', doctorPost)

module.exports = router;
