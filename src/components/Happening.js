import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Deck from './Deck';

class Happening extends Component {
  render() {
    return (
      <div>
        <Deck card_list={this.props.happening} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    happening: state.cards.happening
  }
}

export default connect(mapStateToProps)(Happening);