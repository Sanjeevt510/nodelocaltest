const appRoot = require('app-root-path');
const winston = require('winston');
const moment = require('moment');
const MESSAGE = Symbol.for('message');

const tsFormat = () => moment().format('YYYY-MM-DD HH:mm:ss').trim();

const jsonFormatter = (logEntry) => {
//  const base = { timestamp: new Date().toLocaleString('en-US', {timeZone: "Australia/Sydney"})};
  const base = { timestamp: tsFormat()};
  const json = Object.assign(base, logEntry)
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
}

let options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/outboundCall.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  // timestamp: false,
   format:winston.format(jsonFormatter)()
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
     format:winston.format(jsonFormatter)()
 //   timestamp: false;
      //return new Date()
  },
};

const logger = winston.createLogger({
 
   transports: [
    new (winston.transports.File)(options.file),
    
    new (winston.transports.Console)(options.file)
  //new winston.transports.Console(options.console)
  ],
});


module.exports = logger
