import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js"

export interface BotEvent {
  name: string,
  once?: boolean | false,
  execute: (...args) => void
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string,
      DISCORD_CLIENT_ID: string,
      DISCORD_CHANNEL_ID: string,
      DISCORD_MESSAGE_IDENTIFIER: string,
      DISCORD_MESSAGE_REACTION: string,
      DISCORD_MESSAGE_REPLY_PREFIX: string,
      DISCORD_MESSAGE_REPLY_SUFFIX: string,
      
      GITHUB_ACCESS_TOKEN: string,
      GITHUB_REPO_OWNER: string,
      GITHUB_REPO_NAME: string,
      GITHUB_ISSUE_PREFIX: string,
      GITHUB_ISSUE_LABELS: string,
    }
  }
}