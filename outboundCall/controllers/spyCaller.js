'use strict'
module.exports = function(_, Joi, reqValidataion, multifunction, pbxcoupling, responseMessage, auth) {
    return {
        SetRouting: function(router) {
            router.get('/tiggadesk/spyagent', auth.setCustomHeaders, this.spyagentCheck);
             router.post('/tiggadesk/spyagent', auth.setCustomHeaders, this.spyagentCheck);
        },

        spyagentCheck:(req,res) => {
        
        console.log('this is pritring ');
    
            let manager_no,manager_no_channel,spychannel = null;
            let requestData = {}



            if (req.method === "GET") {
              requestData['manager_channel_number'] = req.query.manager_channel_number;
              requestData['manager_channel_route'] = req.query.manager_channel_route;
              requestData['spychannel'] = req.query.agent_channel;
               requestData['agent_user_id'] = req.query.agent_user_id;
               requestData['manager_user_id'] = req.query.manager_user_id;
               
            }
            else {
              requestData['manager_channel_number'] = req.body.manager_channel_number;
             requestData['manager_channel_route'] = req.body.manager_channel_route;
            requestData['spychannel'] = req.body.agent_channel;
             requestData['agent_user_id'] = req.body.agent_user_id;
               requestData['manager_user_id'] = req.body.manager_user_id;
            }


          const schema = Joi.object().keys({
                manager_channel_number: Joi.number().integer().min(3999).required(),
                manager_user_id: Joi.number().integer().min(1),
                agent_user_id: Joi.number().integer().min(1),
                manager_channel_route: Joi.string().min(6),
                 spychannel:Joi.string().min(14)
            }).with('manager_channel_no',['agent_user_id']);


          let validationResult = reqValidataion.reqgetpost(requestData, schema);
          
            if (validationResult['Joierror']) {
                console.log(validationResult);
                return res.status(200).json(validationResult)
            }


          
            let configTemplate = responseMessage.spyACall(requestData,req);
            let responseTemplate = {
                message: configTemplate['responseKey']['SUCCESSRESPONSE'],
                uniq_key: configTemplate['queryKey']['req_uniqkey'],
                scholar_user_id: configTemplate['queryKey']['agent_user_id'],
                coach_user_id: configTemplate['queryKey']['manager_user_id']

            }

            //return res.json(responseTemplate);
            
            let amiARGS = ['agent_user_id', 'timezone','call_channel','manager_user_id'];

            validatebeforSPYcall(configTemplate['queryKey']).then(validateresponse => {
                responseTemplate['message'] = configTemplate['responseKey'][validateresponse['error_mapcode']];
                // responseTemplate.message=err.message;
                console.log('validaterepsonse');
                return res.json(responseTemplate);
            }).catch(err => {
                return res.json(responseTemplate);
            });


           

            async function validatebeforSPYcall(queryKey) {
                let replyback = null;
                // console.log(queryKey)
                try {
                    replyback = await pbxcoupling.feedToVoiceApp(queryKey, amiARGS);
                } catch (error) {
                  console.log(error)
                    replyback = error;
                }
                //console.log('Fianl Reply',replyback);
                return replyback;
            }

         
        
        }
    }
}