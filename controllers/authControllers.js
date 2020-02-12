const User = require('../models/User')
const {confirmAccount}=require("../config/nodemailer")

exports.homeView = (req, res, next) => res.render('index')

exports.loginGet = (req, res) => res.render("authViews/login", { message: req.flash('error') })

exports.signupView = (_,res) => res.render('authViews/signup')

exports.signupPost = async (req, res) => {
  const { tipoconsultorio, email, password } = req.body;
  if (email === "" || password === "") {
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
  await User.register({email, tipoconsultorio,confirmationCode:token }, password);
  const endpoint = `http://localhost:3000/confirm/${token}`
  await confirmAccount(email,endpoint)
  res.redirect("/login");
}

exports.confirmGet = async ( req, res, next)=> {
  const {confirmationCode} = req.params
  const user = await User.findOneAndUpdate({confirmationCode}, { activo: true}, {new: true})
  res.render('authViews/confirmacion')
}

exports.profileView = async (req,res,next) => {
  const user = req.user
  res.render('authViews/profile', {user})
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
}
