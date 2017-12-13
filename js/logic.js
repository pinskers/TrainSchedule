// Initialize Variables
var name = "";
var destination = "";
var FtrainTime = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
var currentTime = "";


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBhn9-whMyA-osX9jHZrNNa8GWHCPHjCF4",
    authDomain: "train-schedule-a7259.firebaseapp.com",
    databaseURL: "https://train-schedule-a7259.firebaseio.com",
    projectId: "train-schedule-a7259",
    storageBucket: "train-schedule-a7259.appspot.com",
    messagingSenderId: "789809460287"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

// When a user types in the fields and hits submits, capture that data and 
// send it to firebase

// The data sent to firebase should be retreived and added to the train schedule table.

// Next arrival is based on the first train time and frequency of the train.

// Minutes away is based off of next arrival and current time.