'use strict'

import React from 'react'
import { Button, PageHeader } from 'react-bootstrap'
import { browserHistory } from 'react-router'

export default class HomePage extends React.Component {
  constructor () {
    super()
    this._handleLight = this._handleLight.bind(this)
    this._handleTv = this._handleTv.bind(this)
  }

  _handleLight () {
    browserHistory.push('/lights')
  }

  _handleTv () {
    browserHistory.push('/appletv')
  }

  render () {
    return <div className = 'container-height' >
             <PageHeader className = 'header'>Home Automation <small>proto 2</small></PageHeader>
             <div className='container-flex container-height container-center'>
               <Button className = 'home-button' bsStyle = 'primary' onClick={this._handleLight} block>Lights</Button>
               <Button className = 'home-button' bsStyle = 'primary' onClick={this._handleTv} block>AppleTV</Button>
             </div>
           </div>
  }
}
