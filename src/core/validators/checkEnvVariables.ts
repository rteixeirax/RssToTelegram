import {
  DATE_LOCALE,
  REFRESH_INTERVAL_MINUTES,
  RSS_XML_DATA_URL,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
} from '../constants';

/**
 * Check if all the needed .env variables are set.
 * If not, show the missing ones and stop the app.
 */
export const checkEnvVariables = (): void => {
  const errors: string[] = ['Missing enviroment variable(s):'];

  if (!DATE_LOCALE) {
    errors.push('DATE_LOCALE');
  }

  if (!REFRESH_INTERVAL_MINUTES) {
    errors.push('REFRESH_INTERVAL_MINUTES');
  }

  if (!RSS_XML_DATA_URL) {
    errors.push('RSS_XML_DATA_URL');
  }

  if (!TELEGRAM_BOT_TOKEN) {
    errors.push('TELEGRAM_BOT_TOKEN');
  }

  if (!TELEGRAM_CHAT_ID) {
    errors.push('TELEGRAM_CHAT_ID');
  }

  if (errors.length > 1) {
    errors.forEach((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });

    // Kill the process.
    process.exit(1);
  }
};
