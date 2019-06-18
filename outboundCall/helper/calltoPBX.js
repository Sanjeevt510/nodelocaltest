const amiModule = require('./../config/amiConnect.js');
const _ = require('lodash');

module.exports = function (amiParams) {

    //console.log(amiParams);
    let asterikARGS = returnAsteriskInputs(amiParams);

    return new Promise((resolve, reject) => {

        amiModule.action({
              'action': 'originate',
            'async': 'true',
            'channel': amiParams.call_endpoint,
            'context': amiParams.context,
            'exten': amiParams.exten,
            'priority': 1,
            // 'timeout': 10,
            'variable': 'asteriskARGS=' + asterikARGS,
            //'variable': 'var11=ticketno||uniqkey',
            'callerid': amiParams['customer_number'],
        }, function (err, res) {
            if (err) {
                // console.log(err);
                console.log('-------------')
                reject(_.merge(amiParams, err));
                // reject(amiParams);
            } else {
                if (res.response == "Error" || res.response == "Failure") {
                    console.log("Response From Originate : " + res.response);
                    reject(res);
                } else
               // console.log(res);
                    resolve(_.merge(amiParams, res))
            }
        });


    });


}
function returnAsteriskInputs(objDetails) {
    return (_.join(_.values(_.pick(objDetails, ['req_uniqkey', 'outbound_auto_id', 'timezone', 'agent_id'])), '|'));
}