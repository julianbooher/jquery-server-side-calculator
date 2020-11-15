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
    $('body').on('keydown', '#number-one', buttonHandler);
    $('body').on('keydown', '#number-two', buttonHandler);
}

// This function runs when the user presses a key inside of the input fields.
// If the user presses enter, it will click the submit button for them, if the user presses esc, it will clear the fields.
function buttonHandler(event){
    if (event.keyCode === 13){
        $('#btn-submit').click();
        return false;
    } else if (event.keyCode === 27){
        $('#btn-clear').click();
        return false;
    }
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
}

function getMath(){
    // Making a GET request to our server.
    $.ajax({
        method: 'GET',
        url: '/math'
    }).then( function (response){
        // This function appends everything stored on server side to the DOM.
        displayMath(response);
    }).catch( function(error){
        // Log the error & alert the user
        console.log('Error', error);
        alert('Something bad happened. Try again later.');
    })
    // put the user's cursor on the first number input field so they can begin typing.
    $('#number-one').focus();
    console.log('End of getMath');
}

function displayMath(mathArray){
    // Empty the list before appending.
    $('#math-history-list').empty();
    // Loop through the math array starting from the most recent, so that is at the top.
    for(let i = mathArray.length - 1; i >= 0; i--){
        $('#math-history-list').append(`
            <li>${mathArray[i].numberOne} ${mathArray[i].mathOperator} ${mathArray[i].numberTwo} = ${mathArray[i].answer}
        `)
    }
    // Append the answer to the DOM for the most recent calculation that the user did. Only do this if there is something in the mathArray.
    if (mathArray.length > 0){
        // Empty before appending.
        $('#recent-answer').empty();
        $('#recent-answer').append(`
        <h3>Answer: ${mathArray[mathArray.length - 1].answer}</h3>
        `)
    }
}

function doMath(event){
    // Prevent the page from refreshing when you click the equals button.
    event.preventDefault();
    // Add values to the mathObject to submit to server side.
    mathObject.numberOne = $('#number-one').val();
    mathObject.numberTwo = $('#number-two').val();
    // Check to make sure there are two numbers and an operator.
    if (!mathObject.numberOne || !mathObject.numberTwo || !mathObject.mathOperator){
        // Empty previous error message in case they make two errors in a row.
        $('#error-message').empty();
        // Empty answer, seems counterintuitive to leave it up if the user then makes a calculation with an error.
        $('#recent-answer').empty();
        // Append error message to the DOM below the calculator.
        $('#error-message').append('Missing a field, ensure you have two numbers and a math operator.')
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
        // Clear the error message if there is one from a previous error.
        $('#error-message').empty
        // Get the new mathArray and append everything to the DOM.
        getMath();
        console.log('doMath working');
    }

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
    // Empty the error-message field.
    $('#error-message').empty();
    // Empty the answer field. You can still see the most recent answer at the top of the history, so I don't think you need to see the most recent answer if you hit clear.
    $('#recent-answer').empty();
    // Move the cursor to number-one input field.
    $('#number-one').focus();
    // Empty the mathObject object
    mathObject = {};
}