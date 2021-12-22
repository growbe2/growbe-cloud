"use strict"

var http = require('http');
var ddd = require('./dist/growbe-mainboard-event');


let service;

ddd.version([]).then((se) => {
    console.log('APP DONE BOOTING', se);
    service = se
})



module.exports = async (context, callback) => {

    let body = { topic: context.body.Topic, data: context.body.Body }

    console.log('BODY', body);

    return service.handler(body);
}
