const User = require ('../models/User')

exports.loginGet = (req, res) => {
  res.render("login", { message: "" });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};