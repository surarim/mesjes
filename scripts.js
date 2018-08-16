<script>

// Функция чтения сообщений
message_read = setTimeout(function tick()
    {
    var req = new XMLHttpRequest();
    req.open('POST', '/read', true);
    req.onreadystatechange = function()
        {
	    if (req.readyState == XMLHttpRequest.DONE && req.status == 200)
            {
            if (req.responseText != "")
                { document.getElementById("fullchat").innerHTML = req.responseText; }
                else { document.getElementById("fullchat").innerHTML = ""; }
            }
        }
    req.send();
    //
    message_read = setTimeout(tick, 1000);
    }, 1000);

// Функция отправки сообщения
function message_send(event)
    {
    if (event.keyCode == 13)
        {
        username = document.getElementById("username").value;
        message_text = document.getElementById("message").value;
        document.getElementById("message").value = "";
        var req = new XMLHttpRequest();
        req.open('POST', '/add', true);
        req.send("<b>"+username+":</b> "+message_text+"<br>");
        };
    };

// Функция очистки чата
function clear_chat(event)
    {
    username = document.getElementById("username").value;
    var req = new XMLHttpRequest();
    req.open('POST', '/clear', true);
    req.send(username);
    };

// Функция изменения имени пользователя
function username_change(event)
    {
    if (event.keyCode == 13)
        {
        message_text = document.getElementById("username").value;
        document.getElementById("username").value = "";
        };
    };

</script>
