// Initialize Variables
var name = "";
var destination = "";
var fTrainTime = "";     // Current Time
var frequency = "";     //  Frequency


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBhn9-whMyA-osX9jHZrNNa8GWHCPHjCF4",
  authDomain: "train-schedule-a7259.firebaseapp.com",
  databaseURL: "https://train-schedule-a7259.firebaseio.com",
  storageBucket: "train-schedule-a7259.appspot.com",
  messagingSenderId: "789809460287"
};

firebase.initializeApp(config);

var database = firebase.database();
// When a user types in the fields and hits submits, capture that data and 
// send it to firebase
$(document).ready(function() {
  $("#submit").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    fTrainTime = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
  
    database.ref().push({
      name: name,
      destination: destination,
      fTrainTime: fTrainTime,
      frequency: frequency,
    });
  });
  // The data sent to firebase should be retreived and added to the train schedule table and converted using moment.js.
  database.ref().on("child_added", function(childSnapshot) {
    // First Time (pushed back 1 year to make sure it comes before current time)
    var fTrainTimeConverted = moment(fTrainTime, "hh:mm").subtract(1, "years");
    // Difference between the times
    var timeDifference = moment().diff(moment.unix(fTrainTimeConverted), "minutes");
    // Time apart (remainder)
    var timeRemainder =  timeDifference % frequency;
    // Minute Until Train
    var minutesAway = frequency - timeRemainder;
    // Next Train
    var nextArrival = moment().add(minutesAway, "m").format("hh:mm");
    
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().fTrainTime);
    console.log(childSnapshot.val().frequency);
    console.log("CONVERTED FIRST TRAIN TIME: " + fTrainTimeConverted);
    console.log("MINUTES AWAY: " + minutesAway);
    console.log("NEXT TRAIN: " + nextArrival);

    $("#train-entry").append(" <tr id='train-row'> "+
    " <td class='name'> " + childSnapshot.val().name +
    " </td><td class='destination'> " + childSnapshot.val().destination +
    " </td><td class='frequency'> " + childSnapshot.val().frequency + 
    " </td><td class='next-arrival'> " + nextArrival + 
    " </td><td class='minutes-away'> " + minutesAway + " </td></tr>");
  });  
});

// Minutes away is based off of next arrival and current time. ???

// Reference math UGH

    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21