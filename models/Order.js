const {model,Schema}=require('mongoose')

const officeSchema= new Schema({
  usuario:{
    type:Schema.Types.ObjectId,
    ref:'User'},
  office:{
    type:Schema.Types.ObjectId,
    ref:'Office'},
  day: Date,
  horario: {
    type: String,
    enum: [
      '08:00 - 09:00',
      '09:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '12:00 - 13:00',
      '13:00 - 14:00',
      '14:00 - 16:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
      '18:00 - 19:00',
      '19:00 - 20:00'
    ]
  }
},
{
  timestamps: true
})

module.exports = model("Order", officeSchema)