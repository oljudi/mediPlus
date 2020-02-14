const Consul = require('../models/Office')
const Doctor = require('../models/User')
const Cita=require('../models/Order')
 
// CRUD Consultorios
exports.consultoriosView = async (req,res,next) => {
  const consultorios = await Consul.find()
  let dtStatus = true
  if(consultorios) dtStatus = false
  res.render('adminViews/consultorio/view', {consultorios, dtStatus, tipoConsul: ['Terapia','Medico','Psicologia','Odontologia', 'Oftamologia']})
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
  res.render('adminViews/doctores/view', {edit:true, doc, doctores, consul: ['Terapia','Medico','Psicologia','Odontologia', 'Oftamologia']})
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
 let {dia}=req.body
  const consultorios = await Consul.find()
  const doctores= await Doctor.find()
  const horarios= [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00'
  ]
  let n =  new Date();
//Año
y = n.getFullYear();
//Mes
m = n.getMonth() + 1;
if (m.length=1) m='0'+m
//Día
d = n.getDate();
if (d<9) d='0'+d

const hoy= y+'-'+m+'-'+d;
if (!dia) dia=hoy
const citas=await Cita.find({day:dia}).populate('usuario').populate('office').sort({horario:1})
  
  res.render('adminViews/lobby',{edit:false,consultorios,doctores,horarios,hoy,citas})
}
exports.createCitasPost = async (req,res,next) => {
  const {usuario,office,day,horario}=req.body
  const cita= await Cita.find({office,day,horario})
   if (cita[0]==null) {
  await Cita.create({usuario,office,day,horario})
   }
   res.redirect('/admin/')
}

exports.adminViewPost=async (req,res)=>{
  let {dia}=req.body
  const consultorios = await Consul.find()
  const doctores= await Doctor.find()
  const horarios= [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00'
  ]
hoy=dia
const citas=await Cita.find({day:dia}).populate('usuario').populate('office').sort({horario:1})
  res.render('adminViews/lobby',{edit:false,consultorios,doctores,horarios,hoy,citas})

}
exports.editCitasView = async(req,res,next) => {
  const {id} = req.params
  const consultorios = await Consul.find()
  const doctores= await Doctor.find()
  const horarios= [
    {horario:'08:00 - 09:00',select:false},
    {horario:'09:00 - 10:00',select:false},
    {horario:'10:00 - 11:00',select:false},
    {horario:'11:00 - 12:00',select:false},
    {horario:'12:00 - 13:00',select:false},
    {horario:'13:00 - 14:00',select:false},
    {horario:'14:00 - 15:00',select:false},
    {horario:'15:00 - 16:00',select:false},
    {horario:'16:00 - 17:00',select:false},
    {horario:'17:00 - 18:00',select:false},
    {horario:'18:00 - 19:00',select:false},
    {horario:'19:00 - 20:00',select:false}
  ]
 
  const cita = await Cita.findById(id)
  doctores.forEach(doctor=>{
    if (doctor.id==cita.usuario)
    {doctor.select=true}
  })
  consultorios.forEach(consultorio=>{
    if (consultorio.id==cita.office)
    {consultorio.select=true}
  })
  horarios.forEach(hora=>{
    if (hora.horario==cita.horario)
    {hora.select=true}
  })
  let n=cita.day
  y = n.getFullYear();
//Mes
m = n.getMonth() + 1;
if (m.length=1) m='0'+m
//Día
d = n.getDate();
if (d<9) d='0'+d

const hoy= y+'-'+m+'-'+d;
  const citas=await Cita.find({day:cita.day}).populate('usuario').populate('office').sort({horario:1}) 
  res.render('adminViews/lobby', {edit:true,consultorios,doctores,horarios,hoy,citas,cita})
}
exports.editCitasPost = async(req,res,next) => {
  const {id} = req.params
  const update = {usuario,office,day,horario} = req.body
  const cita= await Cita.find({office,day,horario})
   if (cita[0]==null) {
    await Cita.findByIdAndUpdate(id, update, {new: true})
   }
  
  res.redirect('/admin')
}
exports.deleteCita = async (req,res,next) => {
  const {id} = req.params
  await Cita.findByIdAndDelete(id)
  res.redirect('/admin')
}
