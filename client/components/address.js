import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testIPAddress, giiTestThunk} from '../store';
import {Table, Grid, Divider, Segment, Loader} from 'semantic-ui-react';

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

    const {status, result, queryIP, queryFlags, contact} =
      this.props.giiTest || {};

    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <center>
              <h2>IP Quality Score</h2>
            </center>
            {this.props.ipTest ? (
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
                    <Table.Cell>{proxy.toString()}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>VPN</Table.Cell>
                    <Table.Cell>{vpn.toString()}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>TOR</Table.Cell>
                    <Table.Cell>{tor.toString()}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Fraud Score</Table.Cell>
                    <Table.Cell>{fraud_score}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Recent Abuse</Table.Cell>
                    <Table.Cell>{recent_abuse.toString()}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Bot Activity</Table.Cell>
                    <Table.Cell>{bot_status.toString()}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            ) : (
              <div className="addressLoader">
                <Loader active />
              </div>
            )}
          </Grid.Column>

          <Grid.Column>
            <center>
              <h2>Get IP Intel</h2>
            </center>
            {this.props.giiTest ? (
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Status:</Table.Cell>
                    <Table.Cell>{status}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Result:</Table.Cell>
                    <Table.Cell>{result}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>IP Address:</Table.Cell>
                    <Table.Cell>{queryIP}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Query Flags:</Table.Cell>
                    <Table.Cell>{queryFlags}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Contact Info:</Table.Cell>
                    <Table.Cell>{contact}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            ) : (
              <div className="addressLoader">
                <Loader active />
              </div>
            )}
          </Grid.Column>
        </Grid>
        <Divider vertical />
      </Segment>
    );
  }

  componentDidMount() {
    console.log('props are', this.props);
    this.props.ipAddress();
    this.props.giiipAddress();
  }
}

const mapState = state => {
  return {
    ip: state.ip,
    ipTest: state.paxful.ipTest,
    giiTest: state.paxful.giiTest
  };
};

const mapDispatch = dispatch => {
  return {
    ipAddress: () => dispatch(testIPAddress()),
    giiipAddress: () => dispatch(giiTestThunk())
  };
};

export default connect(mapState, mapDispatch)(Address);
