/*tooltip function*/
$(function() {
    $( document ).tooltip();
  });


$('#signinButton').click(function(){
		
		var user = $('#user').val();
		var pass = $('#pass').val();{
		console.log("test user");
			if (user == ""){
				alert(response.error);
		} 	else {
				window.location.assign("list.html");

				};
		
			}
		});



$('#signinButton').click(function(){
	console.log(user);
		$.each(data, function(key, val){
		console.log(val.user);
		
		$(".user").html("Welcome: " + val.firstname);
			})
		});



//tester
var item = 10;
var item2 = 11;
var total = item += item2;
console.log(total);

/*date picker function*/
$(function() {
    $( "#datepicker" ).datepicker();
  });



//$('#register').click(function(){
function Submit(){
		var firstname = $('#firstname').val();
		var last = $('#last').val();
		var email = $('#email').val();
		var telephone = $('#telephone').val();
		var datepicker = $('#datepicker').val();
		var user = $('#user').val();
		var pass = $('#pass').val();{
		console.log("test user");

			if($("#firstname").val() == "" ){
   				$("#firstname").focus();
   				$("#errorBox").html("enter the First Name");
   			return false;
   		}
   	};
};



function Submit(){
		var firstname = $('#firstname').val();
		var last = $('#last').val();
		var email = $('#email').val();
		var telephone = $('#telephone').val();
		var datepicker = $('#datepicker').val();
		var user = $('#user').val();
		var pass = $('#pass').val();{
		console.log("test user");

			if($("#firstname").val() == "" ){
   				$("#firstname").focus();
   				$("#errorBox").html("enter the First Name");
   			return false;
   		}
   	};
};


// Userlist data array for filling in info box
var user = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/todo/users', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.uname + '">' + this.uname + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#user table tbody').html(tableContent);
    });
};

