module.exports = function(_, amiConnect) {
    return {
        feedToVoiceApp: function(amiParams, amiARGS) {
            let asterikARGS = this.returnAsteriskInputs(amiParams, amiARGS);
            // console.log('asterikARGS',asterikARGS);
            let agentRoute2Call = this.returnCallingRoute(amiParams);
            // console.log('asterikARGSasterikARGS',amiParams);
            // console.log('agentRoute2Call',agentRoute2Call);
            return new Promise((resolve, reject) => {
                amiConnect.action({
                    'action': 'Originate',
                    'async': 'true',
                    'channel': agentRoute2Call,
                    'context': amiParams.context,
                    'exten': amiParams.exten,
                    'priority': 1,
                    // 'timeout': 10,
                    'variable': `asteriskARGS=${asterikARGS}`,
                    //'variable': 'var11=ticketno||uniqkey',
                    'callerid': amiParams['customer_number'],
                }, function(err, amiResponse) {
                    if (err) {
                        console.log('----AMI REJECT ERR------', );
                        amiResponse['error_mapcode'] = "AMI_REJECT_CALL_GENERATE";
                        // resolve(_.merge(amiParams, amiResponse));
                        reject(_.merge(amiParams, amiResponse));
                    } else {
                        if (amiResponse.response == "Error" || amiResponse.response == "Failure") {
                            console.log('----AMI REJECT ERR or Failure------', );
                            console.log("Response From Originate : " + rreturnMsges.response);
                            reject(amiResponse);
                        } else resolve(_.merge(amiParams, amiResponse))
                    }
                });
            });
        },
        returnAsteriskInputs: function(objDetails, amiARGS) {
            return (_.join(_.values(_.pick(objDetails, amiARGS)), '|'));
            // return (_.join(_.values(_.pick(objDetails, ['req_uniqkey', 'outbound_auto_id', 'timezone', 'agent_id'])), '|'));
        },
        returnCallingRoute: function(agent_object) {

            let routeObject = "SIP//4004@pcim.siptocall.com";
            if (agent_object['agent_channel'] === "siproute") {
                routeObject = "SIP/" + agent_object['agent_number'] + "@pcim.siptocall.com";
            } else if (agent_object['agent_channel'] === "voiproute") {
                routeObject = "SIP/+" + agent_object['agent_number'] + "@VoIPStudio";
            } else {
                routeObject = "DAHDI/G0/" + agent_object['agent_number'];
            }
            return routeObject;
        },
        feedForEsclation: function(amiParams) {
            return new Promise((resolve, reject) => {
                amiConnect.action({
                    'action': amiParams.ami_action,
                    'channel': amiParams.call_channel,
                    'context': 'from-internal-custom',
                    'exten': amiParams.ami_exten
                }, (err, response) => {
                    if (err) {
                        console.log('--------AMI-ERR-REJECT',amiParams);
                        amiParams['error_mapcode'] = "AMI_REJECT_CALL_MANAGER";
                        reject(_.merge(amiParams, response))
                    } else {
                        resolve(_.merge(amiParams, response));
                        console.log(response)
                    }
                });
            });
        },
        feedForDTMF: function(amiParams) {
            console.log(amiParams);
            return new Promise((resolve, reject) => {
                amiConnect.action({
                    'action': 'PlayDTMF',
                    'channel': `${amiParams.call_channel}`,
                    'duration': 500,
                    'digit': amiParams.call_dtmf
                }, (err, response) => {
                    if (err) {
                        console.log('--------AMI-ERR-REJECT',amiParams);
                        amiParams['error_mapcode'] = "AMI_REJECT_CALL_MANAGER";
                        reject(_.merge(amiParams, response))
                    } else {
                        resolve(_.merge(amiParams, response));
                    }
                });
            });
        },delfamily:function(amiParams) {
            return new Promise((resolve,reject) =>{
                              amiConnect.action({

                    'action': 'DBDelTree',
                    'family': amiParams,
                    'key': ''
                }, (err, response) => {
                    if (err) {
                        console.log('--------DEL-ERR-REJECT',amiParams);
                        amiParams['error_mapcode'] = "AMI_REJECT_CALL_MANAGER";
                        reject(_.merge(amiParams, response))
                    } else {
                        resolve(_.merge(amiParams, response));
                    }
                })
            
            });
        }
    }
}