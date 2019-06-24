'use strict'

module.exports = function myauth(_, Joi, reqValidataion) {
    return {

        setCustomHeaders: function (req, res, next) {

            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
            res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');
            let selectParams = { message_id: req.actionid }
            let selQuery = `SELECT message_type,message_forwarder,app_uniq_key FROM  tigga_orignatecall_track where ?`;

            queryBuilder._selectObject(selQuery, selectParams)
                .then(dbresult => {
                    if ((!_.isEmpty(dbresult) && dbresult[0].message_type === "callback")) {
                        req.body = _.merge(req.body, dbresult[0]);

                    }
                    else {
                        return res.json({
                            message: `no matching record found for this reuqest`
                        });
                    }
                })
                .catch(error => {
                    return res.json({
                        message: `no record found for the operatiion `
                    });
                })
            next();
        }
    }
}
