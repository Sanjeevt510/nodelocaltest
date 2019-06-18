
//var winston = require('winston');
var { createLogger, timestamp,transports } = require('winston');

//var logger = new (winston.Logger)({
var logger = createLogger ({
	level:'info',
  transports: [
    new (transports.Console)({ json: false, timestamp: true }),
    new transports.File({ filename: __dirname + './../logs/debug.log', timestamp:true })
  ],
  exceptionHandlers: [
    //new (winston.transports.Console)({ json: false, timestamp: true }),
    new transports.File({ filename: __dirname + './../logs/exceptions.log', json: false ,timestamp:true})
  ],
  exitOnError: false
});

module.exports = logger;

/*
var logger = winston.createLogger ({
	level:'info',
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + './../logs/debug.log', json: true })
  ],
  exceptionHandlers: [
    //new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + './../logs/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;
*/