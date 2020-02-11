const User = require('../models/User')
const {confirmAccount}=require("../config/nodemailer")

exports.loginGet = (req, res) => {
  res.render("login", { message: "" });
};

exports.loginPost = (req, res) => {
  res.redirect('/')
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

exports.signupPost = async (req, res) => {
  const { tipoconsultorio, email, password } = req.body;
  if (email === "" || password === "") {
    res.render("signup", {
      message: "Debes llenar todos los campos"
    });
  }

  const userOnDB = await User.findOne({ email });
  if (userOnDB !== null) {
    res.render("signup", { message: "El correo ya fue registrado" });
  }
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
  }
  
  let newuser= await User.register({email, tipoconsultorio,confirmationCode:token }, password);
  console.log(newuser)
  let endpoint=`http://localhost:3000/confirm/${token}`
  await confirmAccount(email,endpoint)
  res.redirect("/login");
}

exports.confirmGet = async ( req, res, next)=> {
  const {confirmationCode} = req.params
  const user = await User.findOneAndUpdate({confirmationCode}, { activo: true}, {new: true})
  res.render('confirmacion')
}
