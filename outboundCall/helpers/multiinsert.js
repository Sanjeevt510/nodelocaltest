'use strict'
module.exports = function(_, queryBuilder) {
    return {
        kickOffHistory: function(agentInfo) {
            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `insert into  tigga_agent_kickoff_history set ?`,
                    valuee: {
                        'tigga_user_id': agentInfo.agent_id,
                        'logout_time': agentInfo.timenow,
                        'logout_try': agentInfo.agent_retry || '4',
                        'logout_source': 'ivr'
                    }
                };
                queryBuilder._insertResultSet(localQueryU).then(response => {
                    // console.log(response);
                    agentInfo.logout_auto_id = response.insertId;
                    resolve(agentInfo);
                }).catch(error => {
                    agentInfo['error_mapcode'] = "INSERT_FAILED_TICKET_BULK";
                    agentInfo['message'] = error.sqlMessage;
                    reject(agentInfo);
                });
            });
        },
        orginateTicket: function(ticketParams,param1) {

            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `insert into  tigga_orignatecall_track set ?`,
                    valuee: {
                        'message_id': ticketParams.actionid,
                        'message_type': param1,
                        'message_forwarder': JSON.stringify(_.pick(ticketParams,['agent_id','ticket_auto_id','callback_auto_id','retry_counter'])) || 'error',
                        'app_uniq_key': ticketParams.agent_id,    
                        
                    }
                };
                queryBuilder._insertResultSet(localQueryU).then(response => {
                    // console.log(response);
                    ticketParams.ticket_auto_id = response.insertId;
                    resolve(ticketParams);
                }).catch(error => {
                    ticketParams['error_mapcode'] = "INSERT_FAILED_TICKET_BULK";
                    ticketParams['message'] = error.sqlMessage;
                    reject(ticketParams);
                });
            });
        },
    }
}