import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const opacityKeyframes = {
    'from': {
        opacity: 0,
    },

    'to': {
        opacity: 1,
    }
};

const styles = StyleSheet.create({
  container: {
    margin: '10px',
    padding: '40px 60px',
    background: 'rgba(0,0,0,0.7)',
    borderRadius: '30px',
    fontSize: '60px',
    animationName: [opacityKeyframes],
    animationDuration: '500ms'
  },
  button: {
    margin: 'auto',
    color: '#FFF',
    fontSize: '28px'
  }
})

class Timer extends Component {
  constructor(props) {
    super(props);
    let { minutes, seconds } = this.formatTime();
    this.state = {
      minutes,
      seconds,
      began: false,
    }
  }

  formatTime() {
    let minutes = Math.floor(this.props.time / 60);
    let seconds = this.props.time % 60;
    return { minutes, seconds }
  }

  resetTimer = () => {
    clearInterval(this.interval);
    let { minutes, seconds } = this.formatTime();
    this.setState({
      minutes,
      seconds,
      began: false,
    });
  }

  stopTimer = () => {
    this.setState({ began: false });
    clearInterval(this.interval);
  }

  startTimer = () => {
    this.setState({ began: true })
    this.interval = setInterval(() => {
      this.countdown();
    }, 1000)
  }

  doubleDigit(number) {
    if (number < 10) {
      return "0" + parseFloat(number);
    }
    return number;
  }

  countdown() {
    let { began, minutes, seconds } = this.state;
    if (began) {
      if (seconds == 0) {
        if (minutes == 0) {
          return this.stopTimer();
        }
        seconds = 59;
        minutes--;
      } else {
        seconds--;
      }
      this.setState({ minutes, seconds });
    }
  }

  render() {
    const { minutes, seconds, began } = this.state;
    const formatted_minutes = this.doubleDigit(minutes)
    const formatted_seconds = this.doubleDigit(seconds);
    return (
      <div className={css(styles.container)}>
        <span>{formatted_minutes}</span>
        :
        <span style={{color: formatted_seconds <= 10 && minutes === 0 && began ? 'red' : '#FFF'}}>
          {formatted_seconds}
        </span>
        { !began ? 
          <div>
            <button onClick={this.startTimer} className={css(styles.button)}>
              <i className='fa fa-play' />
            </button>
            { minutes === 0 && seconds === 0 ?
              <button onClick={this.resetTimer} className={css(styles.button)}>
                <i className='fa fa-repeat' style={{margin: '0 10px'}} />
              </button> : null
            }
          </div> :
          <div>
            <button onClick={this.stopTimer} className={css(styles.button)}>
              <i className='fa fa-pause' style={{margin: '0 10px'}} />
            </button>
            <button onClick={this.resetTimer} className={css(styles.button)}>
              <i className='fa fa-repeat' style={{margin: '0 10px'}} />
            </button>
          </div>
        }
      </div>
    )
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired
}

export default Timer;