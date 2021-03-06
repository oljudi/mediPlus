require('dotenv').config()

const fs = require('fs')
const path = require('path')
const hbs = require('hbs')
const nodemailer = require('nodemailer')

const welcomeTemplate = hbs.compile(
  fs.readFileSync((__dirname, './views/mail/correo.hbs'), 'utf8')
)

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth:{
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})

exports.confirmAccount = async (to, endpoint) => {
  return await transporter.sendMail({
    from: "'MediPlus' <contacto@mediplus.com>",
    to,
    subject: 'Confirma tu cuenta - MediPlus',
    html: welcomeTemplate({ endpoint })
  })
}