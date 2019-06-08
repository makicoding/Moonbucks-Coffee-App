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
// var coffeeQuantityNumber = parseInt(newOrderCoffee.val());          // parseInt converts a string into an integer. To convert a string into a decimal number, use parseFloat
// var teaQuantityNumber = parseInt(newOrderTea.val());
// var croissantQuantityNumber = parseInt(newOrderCroissant.val());

// Calculate total price
// var totalPrice = (coffeeQuantityNumber * coffeePrice) + (teaQuantityNumber * teaPrice) + (croissantQuantityNumber * croissantPrice);  






// Function occurs when #addNewOrderButton is clicked
$(".addNewOrderButton").on("click", function(event) {

  event.preventDefault();

  // console.log(totalPriceTwoDecimalPlaces);

  // --------------------
  // Form validation
  


  // If the value for #name or (item1 and #item2 and item3) are empty, toggle the #pleaseFillAllFieldsModal
  // if ( (!newOrderName.val().trim()) || (!newOrderCoffee.val() && !newOrderTea.val() && !newOrderCroissant.val()) ) {

  //   console.log("Please fill out name and quantity for at least one item before submitting!");

  //   // Show the modal with alerting the user to fill out all fields
  //   $("#pleaseFillAllFieldsModal").modal("toggle");

  //   return;
  // }



  // typeof shows whether the value (.val()) is a string or a number  
  // Here we are trying to figure out if the value of newOrderCoffee is a string or a number
  console.log(typeof newOrderCoffee.val(), newOrderTea.val(), newOrderCroissant.val(), newOrderCoffee.val() || newOrderTea.val() || newOrderCroissant.val())
  
  // If the there is NO value for newOrderName, then toggle the #pleaseFillAllFieldsModal
  if (!newOrderName.val().trim()) {

    console.log("Please fill out name!");
    console.log('here')
    // Show the modal with alerting the user to fill out all fields
    $("#pleaseFillAllFieldsModal").modal("toggle");

    return;
  }

  // If there IS a value for newOrderName...
  // BUT the value for newOrderCoffee is equal to a string "0" AND newOrderTea is equal to a string "0" AND newOrderCroissant is equal to string "0"...
  // then toggle the #pleaseFillAllFieldsModal
  else if ((newOrderCoffee.val() === "0") && (newOrderTea.val() === "0") && (newOrderCroissant.val() === "0")) {

    console.log("You gave me a name. Please specify product quantity!");
    console.log('there')
    // Show the modal with alerting the user to fill out all fields
    $("#pleaseFillAllFieldsModal").modal("toggle");

    return;
  }

  // --------------------

  // If all required fields are filled

  // Calculate total price
  // parseInt converts a string into an integer. To convert a string into a decimal number, use parseFloat
  var totalPrice = (parseInt(newOrderCoffee.val()) * coffeePrice) + (parseInt(newOrderTea.val()) * teaPrice) + (parseInt(newOrderCroissant.val()) * croissantPrice); 

  // use toFixed() to display only 2 decimal places
  var totalPriceTwoDecimalPlaces = totalPrice.toFixed(2);       // the (2) means 2 decimal places.

  // Show Modal 2 confirming the user's order before submitting
  $("#confirmModal").modal("toggle");

  // Populate Modal 2 with order data
  $("#modalConfirmOrderName").html(newOrderName.val());
  console.log(totalPrice);
  // console.log(totalPriceTwoDecimalPlaces);
  // $("#modalConfirmOrderTotal").html(totalPriceTwoDecimalPlaces);
  // $("#modalConfirmOrderTotal").html((newOrderCoffee.val() * 2) + (newOrderTea.val() * 3) + (newOrderCroissant.val() * 3));
  $("#modalConfirmOrderTotal").text(totalPriceTwoDecimalPlaces);

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
  var newOrderNameRetrieved = childSnapshot.val().name;
  var newOrderCoffeeRetrieved = childSnapshot.val().coffee;
  var newOrderTeaRetrieved = childSnapshot.val().tea;
  var newOrderCroissantRetrieved = childSnapshot.val().croissant;
  var newOrderTimeRetrieved = childSnapshot.val().time;

  // Create the new row
  var newRow = $("<tr>").prepend(
    $("<td>").text(newOrderNameRetrieved),
    $("<td>").text(newOrderCoffeeRetrieved !== "0" ? newOrderCoffeeRetrieved : ""),   // Ternary Operator.  This is like an if/else statement where the ? is the equivalent of if, and : is the equivalent of else
                                                                                      // In this case we are saying if newOrderCoffeeRetrieved is not zero, then newOrderCoffeeRetrieved. Else "" (an empty string)
    /*
    // The following is the long hand version of the Ternary Operator:

    var coffeeOrder = "";
    if (newOrderCoffeeRetrieved !== "0") {
      coffeeOrder = newOrderCoffeeRetrieved;
    }
    else {
      coffeeOrder = "";
    }
    $("<td>").text(coffeeOrder)
    */
    $("<td>").text(newOrderTeaRetrieved !== "0" ? newOrderTeaRetrieved : ""),   
    $("<td>").text(newOrderCroissantRetrieved !== "0" ? newOrderCroissantRetrieved : ""),
    $("<td>").text(newOrderTimeRetrieved)
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