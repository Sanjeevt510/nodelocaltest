var logger = require('./../config/logger.js')
var dbPool = require('./../config/dbConnecter.js');
const outboundRoute = require('./getOuboundRoute');


async function _successCall2Agent(customKey) {
    let responseTestme = customKey;
    try {
        const postTicketCreation = await createUploadTicket(customKey);
    
        responseTestme = await createMidTable(postTicketCreation);
    } catch (ex) {
        console.log(ex);
    }
    return responseTestme;
}
async function _validateAgentFlag(customKey) {
    let responseTestme = customKey;
    try {
        const checkTicket2Dial = await validateAgentFlag(customKey);
        responseTestme = await pickCallerFromBase(checkTicket2Dial);
    } catch (ex) {
        console.log(ex);
    }
    return responseTestme;
}

function pickCallerFromBase(customKey) {
    return new Promise((resolve, reject) => {
        var ticketQuery = "select caller_number  as caller_number, tigga_file_upload_id,id as outbound_auto_id from tigga_bulk_outbound_upload where dial_state='0' and retry_count < max_try and next_retry_at<=now() limit 1";
        dbPool.query(ticketQuery, function(err, resultSet, fields) {
            if (err) {
                customKey.rmessage = err.message;
                reject(customKey);
            } else {
                if (resultSet === undefined || resultSet == null || resultSet == "") {
                    logger.info("invalid user for the multi purpose ");
                    customKey.rcode = 100;
                    customKey.rmessage = `Agent ID[${customKey['agent_id']}] has no call for outbound dialing  process terminating  `;
                    reject(customKey);
                } else {
                    customKey.flag_value = 1;
                    customKey.customer_number = resultSet[0].caller_number;
                    customKey.outbound_auto_id = resultSet[0].outbound_auto_id;
                    customKey.outbound_upload_key = resultSet[0].upload_key;
                    _updatePickFlag(customKey);
                    resolve(customKey);
                }
            }
        });
    });
}

function createMidTable(ticketParams) {
    return new Promise((resolve, reject) => {
        var keyss = {
            insertquery: 'insert into  tigga_ticket_outbound set ?',
            insertparams: {
                'outbound_id': ticketParams.outbound_auto_id,
                'ticket_id': ticketParams.ticket_auto_id,
                'outbound_uniq_key': ticketParams.req_uniqkey
            }
        };
        dbPool.query(keyss['insertquery'], keyss['insertparams'], function(err, result) {
            if (err) {
                reject(err);
            } else {
                logger.debug("Record Inserted in the Database   :" + result.insertId + " is auto ID");
                //callmeback(err,result);
                ticketParams.ticket_auto_id = result.insertId;
                resolve(ticketParams);
            }
        });
    });
}



function createUploadTicket(ticketParams) {
    return new Promise((resolve, reject) => {
        var keyss = {
            insertquery: 'insert into  tigga_ticket_tmp set ?',
            insertparams: {
                'call_custkey': ticketParams.req_uniqkey,
                'caller_number': ticketParams.customer_number,
                'tigga_client_id': 1002,
                'incoming_type_id': ticketParams.outbound_auto_id,
                'tigga_agent_group_id': '1',
                'incoming_type': 'tigga_call_incoming',
                'tigga_state_id': 103,
                'tigga_ticket_status_id': 6,
                'assigned_user_id': ticketParams.agent_id
            }
        };
        dbPool.query(keyss['insertquery'], keyss['insertparams'], function(err, result) {
            if (err) {
                reject(err);
            } else {
                logger.debug("Record Inserted in the Database   :" + result.insertId + " is auto ID");
                //callmeback(err,result);
                ticketParams.ticket_auto_id = result.insertId;
                resolve(ticketParams);
            }
        });
    });
}

function validateAgentFlag(customKey) {
    return new Promise((resolve, reject) => {
        var ticketQuery = "select last_name,is_busy,channel,channel_number  from tigga_user  where id='" + customKey['agent_id'] + "' and last_name='multi'";
        dbPool.query(ticketQuery, function(err, resultSet) {
            if (err) {
                customKey.rmessage = err.message;
                reject(customKey);
            } else {
                if (resultSet === undefined || resultSet == null || resultSet == "") {
                    logger.info("invalid user for the multi purpose ");
                    customKey.rmessage = `Agent ID :${customKey['agent_id']} has no right to switch for  calling `;
                    reject(customKey);
                } else {
                    try {
                        customKey.rcode = 200;
                        customKey.agent_number = resultSet[0].channel_number;
                        customKey.agent_channel = resultSet[0].channel;
                        customKey.rmessage = `Record [${customKey['customer_number']}] picket from DB for Agent ID [${customKey['agent_id']}] to  outdial  `;
                        customKey = outboundRoute(customKey);
                        updateOperatorFlagg(customKey,'statusbusy');
                        resolve(customKey);
                    } catch (error) {}
                }
            }
        });
    });
}


function updateOperatorFlagg(inputObj, flagUser) {
    let varrr = {
        'statusbusy': {
            'updateQuery': 'update tigga_user set is_busy =1 where ? ',
            'supportParam': {
                'id': inputObj['agent_id']
            }
        },
        'statusfree': {
            'updateQuery': 'update tigga_user set is_busy =0 where ? ',
            'supportParam': {
                'id': inputObj['agent_id']
            }
        }
    }
    dbPool.query(varrr[flagUser].updateQuery, [varrr[flagUser].supportParam], function(err, result) {
        if (err) {
            logger.info("Error in updateTicUserStatus", err);
        } else {
            logger.debug("updateTicUserStatus Result  :" + result.affectedRows + " record(s) updated for the update query ---");
            //console.log(result);
        }
    });
}

function _updatePickFlag(selectResultSet) {
    console.log('55555555', selectResultSet.flag_value);
    // console.log('55555555', selectResultSet);
   
    
    let updateQuery = `update tigga_bulk_upload set retry_count=retry_count+1,pick_flag=${selectResultSet['flag_value']} where id = ?`;
    dbPool.query(updateQuery, selectResultSet.outbound_auto_id, function(err, result) {
        if (err) {
            logger.info("Error in updateTicUserStatus", err);
        } else {
            logger.debug("updateTicUserStatus Result  :" + result.affectedRows + " record(s) updated for the update query ---");
        }
    });
}
module.exports = {
    validateAgentFlag: _validateAgentFlag,
    updatePickFlag: _updatePickFlag,
    successCall2Agent: _successCall2Agent,
    updateOperatorFlagg:updateOperatorFlagg
};