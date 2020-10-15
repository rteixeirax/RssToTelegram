# RssToTelegram (rss-to-telegram)

[![Licence](https://img.shields.io/github/license/ricardotx/RssToTelegram?label=Licence&logo=github)](https://github.com/ricardotx/RssToTelegram/blob/main/LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/ricardotx/RssToTelegram?logo=github&label=Release)](https://github.com/ricardotx/RssToTelegram/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/ricardotx/rss-to-telegram?logo=docker&label=Docker%20pulls)](https://hub.docker.com/r/ricardotx/rss-to-telegram)
[![Tests](https://github.com/ricardotx/RssToTelegram/workflows/Tests/badge.svg)](https://github.com/ricardotx/RssToTelegram/actions?query=workflow%3ATests)
[![Build](https://github.com/ricardotx/RssToTelegram/workflows/Build/badge.svg)](https://github.com/ricardotx/RssToTelegram/actions?query=workflow%3ABuild)

This is a simple container app that will fetch the XML from the RSS url and send the latest items as notification to your **Telegram** *bot*.

*Set the interval between each fetch in an easy way so you don't miss anything.*

# Usage

👉 You can do it by using ***docker-compose*** or ***docker cli***.

### Docker-compose

````yaml
version: "3"
services:
  rss-to-telegram:
    container_name: rss-to-telegram
    image: ricardotx/rss-to-telegram
    restart: unless-stopped
    environment:
      - DATE_LOCALE=pt
      - REFRESH_INTERVAL_MINUTES=5
      - RSS_XML_DATA_URL=https://your.rss.url/rss
      - TELEGRAM_CHAT_ID=your_telegram_chat_id
      - TELEGRAM_BOT_TOKEN=your_telegram_bot_token
````

### Docker cli

````
docker run -d \
  --name=rss-to-telegram \
  -e DATE_LOCALE=pt \
  -e REFRESH_INTERVAL_MINUTES=5 \
  -e RSS_XML_DATA_URL=https://your.rss.url/rss \
  -e TELEGRAM_CHAT_ID=your_telegram_chat_id \
  -e TELEGRAM_BOT_TOKEN=your_telegram_bot_token \
  --restart unless-stopped \
  ricardotx/rss-to-telegram
````

## Environment  variables

| Variable | Function |
| --- | --- |
| ` DATE_LOCALE` | Specify a date local.  |
| ` REFRESH_INTERVAL_MINUTES` | Interval between refreshes. |
| ` RSS_XML_DATA_URL` | http address to the rss data. |
| ` TELEGRAM_CHAT_ID` | Chat id of your telegram. |
| ` TELEGRAM_BOT_TOKEN` | Token of your telegram bot. |

