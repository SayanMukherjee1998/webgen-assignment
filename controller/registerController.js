const bcrypt = require("bcryptjs");
const userData = require("../model/userData");

//Rendering Register page
exports.register = (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
};


//New user registration page
exports.postRegister = (req, res) => {
    console.log(req.body);
  const { name, email, phone, password, confirmPassword } = req.body;
  let errors = [];
  if (!name || !email || !phone || password || !confirmPassword) {
    errors.push({ msg: "Please enter all the fields" });
  }
  if (password != confirmPassword) {
    errors.push({ msg: "Your both passwords don't match." });
  }
  if (password.length < 6) {
    errors.push({
      msg: "Password length should be greater than 8 words/numbers",
    });
  }

    userData.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Your mail id already exist" });
        errors, name, email, phone, password, confirmPassword;
      } else {
        var newUser = new userData({
          name,
          email,
          phone,
          password,
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    });
  //}
};
