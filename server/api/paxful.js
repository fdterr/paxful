const axios = require('axios');
const CryptoJS = require('crypto-js');

const router = require('express').Router();

// const {
//   apiKey,
//   secret,
//   accountSid,
//   authToken,
//   ipqsToken
// } = require('../../secrets');

const apiKey = process.env.paxfulApi;
const secret = process.env.paxfulSecret;
const ipqsToken = process.env.ipqsToken;
const {accountSid, authToken} = process.env;

const client = require('twilio')(accountSid, authToken);
const {User} = require('../db/models');

router.get('/trades', async (req, res, next) => {
  try {
    const me = await User.findOne({where: {id: 1}});
    res.json(me.trades);
  } catch (err) {
    next(err);
  }
});

router.get('/offers', async (req, res, next) => {
  try {
    const offers = await getOffers();
    res.json(offers);
  } catch (err) {
    next(err);
  }
});

router.get('/address', async (req, res, next) => {
  try {
    console.log('IP REQUESTED', req.connection);
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    res.send(ip);
  } catch (err) {
    next(err);
  }
});

router.get('/ipqs', async (req, res, next) => {
  try {
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    const reqAddress = `https://www.ipqualityscore.com/api/json/ip/${ipqsToken}/${ip}?strictness=2&fast=1`;
    const {data} = await axios.get(reqAddress);
    console.log('ipqs data is', data);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

const getResponder = async username => {
  const parameters = `&username=${username}`;
  const results = await makeRequest(
    'https://paxful.com/api/user/info',
    parameters
  );
  return results;
  // console.log('results are ', results);
};

const getTrades = async () => {
  try {
    const response = await makeRequest('https://paxful.com/api/trade/list');
    console.log('response is', response);
    const {count, trades} = response;

    const user = await User.findOne({where: {id: 1}});
    if (count > user.tradeCount) {
      const difference = count - user.tradeCount;
      await sendText(difference);
    }
    for (let i = 0; i < trades.length; i++) {
      const responder = await getResponder(trades[i].responder_username);
      trades[i].responder_profile = responder;
      console.log('got responder', responder);
    }
    await user.update({tradeCount: count, trades});
  } catch (err) {
    console.error(err);
  }
};

const getOffers = async () => {
  try {
    const parameters =
      '&offer_type=sell&payment_method=onevanilla-myvanilla-visamastercard-gift-card';
    // const parameters = '';
    const response = await makeRequest(
      'https://paxful.com/api/offer/all',
      parameters
    );
    // console.log('offer data is', response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const makeRequest = async (link, parameters) => {
  try {
    const body = 'apikey=' + apiKey + '&nonce=' + Date.now() + parameters || '';
    console.log('body is', body);
    const seal = CryptoJS.HmacSHA256(body, secret).toString();

    const postBody = body + '&apiseal=' + seal;
    const headers = {
      'content-type': 'text/plain',
      Accept: ' application/json; version=1'
    };

    const response = await axios.post(link, postBody, {headers});
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

const sendText = async number => {
  try {
    client.messages
      .create({
        body: number === 1 ? '1 New Trade' : `${number} New Trades`,
        from: '+19172017304',
        to: '+19176583370'
      })
      .then(message => console.log(message.sid))
      .done();
    console.log('Text Message Sent');
  } catch (err) {
    console.error(err);
  }
};

startTrades = () => {
  const tradeLink = `https://paxful.com/api/trade/list`;
  // makeRequest(tradeLink);
  getTrades();
  setInterval(() => {
    // makeRequest(tradeLink);
    getTrades();
  }, 45000);
};

module.exports = {router, startTrades};
