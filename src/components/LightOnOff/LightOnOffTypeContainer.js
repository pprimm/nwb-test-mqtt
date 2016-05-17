'use strict'

import React from 'react'
import { subscribe, unsubscribe, publish } from '../../client'
import LightOnOffType from './LightOnOffType'

export default class LighOnOffTypeContainer extends React.Component {
   constructor () {
      super()

      this.state = {value: 0}
      this.getValue = this.getValue.bind(this)
      this.setValue = this.setValue.bind(this)
   }

   componentDidMount () {
      //console.log('LightDimTypeContainer::componentDidMount()')
      //console.log(this.refs)
      this.getValueTopic = 'get/' + this.props.mqttTopic + '/state'
      this.setValueTopic = 'set/' + this.props.mqttTopic + '/state'
      subscribe( this.getValueTopic, this.getValue )
   }

   componentWillUnmount () {
      unsubscribe( this.getValueTopic )
   }

   getValue ( topic, msg ) {
      this.setState({value: parseInt(msg.toString(), 10)})
   }

   setValue (data) {
      publish( setValueTopic, data )
   }

   render () {
      return <LightOnOffType containerHandler = {this.setValue}
                             displayName = {this.props.displayName}
                             value = {this.state.value} />
   }
}
