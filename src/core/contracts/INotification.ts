import { NotificationMessage } from '../types';

export interface INotification {
  /**
   * Get the data from the given URL, parse the XML to JavaScript object,
   * prepares the data for each notification and send the most recent notifications to telegram
   */
  refreshAsync(): Promise<void>;

  /**
   * Send the given message to telegram
   * @param message
   * @returns true if success, false if not.
   */
  sendAsync(message: NotificationMessage): Promise<void>;
}
