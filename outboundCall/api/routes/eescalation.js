
'use strict'

module.exports = function (_, val_esc, pbxcoupling, responseMessage,auth) {

    return {
        SetRouting: function (router) {
          
            router.get('/iintensify/:rtype', val_esc.setCustomHeaders,this.multirequest);
            router.post('/intensify/:rtype', auth.setCustomHeaders,this.multirequest);
        
            
        },
        manager: (req, res) => {
            return  res.json({
                message: "Sanjeev Key[] key [] thanks for the requestt"
            });
        },

        multirequest: (req, res) => {

            let requestFor    = req.params.rtype;
         
             //res.json('this is the sampe response :'+req.params.rtype + '--' +new Date());
             //return;
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
