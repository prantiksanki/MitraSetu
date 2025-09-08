const express = require("express");
const mongoose = require("mongoose") ;
const auth = require("./router/auth") ;

const bodyParser = require("body-parser") ;
const cors = require("cors") ;


const app = express() ; 
const PORT = 80 ; 

app.use(cors()) ; 
// Parse JSON bodies
app.use(express.json());
// Optionally parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// DB Connection
mongoose.connect("mongodb://localhost:27017/mitrasetu")
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});


// router middleware

app.use("/api/auth" , auth) ;







app.get("/", (req, res) =>
{
    res.send("Hello World from Backend") ;
})



app.listen(PORT, (req, res) =>
{
    console.log(`Server is running on port ${PORT}`) ;
} )