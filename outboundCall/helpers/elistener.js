var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', myEventHandler);
//Create an event handler:
var myEventHandler = function () {
    console.log('I hear a scream!');
  }