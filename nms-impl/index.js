const NodeMediaServer = require('node-media-server');

const mqtt = require('mqtt');
 
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: './media'
  },
  auth: {
    api: true,
    play: true,
    publish: true,
    secret: process.env.NMS_TOKEN,
    api_user: process.env.NMS_API_USERNAME,
    api_pass: process.env.NMS_API_PASSWORD,
  },
  /*trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]'
      }
    ]
  }*/
};
 
var nms = new NodeMediaServer(config);

if (process.env.MQTT_URL) {
  const client = mqtt.connect(process.env.MQTT_URL);
  client.on('connect', () => {
    console.log("connected to MQTT_URL");
    // BLOCK ACCESS FOR INVALID STREAM NAME
    nms.on('postPlay', (id, StreamPath, args) => {
      const items = StreamPath.split('/');
      const streamNameItems = items[items.length - 1].split('-');
      client.publish(`/growbe/${streamNameItems[0]}/cloud/stream`, JSON.stringify({id, StreamPath, state: 'starting'}));
    });
    
   nms.on('donePlay', (id, StreamPath, args) => {
      const items = StreamPath.split('/');
      const streamNameItems = items[items.length - 1].split('-');
      client.publish(`/growbe/${streamNameItems[0]}/cloud/stream`, JSON.stringify({id, StreamPath, state: 'done'}));
   });
  });

  client.on('error', (err) => {
    console.error(err);
  });
} else {
  console.error("no MQTT_URL provide");
}

nms.run();