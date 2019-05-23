const _ = require('lodash');
//calledb(getToPas());
const sampleJson = require('./sampleJson.json')
const sampleJS = require('./sampleJs')


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
let event = getToPas();
let key = "huntoperator2connect";
let itemToProcess = sampleJson[key]

//console.log(sampleJson[key])
let getA = [];
for (var items in itemToProcess) {

    let tempPass = getReturnJson(itemToProcess[items])
    console.log('tempPass start')
    getA.push(tempPass)
    // console.log(tempPass);
    console.log('tempPass end')

}

//console.log(getA)
function getReturnJson(tempGet) {
    let objToParse = sampleJS[tempGet];

    let params = {}
    let finalPacketToProcess = {}
    let pickJson = null;
    let valueArray =    [];
   //console.log(objToParse);

   console.log("11111111111*************************"+Object.keys(objToParse));
   console.log(_.pick(objToParse,"dbRecords"))
   console.log(_.pick(objToParse,"defaultToAdd"))
   console.log(_.pick(objToParse,"operation"))
   console.log(_.pick(objToParse,"postAction"))
   console.log("11111111111********************************")
 
    for (var jsonn in objToParse) {
        //console.log(jsonn);
        
        if (jsonn === "dbRecords") {
          //  console.log(objToParse[jsonn])
            pickJson = _.pick(event, objToParse[jsonn]);
            params['values']  =   pickJson;
            
           // console.log(pickJson)
        }else if (jsonn === "defaultToAdd") {
            //console.log(objToParse[jsonn])
            console.log('inside this loop start ');
            let p1 =  _.pick(event,objToParse[jsonn]['statickeys']);
            if(isEmpty(objToParse[jsonn]['statickeys']))
            console.log('Object is empty '+objToParse[jsonn]['statickeys']);
            else
            console.log('Object is not empty '+objToParse[jsonn]['statickeys']);
            
            let p2 =  _.merge(objToParse[jsonn]['dynamic'],p1,pickJson);
            // p1  =  _.pick(event,p1)
            //console.log(Array.isArray(p1))
            //console.log(p1)
           // console.log(p2)
           // finalPacketToProcess['query_value']   =  p2;
            //p2.push[valueArray]
            valueArray.push(p2)
            console.log('inside this loop  end ')
           // params['values']  =   _.merge(pickJson, objToParse[jsonn])

        }else if (jsonn === "operation") {
            
            params['operation']  =   objToParse[jsonn];
            finalPacketToProcess['query_key']   =  objToParse[jsonn];
          
            
            
        }else if (jsonn === "operation_type") {
            
          
            finalPacketToProcess['query_type']   =  objToParse[jsonn];
            
            
        }else {
            console.log('no matching')
        }

       
    }
    finalPacketToProcess['valueArray']  = valueArray;
    console.log(finalPacketToProcess)
    // console.log(objToParse['dbRecords'])


    return objToParse
}

function createQuery(input) {
    console.log('#@#@#@#@#@#' + input);
    return;

    let c, aa, pickUPJson, addOnJson = null;


  //  for (var p in input) {
        for (var p =0; p< input.length ; p ++ ) {
            //  console.log(input[p][0]['defaultKeys']);
        //console.log(JSON.stringify(input[p]))
        let keyToPickk = input[p];
        console.log(keyToPickk)
                let temp = []
            for( var pp in keyToPickk) {

                temp.push(_.pick(event, keyToPickk[pp]));
                // addOnJson = keyToPickk[1]['defaultToAdd'];

            }
        console.log(Array.isArray(keyToPickk))
        console.log(temp)
       // console.log(_.pull(input[p], 'defaultToAdd'));
        //console.log(keyToPickk)
        //console.log(p)

        //  let keyToPickk = valueToPick[p]['defaultKeys'];
        // for (var pp in keyToPickk) {
        //   console.log('################')
        //console.log(keyToPickk[pp])
        //     console.log('1111111111111111')
       

        //console.log(pickUPJson)
        //c = _.merge(pickUPJson, keyToPickk[pp]['defaultToAdd']);
        // console.log(_.flattenDeep(keyToPickk[pp]['defaultToAdd']))



        //}
        console.log('tooomerge');

      //  console.log(addOnJson)
       // console.log(pickUPJson);
        console.log('tooomerge');

        if (!isEmpty(addOnJson)) {
            for (var v in addOnJson) {
                console.log(addOnJson[v])
                aa = _.merge(pickUPJson, addOnJson[v])
            }
            console.log(aa)
        } else
            console.log(pickUPJson)
        // console.log(c)
    }

}
let valueToPick = [
    [{
        defaultKeys: ['channelstate', 'channelstatedesc', 'connectedlinenum', 'language']
    }, {
        defaultToAdd: [{ sanjeev: 'sharma' }, { mit: 'verma' }]
    }],
    [{
        defaultKeys: [4, 5, 6]
    }, {
        defaultToAdd: [{ sanjeev: 'sharma' }, { amit: 'verma' }]
    }],
]
//console.log(valueToPick);
for (var p in valueToPick) {
    // console.log(valueToPick[p]);
    let keyToPickk = valueToPick[p];
    //  let keyToPickk = valueToPick[p]['defaultKeys'];
    for (var pp in keyToPickk) {
        //console.log(keyToPickk[pp])

    }

    let pickJson = _.pick(event, valueToPick[p]['defaultKeys']);

    let defToAdd = valueToPick[p]['defToAdd'];

    // console.log(keyToPickk);

    //console.log(pickJson);

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
