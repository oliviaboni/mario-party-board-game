import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  mask: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '300px',
    height: '500px',
    margin: '30px auto',
    backgroundColor: 'rgba(0,0,0,0.2)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '5px',
    boxShadow: '0 2px 20px #000',
    overflow: 'hidden',
    color: '#a1b1b5',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    '@media (max-width: 420px)': {
      position: 'absolute',
      top: 10,
      left: 10,
      bottom: 10,
      right: 10,
      width: 'auto',
      height: 'auto',
      margin: 'auto'
    },
    ':hover': {
      boxShadow: '0 2px 12px #000',
    }
  },
  message: {
    color: '#ce0052',
    fontSize: '20px'
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    margin: '10px -10px 0',
    padding: '20px 0 0',
    fontSize: '20px',
    fontFamily: 'Courier'
  },
  headerCentered: {
    fontSize: '20px',
    fontFamily: 'Courier'
  },
  subtitle: {
    display: 'block',
    fontSize: '16px',
    fontFamily: 'Avenir'
  },
  description: {
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10px',
    overflow: 'scroll'
  }
})

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_list: this.props.card_list,
      card: this.props.card || false,
      shuffling: false,
      diminishing: this.props.diminishing || false
    }
  }

  componentWillReceiveProps(nextProps) {
    let card_list = nextProps.card_list;
    if (nextProps.diminishing !== this.props.diminishing) {
      card_list = nextProps.diminishing ? this.state.card_list : this.props.card_list;
      this.setState({
        diminishing: nextProps.diminishing,
        card_list
      })
      return;
    }
    if (nextProps.card_list !== this.props.card_list) {
      this.setState({
        card_list
      })
    }
  }

  _diminish(index) {
    if (this.state.diminishing) {
      let card_list = [...this.state.card_list];
      if (card_list.length > 1) {
        card_list.splice(index, 1);
        if (this.props.onDiminish) {
          this.props.onDiminish(card_list);
        }
      } else {
        if (this.props.onDiminish) {
          this.props.onDiminish([]);
        }
        card_list = this.props.card_list;
      }
      this.setState({
        card_list
      })
    }
  }

  _shuffle() {
    const {card_list} = this.state
    let counter = 0
    let interval = setInterval(() => {
      const index = Math.floor(Math.random() * card_list.length);
      const card = card_list[index];
      this.setState({ card });
      if (counter > 6) {
        clearInterval(interval);
        this._diminish(index)
        if (this.props.onChange) {
          this.props.onChange(card)
        }
      } else {
        counter++;
      }
    }, 100)
  }

  _reset() {
    this.setState({
      card: false
    })
    if (this.props.onChange) {
      this.props.onChange(false)
    }
  }

  _toggleCardState = () => {
    this.state.card ? this._reset() : this._shuffle();
  }

  render() {
    const { card } = this.state;
    const card_image = card.image ? card.image : 'default_bg.png';
    const image = require('../img/'+card_image+'');
    return (
      <div onClick={this._toggleCardState} className={css(styles.mask)} style={{backgroundImage: 'url(' + image + ')'}}>
        { card ?
          <div>
            <div className={card.description ? css(styles.header) : css(styles.headerCentered)}>
            { card.name ?
              <span>{ card.name }</span> : null
            }
            { card.subtitle ?
              <span className={css(styles.subtitle)}><em>{ card.subtitle }</em></span> : null
            }
            </div>
            { card.description ?
              <p className={css(styles.description)}>{ card.description }</p> : null
            }
          </div> :
          <div className={css(styles.message)}>tap to shuffle</div>
        }
      </div>
    )
  }
}

export default Deck;