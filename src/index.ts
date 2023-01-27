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

client.login(process.env.DISCORD_TOKEN)