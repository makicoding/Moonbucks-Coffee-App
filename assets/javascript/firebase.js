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



// ----------------------------------------
// 2. ADD NEW ORDER TO FIREBASE DATABASE

var database = firebase.database();

// Grabs user input
var newOrderName = $("#name");                             // .val() sets the value of #name that jQuery has gotten ($ is get)     // .trim() trims any white spaces before and after the string, but not in-between the string.
var newOrderCoffee = $("#item1");
var newOrderTea = $("#item2");
var newOrderCroissant = $("#item3");
var newOrderTime = moment().format('LT');

// Price per item
var coffeePrice = 2;
var teaPrice = 3;
var croissantPrice = 3;

// Convert the quantity of the items from strings to numbers
var numberNewOrderCoffee = parseInt(newOrderCoffee.val())       // parseInt converts a string into an integer. To convert a string into a decimal number, use parseFloat
var numberNewOrderTea = parseInt(newOrderTea.val())
var numberNewOrderCroissant = parseInt(newOrderCroissant.val())

// Calculate total price
var totalPrice = (numberNewOrderCoffee * coffeePrice) + (numberNewOrderTea * teaPrice) + (numberNewOrderCroissant * croissantPrice);  
// var totalPrice = newOrderCoffee.val() * coffeePrice;

// use toFixed() to display only 2 decimal places
var totalPriceTwoDecimalPlaces = totalPrice.toFixed(2);       // the (2) means 2 decimal places.



// Function occurs when #addNewOrderButton is clicked
$("#addNewOrderButton").on("click", function(event) {
  event.preventDefault();

  console.log(totalPriceTwoDecimalPlaces);

  // --------------------
  // Form validation

  // function validateForm() {
  //   var isValid = true;

    // // Get name from .form-control and if the value is empty, return false for isValid
    // $(".form-control").each(function() {
    //     if ($(this).val() === "") {
    //       isValid = false;
    //     }
    // });

    //$(".chosen-select").each(function() {   
    //
    //    if ($(this).val() === "") {
    //        isValid = false;
    //    }
    //});
    
  // If the value for #name or (item1 and #item2 and item3) are empty, return false for isValid
  if ( (!newOrderName.val().trim()) || (!newOrderCoffee.val() && !newOrderTea.val() && !newOrderCroissant.val()) ) {
  // if (($("#name").val().trim() === "") || (($("#item1").val() === "") && ($("#item2").val() === "") && ($("#item3").val() === ""))) {
    // isValid = false;

    console.log("Please fill out name and quantity for at least one item before submitting!");

    // Show the modal with alerting the user to fill out all fields
    $("#pleaseFillAllFieldsModal").modal("toggle");

    return;
  }

    // return isValid;
  // };

  // --------------------

  // If all required fields are filled
  // if (validateForm()) {

  // Show Modal 2 confirming the user's order before submitting
  $("#confirmModal").modal("toggle");

  // Populate Modal 2 with order data
  $("#modalConfirmOrderName").html(newOrderName.val());
  console.log(totalPriceTwoDecimalPlaces);
  $("#modalConfirmOrderTotal").html(totalPriceTwoDecimalPlaces);

});


// When the confirmButton on Modal 2 is clicked
$(".confirmButton").click(function () {

    // Creates local "temporary" object called newOrder for holding the new order data
    var newOrder = {
      name: newOrderName.val().trim(),
      coffee: newOrderCoffee.val(),
      tea: newOrderTea.val(),
      croissant: newOrderCroissant.val(),
      time: newOrderTime
    };

    // Uploads newOrder data to the firebase database
    database.ref().push(newOrder);
    console.log("New order submitted!");
    orderSuccessModal();
    
    // Logs everything to console
    // console.log(newOrder.name);
    // console.log(newOrder.coffee);
    // console.log(newOrder.tea);
    // console.log(newOrder.croissant);
    // console.log(newOrder.time);

    // $("#modalMessage").text(`Order submitted successfully! The total price is $${totalPriceTwoDecimalPlaces}`);
    // $("#confirmationModal").modal("toggle");      // this line displays the modal
    //alert();    // Code here so that it would confirm to a modal.  Need to include total price.  Also include Cancel and Submit button.
  
  // }

  // else {
  //   alert("Please fill out name and quantity for at least one item before submitting!");
  // }

});


// Function to open Modal 3 to let the customer know the order was made successfully
function orderSuccessModal() {
  $("#successModal").modal("toggle");

  // Include the customer's name in Modal 3
  $("#modalSuccessOrderName").html(newOrderName.val().trim());

  $(".successModalCloseButton").click(function () {
    window.location.href = "/index.html";

    // Clears all of the text-boxes on the customer order form on index.html
    // newOrderName.val("");
    // newOrderCoffee.val("");
    // newOrderTea.val("");
    // newOrderCroissant.val("");
  });

};



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