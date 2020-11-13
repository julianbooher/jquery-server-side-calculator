// Bring in express, from the node_modules directory
// Express is a function
const express = require('express');

// Bring in bodyParser, which will help us parse incoming data
const bodyParser = require('body-parser');

// Create an instance of express web server, we'll call it app
const app = express();
// We usually use 5000 for our port
// We'll use this port later, it's like a po box at the post office.
// Where our server will get/send mail/messages
const port = 5000;

// Tell express where to find static files that it can send on request.
app.use(express.static('server/public'));

// Tell express how to parse incoming data
app.use(bodyParser.urlencoded({extended: true}));

// Math array
let mathArray = [];


// --------------------- ROUTES ---------------------
app.get('/math', (req,res) => {
    console.log('Sending math data');
    res.send(mathArray);
})


// -------------------- END ROUTES --------------------


// Tell our server to start listening for requests on our port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
})