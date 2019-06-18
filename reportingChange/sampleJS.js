/*let bigTreee = {
    first: {
        dbitmes: {
            [{
                defaultKeys: ['channelstate', 'channelstatedesc', 'connectedlinenum', 'language']
            }, {
                defaultToAdd: [{
                    sanjeev: 'sharma'
                }, {
                    mit: 'verma'
                }]
            }],
            [{
                defaultKeys: [4, 5, 6]
            }, {
                defaultToAdd: [{
                    sanjeev: 'sharma'
                }, {
                    amit: 'verma'
                }]
            }]
        },
        operation: "insert"
    }
}

let bigTree = {
    first : {
        dbRecords :[
    [
    {defaultKeys: ['channelstate', 'channelstatedesc', 'connectedlinenum', 'language']},
    {defaultToAdd: [{sanjeev: 'sharma'}, {mit: 'verma'}]}
    ],

            ]
            , operation: "insert",
            postAction:false
    }
	
	        defaultToAdd: {
            statickeys : ['channelstate','channelstatedesc','exit_mode'],
            dynamic:{sanjeev: 'sharma',mit: 'verma'}
        },
}
*/


let bigTree = {
    first: {
        keyisthis: [
            {
                dbRecords: ['context', 'language'],
                defaultToAdd: {
                    statickeys: ['channelstate','calleridname'],
                    dynamic: { sanjeev: 'sharma', local_date: 'now()' }
                }
            }
            , {
                dbRecords: ['privilege','channelstatedesc'],
                defaultToAdd: {
                    statickeys: ['channel', 'exit_mode'],
                    dynamic: { name: 'sanjeev', tigga_state_id: 'IF(tigga_state_id=100,104,IF(tigga_state_id=99,103,tigga_state_id))' }
                }
            }
        ],
        operation: "insert into table values set ? and ?",
        operation_type: "insert ",
        replaceKeys:{
            channelstate: "ichannelstated",
            channelstatedesc: "updated",
        },   
        postAction: false
    }, second: {
        keyisthis: [
            {
                dbRecords: ['context', 'language'],
                defaultToAdd: {}
            }

        ],
        operation: "insert into table values set ? and ?",
        operation_type: "update ",
        replaceKeys:{},   
        postAction: false
    }
}

module.exports = bigTree;

/*
let bigTree = {
    inlay_operatorfetch: {
        keyisthis: [
            {
                dbRecords: ['caller_custkey','caller_alt_custkey','call_priority','depart_no','client_no','call_for','agent_code','group_calling_flag','brand_id','queue_time'],
                defaultToAdd: {
                    statickeys: [],
                    dynamic: { 'call_state': '1' }
                }
            }
        ],
        operation: "insert into tigga_call_queue set ?",
        operation_type: "insert ",
        eventt: "baba ",
        replaceKeys:{
            brand_id:'tigga_brand_id',
            caller_custkey: 'call_custkey',
            caller_alt_custkey: 'call_custkey_previous',
            depart_no: 'tigga_agent_group_id',
            client_no:'tigga_client_id',
            call_for: 'tigga_role_id',
            agent_code:'tigga_user_id',
            group_calling_flag:'call2_group',
            brand_id:'tigga_brand_id',
        },   
        postAction: false
    }
}

module.exports = bigTree;
*/