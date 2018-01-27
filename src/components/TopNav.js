import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const slideRight = {
    '0%': {
        marginLeft: '-50px',
    },

    '100%': {
        marginLeft: '0px',
    },
};

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '50px',
    background: 'rgba(0,0,0,0.2)',
    boxShadow: '0 2px 20px #000',
    fontSize: '16px',
    color: '#4d8e9e',
    lineHeight: '50px',
    textAlign: 'center',
    fontFamily: 'Courier New'
  },
  pullLeft: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '50px',
    padding: '10px 20px',
    fontSize: '14px',
    color: '#a1b1b5',
    fontFamily: 'Courier New',
    animationName: [slideRight],
    animationDuration: '500ms'
  },
  pullRight: {
    position: 'absolute',
    top: '0',
    right: '0',
    height: '50px',
    padding: '10px 20px',
    fontSize: '14px',
    color: '#a1b1b5',
  },
})

class TopNav extends Component {

  _goBack = () => {
    this.context.router.history.goBack()
  }

  _goToRules = () => {
    this.context.router.history.push('/rules')
  }

  render() {
    const path = this.context.router.history.location.pathname;
    return (
      <div className={css(styles.container)}>
        { path !== '/' ?
          <button onClick={this._goBack} className={css(styles.pullLeft)}>
            <i className='fa fa-angle-left' style={{padding: '0 10px'}}/>
            Back
          </button> :
          <button onClick={this._goToRules} className={css(styles.pullRight)}>
            <i className='fa fa-info'/>
          </button>
        }
        { path !== '/' ? path.substr(1).charAt(0).toUpperCase() + path.slice(2) : 'Mario Party Drinking Game' }
      </div>
    )
  }
}

TopNav.contextTypes = {
  router: PropTypes.object.isRequired
}

export default TopNav;