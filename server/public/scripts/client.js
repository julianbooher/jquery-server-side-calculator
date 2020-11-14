console.log('Hello from client.js');


// IDEA: store an object that has the calculation parameters on client side, and then send it to server side to do the actual calculation.

$(document).ready(onReady);
let mathObject = {};

function onReady(){
    console.log('Hello from jQuery');
    getMath();
    $('.btn-math').on('click', selectMath);
    $('#btn-clear').on('click', clearFields);
    $('#btn-submit').on('click', doMath);
}

function selectMath(event){
    // Prevent page from refreshing.
    event.preventDefault();
    // If any button has an active class, remove it. This ensures only 1 math operator is chosen at a given time.
    $('.btn-math').removeClass('active')
    // Give the button that the user pressed an active class. Gives it a blue tint to display that it is selected.
    $(this).addClass('active');
    // Change the mathOperator key inside of the math object to the data value stored inside of the math operator buttons.
    mathObject.mathOperator = $(this).data("operator");
    // Log to check and make sure the above line is working.
    console.log('New mathObject:', mathObject);
}

function getMath(){
    // Making a GET request to our server.
    // This returns back a 'Promise'
    $.ajax({
        method: 'GET',
        url: '/math'
    }).then( function (response){
        console.log('Got response math GET', response);
    }).catch( function(error){
        // Log the error & alert the user
        console.log('Error', error);
        alert('Something bad happened. Try again later.');
    })

    console.log('End of getMath');
}

function doMath(event){
    // Prevent the page from refreshing when you click the equals button.
    event.preventDefault();
    // Add values to the mathObject to submit to server side.
    mathObject.numberOne = $('#number-one').val();
    mathObject.numberTwo = $('#number-two').val();
    // Check to make sure there are two numbers and an operator.
    if (!mathObject.numberOne || !mathObject.numberTwo || !mathObject.mathOperator){
        console.log('missing a field when trying to submit');
    }
    else{
        // POST route to the server.
        $.ajax({
            method: 'POST',
            url: '/math',
            data: mathObject
        }).then( function (response){
            console.log('Got response math POST', response);
        }).catch( function(error){
            // Log the error & alert the user
            console.log('Error', error);
            alert('Something bad happened. Try again later.');
        })
    }
    clearFields();
    console.log('doMath working');

}

function clearFields(event){
    if (event){
        // Prevent the page from reloading if this comes from the clear button
        event.preventDefault();
    }
    // Clear input fields and reset active buttons, wipe the mathObject.
    // If any math buttons are selected, unselect them.
    $('.btn-math').removeClass('active')
    // Clear input fields
    $('#number-one').val('');
    $('#number-two').val('');
    // Empty the mathObject object
    mathObject = {};
    console.log('clearFields:', mathObject);
}