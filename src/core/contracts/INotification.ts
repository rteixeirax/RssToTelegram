import { NotificationMessage } from '../types';

export interface INotification {
  /**
   * Init the notification process
   */
  init(): Promise<void>;

  /**
   * Get the data from the given URL and parse the XML to JavaScript object.
   */
  fetchAsync(): Promise<any>;

  /**
   * Prepares the data for each notification and send the most recent notifications to telegram
   */
  refreshAsync(data: any): Promise<void>;

  /**
   * Send the given message to telegram
   * @param message
   * @returns true if success, false if not.
   */
  sendAsync(message: NotificationMessage): Promise<void>;
}
