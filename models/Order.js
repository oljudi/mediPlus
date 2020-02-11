
const {model,Schema}=require('mongoose')

const officeSchema= new Schema({
  usuario:Schema.Types.ObjectId,
  office:Schema.Types.ObjectId,
  startDate:Date,
  endDate:Date
},
{
  timestamps: true
})

module.exports = model("Order", officeSchema)