var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var port = process.env.PORT || 3000;
var api_key = 'key-c8bc578e61c4d360cf36e5aea830f68b';
var domain = 'sandbox3bca4886e80e4b95bfd0afcad8473094.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var app = express();

//Use EJS
app.set("view engine", "ejs");

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set Static Folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//Routes
//GET Home
app.get("/", function(req, res){
  res.render("index", {msg: "Submitting! Thank You!"});
});

//POST Form Submission
app.post("/", function(req, res){
  
  var userEmail = req.body.email;
  
  var data = {
    from: req.body.email,
    to: 'test@thedavisexperiment.com',
    subject: 'Sign Me Up',
    text: 'Please Sign Me Up for news at your site!'
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    res.redirect("/");
  });
});

//Start Server
app.listen(port, function() {
  console.log("Server has started!"); 
});