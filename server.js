// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8888;

const server = app.listen(port , listening);

// Callback to debug
function listening() {
    console.log(`Server running on: http://localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all' , getInfo);

// Callback function to complete GET '/all'
function getInfo(req , res) {
    res.send(projectData);
}

// Post Route
app.post('/send' , sendInfo);

function sendInfo (req , res) {
    projectData['date'] = req.body.date;
    projectData['name'] = req.body.name;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
}