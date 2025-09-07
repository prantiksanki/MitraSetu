const express = require("express");
const app = express() ; 
const PORT = 80 ; 



app.get("/", (req, res) =>
{
    res.send("Hello World from Backend") ;
})



app.listen(PORT, (req, res) =>
{
    console.log(`Server is running on port ${PORT}`) ;
} )