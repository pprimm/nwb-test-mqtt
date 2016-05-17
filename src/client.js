'use strict'


import mqtt from 'mqtt'
import pubsub from 'pubsub-js'

export const mqttClient = mqtt.connect('ws://10.10.101.31:8083/mqtt', {keepAlive: 1})

mqttClient.on('connect', function(err) {
   console.info('MQTT: Connected');
});

mqttClient.on('close', function(err) {
   console.warn('MQTT: Disconnected');
});

mqttClient.on('error', function(err) {
   console.warn('MQTT: ' + err);
});

mqttClient.on('reconnect', function(err) {
   console.info('MQTT: Reconnecting to MQTT Broker');
});

mqttClient.on('error', function(err) {
   console.warn('MQTT: Error talking to MQTT Broker');
});

mqttClient.on('message', function(topic,message) {
   pubsub.publishSync( topic, message );
});

export function subscribe( topic, cb ) {
   pubsub.subscribe( topic, cb );
   mqttClient.subscribe( topic );
   console.log('MQTT: subscribe->' + topic);
}

export function unsubscribe( topic ) {
   pubsub.unsubscribe( topic );
   mqttClient.unsubscribe( topic );
   console.log('MQTT: unsubscribe->' + topic);
}

export function publish( topic, message ) {
   mqttClient.publish( topic, message );
}
