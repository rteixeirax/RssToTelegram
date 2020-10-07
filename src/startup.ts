import axios from 'axios';

const fetchNotificationsAsync = async () => {
  if (!process.env.XML_DATA_URL) {
    // eslint-disable-next-line no-console
    console.error('Missing XML_DATA_URL .env variable');
    process.exit(1);
  }

  const xml = await axios.get(process.env.XML_DATA_URL);

  console.log('data: ', xml.data);
};

fetchNotificationsAsync();
