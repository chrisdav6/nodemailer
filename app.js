var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var port = process.env.PORT || 3000;
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
  res.render("index", {msg: ""});
});

//POST Form Submission
app.post("/", function(req, res){
  
  var output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <hr>
    <p>From: ${req.body.email} </p>
  `;

    
    let transporter = nodemailer.createTransport({
        host: 'relay-hosting.secureserver.net',
        port: 25,
        secure: false,
        auth: {
            user: "", // generated ethereal user
            pass: ""  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"Nodemailer Contact" <test@thedavisexperiment.com>', // sender address
        to: "chris.davis5440@gmail.com", // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'I would like to subscibe to your newsletter', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        res.render("index", {msg: "Email Sent!"});
    });
});

//Start Server
app.listen(port, function() {
  console.log("Server has started!"); 
});