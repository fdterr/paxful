import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TRADES = 'GET_TRADES';
// const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultState = {};

/**
 * ACTION CREATORS
 */
const getTrades = trades => ({type: GET_TRADES, trades});
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
    default:
      return state;
  }
}
