/*Front end chat app  */

window.onload = function(){
	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	
	socket.on('message', function (data) {
		if(data.message){
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.length; i++){
				html += '<br>' + (messages[i].username ? message[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
			}
			content.innerHTML = html;
		}else{
			console.log("There is an error. Try again.", data);			
			}
	})
	sendButton.onclick = function(){
		if(name.value == ""){
			alert("Please type your username");
		} else {
			var text = field.value;
			socket.emit('send', { message: text, username: name.value });
		}
	}
};
	
