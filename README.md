# Fetch Discord Messages
This will allow you to fetch all messages from a discord channel
Installation:
```npm i fetch-discord-messages```
Sample Usage:
```js
const Discord = require('discord.js');
const { fetchAll } = require('fetch-discord-messages')

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});

let channelID = "1224677555844419655";
client.on('ready', async () => {
    console.log("Logged in");
    console.log("Fetching Messages");
    let messages = await fetchAll(client, channelID);
    console.log(messages)
});

client.login(process.env.TOKEN);
```
