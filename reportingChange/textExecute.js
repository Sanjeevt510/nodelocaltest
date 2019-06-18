const _ = require('lodash');
//calledb(getToPas());

const sampleJson = require('./sampleJson.json')
const sampleJS = require('./sampleJs')



let event = getToPas();
let key = "huntoperator2connect";
let itemToProcess = sampleJson[key]

let getA = [];
for (var items in itemToProcess) {

    let tempPass = getReturnJson(itemToProcess[items])
    processOperation(tempPass)
    getA.push(tempPass)
}

//console.log(JSON.stringify(getA))

function processOperation(getValue) {
    setTimeout(function () {
        console.log('Query Key::'+getValue['query_type']+'========'+JSON.stringify(getValue)); 
    }, 150); 

    }


function getReturnJson(tempGetJson) {

    let objToParse = sampleJS[tempGetJson];

    let finalPacketToProcess = {}



    for (var jsonn in objToParse) {
        //console.log(jsonn);

        if (jsonn === "keyisthis") {
            let arrayOfObjects = []
            let dbValues = objToParse[jsonn];

            for (var innerArrayLoop in dbValues) {
                //console.log(innerArrayLoop);
                let returnt = valueObject(dbValues[innerArrayLoop], objToParse['replaceKeys'])
                arrayOfObjects.push(returnt)

            }
            finalPacketToProcess['values'] = arrayOfObjects;
        }
        else if (jsonn === "operation") {


            finalPacketToProcess['query_key'] = objToParse[jsonn];



        } else if (jsonn === "operation_type") {


            finalPacketToProcess['query_type'] = objToParse[jsonn];


        }


    }
    return finalPacketToProcess;

}


function getToPas() {
    let toPass = {
        event: 'UserEvent',
        privilege: 'user,all',
        channel: 'SIP/0435-00000158',
        channelstate: '6',
        channelstatedesc: 'Up',
        calleridnum: '478665511',
        calleridname: '478665517',
        connectedlinenum: '<unknown>',
        connectedlinename: '<unknown>',
        language: 'en',
        accountcode: '',
        context: 'voice_generic_entry',
        exten: 'vgentry',
        priority: '8',
        uniqueid: '1546909286.448',
        linkedid: '1546909286.448',
        userevent: 'tonixService',
        reqddi: '478478478',
        called_number: '478478478',
        depart_no: 5,
        client_no: 1002,
        call_for: 0,
        op_userid: 1,
        exit_mode: 'technical_issue',
        direction: 'incoming',
        ticket_id: 1,
        user_id: 1,
        typee: 'inuuu'
    }
    return toPass;
}


function valueObject(input, replaceKeys) {

    let dbObject = {};
    let staticRecords = input['defaultToAdd']['statickeys'];
    let dynamicRecords = input['defaultToAdd']['dynamic'];
    let dbRecords = input['dbRecords'];

    let pickJson = _.pick(event, dbRecords);

    let p1 = _.pick(event, staticRecords);
    let allRecords = null;
    if (!isEmpty(staticRecords)) {
        allRecords = _.merge(dynamicRecords, p1, pickJson);
    }
    else {
        allRecords = _.merge(dynamicRecords, p1, pickJson);
    }


    _.each(allRecords, function (value, key) {

        key = replaceKeys[key] || key;

        dbObject[key] = value;
    });

    return dbObject;
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}