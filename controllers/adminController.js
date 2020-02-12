const Consul = require('../models/Office')
const Doctor = require('../models/User')
 
// CRUD Consultorios
exports.consultoriosView = async (req,res,next) => {
  const consultorios = await Consul.find()
  let dtStatus = true
  if(consultorios) dtStatus = false
  res.render('adminViews/consultorio/view', {consultorios, dtStatus})
}
exports.createConsulPost = async (req,res,next) => {
  const {numero,tipoconsultorio,precio,color} = req.body
  await Consul.create({numero,tipoconsultorio,precio,color})
  res.redirect('/admin/consultorios')
}
exports.editConsulView = async(req,res,next) => {
  const {id} = req.params
  const consultorios = await Consul.find()
  const cons = await Consul.findById(id) 
  res.render('adminViews/consultorio/view',{edit:true, cons, consultorios})
}
exports.editConsulPost = async (req, res, next) => {
  const {id} = req.params
  const {numero,tipoconsultorio,precio,color} = req.body
  await Consul.findByIdAndUpdate(id, {numero,tipoconsultorio,precio,color}, {new: true})
  res.redirect('/admin/consultorios')
}
exports.deleteCons = async (req,res,next) => {
  const {id} = req.params
  await Consul.findByIdAndDelete(id)
  res.redirect('/admin/consultorios')
}
//CRUD Doctores
exports.doctoresView = async (req,res,next) => {
  const doctores = await Doctor.find({rol: 'doctor'})
  let dtStatus = true
  if(doctores) dtStatus = false
  res.render('adminViews/doctores/view', {doctores, dtStatus})
}
exports.editDocView = async (req,res,next) => {
  const {id} = req.params
  const doctores = await Doctor.find({rol: 'doctor'})
  const doc = await Doctor.findById(id)
  res.render('adminViews/doctores/view', {edit:true, doc, doctores})
}
exports.editDocPost = async (req,res,next) => {
  const {id} = req.params
  const update = {email, tipoconsultorio, rol} = req.body
  await Doctor.findByIdAndUpdate(id, update, {new: true})
  res.redirect('/admin/doctores')
}
exports.deleteDoc = async (req,res,next) => {
  const {id} = req.params
  await Doctor.findByIdAndDelete(id)
  res.redirect('/admin/doctores')
}
//CRUD Citas
exports.adminView = async (req,res,next) => {
  const consultorios = await Consul.find()
  res.render('adminViews/lobby', {consultorios})
}
exports.createCitasPost = (req,res,next) => {
  
}
exports.editCitasView = (req,res,next) => {
  
}
exports.editCitasPost = (req,res,next) => {
  
}
exports.deleteCita = (req,res,next) => {
  
}