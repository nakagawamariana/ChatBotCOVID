function send_message() {setTimeout(function(){
    var div = document.createElement('div');
    div.textContent = document.getElementById('input_user').value;
    div.setAttribute('class', 'msg_out');
    document.getElementById('chat_msg').appendChild(div);
    }, 100);}

function write_response(){setTimeout(function(){
    var div = document.createElement('div');

    div.textContent = chatBot(document.getElementById('input_user').value);
    div.setAttribute('class', 'msg_in');
    document.getElementById('chat_msg').appendChild(div)
    document.getElementById('input_user').value = '';
    document.getElementById('input_user').value = '';
    }, 200);
}

function scrollbottom() {setTimeout(function(){
    let elmnt=document.getElementById("chat_msg");
    elmnt.scrollTop=elmnt.scrollHeight;
}, 300)}

function openchat(){setTimeout(function(){
    var chatbox = document.getElementById("chatbox_support");
    if (chatbox.style.display === "none" || chatbox.style.display === '')
    {chatbox.style.display="block";} else{
        chatbox.style.display="none";}
    }, 100);}

function closechat(){setTimeout(function(){
    var chatbox = document.getElementById("chatbox_support");
    chatbox.style.display="none";
    }, 100);}
    
function chatBot(input) {

	// current user input

	respondTo(input)
	/**
	 * respondTo
	 * 
	 * return nothing to skip response
	 * return string for one response
	 * return array of strings for multiple responses
	 * 
	 * @param input - input chat string
	 * @return reply of chat-bot
	 */
	function respondTo(input) {

		input = input.toLowerCase();
		alert(match('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)', input))
		if(match('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)', input))
			return "um... hi?";
		/**
		if(this.match('what[^ ]* up') || this.match('sup') || this.match('how are you'))
			return "this github thing is pretty cool, huh?";
		
		if(this.match('l(ol)+') || this.match('(ha)+(h|$)') || this.match('lmao'))
			return "what's so funny?";
		
		if(this.match('^no+(\\s|!|\\.|$)'))
			return "don't be such a negative nancy :(";
		
		if(this.match('(cya|bye|see ya|ttyl|talk to you later)'))
			return ["alright, see you around", "good teamwork!"];
		
		if(this.match('(dumb|stupid|is that all)'))
			return ["hey i'm just a proof of concept", "you can make me smarter if you'd like"];
		
		if(this.input == 'noop')
			return;
		
		return input + " what?"; 
		*/
	}
	
	/**
	 * match
	 * 
	 * @param regex - regex string to match
	 * @return boolean - whether or not the input string matches the regex
	 */
	function match(regex,input) {
	
		return new RegExp(regex).test(input);
	}
}

/* 
Send message automatically when enter pressed
The window onload function is necessary since the function takes 
the value before DOM is charged so it doesn't recognize the input
without this function.
*/
window.onload=function(){
    let input = document.getElementById('input_user');

    input.addEventListener("keydown", function(event) {
          if (event.keyCode === 13){
              document.getElementById("myBtn").click();
            /*send_message(); write_response();*/
        };
}
        ); 
    let btn = document.getElementById("myBtn");
    btn.addEventListener("click", () => {
        send_message();
        write_response();
        scrollbottom();

    });
    }

