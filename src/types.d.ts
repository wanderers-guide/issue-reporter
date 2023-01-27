import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js"

export interface SlashCommand {
  command: SlashCommandBuilder | any,
  execute: (interaction: CommandInteraction) => void,
  autocomplete?: (interaction: AutocompleteInteraction) => void,
  cooldown?: number // in seconds
}

export interface Command {
  name: string,
  execute: (message: Message, args: Array<string>) => void,
  permissions: Array<PermissionResolvable>,
  aliases: Array<string>,
  cooldown?: number,
}

interface GuildOptions {
  prefix: string,
}

export interface BotEvent {
  name: string,
  once?: boolean | false,
  execute: (...args) => void
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string,
      CLIENT_ID: string,
      PREFIX: string,
      MONGO_URI: string,
      MONGO_DATABASE_NAME: string
    }
  }
}