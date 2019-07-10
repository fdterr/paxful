const router = require('express').Router();
module.exports = router;

const accountSid = 'AC2008644491d7049070c862508688fdb8';
const authToken = 'a6690f917c442db93543b1f6821b695e';
const client = require('twilio')(accountSid, authToken);
const XMLHttpRequest = require('xhr2');

const axios = require('axios');
const CryptoJS = require('crypto-js');

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
    const apiKey = 'YoMj3CtEAhokhLMVbnkAVGS31WJAxM3I';
    const secret = '6jk9eNJU2WLJ53cMrQjcKjPl3eMqXUBk';
    const offerType = 'sell';
    const payment_method = 'paypal';
    // const body = `apikey=${apiKey}&nonce=${Date.now()}`;
    const body =
      'apikey=' + apiKey + '&nonce=' + Date.now() + '&offer_hash=39d1AVvDKe2';

    console.log('body is', body);

    const seal = CryptoJS.HmacSHA256(body, secret).toString();
    // const seal = CryptoJs.enc.Utf8
    // const utfHash = CryptoJS.enc.Utf8.stringify(seal);
    console.log('seal is', seal);
    // console.log('utfHash is', utfHash);

    // const postBody = qs.stringify(body) + '&apiseal=' + seal;
    // const headers = {
    //   ['content-type']: 'text/plain',
    //   Accept: ' application/json; version=1',
    // };

    // const { data } = await axios.post(
    //   `https://www.paxful.com/api/offer/list`,
    //   postBody,
    //   { headers }
    // );

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        const response = JSON.parse(xhr.responseText);
        console.log('response', response);
        res.send(response);
      }
    };

    xhr.open('POST', 'https://paxful.com/api/offer/list');
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(body + '&apiseal=' + seal);
    // xhr.send(body);

    // console.log('data', data);
    // res.send('Welcome to the Test Page');
  } catch (err) {
    next(err);
  }
});
