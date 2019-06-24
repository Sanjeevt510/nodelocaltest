'use strict'

module.exports = function (_,queryBuilder) {
    return {


        isAgentFree : function(inputKeys) {
            return new Promise((resolve, reject) => {
                let selectParams =
                {
                    id : inputKeys['agent_id']
            };
    let selQuery    =   "select channel_number as agent_number,channel as agent_channel,retry_counter, 200 as res_code,is_busy from tigga_user where is_busy !=0 and ?  "

            queryBuilder._selectObject(selQuery,selectParams)
                .then(dbresult => {
            if(!_.isEmpty(dbresult)) {
            
                console.log(dbresult);
    //console.log(resultwrapper.returnobject(dbresult[0],['channel_number'],{'channel_number': 'agent_channel'}))
                   
                   inputKeys['res_message'] = `Record [] picket from DB for Agent ID [${inputKeys['agent_id']}] to  outdial  `
                    inputKeys = _.merge(inputKeys, dbresult[0]);
                    resolve(inputKeys);
                 }
                else{
                    inputKeys['error_mapcode'] = "SELECT_FAILED_AGENT_BUSY";
                    reject(inputKeys);
                }
            })
                .catch(ex => {
                    inputKeys['error_mapcode'] = "SELECT_FAILED_AGENT_BUSY";
                    reject(inputKeys);
                });
            });

            return inputKeys

        },
      }
}