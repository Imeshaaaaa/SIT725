var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//port configuration
var port = process.env.port || 3000;

//calculation functions
const add= (n1,n2) => {
    return n1+n2;
}
const sub= (n1,n2) => {
    return n1-n2;
}
const div= (n1,n2) => {
    return n1/n2;
}
const mul= (n1,n2) => {
    return n1*n2;
}

//GET routes for basic operations
app.get("/add", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = add(n1,n2);
    res.json({statuscocde:200, data: result }); 
});

app.get("/sub", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = sub(n1,n2);
    res.json({statuscocde:200, data: result }); 
});

app.get("/div", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = div(n1,n2);
    res.json({statuscocde:200, data: result }); 
});

app.get("/mul", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = mul(n1,n2);
    res.json({statuscocde:200, data: result }); 
});

// POST route for operations
app.post("/calculate", (req, res) => {
    const { n1, n2, operation } = req.body;

    if (typeof n1 !== "number" || typeof n2 !== "number") {
        return res.status(400).json({ error: "Inputs must be numbers" });
    }

    let result;
    switch (operation) {
        case "add":
            result = add(n1, n2);
            break;
        case "subtract":
            result = sub(n1, n2);
            break;
        case "multiply":
            result = mul(n1, n2);
            break;
        case "divide":
            result = div(n1, n2);
            break;
        default:
            return res.status(400).json({ error: "Invalid operation" });
    }

    res.json({ statusCode: 200, operation, data: result });
});

//error handling for invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

//srart the server
app.listen(port,()=>{
console.log("App listening to: "+port)
})
