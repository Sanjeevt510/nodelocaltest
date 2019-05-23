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
    first : { 
        dbRecords :['channelstate', 'channelstatedesc', 'connectedlinenum', 'language'],
        defaultToAdd: {
			statickeys : ['channelstate','channelstatedesc','exit_mode'],
            dynamic:{sanjeev: 'sharma',tigga_state_id: 'IF(tigga_state_id=100,104,IF(tigga_state_id=99,103,tigga_state_id))',local_date:'now()'}
        },
    operation: "insert into table values set ?",
    operation_type: "insert ",
    postAction:false
    }
}

module.exports = bigTree;