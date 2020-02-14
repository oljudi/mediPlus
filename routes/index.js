const router  = require('express').Router();
const passport = require('../config/passport')
const upload = require('../config/cloudinary')

const {
  homeView,
  loginGet,
  signupView,
  signupPost,
  profileView,
  profilePost,
  confirmGet,
  // demoView,
  logout
  } = require('../controllers/authControllers')
const {isActive,isLoggedIn,checkRoleProfile,checkConfirm} =require('../middlewares/index')

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

router.get('/profile',isLoggedIn,isActive,checkRoleProfile(), profileView)
router.post(
  '/profile/:id',
  isLoggedIn,
  isActive,
  checkRoleProfile(),
  upload.single('img'),
  profilePost
  )

// router.get('/medikalTeam', demoView)

router.get('/logout',logout)

router.get("/confirm/:confirmationCode",confirmGet)
  
module.exports = router;


