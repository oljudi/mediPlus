const router  = require('express').Router();
const passport=require('../config/passport')
const {loginGet,logout,signupPost}=require('../controllers/authControllers')
/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('/login')})
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
.get('/signup',(_,res)=>res.render('signup'))
.post('/signup',signupPost)
.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/menu",
    failureRedirect: "/login",
    failureFlash: true
  }))
module.exports = router;


