console.log('Hello from client.js');


// IDEA: store an object that has the calculation parameters on client side, and then send it to server side to do the actual calculation.

$(document).ready(onReady);

function onReady(){
    console.log('Hello from jQuery');
    getMath();
    $('.btn-math').on('click', selectMath);
}

function selectMath(event){
    event.preventDefault();
    $('.btn-math').removeClass('active').addClass('inactive');
    $(this).removeClass('inactive').addClass('active');
}

function getMath(){
    // Making a GET request to our server.
    // This returns back a 'Promise'
    $.ajax({
        method: 'GET',
        url: '/math'
    }).then( function (response){
        console.log('Got response', response);
    }).catch( function(error){
        // Log the error & alert the user
        console.log('Error', error);
        alert('Something bad happened. Try again later.');
    })

    console.log('End of getMath');
}