var express =  require("express");
var worldRouter = require("./routes/world");
var config = require("config");

var port =   parseInt(config.get("port"));
var app =  express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/world", worldRouter);


app.listen(port, '0.0.0.0',()=>{
    console.log("Server Started on port 3434");
});







