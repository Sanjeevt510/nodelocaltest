const ami = new require('asterisk-manager')('5038', '192.168.0.8', 'calldashboard', 'abc123', true);

ami.keepConnected();

module.exports = ami
