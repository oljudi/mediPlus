const User = require('../models/User')
const passport = require('passport')

passport.use(User.createStrategy())

// serialize user object
passport.serializeUser(User.serializeUser())

// deserialize user object
passport.deserializeUser(User.deserializeUser())

module.exports = passport 