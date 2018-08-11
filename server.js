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

  if(event.type !== 'message' || event.message.type !== 'text'){
    return;
  }
  
  const echo = {type: 'text', text: event.message.text}
  const tst = event.message.text
  const kw = [
    tst == '~',
    tst == '~doin',
    tst == '~8ball',
    tst == '~8balls'
  ];  
  var args = tst[3].substring(0, 7);
  if(kw[0]){
    const berdel = {type: 'text', text: "Tolong tulis commandnya, coba lihat ~list"}
    return client.replyMessage(event.replyToken, berdel)
    }
  if(kw[1]){
    const berdel = {type: 'text', text: "Ok Then"}
    return client.replyMessage(event.replyToken, berdel)
    }
  if(kw[2]){
    const berdel = {type: 'text', text: "Tulis apa yang kamu ingin tanya setelah command!"}
    return client.replyMessage(event.replyToken, berdel)
    }
  if(args){
    var psb = [
      "Pasti Dong!",
      "Kurang tau kalau itu...",
      "Mungkin?",
      "Bener Banget!",
      "Gk juga sih",
      "Nggak!!!",
      "Apaan sih?"
    ]
    const berdel = {type: 'text', text: (psb[Math.floor(Math.random() * psb.length)])}
    return client.replyMessage(event.replyToken, berdel)
    
  }


  }
















// listen on port
const hostname = '0.0.0.0'
const port = process.env.PORT || port;
app.listen(port, hostname, () => {
  console.log(`listening on ${port}`);
});