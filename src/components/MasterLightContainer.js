'use strict'

import React from 'react'
import LightOnOffTypeContainer from './LightOnOff/LightOnOffTypeContainer'
import LightDimTypeContainer from './LightDim/LightDimTypeContainer'

const uiDefinition = [
   {
      ctrlType: 'Unknown'
   }, {
      ctrlType: 'LightDimType',
      props: {
         displayName: 'Family Ceiling',
         mqttTopic: 'lights/family/ceiling'
      }
   }, {
      ctrlType: 'LightOnOffType',
      props: {
         displayName: 'Family Lamp',
         mqttTopic: 'lights/family/lamp'
      }
   }
]

export default class MasterLightContainer extends React.Component {
   constructor () {
      super()

      this.state = { lighstArr: [] }
      this.factoryList = {}
      this.factoryList['LightDimType'] = React.createFactory( LightDimTypeContainer )
      this.factoryList['LightOnOffType'] = React.createFactory( LightOnOffTypeContainer )
      this.createNewElement = this.createNewElement.bind(this)
   }

   componentDidMount () {
      /*mqttClient.on('connect', function(err) {
         console.info('MLC: Connected to MQTT Broker');
      });*/
      this.setState( { lighstArr: uiDefinition } )
   }

   componentWillUnmount () {

   }

   createNewElement (item, index) {
      const factory = this.factoryList[item.ctrlType]
      if (typeof factory != 'undefined') {
         let itemProps = item.props;
         itemProps.key = index;
         return factory(itemProps)
      }
      return null
   }

   render () {
      const LightItems = this.state.lighstArr.map(this.createNewElement)
      return <div>{LightItems}</div>
  }
}
