const router  = require('express').Router();
const passport=require('../config/passport')
const {loginGet,logout}=require('../controllers/authControllers')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')})
  .get('/login',loginGet)
  .post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
)
.get('/logout',logout)

module.exports = router;


