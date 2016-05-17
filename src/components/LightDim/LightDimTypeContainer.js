'use strict'

import React from 'react'
import { subscribe, unsubscribe, publish } from '../../client'
import LightDimType from './LightDimType'

export default class LightDimTypeContainer extends React.Component {
   constructor () {
      super()

      this.state = {value: 0}
      this.setLevel = this.setLevel.bind(this)
      this.setCmd = this.setCmd.bind(this)
      this.getLevel = this.getLevel.bind(this)
      console.log('LightDimTypeContainer created with props:' + this.props)
   }

   componentDidMount () {
      //console.log('LightDimTypeContainer::componentDidMount()')
      //console.log(this.refs)
      this.getLevelTopic = 'get/' + this.props.mqttTopic + '/level'
      this.setLevelTopic = 'set/' + this.props.mqttTopic + '/level'
      this.setCmdTopic = 'set/' + this.props.mqttTopic + '/cmd'
      //this.cmdTopic = this.props.mqttTopic + '/cmd'
      // use
      subscribe(this.getLevelTopic, this.getLevel )
   }

   componentWillUnmount () {
      //console.log('LightDimTypeContainer::componentWillUnmount()')
      unsubscribe(this.getLevelTopic)
   }

   getLevel ( topic, msg ) {
      //console.log('level: ' + value)
      // ignore topic
      this.setState({value: parseInt(msg.toString(), 10)})
   }

   setLevel (data) {
      publish( this.setLevelTopic, data )
   }

   setCmd (data) {
      //console.log(this)
      publish( this.setCmdTopic, data )
   }

   render () {
      return <LightDimType switchHandler = {this.setCmd}
                           containerHandler = {this.setLevel}
                           displayName = {this.props.displayName}
                           value={this.state.value}/>
   }
}
LightDimTypeContainer.propTypes = {
   displayName: React.PropTypes.string,
   mqttTopic: React.PropTypes.string.isRequired
}
LightDimTypeContainer.defaultProps = { displayName: 'LightDimType' };
