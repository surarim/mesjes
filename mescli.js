#!/usr/local/bin/node

const https = require('https');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
var fs = require('fs');
var mes_srv = fs.readFileSync('mes_srv', 'utf8');

//read full chat
let messages_len = 0;
function mesjes_read()
{
  https.get(mes_srv + '/read', (resp) =>
        {
        let data = '';
        resp.on('data', (chunk) => { data += chunk; });
        resp.on('end', () =>
            {
            if (messages_len != data.length)
                {
                messages_len = data.length;
                console.log(data);
                rl.prompt();
                }
            });
        }).on("error", (err) => { console.log("Error: " + err.message); });
}
mesjes_read()
setInterval(mesjes_read, 10000);

//read message and send to server
rl.on('line', (line) =>
    {
    switch(line.trim())
        {
        case 'exit':
            rl.close();
        default:
            https.get(mes_srv + '/add?'+line.trim(), (resp) =>
                {
                let data = '';
                resp.on('data', (chunk) => { data += chunk; });
                resp.on('end', () =>
                    {
                    console.log(data);
                    rl.prompt();
                    });
                }).on("error", (err) => { console.log("Error: " + err.message); });
            break;
        }
}).on('close', () => { process.exit(0); });
