const Joi = require('joi');
const tonixdb = require('./../models/tonixDB.js');
const outboundProcess = require('./../models/outboundProcess');

const amiModule = require('./../config/amiConnect.js');
var logger = require('./../config/logger.js')
const url = require('url');
const querystring = require('querystring');
var uniqid = require('uniqid');
var moment = require('moment');
var pbxcalling = require('./../helper/calltoPBX');
const pbxcallingStatus = require('./../helper/calltoPBXStatus');


module.exports = function(router) {
    router.use(function(req, res, next) {
        //let parsedUrl = url.parse(req);  
        //for (const key in req.query) {
        //console.log("hhh  -->"+ key, req.query[key])
        //}
        //console.log(parsedUrl);
        next();
    });

    function function2() {
        // all the stuff you want to happen after that pause
        console.log('Blah blah blah blah extra-blah' + " at [" + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
    }

    function validateRequestOBJ(inputObj) {
        let schema = {
            channel: Joi.string().min(7).required()
        }
        return Joi.validate(inputObj, schema);
    }
    router.get('/manager', function(req, resp) {
        const {
            error
        } = validateRequestOBJ(req.query);
        if (error) {
            logger.error(` Invalid request for manager asterisk ${error.details[0].message} required to process,valid:0 `);
            return resp.status(200).json({
                message: error.details[0].message,
                valid: 0
            });
        }
        amiModule.action({
            'action': 'Atxfer',
            'channel': req.query.channel,
            'context': 'from-internal-custom',
            'exten': '99998888'
        }, function(err, res) {
            if (err) console.log(err);
            logger.info(`response from Asterisk Manager to generate manager call is  [${res.response}] `);
            // console.log("Response From Originate : " + JSON.stringify(res));
            if (res.response == "Error" || res.response == "Failure") resp.status(200).json({
                message: `Manager  ${JSON.stringify(res.message)}`,
                valid: 0
            })
            else {
                resp.status(200).json({
                    message: `Manager  ${JSON.stringify(res.message)}`,
                    valid: 1
                })
            }
            resp.end();
        });
    });
    router.get('/internal', function(req, resp) {
        const {
            error
        } = validateRequestOBJ(req.query);
        if (error) {
            logger.error(` Invalid request for internal asterisk ${error.details[0].message} required to process,valid:0 `);
            return resp.status(200).json({
                message: error.details[0].message,
                valid: 0
            });
        }
        amiModule.action({
            'action': 'BlindTransfer',
            'channel': req.query.channel,
            'context': 'from-internal-custom',
            'exten': '99998886'
        }, function(err, res) {
            if (err) console.log(err);
            logger.info(`response from Asterisk Manager to generate internal call is  [${res.response}] `);
            // console.log("Response From Originate : " + JSON.stringify(res));
            if (res.response == "Error" || res.response == "Failure") resp.status(200).json({
                message: `Internal Transfer  ${JSON.stringify(res.message)}`,
                valid: 0
            })
            else {
                resp.status(200).json({
                    message: `Internal Transfer ${JSON.stringify(res.message)}`,
                    valid: 1
                })
            }
            resp.end();
        });
    });
    router.post('/internalP', function(req, resp) {
        const {
            error
        } = validateRequestOBJ(req.body);
        if (error) {
            logger.error(` Invalid request for internalP asterisk ${error.details[0].message} required to process,valid:0 `);
            return resp.status(200).json({
                message: error.details[0].message,
                valid: 0
            });
        }
        amiModule.action({
            'action': 'BlindTransfer',
            'channel': req.body.channel,
            'context': 'from-internal-custom',
            'exten': '99998886'
        }, function(err, res) {
            if (err) console.log(err);
            logger.info(`response from Asterisk Manager to generate internalP call is  [${res.response}] `);
            // console.log("Response From Originate : " + JSON.stringify(res));
            if (res.response == "Error" || res.response == "Failure") resp.status(200).json({
                message: `Internal Transfer  ${JSON.stringify(res.message)}`,
                valid: 0
            })
            else {
                resp.status(200).json({
                    message: `Internal Transfer ${JSON.stringify(res.message)}`,
                    valid: 1
                })
            }
            resp.end();
        });
    });
    router.get('/recording', function(req, resp) {
        const {
            error
        } = validateRequestOBJ(req.query);
        if (error) {
            logger.error(` Invalid request for recording asterisk ${error.details[0].message} required to process,valid:0 `);
            return resp.status(200).json({
                message: error.details[0].message,
                valid: 0
            })
        }
        amiModule.action({
            'action': 'Atxfer',
            'channel': req.query.channel,
            'context': 'from-internal-custom',
            'exten': '99998885'
        }, function(err, res) {
            logger.info(`response from Asterisk Manager to generate recording call is  [${res.response}] `);
            if (err) {
                // console.log(err)
                resp.status(200).json({
                    message: `Recording  ${JSON.stringify(res.message)}`,
                    valid: 0
                })
            } else {
                resp.status(200).json({
                    message: `Recording  ${JSON.stringify(res.message)}`,
                    valid: 1
                })
            }
            resp.end();
        });
    });
    router.get('/external', function(req, resp) {
        let responseMessage = "error";
        const {
            error
        } = validateRequestOBJ(req.query);
        if (error) {
            logger.error(` Invalid request for external asterisk ${error.details[0].message} required to process,valid:0 `);
            return resp.status(200).json({
                message: error.details[0].message,
                valid: 0
            })
        }
        //return resp.json(400, error.details[0].message)
        amiModule.action({
            'action': 'Atxfer',
            'channel': req.query.channel,
            'context': 'from-internal-custom',
            'exten': '99998887'
        }, function(err, res) {
            if (err) console.log(err);
            logger.info(`response from Asterisk Manager to generate external call is  [${res.response}] `);
            // console.log("Response From Originate : " + JSON.stringify(res));
            if (res.response == "Error" || res.response == "Failure") resp.status(200).json({
                message: `External  ${JSON.stringify(res.message)}`,
                valid: 0
            })
            else {
                resp.status(200).json({
                    message: `External  ${JSON.stringify(res.message)}`,
                    valid: 1
                })
            }
            resp.end();
        });
    });
    router.get('/upload', function(req, resp) {
    
        const schema = {
            agentno: Joi.number().integer().required()
         }

         let queryKey = {
            'agent_id': req.query.agentno,
            'timezone': "Australia/Sydney",
            'rcode': 100,
            'exten': '98888890',
            'context': 'sip-cust',
            'req_uniqkey': uniqid.process('ob-'),
            'rmessage': 'succesfull inserted outbound call data'
        };

        const result = Joi.validate(req.query, schema);
        if (result.error) {
            logger.error(` Invalid request for callback asterisk ${result.error.details[0].message} required to process,valid:0 `);
            resp.json(400, result.error.details[0].message)
            return;
        }
        outboundProcess.validateAgentFlag(queryKey)
        .then(=lresponse => {
            if (lresponse.rcode == 200)
            pbxcalling(lresponse)
            .then(response =>{
                console.log('record insert successfully for the outbound cal');
                var action = {
                    1:'insert in the ticket table'
                };
               // pbxcallingStatus(response);
                //console.log(response);
                outboundProcess.successCall2Agent(response);

            }).catch(ex => {
                var action = {
                    1:`release the pick ticket as response from AMI is ${ex.response} for Action id : ${ex.actionid} and Message as:${ex.message}`
                };
                lresponse.flag_value=0;
                outboundProcess.updatePickFlag(ex);
                // outboundProcess.updateOperatorFlagg(response,'statusfree');
                console.log(action);
            });
           //  callAmi(lresponse);
        });
        resp.json({
            message: "unique key [" + uniqid.process('autoob-') + "] thanks for the request"
        });
    });
    router.get('/outboundCall', function(req, resp) {
            console.log('this is called during the testing    : ' + uniqid());
           
      //  console.log(JSON.stringify(req.query));


        let queryKey = {
            'operatorNo': req.query.agentno,
            'callerNo': req.query.callerno,
            'ticketNo': req.query.ticketno,
            'timezone': "Australia/Sydney",
            'rcode': 100,
            'req_uniqkey': uniqid.process('cb-'),
            'rmessage': 'succesfull inserted outbound call data'
        };

        tonixdb.validateToProcess(queryKey)
        .then(lresponse => {
            console.log('--------',lresponse)
                        if (!(lresponse.rcode == 200)) {
                // Call the ami to generate the call to agent to connect with operator
                resp.json({
                    message: "unique key [" + queryKey['req_uniqkey'] + "] error category  " + lresponse.rmessage
                });
            } else {
                resp.json({
                    message: `Requested acccepted for Ticket id [${lresponse.ticketNo}] key to match [${lresponse.dbInsertKey}]`
                });
            }
        })
        .catch(ex => {console.log(ex)});
    });



    router.get('/callback', function(req, resp) {
        const schema = {
            agentno: Joi.number().integer().required(),
            callerno: Joi.number().integer().min(40000000).required(),
            ticketno: Joi.number().integer()
        };
        let queryKey = {
            'operatorNo': req.query.agentno,
            'callerNo': req.query.callerno,
            'ticketNo': req.query.ticketno,
            'timezone': "Australia/Sydney",
            'rcode': 100,
            'req_uniqkey': uniqid.process('cb-'),
            'rmessage': 'succesfull inserted outbound call data'
        };
        const result = Joi.validate(req.query, schema);
        if (result.error) {
            logger.error(` Invalid request for callback asterisk ${result.error.details[0].message} required to process,valid:0 `);
            resp.json(400, result.error.details[0].message)
            return;
        }

         tonixdb.validateToProcess(queryKey)
        .then(lresponse => {
                        if (!(lresponse.rcode == 200)) {
                // Call the ami to generate the call to agent to connect with operator
                resp.json({
                    message: "unique key [" + queryKey['req_uniqkey'] + "] error category  " + lresponse.rmessage
                });
                resp.end();
            } else {
                amiModule.action({
                    'action': 'originate',
                    'channel': lresponse.endpoint,
                    'context': 'sip-cust',
                    'async': 'true',
                    'exten': '98888889',
                    'priority': 1,
                    'variable': 'asteriskARGS=' + lresponse['ticketNo'] + '|' + lresponse.dbInsertKey + '|' + lresponse['timezone'] + '|' + lresponse['operatorNo'],
                    //'variable': 'var11=ticketno||uniqkey',
                    'callerid': lresponse['callerNo'],
                }, function (err, res) {
                    if (err) console.log(err);
                    logger.info(`response from Asterisk Manager to generate call is  [${res.response}] for the ticket  id [${lresponse.ticketNo}] and key to match is [${lresponse.dbInsertKey}]`);
                    //                  console.log("Response From Originate : " + JSON.stringify(res));
                    //                 console.log("Response From Originate : " + res.response);
                    if (res.response == "Error" || res.response == "Failure") {
                        console.log("Response From Originate : " + res.response);
                    }
                    //console.log(res)
                    //resp.end();
                });
                resp.json({
                    message: `Requested acccepted ------ for Ticket id [${lresponse.ticketNo}] key to match [${lresponse.dbInsertKey}]`
                });
                resp.end();
            }
        })
        .catch(ex => {console.log(ex)});
    });

function callAmi(lresponse) {
   
    amiModule.action({
        'action': 'originate',
        'channel': lresponse.endpoint,
        'context': 'sip-cust',
        'async': 'true',
        'exten': '98888889',
        'priority': 1,
        'variable': 'asteriskARGS=' + lresponse['ticketNo'] + '|' + lresponse.dbInsertKey + '|' + lresponse['timezone'] + '|' + lresponse['operatorNo'],
        //'variable': 'var11=ticketno||uniqkey',
        'callerid': lresponse['callerNo'],
    }, function (err, res) {
        if (err) console.log(err);
        logger.info(`response from Asterisk Manager to generate call is  [${res.response}] for the ticket  id [${lresponse.ticketNo}] and key to match is [${lresponse.dbInsertKey}]`);
        //                  console.log("Response From Originate : " + JSON.stringify(res));
        //                 console.log("Response From Originate : " + res.response);
        if (res.response == "Error" || res.response == "Failure") {
            console.log("Response From Originate : " + res.response);
        }
        //console.log(res)
        //resp.end();
    });
    resp.json({
        message: `Requested acccepted ------ for Ticket id [${lresponse.ticketNo}] key to match [${lresponse.dbInsertKey}]`
    });
    resp.end();
}
}
