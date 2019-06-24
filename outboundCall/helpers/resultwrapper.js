'use strict'

module.exports = function (_) {
    return {


        returnobject : function(resultSet,filterKeys,replaceKeys) {
          
            let pickJson = _.pick(resultSet, filterKeys);
            console.log(pickJson);
let rr = {};
            _.each(pickJson, function (value, key) {

                key = replaceKeys[key] || key;
        
                rr[key] = value;
            });
               return rr;

        }
    }
}