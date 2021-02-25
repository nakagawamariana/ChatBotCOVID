//Function to send message the user introduces
function send_message() {setTimeout(function(){
    //Create a div element in the html
    var div = document.createElement('div');
    //Assign to this div the text corresponding to the input of the user
    div.textContent = document.getElementById('input_user').value;
    //Assign class "msg_out" to this div element to differentiate it from "msg_in"
    div.setAttribute('class', 'msg_out');
    //Add the div element to the html so it can be seen
    document.getElementById('chat_msg').appendChild(div);
    }, 100);}

/*Function to write the response to the user
equal to the input of the user */
function write_response(){setTimeout(function(){
    //Create a div element in the html
    var div = document.createElement('div');
    //Assign to this div the text corresponding to the input of the user
    div.textContent = document.getElementById('input_user').value;
    //Assign class "msg_in"
    div.setAttribute('class', 'msg_in');
    //Add the div element to the section of tje html corresponding to the chat
    document.getElementById('chat_msg').appendChild(div)
    //Empty the input of the user 
    document.getElementById('input_user').value = '';
    }, 200);
}

//Function to scroll to the bottom automatically
function scrollbottom() {setTimeout(function(){
    let elmnt=document.getElementById("chat_msg");
    elmnt.scrollTop=elmnt.scrollHeight;
}, 300)}

//Function to open the chat when pressing the Cova/minimize buttons
function openchat(){setTimeout(function(){
    var chatbox = document.getElementById("chatbox_support");
    if (chatbox.style.display === "none" || chatbox.style.display === '')
    {chatbox.style.display="block";} else{
        chatbox.style.display="none";}
    }, 100);}

//Function to close the chat when pressing the Cova/minimize buttons
function closechat(){setTimeout(function(){
    var chatbox = document.getElementById("chatbox_support");
    chatbox.style.display="none";
    }, 100);}

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

