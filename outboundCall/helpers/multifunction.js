'use strict'

module.exports = function (_, queryBuilder) {
    return {

        createBulkRecordsTicket: function (ticketParams) {
            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `insert into  tigga_ticket set ?`,
                    valuee: {
                        'call_custkey': ticketParams.req_uniqkey,
                        'caller_number': ticketParams.customer_number,
                        'tigga_client_id': ticketParams.clinet_id || '1002',
                        'incoming_type_id': ticketParams.outbound_auto_id,
                        'tigga_agent_group_id': ticketParams.tigga_agent_group_id || '1',
                        'incoming_type': 'tigga_bulk_outbound',
                        'tigga_state_id': 100,
                        'tigga_ticket_status_id': 0,
                        'assigned_user_id': ticketParams.agent_id
                    }
                };

                queryBuilder._insertResultSet(localQueryU)
                    .then(response => {
                        // console.log(response);
                        ticketParams.ticket_auto_id = response.insertId;
                        resolve(ticketParams);
                    })
                    .catch(error => {
                        ticketParams['error_mapcode'] = "INSERT_FAILED_TICKET_BULK";
                        ticketParams['message'] = error.sqlMessage;

                        reject(ticketParams);
                    });
            });

        },
        _insertErrorObject: function (errorObject) {
            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `insert into  tigga_api_logs set ?`,
                    valuee: {
                        'api_object': JSON.stringify(errorObject),
                        'api_error_code': errorObject.error_mapcode || 'SUCCESS',
                        'api_uniq_key': errorObject.req_uniqkey
                    }
                };
                queryBuilder._insertResultSet(localQueryU)
                    .then(response => {
                        resolve(errorObject);
                    })
                    .catch(error => {
                        errorObject['error_mapcode'] = "INSERT_FAILED_API_ERROR";
                        errorObject['message'] = error.sqlMessage;
                        reject(errorObject);
                    });
            });

        },_createCallBackTicket:function(outboundTickParams) {
            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: 'INSERT INTO tigga_outbound_call set ?',
                    valuee: {
                        'tigga_user_id': outboundTickParams.agent_id,
                        'tigga_ticket_id': outboundTickParams.ticket_auto_id,
                        'customer_number': outboundTickParams.customer_number,
                        'agent_channel': outboundTickParams.agent_channel,
                        'agent_number': outboundTickParams.agent_number                     
                    }
                };

                queryBuilder._insertResultSet(localQueryU)
                    .then(response => {
                        outboundTickParams.callback_auto_id = response.insertId;
                        resolve(outboundTickParams);
                    })
                    .catch(error => {
                        outboundTickParams['error_mapcode'] = "INSERT_FAILED_CALLBACK";
                        outboundTickParams['message'] = error.sqlMessage;
                        reject(outboundTickParams);
                    });
            });

        },
        originatetableNote: function (bulkTickParams) {
            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `insert into  tigga_originate_status (actionid,action_table,set_column,set_column_val,where_column,where_column_val,is_active) VALUES  ? `,
                    valuee: [
                        [bulkTickParams.actionid,'tigga_user','is_busy','0','id',bulkTickParams.agent_id,1],
                        [bulkTickParams.actionid,'tigga_ticket','tigga_state_id','102','id',bulkTickParams.ticket_auto_id,2]
                    ]
                    
                }

                queryBuilder._insertBulkResultSet(localQueryU)
                    .then(response => {
                        bulkTickParams.bulk_outbound_auto_id = response.insertId;
                        resolve(bulkTickParams);
                    })
                    .catch(error => {
                        bulkTickParams['error_mapcode'] = "INSERT_FAILED_OUTBOUDN_BULK";
                        bulkTickParams['message'] = error.sqlMessage;

                        reject(bulkTickParams);
                    });
            });

        },
        notification: function (bulkTickParams) {
            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `insert into  tigga_notification set ?`,
                    valuee: bulkTickParams
                };

                queryBuilder._insertResultSet(localQueryU)
                    .then(response => {
                        bulkTickParams.bulk_outbound_auto_id = response.insertId;
                        resolve(bulkTickParams);
                    })
                    .catch(error => {
                        bulkTickParams['error_mapcode'] = "INSERT_FAILED_OUTBOUDN_BULK";
                        bulkTickParams['message'] = error.sqlMessage;

                        reject(bulkTickParams);
                    });
            });

        },       
        del_notification: function (bulkTickParams) {
            return new Promise((resolve, reject) => {
            //        valuee: _.pick(bulkTickParams,['tigga_user_id'])
                let localQueryU = {
                    keyy: `update  tigga_user set is_logged_in=0  WHERE ?`,
                 valuee:{  id:
                    bulkTickParams['tigga_user_id']
                      }            
                };

                queryBuilder._updateResultSet(localQueryU)
                    .then(response => {
                       // bulkTickParams.bulk_outbound_auto_id = response.insertId;
                        resolve(bulkTickParams);
                    })
                    .catch(error => {
                        bulkTickParams['error_mapcode'] = "INSERT_FAILED_OUTBOUDN_BULK";
                        bulkTickParams['message'] = error.sqlMessage;

                        reject(bulkTickParams);
                    });
            });

        },
        bulkoutboundNote: function (bulkTickParams) {
            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `insert into  tigga_bulk_outbound set ?`,
                    valuee: {
                        'tigga_bulk_outbound_upload_id': bulkTickParams.outbound_auto_id,
                        'tigga_ticket_id': bulkTickParams.ticket_auto_id,
                        'outbound_uniq_key': bulkTickParams.req_uniqkey
                    }
                };

                queryBuilder._insertResultSet(localQueryU)
                    .then(response => {
                        bulkTickParams.bulk_outbound_auto_id = response.insertId;
                        resolve(bulkTickParams);
                    })
                    .catch(error => {
                        bulkTickParams['error_mapcode'] = "INSERT_FAILED_OUTBOUDN_BULK";
                        bulkTickParams['message'] = error.sqlMessage;

                        reject(bulkTickParams);
                    });
            });

        },originate_action: function(reqObject) {
            

            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `update tigga_user set retry_counter=retry_counter+1 , ?  where ?`,
                    //keyy: `update tigga_bulk_outbound_upload set ? where ?`,
                    valuee: [{
                        is_busy:reqObject.set_column_val,
                    },{id:reqObject.where_column_val}],
                };
                queryBuilder._updateResultSet(localQueryU)
                    .then(response => {
                    
                        resolve(response);
                    })
                    .catch(error => {
                        reqObject['error_mapcode'] = "UPDATE_FAILED_CALLIN_QUEQE";
                        reject(reqObject);
                    })

        });
        },
        originate_data: function (reqObject,toPickResult) {
            return new Promise((resolve, reject) => {
                let localQuery = `SELECT * FROM  tigga_originate_status where actionid=${reqObject.actionid} and is_active<>11`;

                queryBuilder._selectResultSet(localQuery)
                    .then(dbresult => {
                        if(dbresult.length > 0) {
                       // if data means thier is call in the quequ update the flag define in the user table and reject this request.
                                   

                        resolve(dbresult);
                    }
                    reject(reqObject);
                    })
                    .catch(ex => {
                        reqObject['error_mapcode'] = "SELECT_FAILED_CALLIN_QUEQE";
                        reject(reqObject);
                    });
            });

        },originate_object: function (reqObject) {
           
            return new Promise((resolve, reject) => {
                let localQuery = `SELECT message_type,message_forwarder,app_uniq_key FROM  tigga_orignatecall_track where message_id=${reqObject.actionid}`;

                queryBuilder._selectResultSet(localQuery)
                    .then(dbresult => {
                        if(dbresult.length > 0) {
                       // if data means thier is call in the quequ update the flag define in the user table and reject this request.    
                        resolve(dbresult);
                    }
                    reject(reqObject);
                    })
                    .catch(ex => {
                        reqObject['error_mapcode'] = "SELECT_FAILED_CALLIN_QUEQE";
                        reject(reqObject);
                    });
            });

        },
        iboundcall_inqueue: function (reqObject) {
            return new Promise((resolve, reject) => {
                let localQuery = `SELECT id AS queueid,call_custkey FROM  tigga_call_queue where tigga_client_id=${reqObject.clinet_id} AND call_state='1' and tigga_agent_group_id=${reqObject.agent_group_id}`;

                queryBuilder._selectResultSet(localQuery)
                    .then(dbresult => {
                        if(dbresult.length > 0) {
                       // if data means thier is call in the quequ update the flag define in the user table and reject this request.
                       this.updateClickCallFlag(reqObject);
                       reqObject['error_mapcode'] = "SELECT_FAILED_CALLIN_QUEQE";
                        reject(reqObject);
                    }
                        resolve(reqObject);
                    })
                    .catch(ex => {
                        reqObject['error_mapcode'] = "SELECT_FAILED_CALLIN_QUEQE";
                        reject(reqObject);
                    });
            });

        },_updateAgentFlag: function (reqObject,flagv) {

            return new Promise((resolve, reject) => {
                let localQueryU = {
                    keyy: `update tigga_user set ?  where ?`,
                    //keyy: `update tigga_bulk_outbound_upload set ? where ?`,
                    valuee: [{
                        "is_busy":flagv
                    },{
                        "id": reqObject.agent_id
                    }]
                };
                queryBuilder._updateResultSet(localQueryU)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reqObject['error_mapcode'] = "UPDATE_FAILED_CALLIN_QUEQE";
                        reject(reqObject);
                    })

        });
    },updateClickCallFlag: function (reqObject) {

            return new Promise((resolve, reject) => {
console.log('--------------')
                let localQueryU = {
                    keyy: `update tigga_user set accept_bulk_outbound=1  where ?`,
                    //keyy: `update tigga_bulk_outbound_upload set ? where ?`,
                    valuee: [{
                        "id": reqObject.agent_id
                    }]
                };
                queryBuilder._updateResultSet(localQueryU)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reqObject['error_mapcode'] = "UPDATE_FAILED_CALLIN_QUEQE";
                        reject(reqObject);
                    })

        });
    },agent_status: function (reqObject) {
            return new Promise((resolve, reject) => {
                let localQuery = `select if(is_busy=0,'Free','Busy') as agent_status,channel as agent_channel,channel_number  as agent_number from tigga_user  where id=${reqObject['agent_id']}`;
               // console.log(localQuery);
               let localres = {
                   message:'agent details'
               };
                queryBuilder._selectResultSet(localQuery)
                    .then(dbresult => {
                      // console.log(dbresult)
                        if(dbresult.length > 0) {
                       // dbresult['message'] = 'agent details';
                            localres = dbresult;
                        }
                       else{
                       localres = {
                       'message':  `requested agent id ${reqObject.agent_id} not found in the  context`,
                       'error_code':  404
                       }
                    }
                        resolve(localres);
                    })
                    .catch(ex => {
                        //ex['message'] = `requested agent id ${reqObject.agent_id} not found in the  context`
                        reject(_.pick(ex,['code', 'sqlMessage', 'message']));
                    });
            });

        },
        validateAgentStatus: function (reqObject) {
            return new Promise((resolve, reject) => {
                
                let localQuery = "select last_name,is_busy,channel,channel_number,retry_counter  from tigga_user  where id='" + reqObject['agent_id'] + "'  and is_busy=0";
                // let ticketQuery = "select last_name,is_busy,channel,channel_number  from tigga_user  where  channel_number='4004' and last_name='multi' and is_busy=0";
                // console.log('validateAgentStatus',localQuery);
                queryBuilder._selectResultSet(localQuery)
                    .then(dbresult => {
                                            // console.log(dbresult)
                    if(dbresult.length > 0) {
                        reqObject['res_code'] = 200;
                        reqObject['agent_number'] = dbresult[0]['channel_number'];
                        reqObject['agent_channel'] = dbresult[0]['channel'];
                        reqObject['retry_counter'] = dbresult[0]['retry_counter'];
                        reqObject['res_message'] = `Record [] picket from DB for Agent ID [${reqObject['agent_id']}] to  outdial  `;
                        resolve(reqObject);
                     }
                    else{
                        reqObject['error_mapcode'] = "SELECT_FAILED_AGENT_BUSY";
                        reject(reqObject);
                    }
                })
                    .catch(ex => {
                        reqObject['error_mapcode'] = "SELECT_FAILED_AGENT_BUSY";
                        reject(reqObject);
                    });
            });

        },
        validateTicketStatus: function (reqObject) {
            return new Promise((resolve, reject) => {
                
                let localQuery = `select id,caller_number from tigga_ticket where id=${reqObject['ticket_auto_id']}`;
                
    // console.log('validateTicketStatus',localQuery);
                queryBuilder._selectResultSet(localQuery)
                    .then(dbresult => {
                                            // console.log(dbresult)
                    if(dbresult.length > 0) {
                        reqObject['res_code'] = 200;
                        resolve(reqObject);
                     }
                    else{
                        reqObject['error_mapcode'] = "SELECT_FAILED_TICKET_NOFOUND";
                        reject(reqObject);
                    }
                })
                    .catch(ex => {
                        reqObject['error_mapcode'] = "SELECT_FAILED_TICKET_NOFOUND";
                        reject(reqObject);
                    });
            });

        },
        pickRecord2Outdial: function (reqObject) {
            return new Promise((resolve, reject) => {
                let localQuery = "select caller_number  as caller_number, tigga_file_upload_id,id as outbound_auto_id from tigga_bulk_outbound_upload where dial_state='0' and retry_count < max_try and next_retry_at<=now() limit 1";
                queryBuilder._getResultSet(localQuery)
                    .then(dbresult => {
                        reqObject['res_code'] = 200;
                        reqObject['customer_number'] = dbresult[0]['caller_number'];
                        reqObject['agent_upload_key'] = dbresult[0]['tigga_file_upload_id'];
                        reqObject['outbound_auto_id'] = dbresult[0]['outbound_auto_id'];
                        reqObject['flag_value'] = '1';
                        reqObject['retry_count'] = 1;
                        resolve(reqObject);
                    })
                    .catch(error => {
                        reqObject['error_mapcode'] = "SELECT_FAILED_RECORD_BULK";
                        reqObject['message'] = error.db_message;
                        reject(reqObject);
                    });
            });

        },
        _updateFlagBulk: function (reqObject) {
            return new Promise((resolve, reject) => {

                let localQueryU = {
                    keyy: `update tigga_bulk_outbound_upload set retry_count=retry_count+ ${reqObject.retry_count},? where ?`,
                    //keyy: `update tigga_bulk_outbound_upload set ? where ?`,
                    valuee: [{
                        "dial_state": reqObject.flag_value,
                    }, {
                        "id": reqObject.outbound_auto_id
                    }]
                };

                queryBuilder._updateResultSet(localQueryU)
                    .then(response => {
                        // console.log(response);
                        resolve(reqObject);
                    })
                    .catch(error => {
                        reqObject['error_mapcode'] = "UPDATE_FAILED_RECORD_BULK";
                        reqObject['message'] = error.sqlMessage;

                        reject(reqObject);
                    })
            });

        }
    }
}