const {model,Schema}=require('mongoose')

const officeSchema= new Schema({
  usuario:Schema.Types.ObjectId,
  office:Schema.Types.ObjectId,
  day: Date,
  horario: {
    type: String,
    enum: [
      '8:00 - 9:00',
      '9:00 - 10:00',
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