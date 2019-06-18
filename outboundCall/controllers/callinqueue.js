'use strict'

module.exports = function (pbxcoupling) {
    

    return {
        SetRouting: function (router) {
            router.get('/callwating/action/:chan', this.callqueue);
            router.get('/statusof/:free/:agent_id', this.indexPage);
            router.get('/broker/status/:agent_id', this.indexPage);
            
            
        },
             indexPage: (req, res) => {
            console.log(req.params);
             console.log(req.query);
            return  res.json({
                message: "Sanjeev Key["+req.params.id+"] key [] thanks for the requestt"
            });
        }, callqueue: (req, res) => {
            let actionOBJ	=	{
            	call_channel : req.params.chan,
            	call_dtmf	: req.query.dtmfkey
            }
            console.log(actionOBJ);

           pbxcoupling.feedForDTMF(actionOBJ)
          .then(lresponse => {
            console.log(lresponse);
            
          })
          .catch(err =>{
            console.log(err);

          });
            return  res.json({
                message: "Request accepted for the event Key["+req.query.action+"]"
            });
        },

    }
}
