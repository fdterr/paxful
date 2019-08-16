import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getIPAddress} from '../store';

class Address extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <div />;
  }

  componentDidMount() {
    console.log('props are', this.props);
    this.props.acquireIP();
  }
}

const mapState = state => {
  return {
    ip: state.ip
  };
};

const mapDispatch = dispatch => {
  return {
    ipAddress: () => dispatch(getIPAddress())
  };
};

export default connect(mapState, mapDispatch)(Address);
