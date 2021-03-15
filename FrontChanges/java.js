var input = "";

function loadresponse(){
    document.getElementById('spinner').remove();
    fetch('/get-response', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        //Create a div element in the html
        var div = document.createElement('div');
        //Assign to this div the text corresponding to the input of the user
        var response = data.response;
        response = (response.replace(/\n/g, '<br />'))
        div.innerHTML += response;
        //Assign class "msg_in"
        div.setAttribute('class', 'msg_out');
        //Add the div element to the section of tje html corresponding to the chat
        document.getElementById('chat_msg').appendChild(div);
        scrollbottom2()
    })}

function spinner() {setTimeout(function(){
    document.getElementById('chat_msg').innerHTML += "<div class='spinner' id='spinner'><div class='double-bounce1'></div<div class='double-bounce2'></div></div>";
}, 200)}

//Function response to the user
function send_message() {setTimeout(function(){
    
    //Obtain value from input_user 
    input = input;

    //If input_user is empty, it does not send anything
    //if(input.trim() == '' ) return false;

    fetch('/new', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({input:input})
    })
    .then(res => res.text())
    .then(data=> {
    console.log(data)
    loadresponse()});
    
    }, 1200);}

/*Function input of the user*/
function write_response(){setTimeout(function(){
    //Create a div element in the html
    var div = document.createElement('div');
    input = document.getElementById('input_user').value;
    //Assign to this div the text corresponding to the input of the user
    div.textContent = document.getElementById('input_user').value;
    //Assign class "msg_in"
    div.setAttribute('class', 'msg_in');
    //Add the div element to the section of tje html corresponding to the chat
    document.getElementById('chat_msg').appendChild(div);
    //Empty the input of the user 
    document.getElementById('input_user').value = '';
    }, 100);
}

//Function to scroll to the bottom automatically
function scrollbottom() {setTimeout(function(){
    alert(scrollbottom)
    let elmnt=document.getElementById("chat_msg");
    elmnt.scrollTop=elmnt.scrollHeight;
}, 100)}

function scrollbottom2() {setTimeout(function(){
    alert(scrollbottom2)
    let elmnt=document.getElementById("chat_msg");
    elmnt.scrollTop=elmnt.scrollHeight;
}, 100)}

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
        write_response();
        spinner();
        send_message();
        scrollbottom();
        scrollbottom2();

    });
    }

