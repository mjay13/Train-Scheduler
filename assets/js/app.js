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
        //dateAdded: database.ServerValue.TIMESTAMP
    });

    alert("train added!");

    console.log(inputTrainName);
    console.log(inputDestination);
    console.log(inputFirstArrival);
    console.log(inputFrequency);


    return false;

});

// diplay/add to html

// not sure why is it giving me errors here

// database.ref(trains).on("child_added", fucntion(snapshot) {
//	$("#trainInfo").append("<tr><td>" + snapshot.val().inputTrainName + "</td>" + "<td>" + snapshot.val().inputDestination + "</td>" + "<td>" + snapshot.val().inputFrequency + "</td>" + "<td>" + snapshot.val().nextArrival + "</td>" + "<td>" + snapshot.val().minutesAway + "</td></tr>");
// };

// display/order by child in html

// work out the math for the countdown


// convert start time to minutes/give a date? input firstArrival = startTime
// convert current time to minutes "time"
// time - start time = inBetweenTime
// inBetweenTime modulous % inputFrequency = minuteMod
// inputFrequency - minuteMod = timeRemaining



// display countdown/next train arriving in minutes