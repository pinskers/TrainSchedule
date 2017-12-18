// Initialize Variables
var name = "";
var destination = "";
var fTrainTime = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
var currentTime = "";


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

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().fTrainTime);
    console.log(childSnapshot.val().frequency);
  });  
});
// The data sent to firebase should be retreived and added to the train schedule table.

// Next arrival is based on the first train time and frequency of the train.

// Minutes away is based off of next arrival and current time.