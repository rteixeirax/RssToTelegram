import { NotificationMessage } from '../@types/NotificationMessage';
import services from '../services';

class Worker {
  private notification: NotificationMessage | null;

  constructor() {
    this.notification = null;
  }

  async executeAsync(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Executed at', new Date().toUTCString());
    // eslint-disable-next-line no-console
    console.time('Time');

    await this.refreshNotificationsAsync();
    this.sendMessage();

    // eslint-disable-next-line no-console
    console.timeEnd('Time');
  }

  async refreshNotificationsAsync(): Promise<void> {
    const data = await services.fetchNotificationsAsync();

    console.log('=> data: ', data);

    if (data) {
      /**
       * 1.Order the notification by date;
       * 2.Get the most recent;
       * 3.If this.notification is null, set it with the most recent notification;
       * 4.If this.notification has data, compare the dates and if the most recent notification
       * is more recent, set this.notification with it;
       * 5.Sent the new notification;
       */

      // set the new notification
      this.notification = {
        sent: false,
        header: data.title,
        ...data.notifications[0],
      };
    }
  }

  sendMessage(): void {
    if (this.notification && !this.notification.sent) {
      console.log('New notification...');

      // Mark the notification has sent
      this.notification.sent = true;
    }
  }
}

export default Worker;
