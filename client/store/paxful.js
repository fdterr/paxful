import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TRADES = 'GET_TRADES';
const GET_OFFERS = 'GET_OFFERS';
const GET_IP = 'GET_IP';
const CLEAR_IP = 'CLEAR_IP';
const TEST_IP = 'TEST_IP';
const GII_TEST = 'GII_TEST';

// const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultState = {};

/**
 * ACTION CREATORS
 */
const getTrades = trades => ({type: GET_TRADES, trades});
const getOffers = offers => ({type: GET_OFFERS, offers});
const getIP = ip => ({type: GET_IP, ip});
const clearIP = () => ({type: CLEAR_IP});
const testIP = result => ({type: TEST_IP, result});
const giiTest = result => ({type: GII_TEST, result});
// const removeUser = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
export const apiTrades = () => async dispatch => {
  try {
    const res = await axios.get('/api/paxful/trades');
    dispatch(getTrades(res.data || defaultState));
  } catch (err) {
    console.error(err);
  }
};

export const apiOffers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/paxful/offers');
    dispatch(getOffers(data.offers || defaultState));
  } catch (err) {
    console.error(err);
  }
};

export const getIPAddress = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/paxful/address');
    dispatch(getIP(data));
    // console.log('ip is', data);
    // console.log('inside ip address store');
  } catch (err) {
    console.error(err);
  }
};

export const clearIPAddress = () => async dispatch => {
  dispatch(clearIP());
};

export const testIPAddress = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/paxful/ipqs');
    dispatch(testIP(data));
  } catch (err) {
    console.error(err);
  }
};

export const giiTestThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/paxful/gii');
    dispatch(giiTest(data));
  } catch (err) {
    console.error(err);
  }
};

// export const auth = (email, password, method) => async dispatch => {
//   let res;
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password});
//   } catch (authError) {
//     return dispatch(getUser({error: authError}));
//   }

//   try {
//     dispatch(getUser(res.data));
//     history.push('/home');
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr);
//   }
// };

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout');
//     dispatch(removeUser());
//     history.push('/login');
//   } catch (err) {
//     console.error(err);
//   }
// };

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_TRADES:
      return {...state, trades: action.trades};
    case GET_OFFERS:
      return {...state, offers: action.offers};
    case GET_IP:
      return {...state, ip: action.ip};
    case CLEAR_IP:
      return {...state, ip: undefined};
    case TEST_IP:
      return {...state, ipTest: action.result};
    case GII_TEST:
      return {...state, giiTest: action.result};
    default:
      return state;
  }
}
