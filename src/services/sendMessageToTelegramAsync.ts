import { Telegram } from 'telegraf';
import TurndownService from 'turndown';

import { NotificationMessage } from '../@types/NotificationMessage';

/**
 * Send the given message to telegram
 * @param message
 */
const sendMessageToTelegramAsync = async (message: NotificationMessage): Promise<void> => {
  try {
    const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN!);

    // Clear the html tags and convert them in Markdown
    const turndownService = new TurndownService();
    const msgContent = turndownService.turndown(message.content);

    // Send message
    const bot = await telegram.sendMessage(
      process.env.TELEGRAM_CHAT_ID!,
      `*${message.title}*\n${msgContent}\n\n_${new Date(message.date).toLocaleString()}_`,
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
