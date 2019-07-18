import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'semantic-ui-react';
import {apiTrades} from '../store';

class Trades extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('props are', this.props);
    this.props.getPaxfulTrades();
  }

  render() {
    return 'Hi there';
  }
}

const mapState = state => {
  console.log('new state', state.paxful);
  return {
    trades: state.paxful.trades
  };
};

const mapDispatch = dispatch => {
  return {
    getPaxfulTrades: () => dispatch(apiTrades())
  };
};

export default connect(mapState, mapDispatch)(Trades);
