const {model,Schema}=require('mongoose')

const officeSchema= new Schema({
  usuario:Schema.Types.ObjectId,
  office:Schema.Types.ObjectId,
  fecha:Date,
  horario:
  {type:String
  
},
{
  timestamps: true
})

module.exports = model("Order", officeSchema)