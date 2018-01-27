import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Deck from './Deck';

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 10,
    width: '100%'
  },
  selectedTeam: {
    display: 'block',
    maxWidth: '280px',
    margin: '10px auto',
    padding: '10px 20px',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '20px',
    color: '#FFF',
    fontSize: '20px',
    fontFamily: 'Courier New',
    ':hover': {
      background: 'rgba(255,255,255,0.1)'
    }
  }
})

class Chance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_team: false
    }
  }

  _getRandomTeam = () => {
    const { teams } = this.props;
    const index = Math.floor(Math.random() * teams.length);
    this.setState({
      selected_team: teams[index]
    })
  }

  render() {
    const { selected_team } = this.state;
    const card_list = this.props.chance.map(card =>
      selected_team ? card.image = selected_team.image : card.image = 'default_bg.png');
    return (
      <div>
        <Deck card_list={this.props.chance} />
        <div className={css(styles.buttonContainer)}>
          <button 
            onClick={this._getRandomTeam}
            className={css(styles.selectedTeam)}
            style={{border: selected_team ? '1px solid #0ba58a' : '1px solid #ce0052'}}>
            { selected_team ? selected_team.name : 'Get random team' }
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chance: state.cards.chance,
    teams: state.cards.teams
  }
}

export default connect(mapStateToProps)(Chance);