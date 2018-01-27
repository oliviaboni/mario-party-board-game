import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Deck from './Deck';
import ButtonStack from './ButtonStack'

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: this.props.teams,
      diminishing: true
    }
  }

  _toggleDiminish = () => {
    this.setState({
      diminishing: !this.state.diminishing
    })
  }

  render() {
    const { teams, diminishing } = this.state;
    return (
      <div>
        <Deck card_list={teams} diminishing={diminishing}/>
        <ButtonStack>
          <button onClick={this._toggleDiminish} active={diminishing}>
            <i className='fa fa-level-down'/>
          </button>
        </ButtonStack>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.cards.teams
  }
}

export default connect(mapStateToProps)(Team);