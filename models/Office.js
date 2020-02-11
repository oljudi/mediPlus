const {model,Schema}=require('mongoose')

const officeSchema= new Schema({
  numero: {
    type: String,
    required: true,
    unique:true
  },
  tipoconsultorio:{
    type:String,
    enum:['terapia','medico']
  },
  precio:{
    type:Number,
    min:0,
    default:350
  },
  color:String
},
{
  timestamps: true
})

module.exports = model("Office", officeSchema)