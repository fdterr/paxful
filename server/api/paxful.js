const axios = require('axios');
const CryptoJS = require('crypto-js');

const router = require('express').Router();
module.exports = router;

const {apiKey, secret, accountSid, authToken} = require('../../secrets');
const client = require('twilio')(accountSid, authToken);

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
    // const offerType = 'sell';
    // const payment_method = 'paypal';
    const nonce = Date.now();
    const body = 'apikey=' + apiKey + '&nonce=' + nonce;
    console.log('body is', body);

    const seal = CryptoJS.HmacSHA256(body, secret).toString();
    console.log('seal is', seal);

    const postBody = body + '&apiseal=' + seal;
    console.log('postBody is', postBody);
    const headers = {
      'content-type': 'text/plain',
      Accept: ' application/json; version=1'
    };

    const response = await axios.post(
      `https://paxful.com/api/trade/list`,
      postBody,
      {headers}
    );
    console.log('headers', response.headers);
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});
