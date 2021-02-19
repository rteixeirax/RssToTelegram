export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';

export const DATE_LOCALE = process.env.DATE_LOCALE!;
export const REFRESH_INTERVAL_MINUTES = process.env.REFRESH_INTERVAL_MINUTES!;

export const RSS_XML_DATA_URL = process.env.RSS_XML_DATA_URL!;

export const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
