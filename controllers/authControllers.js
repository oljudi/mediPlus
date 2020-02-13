const User = require('../models/User')
const {confirmAccount}=require("../config/nodemailer")

exports.homeView = (req, res, next) => res.render('index')

exports.loginGet = (req, res) => res.render("authViews/login", { message: req.flash('error') })

exports.signupView = (_,res) => res.render('authViews/signup')

exports.signupPost = async (req, res) => {
  const { tipoconsultorio, email, password, nombre } = req.body;
  if (email === "" || password === "" || nombre === "") {
    res.render("authViews/signup", {
      message: "Debes llenar todos los campos"
    });
  }
  const userOnDB = await User.findOne({ email });
  if (userOnDB !== null) {
    res.render("authViews/signup", { message: "El correo ya fue registrado" });
  }
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
  }
  await User.register({email, tipoconsultorio, confirmationCode:token, nombre }, password);
  const endpoint = `https://mediplus2020.herokuapp.com/confirm/${token}`
  await confirmAccount(email,endpoint)
  res.redirect("/login");
}

exports.confirmGet = async ( req, res, next)=> {
  const {confirmationCode} = req.params
  await User.findOneAndUpdate({confirmationCode}, { activo: true}, {new: true})
  res.render('authViews/confirmacion')
}

exports.profileView = async (req,res,next) => {
  const user = req.user
  let admin = false
  if(user.rol === 'admin') admin=true
  res.render('authViews/profile', {user, admin})
}

exports.demoView = async (req,res,next) => res.render('medikalView', {message: req.flash('error')})

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
}
