
'use strict'

module.exports = function (_, val_call, reqValidataion, multifunction, pbxcoupling, responseMessage,auth,multiinsert) {

    return {
        SetRouting: function (router) {
          
            router.post('/tiggadesk/ccallback', val_call.setCustomHeaders,this.callbackprocess);
            router.get('/tiggadesk/ccallback', val_call.setCustomHeaders,this.callbackprocess);
            
        },

        callbackprocess: (req, res) => {
    
           //console.log(req.body);
                    
             res.json('this is the /tiggadesk/ccallback response :'+req.params.rtype + '--' +new Date());
             return;
        


            //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
            //res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');
           
           let configTemplate = responseMessage.callback(req);
         //  console.log(configTemplate)

         let responseTemplate = 
         {
             message:configTemplate['responseKey']['SUCCESSRESPONSE'],
             uniq_key:configTemplate['queryKey']['req_uniqkey']
         }
           validatebeforeCallBack(configTemplate['queryKey'])
           .then(validateresponse => {
            responseTemplate['message'] = configTemplate['responseKey'][validateresponse['error_mapcode']];
           // responseTemplate.message=err.message;
               console.log('validaterepsonse');
               return res.json(responseTemplate);


           })
           .catch(err => {
            return res.json(responseTemplate);
           })
           let amiARGS = ['ticket_auto_id', 'callback_auto_id', 'timezone', 'agent_id'];
         
           async function validatebeforeCallBack(queryKey) {
            let replyback = null;
            try {

                //This will check the status of agent is live or not having acccess to this kind of flow 99% retrun true
                //const agentDetails  =   await multifunction.validateAgentStatus(queryKey);
                replyback = await multifunction.validateAgentStatus(queryKey);

               

                //Check records in the repo and pick one for this agent to outdial
                //const checkTicket2Dial = await multifunction.pickRecord2Outdial(agentDetails);
                await multifunction.validateTicketStatus(replyback);

                //If this is records then it will update the flag as used for requested agent
                //const aa = await multifunction._updatePicketFlag(checkTicket2Dial);
               // await multifunction._updateFlagBulk(replyback);
                
               await multifunction._createCallBackTicket(replyback,2);

               await multifunction._updateAgentFlag(replyback,2);


                //If all goes correct then this will create a outbound call to the application agent
                //const pbxresponse = await pbxcoupling.feedToVoiceApp(checkTicket2Dial);
                replyback = await pbxcoupling.feedToVoiceApp(replyback,amiARGS);

                await multiinsert.orginateTicket(replyback,"callback")

            } catch (error) {
               
                replyback = error;
            }
            //console.log('Fianl Reply',replyback);
            return replyback;
        }

               
                    

        }
    }
}
