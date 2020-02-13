exports.isLoggedIn = (req,res,next) => {
  req.isAuthenticated() ? next() : res.redirect('/')
}

exports.isActive = (req,res,next) => {
  req.user.activo ? next() : res.render('login',{message:'Confirma tu correo'})
}

exports.catchErrors = fn => (req,res,next) =>{
  fn(req,res,next).catch(err => res.render(err)) 
}
exports.checkRole = role => (req, res, next) => {
  if (req.isAuthenticated() && req.user.rol === role) {
    next();
  } else {
    res.redirect("/");
  }
};