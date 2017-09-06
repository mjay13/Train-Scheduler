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
var inputTrainName;
var inputDestination;
var inputFirstArrival;
var firstArrival = moment(inputFirstArrival, "HH:mm").subtract(1, "years"); // time the train starts running
var inputFrequency; 
var currentTime = moment(); // current time
var totalDiff = moment().diff(moment(inputFirstArrival), "minutes"); // difference between the when the train starts running and current time
var minuteMod = totalDiff % inputFrequency; // modulous for the totalDiff mod. the frequency of the trains
var minutesAway = inputFrequency - minuteMod; // how many minutes away the next train is
var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm"); // time in military of next train arriving


// on click for submitting the form to firebase
$("#submit").on("click", function() {
    event.preventDefault();

    // set variables to the submitted information
    var inputTrainName = $("#inputTrainName").val().trim();
    var inputDestination = $("#inputDestination").val().trim();
    var inputFirstArrival = $("#inputFirstArrival").val().trim();
    var inputFrequency = $("#inputFrequency").val().trim();

    // push "object" to database child "trains"
    database.ref("trains").push({ //why can't i push this to a child/create a child in my database? why can i only push to the root? -- it needs to be in string form!
        inputTrainName: inputTrainName,
        inputDestination: inputDestination,
        inputFirstArrival: inputFirstArrival,
        inputFrequency: inputFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP //giving me an error that TIMESTAMP is not defined -- fixed database here is not the same as the one i created! this is a standard for firebase that cannot be messed with
    });
    alert("train added!");

    console.log(inputTrainName);
    console.log(inputDestination);
    console.log(inputFirstArrival);
    console.log(inputFrequency);

    // clear form here please

    return false;
});

// diplay/add to html
database.ref("trains").on("child_added", function(snapshot) {
        $("#trainInfo").append("<tr><td>" + snapshot.val().inputTrainName + "</td>" +
            "<td>" + snapshot.val().inputDestination + "</td>" +
            "<td>" + snapshot.val().inputFrequency + "</td>" +
            "<td>" + snapshot.val().nextArrival + "</td>" +
            "<td>" + snapshot.val().minutesAway + "</td></tr>");
            console.log(snapshot.val());

            console.log("Start Time: " + inputFirstArrival); 
            console.log("Current Time: " + moment(currentTime).format("HH:mm")); 
            console.log("Total Time Difference: " + totalDiff); 
            console.log("Modulous: " + minuteMod);
            console.log("Minutes Until Next Train: " + minutesAway);
            console.log("Next Train Arrives: " + nextArrival);
    },
       function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


// var inputFirstArrival = ""; // start time
// var inputFrequency = 0; // how often the train runs
// var nextArrival = ""; // time in military of next train arriving
// var minutesAway = ""; // how many minutes away the next train is
// var time = moment(); // current time
// var minuteMod = 0; // modulous
    
// convert start time to minutes/give a date? input firstArrival = startTime
// convert current time to minutes "time"
// time - startTime = inBetweenTime
// inBetweenTime modulous % inputFrequency = minuteMod
// inputFrequency - minuteMod = minutesAway

// math.chain(time)
//		.minus(startTime)
//		.modulous(inputFrequency)
//		.done()??? dont think math.chain will work as you have to take the minuteMod from the inputFrequency

// time = moment(convertedDate).format('HH:mm');




 


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

