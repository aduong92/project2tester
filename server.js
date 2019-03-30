// Dependencies
var express = require("express");
var path = require("path");


// Set our port to 8080
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Create our server
//app.get('/jsQr.js', function(req, res) {
//    res.sendFile(path.join(__dirname + '/jsQr.js'));
//});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, "0.0.0.0",function() {
  console.log("App listening on PORT " + PORT);
});