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

//global variables for train input values //*******change to put the variables inside each of the functions

// ********* they don't need to be global as the use of the database can grab all of the information essentially out of the on click function
// var inputTrainName;
// var inputDestination;
// var inputFirstArrival; //////
// var firstArrival = moment(inputFirstArrival, "HH:mm").subtract(1, "years"); // time the train starts running
// var inputFrequency; 
// var currentTime = moment(); // current time
// var totalDiff = moment().diff(moment.unix(firstArrival), "minutes"); // difference between the when the train starts running and current time
// var minuteMod = totalDiff % inputFrequency; // modulous for the totalDiff mod. the frequency of the trains
// var minutesAway = inputFrequency - minuteMod; // how many minutes away the next train is
// var nextArrival = moment().add(minutesAway, "m").format("HH:mm"); // time in military of next train arriving


// on click for submitting the form to firebase
$("#submit").on("click", function() {
    event.preventDefault();

    // set variables to the submitted information
    var inputTrainName = $("#inputTrainName").val().trim();
    var inputDestination = $("#inputDestination").val().trim();
    var inputFirstArrival = $("#inputFirstArrival").val().trim();
    var inputFrequency = $("#inputFrequency").val().trim();

    // variable to creating a new object with the individual train information stored inside
    var trainObject = {
        name: inputTrainName,
        destination: inputDestination,
        firstArrival: inputFirstArrival,
        frequency: inputFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP //giving me an error that TIMESTAMP is not defined -- fixed database here is not the same as the one i created! this is a standard for firebase that cannot be messed with
    };

    // push "object" to database child "trains"
    database.ref("trains").push(trainObject); //why can't i push this to a child/create a child in my database? why can i only push to the root? -- it needs to be in string form!
    // inputTrainName: inputTrainName,
    // inputDestination: inputDestination,
    // inputFirstArrival: inputFirstArrival,
    // inputFrequency: inputFrequency,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP //giving me an error that TIMESTAMP is not defined -- fixed database here is not the same as the one i created! this is a standard for firebase that cannot be messed with

    alert("train added!");

    console.log(name);
    console.log(destination);
    console.log(firstArrival);
    console.log(frequency);

    // clear form here please
    $("#inputTrainName").val("");
    $("#inputDestination").val("");
    $("#inputFirstArrival").val("");
    $("#inputFrequency").val("");

    return false;
});

// diplay/add to html
database.ref("trains").on("child_added", function(snapshot) {
        // create new variables to deal with the new information coming from the database. 
        var nameData = snapshot.val().name;
        var destinationData = snapshot.val().destination;
        var firstArrivalData = snapshot.val().inputFirstArrival;
        var frequencyData = snapshot.val().frequency;

        // current time
         //var currentTime = moment(); // current time

        // first arrival from train data
        //var firstArrival = moment(firstArrivalData, "HH:mm").subtract(1, "years"); // time the train starts running
        
        // difference from the first arrival to current time
        var totalDiff = moment().diff(moment.unix(firstArrivalData), "minutes"); // difference between the when the train starts running and current time
        
        // modulous from the total difference in minutes and the frequency at which the train runs
        var minuteMod = totalDiff % inputFrequency;
        
        // the next train in minutes is the frequency of minutes that the train runs minus the modulous
        var minutesAway = inputFrequency - minuteMod; 

        // in military time showing when the next train arrives
        var nextArrival = moment().add(minutesAway, "m").format("HH:mm");







        // *********** change 
        $("#trainInfo").append("<tr><td>" + snapshot.val().inputTrainName + "</td>" +
            "<td>" + snapshot.val().inputDestination + "</td>" +
            "<td>" + snapshot.val().inputFrequency + "</td>" +
            "<td>" + snapshot.val().nextArrival + "</td>" +
            "<td>" + snapshot.val().minutesAway + "</td></tr>");

        // show train object data
        console.log(snapshot.val());

        console.log("Start Time: " + firstArrivalData);
        //console.log("Current Time: " + moment(currentTime).format("HH:mm"));
        console.log("Total Time Difference: " + totalDiff);
        console.log("Modulous: " + minuteMod);
        console.log("Minutes Until Next Train: " + minutesAway);
        console.log("Next Train Arrives: " + nextArrival);
    },
    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


// convert start time to minutes/give a date? input firstArrival = startTime
// convert current time to minutes "time"
// time - startTime = inBetweenTime
// inBetweenTime modulous % inputFrequency = minuteMod
// inputFrequency - minuteMod = minutesAway