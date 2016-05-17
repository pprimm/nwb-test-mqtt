'use strict';

var mqtt = require('mqtt');

var serviceSettings = require('./service-settings');
var mqttSetttings = serviceSettings.mqttSettings;
var connectUrl='mqtt://'+mqttSetttings.host+':'+mqttSetttings.port;
var mqttClient = mqtt.connect(connectUrl);

mqttClient.on('message', function (topic, message) {
	console.log('MQTT> received topic:' + topic + ' message:' + message);
	if (topic === 'set/lights/family/ceiling/level') {
		mqttClient.publish('get/lights/family/ceiling/level', message, {qos:1,retain:true});
	} else if (topic === 'set/lights/family/ceiling/cmd') {
		if (message =='on') {
			mqttClient.publish('get/lights/family/ceiling/level', '100', {qos:1,retain:true});
		} else {
			mqttClient.publish('get/lights/family/ceiling/level', '0', {qos:1,retain:true});
		}

	} else if (topic === 'set/lights/family/lamp/state') {
		if (message == '1') {
			mqttClient.publish('get/lights/family/lamp/state', '1', {qos:1,retain:true});
		} else {
			mqttClient.publish('get/lights/family/lamp/state', '0', {qos:1,retain:true});
		}

	}
});

mqttClient.on('connect', function () {
	console.log('MQTT> connected w/ Client Options = ' + JSON.stringify(mqttClient.options, null, 4));
	mqttClient.subscribe('set/lights/family/#', function () {
		console.log('MQTT> subscribing to ' + 'set/lights/family/#');
	});
});

mqttClient.on('error', function (error) {
	console.log('MQTT> Client Error detected: ' + error);
});

mqttClient.on('offline', function () {
	console.log('MQTT> Client is offline');
});
