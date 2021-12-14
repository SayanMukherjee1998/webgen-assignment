const userData = require("../model/userData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Rendering the login page
exports.login = (req, res) => {
  const loginData = {};
//   loginData.email = req.cookies.email ? req.cookies.email : undefined;
//   loginData.password = req.cookies.password ? req.cookies.password : undefined;
  res.render("login", {
    title: "Login Page",
    data: loginData,
  });
};

//Loging in to the site
exports.postLogin = (req, res) => {
  userData.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      let hashPassword = data.password;
      if (bcrypt.compareSync(req.body.password, hashPassword)) {
        const token = jwt.sign({ id: data._id, name: data.name }, "abc123");
        res.cookie("token", token);
        if (req.body.remember) {
          res.cookie("email", req.body.email);
          res.cookie("password", req.body.password);
        }
        res.redirect("/");
      }
    } else {
      alert("Email or password you entered is wrong");
    }
  });
};
