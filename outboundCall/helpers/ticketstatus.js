'use strict'

module.exports = function (_,queryBuilder) {
    return {

        isValidTicket : function(inputKeys) {
            return new Promise((resolve, reject) => {
                let selectParams =
                {
                    id : inputKeys['ticket_id']
            };
    let selQuery = "select id,caller_number as ticket_caller_number  from tigga_ticket where ?";
      
            queryBuilder._selectObject(selQuery,selectParams)
                .then(dbresult => {
            if(!_.isEmpty(dbresult)) {
            
                console.log(dbresult);
  
                    inputKeys = _.merge(inputKeys, dbresult[0]);
                    resolve(inputKeys);
                 }
                else{
                    inputKeys['error_mapcode'] = "SELECT_FAILED_TICKET_NOFOUND";
                    reject(inputKeys);
                }
            })
                .catch(ex => {
                    inputKeys['error_mapcode'] = "SELECT_FAILED_TICKET_NOFOUND";
                    reject(inputKeys);
                });
            });

            return inputKeys

        },
      }
}