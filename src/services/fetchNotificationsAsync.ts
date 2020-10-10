import RSSParser, { Item } from 'rss-parser';

import { NotificationReponse } from '../@types/NotificationReponse';

/**
 * Get the data from the given URL, parse the XML to JavaScript object,
 * prepares the data for each notification and return an array with all the
 * notifications ordered by date.
 */
const fetchNotificationsAsync = async (): Promise<
  NotificationReponse[] | null
> => {
  try {
    const parser = new RSSParser({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      },
    });

    const data = await parser.parseURL(process.env.RSS_XML_DATA_URL!);

    if (data?.items?.length) {
      const notifications = data?.items.map((item: Item) => ({
        title: item.title ?? '',
        content: item.content ?? '',
        date: item.pubDate ?? '',
      }));

      return notifications.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Fail to fetch data..');
    return null;
  }
};

export default fetchNotificationsAsync;
