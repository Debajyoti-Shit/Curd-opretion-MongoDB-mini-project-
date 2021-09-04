var express = require("express");
var app = express();
var mongoose = require("mongoose");
var User = require("./models/index.js");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Crud", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var connection = mongoose.connection;
connection.once("open", function () {
  // console.log("connection successfully");
});

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  // res.send(" <h1>hello world </h1> ");
  res.render("insert");
});

app.post("/insert", function (req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save(() => {
    // res.send("<h1>data send..</h1>");
    res.redirect("/shows");
  });
});

app.get("/shows", function (req, res) {
  User.find({}, function (err, result) {
    res.render("shows", { users: result });
  });
});

app.get("/delete/:id", async function (req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/shows");
});

app.get("/edit/:id", function (req, res) {
  User.findById(req.params.id, function (err, result) {
    res.render("edit", { users: result });
  });
});

// app.get('/add',async function(req,res){
//     await User.find(req.body);

//     res.redirect('/insert');
// });

app.post("/update/:id", async function (req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/shows");
});

var server = app.listen(4000, function () {
  console.log("go to port number 4000");
});
