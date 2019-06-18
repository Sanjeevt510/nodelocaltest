'use strict'

module.exports = function(_, queryBuilder) {
        return {
           
           	kickAgentOut: function(agentInfo) {

            	console.log('called this function testing',agentInfo)
                return new Promise((resolve, reject) => {
                    let localQueryU = {
                        keyy: `update tigga_user set ?  where ?`,
                        //keyy: `update tigga_bulk_outbound_upload set ? where ?`,
                        valuee: [{
                            is_logged_in: 0,

                        }, {
                            id: agentInfo.agent_id
                        }],
                    };
                    console.log('called this function testing',localQueryU)
                    queryBuilder._updateResultSet(localQueryU).then(response => {
                        resolve(response);
                    }).catch(error => {
                       // reqObject['error_mapcode'] = "UPDATE_FAILED_CALLIN_QUEQE";
                        reject(error.sqlMessage);
                    })
                });
            }
        }
    }