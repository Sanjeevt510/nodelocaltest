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
}
*/
let bigTree = {
    first : {
        dbRecords :['channelstate', 'channelstatedesc', 'connectedlinenum', 'language'],
        defaultToAdd: {
            sanjeev: 'sharma',
            mit: 'verma'
        },
    operation: "insert",
    postAction:false
    }
}

module.exports = bigTree;