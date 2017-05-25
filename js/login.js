/**
 * Created by jared on 4/23/16.
 */
var APPLICATION_ID = '5EE80B83-A886-31A6-FF00-35D2455B2A00',
    SECRET_KEY = 'C78F667A-4E97-4864-FF4B-2F6991E7C300',
    VERSION = 'v1'; //default application version;
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
var eventStorage;
var myEvent;
var objectId;

$(document).ready(function() {

    var submit = $("#loginSubmit");

    submit.click(function(){

        //Do login
        var user = $("#username").val();
        var pass = $("#password").val();

        var user = Backendless.UserService.login(user, pass, true);
        var session = Backendless.LocalCache.get("user-token");

        if (session) {
            console.log(session);
            window.location.href='panel.html';
            console.log("submitted redirect");
        }
    });
});

var updateEvent = function() {
    var currentEvent = $('#selectEvent').val();
    var index = $('#selectEvent').prop('selectedIndex');
    objectId = myEvent.data[index].objectId;

    console.log("Event is: " + currentEvent);
    var dataQuery = {
        relations: {condition: "eventName = "+currentEvent}
    }
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

function SSLEventData(args) {
    args = args || {};
    this.eventName = args.eventName || "";
    this.eventDetails = args.eventDetails || "";
    this.objectId = args.objectId || "";
}
