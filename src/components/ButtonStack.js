import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const slideLeft = {
    '0%': {
        marginRight: '-100px',
    },

    '100%': {
        marginRight: '0px',
    },
};

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    color: 'white',
    zIndex: 10,
    animationName: [slideLeft],
    animationDuration: '500ms'
  },
  button: {
    display: 'block',
    width: '60px',
    height: '60px',
    margin: '16px',
    border: '1px solid #FFF',
    borderRadius: '50%',
    color: '#FFF',
    fontSize: '24px',
    ':hover': {
      border: '1px solid #0ba58a',
      fontSize: '28px'
    }
  },
  buttonActive: {
    display: 'block',
    width: '60px',
    height: '60px',
    margin: '16px',
    background: 'rgba(255,255,255,0.3)',
    border: '1px solid #FFF',
    borderRadius: '50%',
    color: '#FFF',
    fontSize: '24px'
  }
})

class ButtonStack extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        {React.Children.map(this.props.children, child => {
          let { onClick, active, children } = child.props;
          return (
            <button onClick={onClick} className={active ? css(styles.buttonActive) : css(styles.button)}>
            {children}
            </button>
          )}
        )}
      </div>
    )
  }
}

export default ButtonStack;