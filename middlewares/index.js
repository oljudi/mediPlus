exports.isLoggedIn = (req,res,next) => {
  req.isAuthenticated() ? next() : res.redirect('/')
}

exports.isActive = (req,res,next) => {
  req.user.status=="Active" ? next() : res.send('Confirma tu correo')
}

exports.catchErrors = fn => (req,res,next) =>{
  fn(req,res,next).catch(err => res.render(err)) 
}
exports.checkRole = role => (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === role) {
    next();
  } else {
    res.redirect("/");
  }
};