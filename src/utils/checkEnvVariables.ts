/**
 * Check if all the needed .env variables are set.
 * If not, show the missing ones and stop the app.
 */
const checkEnvVariables = (): void => {
  const errors: string[] = ['Missing enviroment variable(s):'];

  if (!process.env.REFRESH_INTERVAL_MINUTES) {
    errors.push('REFRESH_INTERVAL_MINUTES');
  }

  if (!process.env.RSS_XML_DATA_URL) {
    errors.push('RSS_XML_DATA_URL');
  }

  if (!process.env.TELEGRAM_BOT_TOKEN) {
    errors.push('TELEGRAM_BOT_TOKEN');
  }

  if (!process.env.TELEGRAM_CHAT_ID) {
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

export default checkEnvVariables;
