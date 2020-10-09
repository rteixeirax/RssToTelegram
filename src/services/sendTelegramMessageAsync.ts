import { Telegram } from 'telegraf';
import TurndownService from 'turndown';
import { NotificationMessage } from '../@types/NotificationMessage';

/**
 * Send the given message to telegram
 * @param message
 * @returns true if success, false if not.
 */
const sendTelegramMessageAsync = async (
  telegramBot: Telegram,
  turndownService: TurndownService,
  message: NotificationMessage,
): Promise<boolean> => {
  try {
    // Clear the html tags and convert them in Markdown
    const msgContent = turndownService.turndown(message.content);

    // Send message
    const botResponse = await telegramBot.sendMessage(
      process.env.TELEGRAM_CHAT_ID!,
      `*${message.title}*\n${msgContent}\n\n_${new Date(message.date).toLocaleString()}_`,
      { parse_mode: 'Markdown' },
    );

    /* eslint-disable no-console */
    console.log('Message ID:', botResponse.message_id);
    console.log('Message receiver:', botResponse.chat.first_name ?? '', botResponse.chat.last_name ?? '');

    return true;
  } catch (error) {
    console.error('Fail to send message..');

    return false;
  }
};

export default sendTelegramMessageAsync;
