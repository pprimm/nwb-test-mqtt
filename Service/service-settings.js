
/*
	A note about the filter functions:
	A filter function will receive a string and must return a string. If not, the
	value returned by the filter function will be ignored and the original string
	will be used.

	Here's an example of a filter function that simply appends ' filtered' to the
	input string:
	filter: function (value) { return value + ' filtered'; }
*/
module.exports = {
	mqttSettings: {
		port: 1883,
		host: '10.10.101.31',
		connectOptions: {
			keepalive: 10,
			protocolId: 'MQIsdp',
			//protocolVersion: 3,
			reconnectPeriod: 1000,
			clean: true,
			encoding: 'utf8',
			username: '',
			password: ''
		},
		sendOptions: {
			qos: 1,
			retain: true
		}
	}
};
