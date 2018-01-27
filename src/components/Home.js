import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Dice from './Dice';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    color: '#FFF',
    textAlign: 'center'
  },
  header: {
    margin: '20px',
    fontSize: '24px',
    fontWeight: 300,
    color: '#025367',
    fontFamily: 'Courier New'
  },
  link: {
    display: 'block',
    width: '80%',
    lineHeight: '40px',
    maxWidth: '300px',
    margin: '10px auto',
    padding: '10px',
    border: '1px solid #025367',
    borderRadius: '5px',
    color: '#a1b1b5',
    fontSize: '20px',
    ':hover': {
      background: 'rgba(255,255,255,.1)',
      fontSize: '24px',
    }
  }
})

class Home extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <h1 className={css(styles.header)}>Pick Your Deck</h1>
        <Link to='/teams' className={css(styles.link)}>Teams</Link>
        <Link to='/minigames' className={css(styles.link)}>Minigames</Link>
        <Link to='/happening' className={css(styles.link)}>Happening</Link>
        <Link to='/chance' className={css(styles.link)}>Chance</Link>
        <Dice />
      </div>
    )
  }
}

export default Home;