exports.isLoggedIn = (req,res,next) => {
  
  if (req.isAuthenticated()) {
    req.app.locals.isAuth = true
    next()
  }else {
    req.app.locals.isAuth = false
    res.redirect('/')
  }
   
}

exports.isActive = (req,res,next) => {
  req.user.activo ? next() : res.render('login',{message:'Confirma tu correo'})
}

exports.catchErrors = fn => (req,res,next) =>{
  fn(req,res,next).catch(err => res.render(err)) 
}
exports.checkRole = role => (req, res, next) => {
  if (req.isAuthenticated() && req.user.rol === role) {
    if (req.user.admin){
      req.app.locals.isAdmin = true
    }else {req.app.locals.isAdmin = false}
    next();
  } else {
    if(req.isAuthenticated()){
      res.redirect("/profile");
    }
    else {
      res.redirect("/");
    }
  }
};
exports.checkRoleProfile = () => (req, res, next) => {
  if (req.user.rol === 'admin') {

      req.app.locals.isAdmin = true
    } else {req.app.locals.isAdmin = false}
    next();

};