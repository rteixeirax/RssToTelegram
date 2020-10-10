import { Telegram } from 'telegraf';
import TurndownService from 'turndown';

import { NotificationMessage } from '../@types/NotificationMessage';
import services from '../services';

class Worker {
  private telegramBot: Telegram;
  private turndownService: TurndownService;
  private lastMessageDate: string | null;

  constructor() {
    this.telegramBot = new Telegram(process.env.TELEGRAM_BOT_TOKEN!);
    this.turndownService = new TurndownService();
    this.lastMessageDate = null;
  }

  async startAsync(): Promise<void> {
    // Execute on the boot.
    await this.executeAsync();

    // Convert minutes to milliseconds
    const refreshInterval =
      parseInt(process.env.REFRESH_INTERVAL_MINUTES!, 10) * 60 * 1000;

    // After the first request, execute on every REFRESH_INTERVAL_MINUTES
    setInterval(() => {
      this.executeAsync();
    }, refreshInterval);
  }

  async executeAsync(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('\nExecuted at', new Date().toLocaleString());
    // eslint-disable-next-line no-console
    console.time('Duration');

    await this.refreshNotificationsAsync();

    // eslint-disable-next-line no-console
    console.timeEnd('Duration');
  }

  async refreshNotificationsAsync(): Promise<void> {
    const notifications = await services.fetchNotificationsAsync();

    if (notifications) {
      // If there is no message in "cache", set it with the most recent notification.
      if (!this.lastMessageDate) {
        // eslint-disable-next-line no-await-in-loop
        await this.sendMessageAsync(notifications[0]);

        // Check each notification and if it is newer, sent a new message.
      } else {
        // We need to iterate through the array backwards to make sure
        // all new notifications are send and not only the newest...
        for (let i = notifications.length - 1; i >= 0; i -= 1) {
          const notification = notifications[i];

          if (
            Date.parse(notification.date) > Date.parse(this.lastMessageDate)
          ) {
            // eslint-disable-next-line no-await-in-loop
            await this.sendMessageAsync(notification);
          }
        }
      }
    }
  }

  async sendMessageAsync(message: NotificationMessage): Promise<void> {
    const success = await services.sendTelegramMessageAsync(
      this.telegramBot,
      this.turndownService,
      message
    );

    if (success) {
      this.lastMessageDate = message.date;
    }
  }
}

export default Worker;
