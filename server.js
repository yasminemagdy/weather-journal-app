// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Dependencies //
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//POST Route 
const data = [];
app.post('/add' ,information);

function information(req , res){
    
    projectData.date = req.body.date;
    projectData.temp= req.body.temp;
    projectData.content = req.body.content;
    projectData.countryName = req.body.name;
    res.send(projectData);
    console.log(projectData);
}
//calling a function to complete GET '/all
app.get('/all' ,getInfo);

function getInfo(req, res) {
    res.send(projectData)
}

// Setup Server
const port = 3000;
app.listen(port , listening);

function listening(){
    console.log(`Server running on localhost : ${port}`)
}