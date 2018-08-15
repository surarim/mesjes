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
        message_text = document.getElementById("message").value;
        document.getElementById("message").value = "";
        var req = new XMLHttpRequest();
        req.open('POST', '/add', true);
        req.send(message_text+"<br>");
        };
    };

</script>
