'use strict'

module.exports = function (_, queryBuilder) {
    return {


        agentForceLogout: function (inputKeys) {

            let updateQuery = {
                keyy: `update  tigga_user set is_logged_in=0  WHERE ?`,
             valuee:    {  id:inputKeys['tigga_user_id']}            
            };
  
            let insertQuery = {
                keyy: `insert into  tigga_notification set ?`,
                valuee: inputKeys
            };

            queryBuilder._updateResultSet(updateQuery)
            .then(response => {
                insertQuery.bulk_outbound_auto_id = response.insertId;
            })
            .catch(error => {
                inputKeys['error_mapcode'] = "UPDATE_FAILES_AGENT_UPDATE";
                inputKeys['message'] = error.sqlMessage;

                reject(inputKeys);
            });

            queryBuilder._updateResultSet(insertQuery)
            .then(response => {
                insertQuery.bulk_outbound_auto_id = response.insertId;
                resolve(insertQuery);
            })
            .catch(error => {
                insertQuery['error_mapcode'] = "INSERT_FAILED_AGENT_UPDATE";
                insertQuery['message'] = error.sqlMessage;

                reject(insertQuery);
            });

        },
        isAgentFree: function (inputKeys) {
            return new Promise((resolve, reject) => {
                let selectParams =
                {
                    id: inputKeys['agent_id']
                };
                let selQuery = "select channel_number as agent_number,channel as agent_channel,retry_counter, 200 as res_code,is_busy from tigga_user where is_busy !=0 and ?  "

                queryBuilder._selectObject(selQuery, selectParams)
                    .then(dbresult => {
                        if (!_.isEmpty(dbresult)) {

                            inputKeys['res_message'] = `Record [] picket from DB for Agent ID [${inputKeys['agent_id']}] to  outdial  `
                            inputKeys = _.merge(inputKeys, dbresult[0]);
                            resolve(inputKeys);
                        }
                        else {
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