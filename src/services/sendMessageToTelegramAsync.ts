import { Telegram } from 'telegraf';

import { NotificationMessage } from '../@types/NotificationMessage';

/**
 * Send the given message to telegram
 * @param message
 */
const sendMessageToTelegramAsync = async (message: NotificationMessage): Promise<void> => {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    // eslint-disable-next-line no-console
    console.error('Missing .env variable: TELEGRAM_BOT_TOKEN');
    process.exit(1);
  }

  if (!process.env.TELEGRAM_CHAT_ID) {
    // eslint-disable-next-line no-console
    console.error('Missing .env variable: TELEGRAM_CHAT_ID');
    process.exit(1);
  }

  try {
    const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

    // Send message
    const bot = await telegram.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      `*${message.title}*\n${message.content}\n\n_${new Date(message.date).toLocaleString()}_`,
      { parse_mode: 'Markdown' },
    );

    /* eslint-disable no-console */
    console.log('Message ID:', bot.message_id);
    console.log('Message receiver:', bot.chat.first_name ?? '', bot.chat.last_name ?? '');
  } catch (error) {
    console.error('Fail to send message..');
  }
};

export default sendMessageToTelegramAsync;
