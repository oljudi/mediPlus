const Consul = require('../models/Office')

exports.adminView = (req,res,next) => {
  res.render('adminViews/lobby')
}

exports.consultoriosView = (req,res,next) => {
  res.render('adminViews/consultorio/view')
}

exports.createPost = async (req,res,next) => {
  const {numero,tipoconsultorio,precio,color} = req.body
  await Consul.create({numero,tipoconsultorio,precio,color})
  res.redirect('/admin/consultorios')
}

exports.doctoresView = (req,res,next) => {
  res.render('adminViews/doctores')
}

exports.doctorPost = (req,res,next) => {

}
