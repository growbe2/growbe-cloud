const SerialPort = require('@serialport/stream')
const MockBinding = require('@serialport/binding-mock')
const Delimiter = require('@serialport/parser-delimiter')

const fs = require('fs');

const mqtt = require('mqtt');


const config = JSON.parse(fs.readFileSync(process.argv[2]));

if(config.port.includes('ROBOT')) {
    SerialPort.Binding = MockBinding
    MockBinding.createPort(config.port, config.portConfig)
}

const port = new SerialPort(config.port, config.portConfig);

const parser = port.pipe(new Delimiter({delimiter: '\n'}));

const topicSensor = `growbe_${config.growbeId}_sensor`;
const topicControl = `growbe_${config.growbeId}_control`;


const client = mqtt.connect(config.mqtt);
client.on('connect', () => {
    client.subscribe(topicControl, (err) => {
        if(err) {
            throw(err);
        }
        console.log('CONNECTED TO', topicControl);
    });
    client.on('message', (topic, message) => {
        if(topic === topicControl) {
            port.write(message);
        }
    })
});

parser.on('data', (e) => {
    client.publish(topicSensor, e.toString());
});


setInterval(() => port.write(JSON.stringify({time: Date.now()})+'\n'), 1000);



