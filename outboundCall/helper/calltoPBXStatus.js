const amiModule = require('./../config/amiConnect.js');
const _ = require('lodash');

module.exports = function (amiParams) {

   

    return new Promise((resolve, reject) => {
try{

        amiModule.action({
              'action': 'originateresponse',
            'actionid': amiParams.actionid
             }, function (err, res) {
            if (err) {
                // console.log(err);
                console.log('-------------',err)
                reject(_.merge(amiParams, err));
                // reject(amiParams);
            } else {
                if (res.response == "Error" || res.response == "Failure") {
                    console.log("Response From Originate : " + res);
                    reject(res);
                } else
                console.log(res);
                    console.log(res);
                    resolve(_.merge(amiParams, res))
            }
        });
    }catch(ex){
        console.log(ex);
    
}



    });


}