// Initialize Firebase
var config = {
    apiKey: "AIzaSyBT4htVCchzYGQum_urN_rbmDaK7zRZcnk",
    authDomain: "train-hmwk.firebaseapp.com",
    databaseURL: "https://train-hmwk.firebaseio.com",
    projectId: "train-hmwk",
    storageBucket: "",
    messagingSenderId: "519399819220"
  };

firebase.initializeApp(config);

var tname;
var tdest;
var tfirst;
var tfreq;
var tnext;



var database = firebase.database();


$("#add-train").on("click", function (event) {

    event.preventDefault();


    var Frequency = tfreq;


    var firstTime = tfirst;

    var fTC = moment(firstTime, "HH:mm").subtract(1, "years");
    


    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    var diffTime = moment().diff(moment(fTC), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);


    var Remainder = diffTime % Frequency;
    console.log(Remainder);


    var MinutesTillTrain = Frequency - Remainder;
    console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);
    

    var nextTrain = moment().add(MinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    

    tname = $("#name").val().trim();
    tdest = $("#dest").val().trim();
    tfirst = $("#first").val().trim();
    tfreq = $("#freq").val().trim();
    console.log(nextTrain);
    tnext = moment(nextTrain).format("hh:mm");
    database.ref().push({
        name: tname,
        dest: tdest,
        first: tfirst,
        freq: tfreq,
        next: tnext,
        min: MinutesTillTrain
      });
      
console.log("test");
    $("#name").val("");
    $("#dest").val("");
    $("#first").val("");
    $("#freq").val("");
});



database.ref().on("child_added", function (snapshot) {


    console.log(snapshot.val());


    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().first);
    console.log(snapshot.val().freq);
    console.log(snapshot.val().next);
    

    $("#schedule").append("<tr>" + "<th scope = 'col'>" + snapshot.val().name + "</th> " + "<th scope = 'col'>" + snapshot.val().dest + "</th> " + "<th scope = 'col'>" + snapshot.val().first + "</th> " + "<th scope = 'col'>" + snapshot.val().next + "</th> " + "<th scope = 'col'>" + snapshot.val().min + "</th> " + "</tr>");


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

