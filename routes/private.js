const router  = require('express').Router();

const {usuariosGet,consultoriosGet}=require('../controllers/privateControllers')

router.get('/consultorios',consultoriosGet)
.get('/usuarios',usuariosGet)

module.exports = router;