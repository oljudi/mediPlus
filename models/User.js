const {model,Schema}=require('mongoose')

const PLM= require('passport-local-mongoose')

const userSchema= new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  nombre:String,
  photoURL:{
    type: String,
    default: 'http://lorempixel.com/400/200/people'
  },
  admin: {
    type: Boolean,
    default: false
  },
  rol:{
    type:String,
    enum:['doctor','admin'],
    default:'doctor'
  },
  tipoconsultorio:{
    type:String,
    enum:['Terapia','Medico','Psicologia','Odontologia', 'Oftamologia']
  },
  title: String,
  specialization: String,
  resume: String,
  activo:{
    type:Boolean,
    default:false
  },
  confirmationCode:{
    unique: true, 
    type: String
  }
},
{
  timestamps: true
})

userSchema.plugin(PLM, { usernameField: "email" })

module.exports = model("User", userSchema)