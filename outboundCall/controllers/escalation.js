
'use strict'

module.exports = function (_, Joi, reqValidataion, multifunction, pbxcoupling, responseMessage,auth) {

    return {
        SetRouting: function (router) {
          
            router.get('/intensify/:rtype', this.multirequest);
            router.post('/intensify/:rtype', auth.setCustomHeaders,this.multirequest);
        
            
        },
        manager: (req, res) => {
            return  res.json({
                message: "Sanjeev Key[] key [] thanks for the requestt"
            });
        },

        multirequest: (req, res) => {


           // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
           // res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');

            let requestFor    = req.params.rtype;
            let validRequest  =   ['manager','internal','external','recording','internalP','outboundTrans'];

            console.log(req.body);

            if (!(_.includes(validRequest, requestFor))) {
                return  res.json({
                    message: `Invalid request type :${requestFor}`
                });
            }

            const schema = {
                channel: Joi.string().min(7).required()
            }
            let validationResult = reqValidataion.reqparams(req, schema);
            if (validationResult['Joierror']) {
               console.log(validationResult);
               return res.status(200).json(validationResult)
           }
          
          
          let configTemplate = responseMessage[requestFor](req);

          let responseTemplate = 
          {
              message:configTemplate['responseKey']['SUCCESSRESPONSE'],
              uniq_key:configTemplate['queryKey']['req_uniqkey']
          }
           
          pbxcoupling.feedForEsclation(configTemplate['queryKey'])
          .then(lresponse => {
            responseTemplate.message=lresponse.message;
            res.json(responseTemplate);
          })
          .catch(err =>{
              responseTemplate.message=err.message;
              res.json(responseTemplate);
          });
        },
    }
}
