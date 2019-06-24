'use strict'

module.exports = function myauth(_,Joi,reqValidataion) {
	return {
		myAuth:function(req,res,next) {
			
	
	console.log('middleware');
	next()

		},
		setCustomHeaders : function ( req, res, next) {
           
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
            res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');
            let validRequest  =   ['manager','internal','external','recording','internalP','outboundTrans'];
            let requestFor    = req.params.rtype;
            if (!(_.includes(validRequest, requestFor))) {
                return  res.json({
                    message: `Invalid request type :${requestFor}`
                });
            }

            const schema = {
                channel: Joi.string().min(7).required()
            }
            let validationResult = reqValidataion.reqparams(req.query.channel, schema);
            if (validationResult['Joierror']) {
               console.log(validationResult);
               return res.status(200).json(validationResult)
           }

			
            next();
		}
	}
}
