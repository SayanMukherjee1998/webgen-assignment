const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const { urlencoded } = require("body-parser");
const { appendFile } = require("fs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const viewPath = path.join(__dirname, "./views");
const public = express.static(path.join(__dirname, "./public"));

app.set("view engine", "ejs");
app.set("views", viewPath);
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());

//cookie max age
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false,
  })
);
//connecting routes
const mainRoute = require("./routes/mainRoute");

app.use((req,res,next)=>{

    if(req.cookies && req.cookies.token){
        jwt.verify(req.cookies.token, 'abc123', (err, data) => {
            req.user = data
            next()
        })
    }else{
        next()
    }
 })
app.use(mainRoute);

const apiRoute = require('./routes/api route/routeApi')
app.use('/api',apiRoute)




//For any unknown error
app.use((req,res)=>{
    req.status(404).send("404!!! Page not found")
})

//Database connection
const database = `mongodb+srv://Sayan:dz8Ez0zoCg0AxllO@cluster0.y6aqq.mongodb.net/webgen_assignment?retryWrites=true&w=majority`;
const port = process.env.PORT || 5070;
mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(
        `Project is running on http://localhost:${port} \nDataBase connected successfully`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
