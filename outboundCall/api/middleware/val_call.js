'use strict'

module.exports = function myauth(_,Joi,reqValidataion) {
	return {

		setCustomHeaders : function ( req, res, next) {

            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
            res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');

            const schema = {
                agent_id: Joi.number().integer().required(),
                caller_no: Joi.number().integer().min(40000000).required(),
                ticket_id: Joi.number().integer()
            }
            let validationResult = reqValidataion.reqparams(req, schema);
             if (validationResult['Joierror']) {
                console.log(validationResult);
                return res.status(200).json(validationResult)
            }
            next();
		}
	}
}
