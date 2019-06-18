const _ = require('lodash')
let a = [{ "bigTreeKey": "spy_calldetails_record", "bigTreeMethod": "inlayQuery", "preAction": false }, { "bigTreeKey": "spycall_userid_flag", "bigTreeMethod": "amedQuery", "preAction": false }];

//console.log(a)


//console.log(_.filter(a, { "bigTreeKey": "spy_calldetails_record", "bigTreeMethod": "inlayQuery" }))
//console.log(_.filter(a, ["bigTreeKey", "spy_calldetails_recordd"]))



var jsonn = { key1: 'value1', singlekey: 'spy_calldetails_record' }

if ('singlekey' in jsonn) {
    console.log('single query request form asterisk ')
    let tempObject =   _.filter(a, ["bigTreeKey", jsonn['singlekey']])
    if (!_.isEmpty(tempObject))
        console.log('object found for the single query '+JSON.stringify(tempObject))
    else
        console.log('object not found found for the single query ')

}
else
console.log('multi query  query request form asterisk ')
"key1" in jsonn ? console.log('add on please ignore key exists') : console.log('unknown key')

"key3" in jsonn ? console.log('add on please ignore  key exists') : console.log('add on please ignore  unknown key')