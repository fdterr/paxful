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
    const shouldRender = this.props.trades !== undefined;
    return shouldRender ? (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Respondant Name</Table.HeaderCell>
            <Table.HeaderCell>Payment Method</Table.HeaderCell>
            <Table.HeaderCell>(+) Rep.</Table.HeaderCell>
            <Table.HeaderCell>(-) Rep.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.trades.map(trade => {
            const responder = trade.responder_profile;
            return (
              <Table.Row key={trade.trade_hash}>
                <Table.Cell>{responder.username}</Table.Cell>
                <Table.Cell>{trade.payment_method_name}</Table.Cell>
                <Table.Cell>{responder.feedback_positive}</Table.Cell>
                <Table.Cell>{responder.feedback_negative}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    ) : (
      'Hi There'
    );
    // return 'Hi there';
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
