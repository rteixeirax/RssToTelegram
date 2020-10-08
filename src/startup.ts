import Worker from './Worker';

/* eslint-disable no-console */
if (!process.env.RSS_XML_DATA_URL) {
  console.error('Missing .env variable: RSS_XML_DATA_URL');
  process.exit(1);
}

if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('Missing .env variable: TELEGRAM_BOT_TOKEN');
  process.exit(1);
}

if (!process.env.TELEGRAM_CHAT_ID) {
  console.error('Missing .env variable: TELEGRAM_CHAT_ID');
  process.exit(1);
}
/* eslint-enable no-console */

const worker = new Worker();

worker.executeAsync();
