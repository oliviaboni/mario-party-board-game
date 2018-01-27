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
    animationName: [opacityKeyframes],
    animationDuration: '500ms'
  },
  button: {
    margin: 'auto',
    padding: '10px 30px',
    border: '1px solid #FFF',
    borderRadius: '20px',
    color: '#a1b1b5',
    fontSize: '18px',
    fontFamily: 'Courier New',
    ':hover': {
      border: '1px solid #0ba58a',
      fontSize: '20px'
    }
  },
  results: {
    display: 'block',
    paddingTop: '20px',
    color: '#FFF',
    fontSize: '20px',
    fontFamily: 'Courier New'
  }
})

class LinkFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }

  _generate = () => {
    let link = this.props.link;

    fetch( link, {
        method: 'POST',
        headers: {
          'Api-User-Agent': 'Example/1.0'
        }
        // Other init settings such as 'credentials'
    }).then(( response ) => {
        if ( response.ok ) {
            return response.json();
        }
        throw new Error( 'Network response was not ok: ' + response.statusText );
    }).then(( data ) => {
        let results = data.query.random
        this.setState({ results })
    });     
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <button onClick={this._generate} className={css(styles.button)}>Generate Word</button>
        <div>
          {this.state.results.map(result =>
            <a href={`https://en.wikipedia.org/wiki/${result.title}`}
              target="_blank"
              className={css(styles.results)}>
              <i className='fa fa-link' style={{paddingRight: '10px'}}/>
              {result.title}
            </a>
          )}
        </div>
      </div>
    )
  }
}

LinkFrame.propTypes = {
  link: PropTypes.string.isRequired
}

export default LinkFrame;