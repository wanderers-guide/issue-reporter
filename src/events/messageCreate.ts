import { Message } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
  name: "messageCreate",
  execute: async (message: Message) => {
    if (!message.member || message.member.user.bot) return;
    if (!message.guild || !message.content) return;
    if(message.channelId !== process.env.DISCORD_CHANNEL_ID) return;
    if(!message.content.toLowerCase().includes(process.env.DISCORD_MESSAGE_IDENTIFIER.toLowerCase())) return;

    if(process.env.DISCORD_MESSAGE_REACTION.trim().length > 0){
      message.react(process.env.DISCORD_MESSAGE_REACTION);
    }

    try {
      const title = (message.content.split('\n').find((line) => {
        return line.toLowerCase().includes(process.env.DISCORD_MESSAGE_IDENTIFIER.toLowerCase());
      })+'').replace(new RegExp(process.env.DISCORD_MESSAGE_IDENTIFIER, 'i'), '').replace(/[^0-9a-zA-Z ]+/g, '').trim();

      const reporter = `${message.author.username}#${message.author.discriminator}`;

      const attachments = [...message.attachments.values()].map((attachment) => {
        return {
          name: attachment.name || 'Image',
          url: attachment.url,
        };
      });

      createIssue(reporter, title, message.content, attachments).then((result) => {

        message.reply({
          content: `${process.env.DISCORD_MESSAGE_REPLY_PREFIX}\n${result.url}\n\n${process.env.DISCORD_MESSAGE_REPLY_SUFFIX}`,
          allowedMentions: { repliedUser: true }
        });

      });
    } catch (e) {
      console.warn(`Error with creating GitHub issue! ${e}`);
    }

  }
}

async function createIssue(reporter: string, title: string, messageContent: string, attachments: {name: string, url: string}[]){

  let attachStr = '';
  if(attachments.length > 0){
    attachStr = '\n_Attachments:_\n---';
    for(let attachment of attachments){
      attachStr += `\n![${attachment.name}](${attachment.url} "${attachment.name}")`;
    }
  }

  const resp = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/issues`, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      title: `${process.env.GITHUB_ISSUE_PREFIX.trim().length > 0 ? `${process.env.GITHUB_ISSUE_PREFIX} ` : ``}${title}`,
      body: `_Reported by:_ ${reporter}\n---\n${messageContent}\n${attachStr}`,
      labels: process.env.GITHUB_ISSUE_LABELS.trim().length > 0 ? process.env.GITHUB_ISSUE_LABELS.split(',') : [],
    }),
  });
  const result = await resp.json();

  return {
    id: result.id,
    title: result.title,
    url: result.html_url,
    state: result.state,
  }

}

export default event;