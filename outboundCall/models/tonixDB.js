var logger = require('./../config/logger.js')
var dbPool = require('./../config/dbConnecter.js');
var lowerCase = require('lower-case')
var moment = require('moment');



async function _validateToProcess(customKey) {
    let responseTestme = customKey;
    try {
        const checkticket = await validateTicket(customKey);
        const checkUser = await validateUser(customKey);
        responseTestme = await getRoute4Call(checkUser);
    } catch (ex) {
        console.log(ex);
    }
    return responseTestme;
}



function getRoute4Call(customKey) {
    return new Promise((resolve, reject) => {
        if (lowerCase(customKey['opRoute']) == "siproute") {
            endpoint = "SIP/" + customKey['opNumber'] + "@pcim.siptocall.com";
        } else if (lowerCase(customKey['opRoute']) == "voiproute") {
            endpoint = "SIP/" + customKey['opNumber'] + "@VoIPStudio";
        } else {
            endpoint = "DAHDI/G0/" + customKey['opNumber'];
        }
        let mynow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        customKey['endpoint'] = endpoint;
        customKey.rcode = 200;
        let insertQuery = "INSERT INTO tigga_outbound_call (tigga_user_id,tigga_ticket_id,customer_number,channel,channel_number,created_at) VALUE (?,?,?,?,?,?)";
        //console.log("generating the outbound calls for the select query [" + insertQuery + "]of the operator as busy where the endpoint is " + endpoint);
        dbPool.query(insertQuery, [customKey['operatorNo'], customKey['ticketNo'], customKey['callerNo'], customKey['opRoute'], customKey['opNumber'], mynow], function(err, res) {
            if (err) {
                updateOperatorFlag(customKey, 'statusfree');
                customKey.rmessage = err.message;
                customKey.rcode = 100
            } else {
                customKey.dbInsertKey = res.insertId;
            }
            resolve(customKey)
        });
    });
}

function validateTicket(customKey) {
    return new Promise((resolve, reject) => {
        var ticketQuery = "select id from tigga_ticket where id='" + customKey['ticketNo'] + "'";
        dbPool.query(ticketQuery, function(err, resultSet) {
            if (err) {
                reject(customKey);
            }
            if (resultSet === undefined || resultSet == null || resultSet == "") {
                logger.info("invalid ticket id no result found");
                customKey.rmessage = `invalid ticket  id [${customKey['ticketNo']}] `;
                reject(customKey);
            }
            resolve(customKey)
        });
    });
}

function validateUser(customKey) {
    return new Promise((resolve, reject) => {
        let querytext = "select is_busy,channel,channel_number from  tigga_user where id ='" + customKey['operatorNo'] + "' and is_busy=0";
        dbPool.query(querytext, function(err, selectresult, fields) {
            if (err) {
                logger.info('Error in Query for the  operator with user id in the repoo');
                customKey.rmessage = `no operator / // /// //busy user id [${customKey['operatorNo']}]   found for request ID`;
                reject(customKey);
            }
                if (!(selectresult.length == 1)) {
                    logger.info('no operator with user id [' + customKey['operatorNo'] + '] found in the repoo');
                    customKey.rmessage = `no operator / // /// //busy user id [${customKey['operatorNo']}]   found for request ID`;
                    reject(customKey);
                }
                    if (!err) {
                        if ((selectresult[0].channel_number === undefined || selectresult[0].channel_number == null || selectresult[0].channel_number == "" || selectresult[0].channel === undefined || selectresult[0].channel == null || selectresult[0].channel == "")) {
                            logger.info('some thing is missing eithr the channel or channel number need alert and rectification');
                            customKey.rmessage = `Either channel or channel No missing for user id [${customKey['operatorNo']}] `;
                            reject(customKey);
                        } else {
                            customKey['opNumber'] = selectresult[0].channel_number;
                            customKey['opRoute'] = selectresult[0].channel;
                            updateOperatorFlag(customKey, 'statusbusy');
                            resolve(customKey)
                        }
                    }
                    //  return callback(responsePacket);
                
        
        });
    });
}


function updateOperatorFlag(inputObj, flagUser) {
    let varrr = {
        'statusbusy': {
            'updateQuery': 'update tigga_user set is_busy =1 where ? ',
            'supportParam': {
                'id': inputObj['operatorNo']
            }
        },
        'statusfree': {
            'updateQuery': 'update tigga_user set is_busy =0 where ? ',
            'supportParam': {
                'id': inputObj['operatorNo']
            }
        }
    }
    dbPool.query(varrr[flagUser].updateQuery, [varrr[flagUser].supportParam], function(err, result) {
        if (err) {
            logger.info("Error in updateTicUserStatus", err);
        } else {
            logger.debug("updateTicUserStatus Result  :" + result.affectedRows + " record(s) updated for the update query ---");
        }
    });
}
module.exports = {
    validateToProcess: _validateToProcess,
    
};