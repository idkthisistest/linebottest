'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: '0hb84/SzGQcdN6B7x51UurAH36bpi1xxRkCDZIwfjYVF8Fo1bPk2ksUPqpMfPpvx9F3U58gKdNGpu/6N4ZnnQCaM60+UmKzsUd4mo9BCJ3BgbPLpaO4Cm9Lm5OKuq/Em4kndES6+LgIV/MYQANotmQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'b3f9c2cf695984a6a0d69cf7c932ae8c',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 70 || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});