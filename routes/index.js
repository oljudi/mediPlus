const router  = require('express').Router();
const passport = require('../config/passport')
const {
  homeView,
  loginGet,
  signupView,
  signupPost,
  profileView,
  confirmGet,
  demoView,
  logout,
  } = require('../controllers/authControllers')
const {isActive,isLoggedIn,checkRole} =require('../middlewares/index')

router.get('/', homeView)

router.get('/login',loginGet)
router.post(
  '/login',
  passport.authenticate('local',
  {
   successRedirect: '/profile',
   failureRedirect: '/logIn',
   failureFlash: true,
   successFlash: true
  })
)

router.post('/signup',signupPost)
router.get('/signup',signupView)

router.get('/profile',isLoggedIn,isActive, profileView)

router.get('/medikalTeam', demoView)

router.get('/logout',logout)

router.get("/confirm/:confirmationCode",confirmGet)
  
module.exports = router;


