const router  = require('express').Router();
const passport = require('../config/passport')
const {loginGet,logout,signupPost,
confirmGet, loginPost} = require('../controllers/authControllers')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')})
  .get('/login',loginGet)
.get('/logout',logout)
.get('/signup',(_,res)=>res.render('signup'))
.post('/signup',signupPost)
.post('/login', passport.authenticate('local'), loginPost)


// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/signup",
//   }))


router.get("/confirm/:confirmationCode",confirmGet)
  
module.exports = router;


