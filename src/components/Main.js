import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Team from './Team';
import Happening from './Happening';
import Chance from './Chance';
import Minigames from './Minigames';
import Rules from './Rules';

class Main extends Component {

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({path: this.props.location.pathname})
    });
  }

  componentWillUnmount() {
      this.unlisten();
  }

  render() {
    return (
      <div style={{position: 'fixed', top: 50, left: 0, right: 0, bottom: 0}}>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path='/teams' component={Team} />
          <Route path='/minigames' component={Minigames} />
          <Route path='/happening' component={Happening} />
          <Route path='/chance' component={Chance} />
          <Route path='/rules' component={Rules} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
