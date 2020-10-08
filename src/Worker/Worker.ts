import { NotificationMessage } from '../@types/NotificationMessage';
import services from '../services';

class Worker {
  private message: NotificationMessage | null;

  constructor() {
    this.message = null;
  }

  async executeAsync(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Executed at', new Date().toUTCString());
    // eslint-disable-next-line no-console
    console.time('Time');

    await this.refreshNotificationsAsync();

    // eslint-disable-next-line no-console
    console.timeEnd('Time');
  }

  async refreshNotificationsAsync(): Promise<void> {
    const notifications = await services.fetchNotificationsAsync();

    console.log('=> notifications: ', notifications);

    if (notifications) {
      // If there is no message in "cache", set it with the most recent notification.
      if (!this.message) {
        this.message = { sent: false, ...notifications[0] };

        // Check each notification and if it is newer, sent a new message.
      } else {
        for (let i = 0; i < notifications.length; i += 1) {
          const notification = notifications[i];

          if (Date.parse(notification.date) > Date.parse(this.message.date)) {
            this.message = { sent: false, ...notification };

            // eslint-disable-next-line no-await-in-loop
            await this.sendMessageAsync();
          }
        }
      }
    }
  }

  async sendMessageAsync(): Promise<void> {
    if (this.message && !this.message.sent) {
      // eslint-disable-next-line no-console
      console.log('Send new message...');

      // Mark the notification as sent
      this.message.sent = true;
    }
  }
}

export default Worker;
