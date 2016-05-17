'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import HomePage from './pages/HomePage'
import LightsPage from './pages/LightsPage'
import TVPage from './pages/TVPage'
import DisconnectPage from './pages/DisconnectPage'
import { mqttClient } from './client'
//import history from './history'

require('./main.css');
require('./vars.css');

mqttClient.on('connect', function(err) {
   browserHistory.push('/')
});

mqttClient.on('close', function(err) {
   browserHistory.push('/disconnected')
});

export default class App extends React.Component {
   constructor(props) {
     super(props);
   }

   render () {
    return <Router history={browserHistory}>
              <Route path = '/' component={HomePage}/>
              <Route path = '/disconnected' component={DisconnectPage}/>
              <Route path = '/lights' component={LightsPage}/>
              <Route path = '/appletv' component={TVPage}/>
           </Router>
  }
}
