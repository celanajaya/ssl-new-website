/**
 * Created by jared on 4/23/16.
 */


 if (Backendless.LocalCache.get("user-token") == undefined) {
     window.location.href='/';
 }

var APPLICATION_ID = '1592FE22-538C-2A7E-FFAA-247F7172FD00',
    SECRET_KEY = 'D5ECB909-04B3-B564-FF33-DEB9C5CD1C00',
    VERSION = 'v1'; //default application version;
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
var eventStorage;
var myEvent;
var objectId;

$(document).ready(function() {
    var logout = function () {
        Backendless.LocalCache.clear();
        window.location.href='/';
    }

    try {
        var user = Backendless.UserService.getCurrentUser();
    } catch (err) {
        console.log(err.message);
        logout();
    }

    eventStorage = Backendless.Persistence.of( SSLEvent );
    $("#userName").text("Welcome " + user.name +"!");
    //var dataQuery = {
    //    relations:["eventName"]
    //};

    //myEvent = eventStorage.find(dataQuery);

    // var event = $("#eventname");
    // event.val(myEvent.data[0].eventName);
    //
    // var currentEvent = $('#selectEvent').val();
    // var dataQuery = {
    //     relations: {condition: "eventName = "+currentEvent}
    // }

    var submit = $("#submit1");
    var logout = $("#logoutButton");

    submit.click(function() {
        var eventType    = $("#eventType").val();
        var emailContact = $("#emailcontact").val();
        var cellContact  = $("#cellcontact").val();
        var eventDetails = $("#eventdetails").val();
        var attendance   = $("#attendance").val();
        var ticketPrice  = $("#ticketprice").val();
        var website      = $("#projectwebsite").val();
        var facebook     = $("#facebook").val();
        var twitter      = $("#twitter").val();
        var sample1      = $("#sample1").val();
        var sample2      = $("#sample2").val();
        var sample3      = $("#sample3").val();
        var permit;

        if ($("#permit").prop('checked')) {
            permit = 1;
        } else {
            permit = 0;
        }

        var sEvent = new SSLEvent({
            eventType: eventType,
            eventDescription: eventdetails,
            eventEmailContact: emailContact,
            eventPhoneContact: cellContact,
            eventExpectedAttendance: attendance,
            eventTicketPrice: ticketPrice,
            eventProjectWebsite: website,
            eventProjectFacebook: facebook,
            eventProjectTwitter: twitter,
            eventProjectLink_1: sample1,
            eventProjectLink_2: sample2,
            eventProjectLink_3: sample3,
            adminWorkPermit: permit
            //objectId: objectId
        });

        try {
            var thisEvent = Backendless.Persistence.of(SSLEvent).save(sEvent);
        } catch (err) {
            console.log(err.message);
        }

        try {
            var success = eventStorage.save(thisEvent);
        } catch (err) {
            console.log(err.message);
        }

        if (success) {
            alert("You have submitted step 1 of your application!");
        } else {
            alert("Application submission has failed. Please try again later.");
        }
    });

    logout.click(function(){
        //Do logout
        logout();
    });
});

var updateEvent = function() {
    var currentEvent = $('#selectEvent').val();
    var index = $('#selectEvent').prop('selectedIndex');
    objectId = myEvent.data[index].objectId;

    console.log("Event is: " + currentEvent);
    var dataQuery = {
        relations: {condition: "eventName = "+currentEvent}
    };
    var event = eventStorage.find(dataQuery);

    var emailContact = $("#emailcontact");
    var decibelLevel = $("#decibellevel");
    var pApproved    = $("#projectapproved");
    var style = $("#style");
    var eventdetails = $("#eventdetails");
    var facebook     = $("#facebook");

    emailContact.val(myEvent.data[index].eventEmailContact);
    decibelLevel.val(myEvent.data[index].adminDecibelLevel);
    pApproved.val(myEvent.data[index].adminProjectApproval);
    style.val(myEvent.data[index].adminStyle);
    eventdetails.val(myEvent.data[index].eventDetails);
    facebook.val(myEvent.data[index].eventFacebookPage);
};

function SSLEvent(args) {
    args = args || {};
    this.eventType = args.eventType || "";
    this.eventDescription = args.eventDescription || "";
    this.eventEmailContact = args.eventEmailContact || "";
    this.eventPhoneContact = args.eventPhoneContact || "";
    this.eventExpectedAttendance = args.eventExpectedAttendance || "";
    this.eventTicketPrice = args.eventTicketPrice || "";
    this.eventProjectWebsite = args.eventProjectWebsite || "";
    this.eventProjectFacebook = args.eventProjectFacebook || "";
    this.eventProjectTwitter = args.eventProjectTwitter || "";
    this.eventProjectLink_1 = args.eventProjectLink_1 || "";
    this.eventProjectLink_2 = args.eventProjectLink_2 || "";
    this.eventProjectLink_3 = args.eventProjectLink_3 || "";
    this.adminWorkPermit = args.adminWorkPermit || "";
    //this.objectId = args.objectId || "";
}
