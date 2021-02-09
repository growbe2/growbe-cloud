const SerialPort = require('serialport')
const MockBinding = require('@serialport/binding-mock')
const Delimiter = require('@serialport/parser-delimiter')
const InterByteTimeout = require('@serialport/parser-inter-byte-timeout')


const GrowbePB = require('@growbe2/growbe-pb');


const fs = require('fs');

const mqtt = require('mqtt');


const config = JSON.parse(fs.readFileSync(process.argv[2]));

if(config.port.includes('ROBOT')) {
    SerialPort.Binding = MockBinding
    MockBinding.createPort(config.port, config.portConfig)
}

const port = new SerialPort(config.port, config.portConfig);

const parser = port.pipe(new InterByteTimeout({interval: 30}));

const topicSensor = `growbe_${config.growbeId}_sensor`;
const topicControl = `growbe_${config.growbeId}_control`;

const paddingBuffer = Buffer.from(Array.from({length: 80}, () => 0x00));

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
    console.log(e.length);
    try {
        const message = GrowbePB.GrowbeMessage.decode(e);
        console.log(message.toJSON());
        client.publish(message.topic, message.body);

        port.write(Buffer.concat([Buffer.from([0x00,0x00,0xDE,0xAD, e.length]), e, paddingBuffer]))
    } catch(e) {
        console.log('ERROR', e);
    }
});





