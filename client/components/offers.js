import React from 'react';
import {connect} from 'react-redux';
import {Table, Loader, Segment} from 'semantic-ui-react';
import {apiOffers} from '../store';

const Offers = props => {
  console.log('props are', props);
  const shouldRender = props.offers && props.offers.length > 0;
  return shouldRender ? (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Buyer</Table.HeaderCell>
          <Table.HeaderCell>Payment Method</Table.HeaderCell>
          <Table.HeaderCell>Amount Limits</Table.HeaderCell>
          <Table.HeaderCell>Rate Per Bitcoin</Table.HeaderCell>
          <Table.HeaderCell>% Margin</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.offers.map(offer => {
          // const responder = trade.responder_profile;
          return (
            <Table.Row key={offer.offer_id}>
              <Table.Cell>{offer.offer_owner_username}</Table.Cell>
              <Table.Cell>{offer.payment_method_name}</Table.Cell>
              <Table.Cell>
                ${offer.fiat_amount_range_min} to ${offer.fiat_amount_range_max}
              </Table.Cell>
              <Table.Cell>${offer.fiat_price_per_btc}</Table.Cell>
              <Table.Cell>{offer.margin}%</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  ) : (
    // <Segment>
    <Loader active />
    // </Segment>
  );
};

const mapState = state => {
  return {
    offers: state.paxful.offers
  };
};

const mapDispatch = dispatch => {
  return {
    getOffers: () => dispatch(apiOffers())
  };
};

export default connect(mapState, null)(Offers);
