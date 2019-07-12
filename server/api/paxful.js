const axios = require('axios');
const CryptoJS = require('crypto-js');

const router = require('express').Router();

const {apiKey, secret, accountSid, authToken} = require('../../secrets');
const client = require('twilio')(accountSid, authToken);
const {User} = require('../db/models');

router.get('/sendText', (req, res) => {
  try {
    client.messages
      .create({
        body: 'New Transaction',
        from: '+19172017304',
        to: '+19176583370'
      })
      .then(message => console.log(message.sid))
      .done();
    res.status(201).send('Transmission successful');
  } catch (err) {
    console.error(err);
  }
});

router.get('/', (req, res, next) => {
  res.send('Welcome to the home page!');
});

router.get('/test', async (req, res, next) => {
  try {
    res.send('Test is working');
  } catch (err) {
    next(err);
  }
});

const getTrades = async () => {
  try {
    const body = 'apikey=' + apiKey + '&nonce=' + Date.now();
    const seal = CryptoJS.HmacSHA256(body, secret).toString();

    const postBody = body + '&apiseal=' + seal;
    // console.log('postBody is', postBody);
    const headers = {
      'content-type': 'text/plain',
      Accept: ' application/json; version=1'
    };

    const response = await axios.post(
      `https://paxful.com/api/trade/list`,
      postBody,
      {headers}
    );
    const {data} = response.data;
    // console.log('headers', response.headers);
    console.log('response', data);
    const {count} = data;

    const user = await User.findOne({where: {id: 1}});
    if (count > user.tradeCount) {
      console.log('new trade!');
      sendText();
    }
    await user.update({tradeCount: count});
    // console.log('found user', user.email);
  } catch (err) {
    console.error(err);
  }
};

const sendText = async () => {
  try {
    client.messages
      .create({
        body: 'New Transaction',
        from: '+19172017304',
        to: '+19176583370'
      })
      .then(message => console.log(message.sid))
      .done();
    // res.status(201).send('Transmission successful');
  } catch (err) {
    console.error(err);
  }
};

startTrades = () => {
  getTrades();
  setInterval(() => {
    // console.log('inside interval');
    getTrades();
  }, 45000);
};

module.exports = {router, startTrades};
