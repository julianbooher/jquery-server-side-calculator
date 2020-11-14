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
});

app.post('/math', (req, res) =>{
    console.log('Posting to math Array');
    let mathObject = req.body;
    console.log('in POST route:', mathObject);
    mathObject.answer = doSomeMath(mathObject);
    console.log('in POST route, answer:', mathObject.answer);
    mathArray.push(mathObject);
    console.log('in POST route, new mathArray:', mathArray);
    // TODO: Math function on server side.
    res.sendStatus(200);
})


// -------------------- END ROUTES --------------------


// Tell our server to start listening for requests on our port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
})


// Function to do the actual arithmetic on the user's submitted values.
function doSomeMath(object){
    let returnValue = 0;
    // conditions to check what math operator was selected.
    // Inside each if/else it checks the mathOperator value, and does that math operation when it finds which if/else it falls under.
    if (object.mathOperator === '+'){
        returnValue = Number(object.numberOne) + Number(object.numberTwo);
        console.log('Do some addition', returnValue);
    } else if (object.mathOperator === '-'){
        returnValue = Number(object.numberOne) - Number(object.numberTwo);
        console.log('Do some subtraction', returnValue);
    } else if (object.mathOperator === '*'){
        returnValue = Number(object.numberOne) * Number(object.numberTwo);
        console.log('Do some multiplication', returnValue);
    } else if (object.mathOperator === '/'){
        returnValue = Number(object.numberOne) / Number(object.numberTwo);
        console.log('Do some division', returnValue);
    }
    // Returns the result of the math operation, to be added to the mathArray.
    return(returnValue);
}