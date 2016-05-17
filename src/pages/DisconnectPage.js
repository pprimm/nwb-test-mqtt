'use strict'

import React from 'react'
import { Button, PageHeader } from 'react-bootstrap'
import { browserHistory } from 'react-router'

export default class DisconnectPage extends React.Component {
  constructor () {
    super()
  }


  render () {
    return <div className = 'container-height' >
             <PageHeader className = 'header'>DISCONNECTED</PageHeader>
             <h1>Trying to reconnect...</h1>
           </div>
  }
}
