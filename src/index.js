import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import fontAwesome from 'font-awesome/css/font-awesome.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';

import reducer from './store'

const store = createStore(reducer)

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
