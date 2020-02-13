const Consul = require('../models/Office')
const Cita=require('../models/Order')
 
//CRUD Citas
exports.doctorView = async (req,res) => {
  let user=req.user
  let {dia}=req.body
   const consultorios = await Consul.find({tipoconsultorio:user.tipoconsultorio})
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
 const citas2=await Cita.find({day:dia}).populate('usuario').populate('office').sort({horario:1})
  let citas=[]
 citas2.forEach(cita=>{
   if (cita.office.tipoconsultorio==user.tipoconsultorio) { 
  citas.push(cita)}})
 citas.forEach(cita=>{
  if (cita.usuario._id.toString() == user._id.toString())
  {
  cita.edita = true}
})
   res.render('doctorViews/lobby',{edit:false,consultorios,horarios,hoy,citas})
 }
 exports.createCitasPost = async (req,res) => {
   const user=req.user
   const {office,day,horario}=req.body
   const cita= await Cita.find({office,day,horario})
    if (cita[0]==null) {
   await Cita.create({usuario:user._id,office,day,horario})
    }
    res.redirect('/doctor')
 }
 
 exports.doctorViewPost=async (req,res)=>{
  const user=req.user
   let {dia}=req.body
   const consultorios = await Consul.find()
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
 const citas2=await Cita.find({day:dia}).populate('usuario').populate('office').sort({horario:1})
 let citas=[]
citas2.forEach(cita=>{
  if (cita.office.tipoconsultorio==user.tipoconsultorio) { 
 citas.push(cita)}})
  citas.forEach(cita=>{
    if (cita.usuario._id.toString() == user._id.toString())
    {
    cita.edita = true}
  })
 res.render('doctorViews/lobby',{edit:false,consultorios,horarios,hoy,citas})
 
 }
 exports.editCitasView = async(req,res) => {
   const user=req.user
   const {id} = req.params
   const consultorios = await Consul.find({tipoconsultorio:user.tipoconsultorio})
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
 d = n.getDate()+1;
 if (d<9) d='0'+d
 
 const hoy= y+'-'+m+'-'+d;
 const citas2=await Cita.find({day:cita.day}).populate('usuario').populate('office').sort({horario:1})
 let citas=[]
citas2.forEach(cita=>{
  if (cita.office.tipoconsultorio==user.tipoconsultorio) { 
 citas.push(cita)}})
   res.render('doctorViews/lobby', {edit:true,consultorios,horarios,hoy,citas,cita})
 }
 exports.editCitasPost = async(req,res) => {
   const user =req.user
   const {id} = req.params
   const {office,day,horario} = req.body
   const update = {usuario:user._id,office,day,horario} 
   const cita= await Cita.find({office,day,horario})
    if (cita[0]==null) {
     await Cita.findByIdAndUpdate(id, update, {new: true})
    }
   
   res.redirect('/doctor')
 }
 exports.deleteCita = async (req,res) => {
   const {id} = req.params
   await Cita.findByIdAndDelete(id)
   res.redirect('/doctor')
 }
 