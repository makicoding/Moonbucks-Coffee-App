console.log("Firebase JavaScript connected!");

// ----------------------------------------
// 1. INITIALIZE FIREBASE DATABASE

var config = {
    apiKey: "AIzaSyBSpoLRxJj62jPSoJJjS1YwhuWH8i6WhGE",
    authDomain: "moonbucks-coffee-app.firebaseapp.com",
    databaseURL: "https://moonbucks-coffee-app.firebaseio.com",
    projectId: "moonbucks-coffee-app",
    storageBucket: "moonbucks-coffee-app.appspot.com",
    messagingSenderId: "45560367600"
  };
  firebase.initializeApp(config);


// ABOVE IS FIREBASE CONFIGURATION FOR MOONBUCKS COFFEE APP
// RECODE FROM BELOW
// INSERT MODAL INTO INDEX HTML AND STORE HTML
// NEED FORM VALIDATION
// DISPLAY TOTAL PRICE TO CUSTOMER ALSO


// ----------------------------------------
// 2. ADD NEW ORDER TO FIREBASE DATABASE

var database = firebase.database();

// Function occurs when #addNewOrderButton is clicked
$("#addNewOrderButton").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var newOrderName = $("#name").val().trim();                             // .val() sets the value of #name that jQuery has gotten ($ is get)     // .trim() trims any white spaces before and after the string, but not in-between the string.
  var newOrderCoffee = $("#item1").val();
  var newOrderTea = $("#item2").val();
  var newOrderCroissant = $("#item3").val();
  var newOrderTime = moment().format('LT');

  // Creates local "temporary" object called newOrder for holding the new order data
  var newOrder = {
    name: newOrderName,
    coffee: newOrderCoffee,
    tea: newOrderTea,
    croissant: newOrderCroissant,
    time: newOrderTime
  };

  // Uploads newOrder data to the firebase database
  database.ref().push(newOrder);

  // Logs everything to console
  console.log(newOrder.name);
  console.log(newOrder.coffee);
  console.log(newOrder.tea);
  console.log(newOrder.croissant);
  console.log(newOrder.time);

  // Price per item
  var coffeePrice = 2;
  var teaPrice = 1.5;
  var croissantPrice = 3; 

  // Calculate total price
  var totalPrice = (newOrderCoffee * coffeePrice) + (newOrderTea * teaPrice) + (newOrderCroissant * croissantPrice);

  // use toFixed() to display only 2 decimal places
  var totalPriceTwoDecimalPlaces = totalPrice.toFixed(2);       // the (2) means 2 decimal places.

  $("#modalMessage").text(`Order submitted successfully! The total price is $${totalPriceTwoDecimalPlaces}`);
  $("#confirmationModal").modal("toggle");      // this line displays the modal
  //alert();    // Code here so that it would confirm to a modal.  Need to include total price.  Also include Cancel and Submit button.

  // Clears all of the text-boxes on the customer order form on index.html
  $("#name").val("");
  $("#item1").val("");
  $("#item2").val("");
  $("#item3").val("");
});



// ----------------------------------------
// 3. WHEN A USER SUBMITS A NEW ORDER, DISPLAY THE SUBMITTED ORDER TO STORE.HTML

// Event to retrieve data from firebase database
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newOrderName = childSnapshot.val().name;
  var newOrderCoffee = childSnapshot.val().coffee;
  var newOrderTea = childSnapshot.val().tea;
  var newOrderCroissant = childSnapshot.val().croissant;
  var newOrderTime = childSnapshot.val().time;

  // Employee Info
  console.log(newOrderName);
  console.log(newOrderCoffee);
  console.log(newOrderTea);
  console.log(newOrderCroissant);
  console.log(newOrderTime);

  // Prettify the employee start
  //var newOrderTimePretty = moment.unix(newOrderTime).format('LT');

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var empMonths = moment().diff(moment(empStart, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
  //var empBilled = empMonths * empRate;
  //console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").prepend(
    $("<td>").text(newOrderName),
    $("<td>").text(newOrderCoffee),
    $("<td>").text(newOrderTea),
    $("<td>").text(newOrderCroissant),
    $("<td>").text(newOrderTime)
  );

  // Append the new row to the table
  $("#customerOrderTable > tbody").prepend(newRow);
});



// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case







// ----------------------------------------
// ADDITIONAL NOTES

/*
TEMPLATE LITERALS

`string ${} string` format of writing code is a template literal.

Example:
    var totalQuantity = 3 * 2;
    console.log(`The total quantity is: ${totalQuantity}`);
        
    // "The total quantity is: 6" would be printed to the console.
    
*/