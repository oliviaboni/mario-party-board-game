import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/card_actions';
import { StyleSheet, css } from 'aphrodite';

import Deck from './Deck';
import ButtonStack from './ButtonStack';
import Timer from './Timer';
import LinkFrame from './LinkFrame';

const styles = StyleSheet.create({
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  button: {
    fontSize: '20px',
    fontFamily: 'Courier'
  },
  closeToolsBtn: {
    position: 'fixed',
    top: 0,
    right: 0,
    margin: '8px',
    padding: '10px',
    color: '#FFF',
    fontSize: '16px',
    zIndex: 11
  },
  filterMessage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100px',
    background: 'rgba(0,0,0,0.2)',
    color: '#ce0052',
    textAlign: 'center',
  },
  gameMessage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100px',
    background: 'rgba(0,0,0,0.2)',
    color: '#0ba58a',
    textAlign: 'center',
  },
  messageContainer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  toolContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  }
})

const FILTERS = {
  four_player: '4 player',
  one_v_three: '1 vs 3',
  two_v_two: '2 vs 2',
  battle: 'battle',
  duel: 'duel'
}

class Minigames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      game_in_progress: this.props.selected_card || false,
      show_timer: false,
      show_link: false,
      diminishing: this.props.diminished_list ? true : false,
    }
  }

  componentWillMount() {
    let minigames = this._setMinigames(this.state.filter);
    this.setState({ minigames })
  }

  gameSelected = (game_in_progress) => {
    this.setState({game_in_progress})
    this.props.actions.selectCard(game_in_progress)
  }

  setList = (list) => {
    let card_list = !list || list.length > 0 ? list : this.state.minigames;
    this.props.actions.setList(card_list)
  }

  _closeTools = () => {
    this.setState({
      show_link: false,
      show_timer: false
    })
  }

  _setMinigames(filter) {
    const { minigames } = this.props;
    switch(filter) {
      case FILTERS.four_player:
      case FILTERS.battle:
        return minigames.four_player;
      case FILTERS.one_v_three:
        return minigames.one_v_three;
      case FILTERS.two_v_two:
        return minigames.two_v_two;
      case FILTERS.duel:
        return minigames.duel;
      default:
        return [...minigames.four_player,...minigames.one_v_three,...minigames.two_v_two]
    }
  }

  _selectFilter = (selected_filter) => () => {
    let filter = this.state.filter === selected_filter ? false : selected_filter;
    let minigames = this._setMinigames(filter)
    if (this.state.diminishing) {
      this.setList(minigames);
    }
    this.setState({ filter, minigames })
  }

  _showGameControls() {
    const { game_in_progress } = this.state;
    let components= [];

    if (game_in_progress.timer) {
      components.push(
        <button onClick={this.toggleShowTimer}>
          <i className='fa fa-clock-o'/>
        </button>
        )
    }

    if (game_in_progress.link) {
      components.push(
        <button onClick={this.toggleShowLink}>
          <i className='fa fa-link'/>
        </button>
      )
    }
    return components.length > 0 ?
      <ButtonStack>
        { components.map(component => component) }
      </ButtonStack> : null
  }

  _toggleDiminish = () => {
    this.setState({
      diminishing: !this.state.diminishing
    })
    if (this.state.diminishing) {
      this.setList(false);
    }
  }

  toggleShowLink = () => {
    this.setState({
      show_link: !this.state.show_link
    })
  }

  toggleShowTimer = () => {
    this.setState({
      show_timer: !this.state.show_timer
    })
  }

  render() {
    const { minigames, filter, game_in_progress, show_timer, show_link, diminishing } = this.state;
    const card_list = diminishing && this.props.diminished_list ? this.props.diminished_list : minigames;
    return (
      <div>
        <Deck 
          card_list={card_list}
          card={this.props.selected_card}
          onChange={this.gameSelected}
          onDiminish={this.setList}
          diminishing={diminishing} />
        { game_in_progress ?
          this._showGameControls() :
          <ButtonStack>
            <button onClick={this._selectFilter(FILTERS.four_player)} active={filter === FILTERS.four_player}>
              <i className='fa fa-trophy'/>
            </button>
            <button onClick={this._selectFilter(FILTERS.one_v_three)} active={filter === FILTERS.one_v_three}>
              <span className={css(styles.button)}>1v3</span>
            </button>
            <button onClick={this._selectFilter(FILTERS.two_v_two)} active={filter === FILTERS.two_v_two}>
              <span className={css(styles.button)}>2v2</span>
            </button>
            <button onClick={this._selectFilter(FILTERS.duel)} active={filter === FILTERS.duel}>
              <i className='fa fa-bolt'/>
            </button>
            <button onClick={this._toggleDiminish} active={diminishing}>
              <i className='fa fa-level-down'/>
            </button>
          </ButtonStack>
        }
        <div className={css(styles.messageContainer)}>
        { game_in_progress ?
          <div className={css(styles.gameMessage)}>
            Complete <strong>{game_in_progress.name}</strong>
          </div> : filter ?
          <div className={css(styles.filterMessage)}>
            Filter On: <strong>{filter}</strong>
          </div> : null
        }
        </div>
        { show_timer || show_link ?
          <div>
            <div className={css(styles.background)} onClick={this._closeTools}/>
            <button onClick={this._closeTools} className={css(styles.closeToolsBtn)}>
              <i className='fa fa-times'/>
            </button>
            <div className={css(styles.toolContainer)}>
            { show_timer && <Timer time={game_in_progress.timer} close={this.toggleShowTimer} /> }
            { show_link && <LinkFrame link={game_in_progress.link} close={this.toggleShowLink} /> }
            </div>
          </div> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    minigames: state.cards.minigames,
    selected_card: state.cards.selected_card,
    diminished_list: state.cards.custom_list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Minigames);