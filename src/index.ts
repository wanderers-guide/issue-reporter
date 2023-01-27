import { Client, GatewayIntentBits, Collection, PermissionFlagsBits, } from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMessageReactions } = GatewayIntentBits
const client = new Client({ intents: [Guilds, MessageContent, GuildMessages, GuildMessageReactions] })
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
config()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
  require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.DISCORD_TOKEN);



// Run an express server for a webpage - unneeded in most cases
const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

// @ts-ignore
app.get('*', (req, res) => {
  res.send('Issue Reporter Bot');
});

app.listen(port, function () {
  console.log("API Server is running on "+ port +" port");
});