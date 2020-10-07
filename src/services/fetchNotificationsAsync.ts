import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NotificationReponse } from '../@types/NotificationReponse';

const fetchNotificationsAsync = async (): Promise<NotificationReponse | null> => {
  if (!process.env.XML_DATA_URL) {
    // eslint-disable-next-line no-console
    console.error('Missing .env variable: XML_DATA_URL');
    process.exit(1);
  }

  try {
    const request = await axios.get(process.env.XML_DATA_URL)
      .then((res) => res)
      .catch((error) => error.response);

    if (request?.status === 200) {
      const xmlObj = await parseStringPromise(request?.data);

      return {
        title: xmlObj?.rss?.channel[0]?.title[0],
        notifications: xmlObj?.rss?.channel[0]?.item
          .map((item: any) => ({
            title: item.title[0],
            description: item.description[0],
            date: item.pubDate[0],
          })),
      };
    }

    // eslint-disable-next-line no-console
    console.error('Fail to fetch data with code', request.status);
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Something went wrong on fetchNotificationsAsync service.');
    return null;
  }
};

export default fetchNotificationsAsync;
