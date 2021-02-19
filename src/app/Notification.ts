import RSSParser, { Item } from 'rss-parser';
import { Telegraf } from 'telegraf';
import TurndownService from 'turndown';

import { IS_TEST, RSS_XML_DATA_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../core/constants';

import consoleWriteLine from '../core/tools/consoleWriteLine';
import date from '../core/tools/date';

import { INotification } from '../core/contracts';
import { NotificationMessage } from '../core/types';

class Notification implements INotification {
  private bot: Telegraf;
  private turndownService: TurndownService;
  private lastMessageDate: string | null;

  constructor() {
    this.bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    this.turndownService = new TurndownService();
    this.lastMessageDate = null;
  }

  async init(): Promise<void> {
    const data = await this.fetchAsync();
    await this.refreshAsync(data);
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchAsync(): Promise<any> {
    try {
      const parser = new RSSParser({
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        },
      });

      /* istanbul ignore next */
      if (!IS_TEST) {
        // Get the data from the RSS url and parse the XML to JavaScript object.
        const data = await parser.parseURL(RSS_XML_DATA_URL);
        return data;
      }

      return null;
      /* istanbul ignore next */
    } catch (error) {
      consoleWriteLine('Fail to fetch data..', false, true);
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async refreshAsync(data: any): Promise<void> {
    if (data?.items?.length) {
      // Prepare each notification data
      const preparedData = data?.items.map((item: Item) => ({
        title: item.title ?? '',
        content: item.content ?? '',
        date: item.pubDate ?? '',
      }));

      // Order the notification by date
      const notifications = preparedData.sort((a: any, b: any) => {
        return date.diff(b.date, a.date);
      });

      // If there is no message in "cache", set it with the most recent notification.
      if (!this.lastMessageDate) {
        await this.sendAsync(notifications[0]);

        // Check each notification and if it is newer, sent a new message.
      } else {
        // We need to iterate through the array backwards to make sure
        // all new notifications are send and not only the newest...
        for (let i = notifications.length - 1; i >= 0; i -= 1) {
          const notification = notifications[i];

          if (date.isAfter(this.lastMessageDate, notification.date)) {
            // eslint-disable-next-line no-await-in-loop
            await this.sendAsync(notification);
          }
        }
      }
    }
  }

  async sendAsync(message: NotificationMessage): Promise<void> {
    try {
      // Clear the html tags and convert them in Markdown
      const msgContent = this.turndownService.turndown(message.content);

      // Send message
      /* istanbul ignore next */
      if (!IS_TEST) {
        const botResponse = await this.bot.telegram.sendMessage(
          TELEGRAM_CHAT_ID,
          `*${message.title}*\n\n${msgContent}\n\n_${date.display(message.date)}_`,
          { parse_mode: 'Markdown' }
        );

        consoleWriteLine(
          `Message ID: ${botResponse.message_id} | Receiver: ${
            (botResponse.chat as any).first_name ?? ''
          } ${(botResponse.chat as any).last_name ?? ''}`
        );
      }

      // Save the date of the last notification sent.
      this.lastMessageDate = message.date;

      /* istanbul ignore next */
    } catch (error) {
      consoleWriteLine('Fail to send message..', false, true);
    }
  }
}

export default Notification;
