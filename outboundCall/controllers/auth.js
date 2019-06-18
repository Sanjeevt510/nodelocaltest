'use strict'

module.exports = function myauth() {
	return {
		myAuth:function(req,res,next) {
			
	
	console.log('middleware');
	next()

		},
		setCustomHeaders : function ( req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
            res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');
            next();
		}
	}
}
