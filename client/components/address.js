import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testIPAddress} from '../store';
import {Table} from 'semantic-ui-react';

class Address extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log('render', !!this.props.ipTest);
    const {
      country_code,
      ISP,
      region,
      city,
      latitude,
      longitude,
      timezone,
      mobile,
      host,
      proxy,
      vpn,
      tor,
      recent_abuse,
      bot_status,
      success,
      fraud_score
    } =
      this.props.ipTest || {};

    return this.props.ipTest ? (
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Country</Table.Cell>
            <Table.Cell>{country_code}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>City</Table.Cell>
            <Table.Cell>{city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Region</Table.Cell>
            <Table.Cell>{region}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ISP</Table.Cell>
            <Table.Cell>{ISP}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Proxy</Table.Cell>
            <Table.Cell>{proxy}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>VPN</Table.Cell>
            <Table.Cell>{vpn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>TOR</Table.Cell>
            <Table.Cell>{tor}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Fraud Score</Table.Cell>
            <Table.Cell>{fraud_score}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Recent Abuse</Table.Cell>
            <Table.Cell>{recent_abuse}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bot Activity</Table.Cell>
            <Table.Cell>{bot_status}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ) : (
      <div />
    );
  }

  componentDidMount() {
    console.log('props are', this.props);
    this.props.ipAddress();
  }
}

const mapState = state => {
  return {
    ip: state.ip,
    ipTest: state.paxful.ipTest
  };
};

const mapDispatch = dispatch => {
  return {
    ipAddress: () => dispatch(testIPAddress())
  };
};

export default connect(mapState, mapDispatch)(Address);
