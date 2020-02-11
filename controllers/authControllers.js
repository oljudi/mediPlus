const User = require ('../models/User')

exports.loginGet = (req, res) => {
  res.render("login", { message: "" });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

exports.signupPost = async (req, res) => {
  const { tipoconsultorio, email, password } = req.body;

  if (email === "" || password === "") {
    res.render("signup", {
      message: "Debes llenar todos los campos"
    });
  }

  const userOnDB = await User.findOne({ email });
  if (userOnDB !== null) {
    res.render("signup", { message: "El correo ya fue registrado" });
  }
  await User.register({email, tipoconsultorio }, password);
  res.redirect("/login");
}