exports.adminView = (req,res,next) => {
  res.render('adminViews/lobby')
}

exports.createClinicView = (req,res,next) => {
  res.render('adminViews/clinic')
}

exports.createClinicPost = (req,res,next) => {}