# growbe-proxy

This application is a proxy between the UART interface or the growbe and the MQTT Cloud Service.


## Installation


```npm
npm install -g @growbe2/growbe-proxy
```


## Usage 

Exemple of config.json

```json
{
    "port": "COM4", // COMPORT
    "portConfig": {
        "baudRate": 115200 // SHOULD NOT BE CHANGE
    },
    "growbeId": "0xFFFFFFFF", // ID OF THE GROWBE THAT YOU ARE PROXING, TO SUBSCRIBE
    "mqtt": "mqtt://broker.dev.growbe.ca" // MQTT Server URL
}
```

Execute
```
growbe-proxy config.json
```
