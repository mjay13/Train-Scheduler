// Initialize Firebase
var config = {
    apiKey: "AIzaSyCiuEG8-3Zd_q2J0HAmOFoUyd3qe9_wcQw",
    authDomain: "train-time-a753e.firebaseapp.com",
    databaseURL: "https://train-time-a753e.firebaseio.com",
    projectId: "train-time-a753e",
    storageBucket: "",
    messagingSenderId: "197917481665"
};

firebase.initializeApp(config);

// firebase var
var database = firebase.database();

//global variables for train input values
var inputTrainName = "";
var inputDestination = "";
var inputFirstArrival = "";
var inputFrequency = 0;
var nextArrival = "";
var minutesAway = "";
var time = moment();
var minuteMod = 0;


// on click for submitting the form to firebase
$("#submit").on("click", function() {
    event.preventDefault();

    // set variables to the submitted information
    var inputTrainName = $("#inputTrainName").val().trim();
    var inputDestination = $("#inputDestination").val().trim();
    var inputFirstArrival = $("#inputFirstArrival").val().trim();
    var inputFrequency = $("#inputFrequency").val().trim();

    // push "object" to database child "trains"
    database.ref().push({ //why can't i push this to a child in my database? why can i only push to the root?
        inputTrainName: inputTrainName,
        inputDestination: inputDestination,
        inputFirstArrival: inputFirstArrival,
        inputFrequency: inputFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP //giving me an error that TIMESTAMP is not defined
    });

    alert("train added!");

    console.log(inputTrainName);
    console.log(inputDestination);
    console.log(inputFirstArrival);
    console.log(inputFrequency);

    return false;

});

// diplay/add to html

// not sure why is it giving me errors here -- update -- oh look i spelled function wrong!!!

database.ref().on("child_added", function(snapshot) {
        $("#trainInfo").append("<tr><td>" + snapshot.val().inputTrainName + "</td>" +
            "<td>" + snapshot.val().inputDestination + "</td>" +
            "<td>" + snapshot.val().inputFrequency + "</td>" +
            "<td>" + snapshot.val().nextArrival + "</td>" +
            "<td>" + snapshot.val().minutesAway + "</td></tr>");
    },

    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


// display/order by child in html --already done above-- commmented out below code that was redundant

// // displaying two of the last child hmm
// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     $("#trainInfo").append("<tr><td>" + snapshot.val().inputTrainName + "</td>" +
//         "<td>" + snapshot.val().inputDestination + "</td>" +
//         "<td>" + snapshot.val().inputFrequency + "</td>" +
//         "<td>" + snapshot.val().nextArrival + "</td>" +
//         "<td>" + snapshot.val().minutesAway + "</td></tr>");
//     console.log("i'm working");

// },
// function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });

// work out the math for the countdown


// convert start time to minutes/give a date? input firstArrival = startTime
// convert current time to minutes "time"
// time - startTime = inBetweenTime
// inBetweenTime modulous % inputFrequency = minuteMod
// inputFrequency - minuteMod = minutesAway

// math.chain(time)
//		.minus(startTime)
//		.modulous(inputFrequency)
//		.done()??? dont think math.chain will work as you have to take the minuteMod from the inputFrequency










// display countdown/next train arriving in minutes