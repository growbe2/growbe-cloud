"use strict"

var http = require('http');
var ddd = require('./dist/growbe-mainboard-event');


ddd.version().then(() => {
    console.log('APP DONE BOOTING');
})


module.exports = (context, callback) => {

    console.log('PRINE LN', context);

    callback({status: 300});
}
