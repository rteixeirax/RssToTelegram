import { REFRESH_INTERVAL_MINUTES } from '../core/constants';

import consoleWriteLine from '../core/tools/consoleWriteLine';
import date from '../core/tools/date';

import Notification from './Notification';

class Worker {
  private readonly notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  async startAsync(): Promise<void> {
    // Execute the boot.
    await this.executeAsync();

    // Convert minutes to milliseconds
    const refreshInterval = parseInt(REFRESH_INTERVAL_MINUTES!, 10) * 60 * 1000;

    // After the first request, execute on every REFRESH_INTERVAL_MINUTES
    setInterval(() => {
      this.executeAsync();
    }, refreshInterval);
  }

  async executeAsync(): Promise<void> {
    consoleWriteLine('Executed..', true);
    const begin = date.now();
    await this.notification.refreshAsync();
    const end = date.now();
    consoleWriteLine(`Duration: ${date.diff(end, begin)}ms`);
  }
}

export default Worker;
