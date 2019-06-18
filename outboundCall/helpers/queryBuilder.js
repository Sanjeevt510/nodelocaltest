'use strict'

module.exports = function (dbConnecter) {
    return {

        _getResultSet: function (selectQuery) {
           
            return new Promise((resolve, reject) => {    
                
  
                    dbConnecter.query(selectQuery, function (err, dbresultSet) {
                        
                        if (err) {
                             dbresultSet = {
                                selectdata: false,
                                db_message :`Error in Query :${err.sqlMessage}`
                             };
                           reject(dbresultSet);
                        } else {
                            if (dbresultSet === undefined || dbresultSet == null || dbresultSet == "") {
                                dbresultSet['db_message'] = `no record found for the requet query ::${selectQuery}`;
                            reject(dbresultSet);
                            } else {
                               dbresultSet['db_message'] = `Data process for further action  ::${selectQuery}`;
                                dbresultSet['selectdata'] = true;
                             //   resolve(dbresultSet);
                            }
                        }
                        resolve(dbresultSet);
                    });
                    

               
            });
        },
        _selectResultSet: function (selectQuery) {
           
            return new Promise((resolve, reject) => {    
                
           //     console.log(selectQuery);
                    dbConnecter.query(selectQuery, function (err, dbresultSet) {
                        
                        if (err) {
                           reject(err);
                        } else {
                        resolve(dbresultSet);
                        }
                    });
            });
        },
        _updateResultSet: function (updateQuery) {
           
            return new Promise((resolve, reject) => {    
             //  console.log(updateQuery);
  
                dbConnecter.query(updateQuery['keyy'],updateQuery['valuee'], function(err, result) {
                    if (err) {
                        //console.log("Error in updateTicUserStatus", err);
                        reject(err);

                    } else {
                       // console.log("updateTicUserStatus Result  :", result.affectedRows + " record(s) updated for the update query ---");
                      
                        resolve(result);
                    }
                });
            });
        },
        _insertResultSet: function (insertQuery) {
         // console.log(insertQuery);
            return new Promise((resolve, reject) => {      
                dbConnecter.query(insertQuery['keyy'],insertQuery['valuee'], function(err, result) {
                    if (err) {
                        console.log("Error in updateTicUserStatus", err);
                        reject(err);
                    } else {                      
                        resolve(result);
                    }
                });
            });
        },
        _insertBulkResultSet: function (insertQuery) {
          //console.log(insertQuery);
            return new Promise((resolve, reject) => {      
                dbConnecter.query(insertQuery['keyy'],[insertQuery['valuee']], function(err, result) {
                    if (err) {
                        console.log("Error in updateTicUserStatus", err);
                        reject(err);
                    } else {                      
                        resolve(result);
                    }
                });
            });
        }
    }
}
