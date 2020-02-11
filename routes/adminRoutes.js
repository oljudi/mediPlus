const router  = require('express').Router()
// const passport = require('../config/passport')

const {
  adminView,
  createClinicView,
  createClinicPost,
} = require('../controllers/adminController')

router.get('/admin', adminView)
router.get('/createClinic', createClinicView)
router.post('/createClinic', createClinicPost)

module.exports = router;
