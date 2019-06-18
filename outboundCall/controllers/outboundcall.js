'use strict'
module.exports = function(_, Joi, reqValidataion, multifunction, pbxcoupling, responseMessage, auth) {
    return {
        SetRouting: function(router) {
            router.get('/tiggadesk/outcall', auth.setCustomHeaders, this.outboundCall);
            router.post('/tiggadesk/outcall', auth.setCustomHeaders, this.outboundCall);
            //     router.post('/tiggadesk/callback', auth.setCustomHeaders,this.callbackprocess);
        },
        outboundCall: (req, res) => {
            // console.log(req.body);
            let retryc = null;


            if (req.method === "GET") 
              retryc = req.query.caller_number;
            else 
              retryc = req.body.caller_number;


            const schema = {
                caller_no: Joi.number().integer().min(40000000).required()
            }
           
            let validationResult = reqValidataion.reqparams(retryc, schema);
            if (validationResult['Joierror']) {
                console.log(validationResult);
                return res.status(200).json(validationResult)
            }
            //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
            //res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');

           // retryc = '+'.concat(retryc);


            let configTemplate = responseMessage.outboundCall(retryc,req);
            //  console.log(configTemplate)
            let responseTemplate = {
                message: configTemplate['responseKey']['SUCCESSRESPONSE'],
                uniq_key: configTemplate['queryKey']['req_uniqkey']
            }

            let amiARGS = ['customer_number', 'timezone'];

            validatebeforeOutcall(configTemplate['queryKey']).then(validateresponse => {
                responseTemplate['message'] = configTemplate['responseKey'][validateresponse['error_mapcode']];
                // responseTemplate.message=err.message;
                console.log('validaterepsonse');
                return res.json(responseTemplate);
            }).catch(err => {
                return res.json(responseTemplate);
            });


           

            async function validatebeforeOutcall(queryKey) {
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