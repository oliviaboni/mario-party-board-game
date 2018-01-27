import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Deck from './Deck';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    background: '#a1b1b5',
    borderRadius: '10px',
    boxShadow: '2px 4px 20px #000',
    color: '#000',
    cursor: 'pointer'
  },
  circle: {
    display: 'inline-flex',
    width: '12px',
    height: '12px',
    margin: '1px',
    background: '#000',
    borderRadius: '50%'
  },
  five: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  largeMargin: {
    margin: '1px 4px',
    display: 'inline-flex'
  }
})

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 4
    }
  }

  _roll = () => {
    let counter = 0;
    let interval = setInterval(() => {
      const number = Math.floor(Math.random() * 6 + 1);
      this.setState({ number })
      if (counter > 6) {
        clearInterval(interval);
        counter = 0;
      } else {
        counter++;
      }
    }, 100)
  }

  _showNumber(number) {
    let i = 0;
    let components = [];
    while (i < number) {
      i++;
      components.push(<div className={css(styles.circle)}/>)
    }
    return (
      <div style={{padding: '0 8px', transform: number === 3 || number === 2 ? 'rotate(45deg)' : 'none'}}>
        {components.map((component, i) => {
          if (number === 1 || number === 6 || number === 3) {
            return component
          } else {
            if (i === 4) {
              return <div key={i} className={css(styles.five)}>{component}</div>
            }
            return <div key={i} className={css(styles.largeMargin)}>{component}</div>
          }
        })}
      </div>
    )
  }

  render() {
    const { number } = this.state;
    return (
      <div className={css(styles.container)} onClick={this._roll}>
        { this._showNumber(number) }
      </div>
    )
  }
}

export default Dice;