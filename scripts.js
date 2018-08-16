<script>

// Function read messages
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
    document.getElementById('fullchat').scrollTop =  document.getElementById('fullchat').scrollHeight;
    message_read = setTimeout(tick, 1000);
    }, 1000);

// Function send message
// Функция отправки сообщения
function message_send(event)
    {
    if (event.keyCode == 13)
        {
        username = document.getElementById("username").value;
        message_text = document.getElementById("message").value;
        if (message_text != "" && message_text.match(/^\s+$/) === null)
            {
            document.getElementById("message").value = "";
            var req = new XMLHttpRequest();
            req.open('POST', '/add', true);
            req.send("<b>"+username+":</b> "+message_text+"<br>");
            };
        };
    };

// Function clear chat
// Функция очистки чата
function clear_chat(event)
    {
    username = document.getElementById("username").value;
    var req = new XMLHttpRequest();
    req.open('POST', '/clear', true);
    req.send(username);
    };

// Function get cookie
// Функция полученея cookie
function getCookie(name)
    {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    };

// Load cookie (username)
// Загрузка cookie (имя пользователя)
window.onload = function() { document.getElementById("username").value = getCookie("username"); };

// Function change username
// Функция изменения имени пользователя
function username_change(event)
    {
    if (event.keyCode == 13) { document.cookie = "username=" + document.getElementById("username").value; };
    };

</script>
