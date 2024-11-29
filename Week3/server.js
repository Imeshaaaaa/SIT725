//import express module
var express = require("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//port configuration
var port = process.env.port || 3000;

//start the server
app.listen(port,()=>{
    console.log("App listening to: "+port)
})
